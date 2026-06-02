# aiand-typescript

Use the ai& API with TypeScript.

This package is generated from the public ai& OpenAPI spec with
[OpenAPI Generator](https://github.com/OpenAPITools/openapi-generator). It covers the
OpenAI-compatible endpoints currently present in the spec: models, chat completions,
legacy completions, responses, files, and chunked uploads.

The npm package name is `@aiand/sdk`.

## Installation

From this checkout:

```sh
cd aiand-typescript
npm install
npm run build
```

Once this package is published, install it as:

```sh
npm install @aiand/sdk
```

The current SDK version is `0.1.0`. See [CHANGELOG.md](CHANGELOG.md) for release notes.

## Usage

Set your API key in the environment:

```sh
export AIAND_API_KEY="sk-..."
```

Create a client:

```ts
import { Configuration, OpenaiApi } from "@aiand/sdk";

const configuration = new Configuration({
  accessToken: process.env.AIAND_API_KEY,
});

const client = new OpenaiApi(configuration);
const models = await client.listModels();

console.log(models.data[0].id);
```

The generated base URL is `https://api.aiand.com`. The OpenAPI paths include `/v1`, so SDK
calls resolve to URLs like `https://api.aiand.com/v1/models`.

`OpenaiApi` is generated from the source spec's `openai` tag.

## Chat

```ts
import { Configuration, OpenaiApi } from "@aiand/sdk";

const client = new OpenaiApi(
  new Configuration({ accessToken: process.env.AIAND_API_KEY }),
);

const response = await client.createChatCompletion({
  createChatCompletionRequest: {
    model: "openai/gpt-oss-120b",
    messages: [
      { role: "system", content: "You are concise and practical." },
      { role: "user", content: "Give me one sentence about ai&." },
    ],
    temperature: 0.2,
  },
});

console.log(response.choices[0].message.content);
```

## Completions

```ts
import { Configuration, OpenaiApi } from "@aiand/sdk";

const client = new OpenaiApi(
  new Configuration({ accessToken: process.env.AIAND_API_KEY }),
);

const response = await client.createCompletion({
  createCompletionRequest: {
    model: "openai/gpt-oss-120b",
    prompt: "Write a short product tagline for ai&:",
    max_tokens: 32,
  },
});

console.log(response.choices[0].text);
```

## Responses

```ts
import { Configuration, OpenaiApi } from "@aiand/sdk";

const client = new OpenaiApi(
  new Configuration({ accessToken: process.env.AIAND_API_KEY }),
);

const response = await client.createResponse({
  createResponseRequest: {
    model: "openai/gpt-oss-120b",
    input: "Give me one practical sentence about ai&.",
    temperature: 0.2,
    max_output_tokens: 64,
    parallel_tool_calls: false,
    truncation: "disabled",
  },
});

console.log(response.output);
```

## Models And Pricing

```ts
import { Configuration, OpenaiApi } from "@aiand/sdk";

const client = new OpenaiApi(
  new Configuration({ accessToken: process.env.AIAND_API_KEY }),
);

const models = await client.listModels();

for (const model of models.data) {
  console.log(
    model.id,
    model.provider,
    model.context_window,
    model.capabilities,
    model.input_per_1m,
    model.output_per_1m,
  );
}
```

The docs describe model pricing as precise string fields. This SDK keeps
`input_per_1m` and `output_per_1m` as strings instead of numbers.

## Files

Upload a file once, then reference the returned `file_id` from chat completion requests.

```ts
import { readFile } from "node:fs/promises";

import { Configuration, FilesApi } from "@aiand/sdk";

const files = new FilesApi(
  new Configuration({ accessToken: process.env.AIAND_API_KEY }),
);

const bytes = await readFile("diagram.png");
const file = new Blob([bytes], { type: "image/png" });

const uploaded = await files.uploadFile({
  file,
  purpose: "vision",
});

console.log(uploaded.id);
```

The file purpose values are `vision`, `video`, `audio`, and `document`.

## Chunked Uploads

For larger assets, create an upload, add parts in order, then complete it.

```ts
import { readFile } from "node:fs/promises";

import { Configuration, UploadsApi } from "@aiand/sdk";

const uploads = new UploadsApi(
  new Configuration({ accessToken: process.env.AIAND_API_KEY }),
);

const bytes = await readFile("clip.mp4");

const upload = await uploads.createUpload({
  createUploadRequest: {
    filename: "clip.mp4",
    purpose: "video",
    bytes: bytes.byteLength,
    mime_type: "video/mp4",
  },
});

const part = await uploads.addUploadPart({
  id: upload.id,
  data: new Blob([bytes], { type: "video/mp4" }),
});

const completed = await uploads.completeUpload({
  id: upload.id,
  completeUploadRequest: { part_ids: [part.id] },
});

console.log(completed.file?.id);
```

## Timeouts And Headers

Every generated operation accepts the standard `fetch` override argument:

```ts
const response = await client.listModels({
  signal: AbortSignal.timeout(30_000),
  headers: { "X-Request-Source": "aiand-typescript" },
});
```

Use `Configuration({ accessToken: ... })` for API-key auth. The docs note that browser/JWT
auth can require `X-Org-ID`; for server-side API keys, the organization is resolved from
the key.

## Errors

The generated client throws `ResponseError` for non-2xx responses.

```ts
import { ResponseError } from "@aiand/sdk";

try {
  await client.listModels();
} catch (error) {
  if (error instanceof ResponseError) {
    console.log(error.response.status);
    console.log(await error.response.text());
  }
}
```

## Testing

Run the unit tests without making network calls:

```sh
npm test
```

Run the focused type check:

```sh
npm run lint
```

Build the package:

```sh
npm run build
```

Generated code under `src/` is recreated by OpenAPI Generator and should be reviewed for
behavior, not reformatted by hand.

## Recording HTTP Cassettes

Tests use [PollyJS](https://netflix.github.io/pollyjs/) for VCR-style live API coverage.
Polly records HAR fixtures under `tests/cassettes`.

To record cassettes, create `.env.test`:

```sh
AIAND_API_KEY=sk-your-real-aiand-api-key
```

Then run:

```sh
./scripts/record-cassettes
```

The cassette config filters the request `Authorization` header and the same response
headers as the Python SDK before HAR fixtures are written. The recording script sets
`AIAND_VCR_RECORD_MODE=once`. Do not commit `.env.test`. Only commit sanitized cassette
files.

The VCR suite records one Polly HAR cassette per public endpoint group:

- `list-models`
- `chat-completion`
- `completion`
- `response`
- `files-lifecycle`
- `uploads-complete`
- `uploads-cancel`

Together those cassettes hit every endpoint currently generated from the OpenAPI spec:
`GET /v1/models`, `POST /v1/chat/completions`, `POST /v1/completions`,
`POST /v1/responses`, `GET /v1/files`, `POST /v1/files`, `GET /v1/files/{id}`,
`GET /v1/files/{id}/content`, `DELETE /v1/files/{id}`, `POST /v1/uploads`,
`POST /v1/uploads/{id}/parts`, `POST /v1/uploads/{id}/complete`, and
`POST /v1/uploads/{id}/cancel`.

## Updating The SDK

Prerequisites:

- Java, required by OpenAPI Generator.
- Node/npm with `npx`, used to run `@openapitools/openapi-generator-cli@2.34.0`.
- Node 18 or newer.

Regenerate from the latest published spec:

```sh
./scripts/update-sdk
```

That script:

1. Downloads `https://api.aiand.com/openapi.json` to `openapi/openapi.json`.
2. Runs OpenAPI Generator with `openapi-generator-config.yaml`.
3. Applies `scripts/patch-generated-client.mjs` for generator-specific TypeScript
   compatibility.

After regenerating:

```sh
npm test
npm run lint
npm run build
```

Review the generated diff in `src/`, `docs/`, and `openapi/openapi.json`.

The npm wrapper is pinned in `scripts/update-sdk`, and the OpenAPI Generator version is
pinned in `openapitools.json`. To upgrade either one, edit the pinned version, regenerate,
and review the generated diff carefully.

## Development Notes

Most SDK files are generated. The main hand-maintained files are:

- `README.md`
- `CHANGELOG.md`
- `LICENSE`
- `package.json`
- `tsconfig.json`
- `vitest.config.ts`
- `scripts/update-sdk`
- `scripts/patch-generated-client.mjs`
- `scripts/record-cassettes`
- `tests/`

`scripts/patch-generated-client.mjs` patches the generated `ChatCompletionMessage` type.
The current spec models chat message variants with anonymous `anyOf` schemas, and the
TypeScript generator collapses the aggregate type into the `tool` message shape. The patch
keeps normal `system`, `user`, `assistant`, `developer`, and `tool` messages type-safe
until the source spec names or discriminates those variants.

Bug reports and pull requests are welcome.

## License

This project is licensed under the [Apache License 2.0](LICENSE).
