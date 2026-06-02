import { Buffer } from "node:buffer";

import { describe, expect, it } from "vitest";

import { Configuration, FilesApi, OpenaiApi, UploadsApi } from "../src";
import { canRunVcrSuite, createCassetteFetch } from "./helpers/cassettes";

const MODEL_ID = process.env.AIAND_TEST_MODEL ?? "openai/gpt-oss-120b";
const PNG_BYTES = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+/p9sAAAAASUVORK5CYII=",
  "base64",
);
const PDF_BYTES = Buffer.from(
  "%PDF-1.4\n1 0 obj\n<< /Type /Catalog >>\nendobj\ntrailer\n<< /Root 1 0 R >>\n%%EOF\n",
);
const CASSETTES = [
  "list-models",
  "chat-completion",
  "completion",
  "response",
  "files-lifecycle",
  "uploads-complete",
  "uploads-cancel",
];
const VCR_TEST_TIMEOUT = 30_000;

const describeVcr = canRunVcrSuite(CASSETTES) ? describe : describe.skip;

describeVcr("ai& API VCR coverage", () => {
  it("lists models", async () => {
    const client = new OpenaiApi(configuration("list-models"));

    const response = await client.listModels();

    expect(response.object).toBe("list");
    expect(response.data.length).toBeGreaterThan(0);
    expect(response.data[0].id).toBeTruthy();
  }, VCR_TEST_TIMEOUT);

  it("creates a chat completion", async () => {
    const client = new OpenaiApi(configuration("chat-completion"));

    const response = await client.createChatCompletion({
      createChatCompletionRequest: {
        model: MODEL_ID,
        messages: [{ role: "user", content: "Reply with exactly one short sentence." }],
        temperature: 0,
        max_completion_tokens: 12,
      },
    });

    expect(response.object).toBe("chat.completion");
    expect(response.choices.length).toBeGreaterThan(0);
    expect(response.choices[0].message.role).toBe("assistant");
  }, VCR_TEST_TIMEOUT);

  it("creates a legacy completion", async () => {
    const client = new OpenaiApi(configuration("completion"));

    const response = await client.createCompletion({
      createCompletionRequest: {
        model: MODEL_ID,
        prompt: "Write three words about reliable SDKs:",
        temperature: 0,
        max_tokens: 8,
      },
    });

    expect(response.object).toBe("text_completion");
    expect(response.choices.length).toBeGreaterThan(0);
    expect(response.choices[0].text).toBeDefined();
  }, VCR_TEST_TIMEOUT);

  it("creates a response", async () => {
    const client = new OpenaiApi(configuration("response"));

    const response = await client.createResponse({
      createResponseRequest: {
        model: MODEL_ID,
        input: "Reply with exactly one short sentence.",
        temperature: 0,
        max_output_tokens: 12,
        parallel_tool_calls: false,
        truncation: "disabled",
      },
    });

    expect(response.object).toBe("response");
    expect(response.id).toBeTruthy();
    expect(["completed", "failed", "in_progress", "cancelled", "queued", "incomplete"]).toContain(
      response.status,
    );
    expect(response.model).toBeTruthy();
    expect(response.output).toBeDefined();
  }, VCR_TEST_TIMEOUT);

  it("covers the file lifecycle", async () => {
    const files = new FilesApi(configuration("files-lifecycle"));

    const uploaded = await files.uploadFile({
      file: new Blob([PNG_BYTES], { type: "image/png" }),
      purpose: "vision",
    });
    const listed = await files.listFiles();
    const fetched = await files.getFile({ id: uploaded.id });
    const content = await files.getFileContent({ id: uploaded.id });
    const deleted = await files.deleteFile({ id: uploaded.id });

    expect(uploaded.object).toBe("file");
    expect(uploaded.id.startsWith("file-")).toBe(true);
    expect(listed.object).toBe("list");
    expect(fetched.id).toBe(uploaded.id);
    expect(Buffer.from(await content.arrayBuffer())).toEqual(PNG_BYTES);
    expect(deleted.id).toBe(uploaded.id);
    expect(deleted.deleted).toBe(true);
  }, VCR_TEST_TIMEOUT);

  it("covers completing a chunked upload", async () => {
    const fetchApi = createCassetteFetch("uploads-complete");
    const uploads = new UploadsApi(configurationWithFetch(fetchApi));
    const files = new FilesApi(configurationWithFetch(fetchApi));

    const upload = await uploads.createUpload({
      createUploadRequest: {
        filename: "aiand-vcr-upload.png",
        purpose: "vision",
        bytes: PNG_BYTES.byteLength,
        mime_type: "image/png",
      },
    });
    const part = await uploads.addUploadPart({
      id: upload.id,
      data: new Blob([PNG_BYTES], { type: "image/png" }),
    });
    const completed = await uploads.completeUpload({
      id: upload.id,
      completeUploadRequest: { part_ids: [part.id] },
    });
    const deleted = await files.deleteFile({ id: completed.file?.id ?? "" });

    expect(upload.status).toBe("pending");
    expect(part.upload_id).toBe(upload.id);
    expect(completed.status).toBe("completed");
    expect(completed.file?.id.startsWith("file-")).toBe(true);
    expect(deleted.id).toBe(completed.file?.id);
    expect(deleted.deleted).toBe(true);
  }, VCR_TEST_TIMEOUT);

  it("covers cancelling a chunked upload", async () => {
    const uploads = new UploadsApi(configuration("uploads-cancel"));

    const upload = await uploads.createUpload({
      createUploadRequest: {
        filename: "aiand-vcr-cancel.pdf",
        purpose: "document",
        bytes: PDF_BYTES.byteLength,
        mime_type: "application/pdf",
      },
    });
    const cancelled = await uploads.cancelUpload({ id: upload.id });

    expect(upload.status).toBe("pending");
    expect(cancelled.id).toBe(upload.id);
    expect(cancelled.status).toBe("cancelled");
  }, VCR_TEST_TIMEOUT);
});

function configuration(cassetteName: string): Configuration {
  return configurationWithFetch(createCassetteFetch(cassetteName));
}

function configurationWithFetch(fetchApi: typeof fetch): Configuration {
  return new Configuration({
    accessToken: process.env.AIAND_API_KEY ?? "sk-recorded",
    fetchApi,
  });
}
