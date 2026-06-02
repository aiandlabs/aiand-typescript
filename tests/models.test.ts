import { describe, expect, it } from "vitest";

import {
  BASE_PATH,
  Configuration,
  CreateResponseRequestToJSON,
  CreateUploadRequestPurposeEnum,
  FileDeletedFromJSON,
  ListModels200ResponseFromJSON,
  OpenaiApi,
} from "../src";

describe("generated models", () => {
  it("uses the ai& API as the default base path", () => {
    expect(BASE_PATH).toBe("https://api.aiand.com");
    expect(new Configuration().basePath).toBe("https://api.aiand.com");
  });

  it("adds bearer auth from the access token", async () => {
    const client = new OpenaiApi(new Configuration({ accessToken: "sk-test" }));

    const request = await client.listModelsRequestOpts();

    expect(request.headers.Authorization).toBe("Bearer sk-test");
  });

  it("accepts string pricing and typed model metadata", () => {
    const response = ListModels200ResponseFromJSON({
      object: "list",
      data: [
        {
          id: "openai/gpt-oss-120b",
          name: "OpenAI GPT OSS 120B",
          object: "model",
          created: 1775474514,
          owned_by: "partner-lab",
          provider: "openai",
          context_window: 131072,
          capabilities: ["reasoning", "tool_calling"],
          description: "OpenAI GPT OSS 120B",
          input_per_1m: "0.150000",
          output_per_1m: "0.600000",
        },
      ],
    });

    const model = response.data[0];

    expect(model.name).toBe("OpenAI GPT OSS 120B");
    expect(model.owned_by).toBe("partner-lab");
    expect(model.provider).toBe("openai");
    expect(model.context_window).toBe(131072);
    expect(model.capabilities).toEqual(["reasoning", "tool_calling"]);
    expect(model.description).toBe("OpenAI GPT OSS 120B");
    expect(model.input_per_1m).toBe("0.150000");
    expect(model.output_per_1m).toBe("0.600000");
  });

  it("accepts document upload purpose from the docs", () => {
    expect(CreateUploadRequestPurposeEnum.Document).toBe("document");
  });

  it("accepts boolean file deletion markers", () => {
    const deleted = FileDeletedFromJSON({
      id: "file-test",
      object: "file",
      deleted: true,
    });

    expect(deleted.deleted).toBe(true);
  });

  it("omits unset nullable response fields when stringified", () => {
    const body = CreateResponseRequestToJSON({
      model: "openai/gpt-oss-120b",
      input: "Say hello in one sentence.",
      max_output_tokens: 8,
    });

    const serialized = JSON.parse(JSON.stringify(body));

    expect(serialized.input).toBe("Say hello in one sentence.");
    expect(serialized).not.toHaveProperty("parallel_tool_calls");
    expect(serialized).not.toHaveProperty("truncation");
  });
});

