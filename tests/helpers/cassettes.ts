import { Buffer } from "node:buffer";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import FetchAdapter from "@pollyjs/adapter-fetch";
import { Polly, type MODE } from "@pollyjs/core";
import FSPersister from "@pollyjs/persister-fs";

interface HarHeader {
  name: string;
  value: string;
}

interface HarRecording {
  request?: {
    headers?: HarHeader[];
  };
  response?: {
    headers?: HarHeader[];
  };
}

interface HarFile {
  log?: {
    _recordingName?: string;
  };
}

const cassetteRoot = join(
  dirname(fileURLToPath(import.meta.url)),
  "..",
  "cassettes",
);

const filteredResponseHeaders = new Set([
  "authorization",
  "cf-ray",
  "set-cookie",
  "x-aiand-org-id",
  "x-org-id",
  "x-ratelimit-limit-requests",
  "x-ratelimit-remaining-requests",
  "x-ratelimit-reset-requests",
  "x-request-id",
]);

Polly.register(FetchAdapter);
Polly.register(FSPersister);

export function canRunVcrSuite(cassetteNames: string[]): boolean {
  const hasKey = Boolean(process.env.AIAND_API_KEY);

  return hasRecordings(cassetteNames) || (isRecording() && hasKey);
}

export async function withCassette<T>(
  cassetteName: string,
  callback: () => Promise<T>,
): Promise<T> {
  const restoreFileReader = installFileReaderPolyfill();
  let polly: Polly | undefined;

  try {
    polly = new Polly(cassetteName, {
      adapters: ["fetch"],
      persister: "fs",
      mode: cassetteMode(cassetteName),
      recordIfMissing: false,
      logLevel: "error",
      matchRequestsBy: {
        method: true,
        headers: false,
        body: false,
        order: false,
        url: {
          protocol: true,
          hostname: true,
          port: true,
          pathname: true,
          query: true,
          hash: false,
        },
      },
      persisterOptions: {
        fs: { recordingsDir: cassetteRoot },
        keepUnusedRequests: false,
      },
    });

    polly.server.any().on("beforePersist", (_request, recording) => {
      redactRecording(recording);
    });

    return await callback();
  } finally {
    await polly?.stop();
    restoreFileReader();
  }
}

export function redactRecording(recording: HarRecording): void {
  redactRequestHeaders(recording.request?.headers);
  redactResponseHeaders(recording.response?.headers);
}

function cassetteMode(cassetteName: string): MODE {
  const recordMode = recordingMode();

  if (recordMode === "once") {
    return hasRecording(cassetteName) ? "replay" : "record";
  }

  return ["all", "record", "update"].includes(recordMode) ? "record" : "replay";
}

function isRecording(): boolean {
  return ["all", "once", "record", "update"].includes(recordingMode());
}

function recordingMode(): string {
  return process.env.AIAND_VCR_RECORD_MODE?.toLowerCase() ?? "none";
}

function hasRecordings(cassetteNames: string[]): boolean {
  const recordedNames = new Set(recordingNames());

  return cassetteNames.every((name) => recordedNames.has(name));
}

function hasRecording(cassetteName: string): boolean {
  return recordingNames().includes(cassetteName);
}

function recordingNames(): string[] {
  if (!existsSync(cassetteRoot)) {
    return [];
  }

  return readdirSync(cassetteRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => join(cassetteRoot, entry.name, "recording.har"))
    .filter((path) => existsSync(path))
    .map((path) => JSON.parse(readFileSync(path, "utf8")) as HarFile)
    .flatMap((har) => (har.log?._recordingName ? [har.log._recordingName] : []));
}

function redactRequestHeaders(headers: HarHeader[] | undefined): void {
  if (!headers) {
    return;
  }

  for (const header of headers) {
    if (header.name.toLowerCase() === "authorization") {
      header.value = "Bearer <AIAND_API_KEY>";
    }
  }
}

function redactResponseHeaders(headers: HarHeader[] | undefined): void {
  if (!headers) {
    return;
  }

  for (const header of headers) {
    if (filteredResponseHeaders.has(header.name.toLowerCase())) {
      header.value = "<filtered>";
    }
  }
}

function installFileReaderPolyfill(): () => void {
  const globalWithFileReader = globalThis as unknown as Record<string, unknown>;

  if ("FileReader" in globalWithFileReader) {
    return () => {};
  }

  class NodeFileReader {
    result: string | null = null;
    onabort: ((error: unknown) => void) | null = null;
    onend: ((error: unknown) => void) | null = null;
    onload: (() => void) | null = null;

    async readAsDataURL(blob: Blob): Promise<void> {
      try {
        const buffer = Buffer.from(await blob.arrayBuffer());
        const mediaType = blob.type || "application/octet-stream";

        this.result = `data:${mediaType};base64,${buffer.toString("base64")}`;
        this.onload?.();
      } catch (error) {
        this.onabort?.(error);
        this.onend?.(error);
      }
    }
  }

  globalWithFileReader["FileReader"] = NodeFileReader;

  return () => {
    delete globalWithFileReader["FileReader"];
  };
}
