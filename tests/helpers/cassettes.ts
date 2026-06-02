import { Buffer } from "node:buffer";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { expect } from "vitest";

type HeadersRecord = Record<string, string>;

interface Interaction {
  request: {
    method: string;
    path: string;
    headers: HeadersRecord;
    body: string | null;
  };
  response: {
    status: number;
    statusText: string;
    headers: HeadersRecord;
    bodyBase64: string;
  };
}

interface Cassette {
  interactions: Interaction[];
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
  "x-request-id",
  "x-ratelimit-limit-requests",
  "x-ratelimit-remaining-requests",
  "x-ratelimit-reset-requests",
]);

export function canRunVcrSuite(cassetteNames: string[]): boolean {
  const recordMode = process.env.AIAND_VCR_RECORD_MODE?.toLowerCase() ?? "none";
  const hasKey = Boolean(process.env.AIAND_API_KEY);
  const hasAllCassettes = cassetteNames.every((name) => existsSync(cassettePath(name)));

  return hasAllCassettes || (recordMode !== "none" && hasKey);
}

export function createCassetteFetch(cassetteName: string): typeof fetch {
  const path = cassettePath(cassetteName);
  const recordMode = process.env.AIAND_VCR_RECORD_MODE?.toLowerCase() ?? "none";
  const shouldRecord = recordMode === "all" || (recordMode === "once" && !existsSync(path));

  if (shouldRecord) {
    const cassette: Cassette = { interactions: [] };
    return async (input, init) => {
      const request = new Request(input, init);
      const response = await fetch(request);
      const body = Buffer.from(await response.clone().arrayBuffer());
      const interaction: Interaction = {
        request: {
          method: request.method,
          path: urlPath(request.url),
          headers: sanitizeRequestHeaders(request.headers),
          body: requestBodyDescription(request),
        },
        response: {
          status: response.status,
          statusText: response.statusText,
          headers: sanitizeResponseHeaders(response.headers),
          bodyBase64: body.toString("base64"),
        },
      };

      cassette.interactions.push(interaction);
      writeCassette(path, cassette);

      return new Response(body, {
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
      });
    };
  }

  if (!existsSync(path)) {
    throw new Error(
      `No cassette found for ${cassetteName}. Put AIAND_API_KEY in .env.test and run scripts/record-cassettes.`,
    );
  }

  const cassette = JSON.parse(readFileSync(path, "utf8")) as Cassette;
  let index = 0;

  return async (input, init) => {
    const request = new Request(input, init);
    const interaction = cassette.interactions[index++];

    if (!interaction) {
      throw new Error(`No recorded interaction ${index} in cassette ${cassetteName}.`);
    }

    expect(request.method).toBe(interaction.request.method);
    expect(urlPath(request.url)).toBe(interaction.request.path);

    return new Response(Buffer.from(interaction.response.bodyBase64, "base64"), {
      status: interaction.response.status,
      statusText: interaction.response.statusText,
      headers: interaction.response.headers,
    });
  };
}

function cassettePath(name: string): string {
  return join(cassetteRoot, `${name}.json`);
}

function urlPath(url: string): string {
  const parsed = new URL(url);
  return `${parsed.pathname}${parsed.search}`;
}

function sanitizeRequestHeaders(headers: Headers): HeadersRecord {
  const result: HeadersRecord = {};

  headers.forEach((value, key) => {
    result[key] = key.toLowerCase() === "authorization" ? "Bearer <AIAND_API_KEY>" : value;
  });

  return result;
}

function sanitizeResponseHeaders(headers: Headers): HeadersRecord {
  const result: HeadersRecord = {};

  headers.forEach((value, key) => {
    result[key] = filteredResponseHeaders.has(key.toLowerCase()) ? "<filtered>" : value;
  });

  return result;
}

function requestBodyDescription(request: Request): string | null {
  if (!request.body) {
    return null;
  }

  const contentType = request.headers.get("content-type");
  if (contentType?.includes("multipart/form-data")) {
    return "<multipart/form-data>";
  }

  return "<body>";
}

function writeCassette(path: string, cassette: Cassette): void {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, `${JSON.stringify(cassette, null, 2)}\n`);
}

