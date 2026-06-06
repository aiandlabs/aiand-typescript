# aiand-typescript

TypeScript で ai& API を使用します。

このパッケージは、公開されている ai& OpenAPI spec から
[OpenAPI Generator](https://github.com/OpenAPITools/openapi-generator) を使って生成されています。現在 spec に含まれている
OpenAI 互換エンドポイントである models、chat completions、
legacy completions、responses、files、chunked uploads をカバーしています。

npm パッケージ名は `@aiand/sdk` です。

## Installation

このチェックアウトからインストールする場合:

```sh
cd aiand-typescript
npm install
npm run build
```

このパッケージが公開されたら、次のようにインストールします:

```sh
npm install @aiand/sdk
```

現在の SDK バージョンは `0.1.0` です。リリースノートは [CHANGELOG.md](CHANGELOG.md) を参照してください。

## Usage

API キーを環境変数に設定します:

```sh
export AIAND_API_KEY="your-aiand-api-key"
```

クライアントを作成します:

```ts
import { Configuration, OpenaiApi } from "@aiand/sdk";

const configuration = new Configuration({
  accessToken: process.env.AIAND_API_KEY,
});

const client = new OpenaiApi(configuration);
const models = await client.listModels();

console.log(models.data[0].id);
```

生成されたベース URL は `https://api.aiand.com` です。OpenAPI のパスには `/v1` が含まれるため、SDK の
呼び出しは `https://api.aiand.com/v1/models` のような URL に解決されます。

`OpenaiApi` は、source spec の `openai` tag から生成されています。

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

ドキュメントでは、モデル料金は精密な文字列フィールドとして説明されています。この SDK では
`input_per_1m` と `output_per_1m` を number ではなく文字列として保持します。

## Files

ファイルを一度アップロードし、返された `file_id` を chat completion リクエストから参照します。

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

ファイル purpose の値は `vision`、`video`、`audio`、`document` です。

## Chunked Uploads

より大きなアセットでは、upload を作成し、part を順番に追加してから完了します。

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

生成された各 operation は、標準の `fetch` override argument を受け付けます:

```ts
const response = await client.listModels({
  signal: AbortSignal.timeout(30_000),
  headers: { "X-Request-Source": "aiand-typescript" },
});
```

API キー認証には `Configuration({ accessToken: ... })` を使用します。ドキュメントでは、browser/JWT
auth では `X-Org-ID` が必要になる場合があると説明されています。サーバーサイド API キーでは、organization は
キーから解決されます。

## Errors

生成されたクライアントは、非 2xx レスポンスに対して `ResponseError` を送出します。

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

ネットワーク呼び出しなしで unit tests を実行します:

```sh
npm test
```

focused type check を実行します:

```sh
npm run lint
```

パッケージを build します:

```sh
npm run build
```

`src/` 以下の生成コードは OpenAPI Generator によって再作成されるため、手で再フォーマットするのではなく、
挙動をレビューする必要があります。

## Recording HTTP Cassettes

テストでは VCR-style live API coverage のために [PollyJS](https://netflix.github.io/pollyjs/) を使用します。
Polly は HAR fixtures をデフォルトの `recordings` ディレクトリに記録します。

コミット済み recordings は、次を実行するとデフォルトで replay されます:

```sh
npm test
```

recordings を更新または追加するには、API キーを export して focused VCR suite を実行します:

```sh
export AIAND_API_KEY=your-aiand-api-key
npm run test:vcr
```

cassette config は、HAR fixtures が書き込まれる前に request `Authorization` ヘッダーと、
Python SDK と同じ response headers をフィルタします。sanitized cassette files のみをコミットしてください。

VCR suite は、公開 endpoint group ごとに 1 つの Polly HAR cassette を記録します:

- `list-models`
- `chat-completion`
- `completion`
- `response`
- `files-lifecycle`
- `uploads-complete`
- `uploads-cancel`

これらの cassettes を合わせると、現在 OpenAPI spec から生成されるすべての endpoint に到達します:
`GET /v1/models`、`POST /v1/chat/completions`、`POST /v1/completions`、
`POST /v1/responses`、`GET /v1/files`、`POST /v1/files`、`GET /v1/files/{id}`、
`GET /v1/files/{id}/content`、`DELETE /v1/files/{id}`、`POST /v1/uploads`、
`POST /v1/uploads/{id}/parts`、`POST /v1/uploads/{id}/complete`、および
`POST /v1/uploads/{id}/cancel` です。

## Updating The SDK

Prerequisites:

- Java。OpenAPI Generator に必要です。
- Node/npm と `npx`。`@openapitools/openapi-generator-cli@2.34.0` の実行に使用します。
- Node 18 以上。

最新の公開 spec から再生成します:

```sh
./scripts/update-sdk
```

この script は次を行います:

1. `https://api.aiand.com/openapi.json` を `openapi/openapi.json` にダウンロードします。
2. `openapi-generator-config.yaml` で OpenAPI Generator を実行します。
3. generator-specific TypeScript compatibility のために `scripts/patch-generated-client.mjs` を適用します。

再生成後:

```sh
npm test
npm run lint
npm run build
```

`src/`、`docs/`、`openapi/openapi.json` の生成 diff をレビューしてください。

npm wrapper は `scripts/update-sdk` で pin されており、OpenAPI Generator version は
`openapitools.json` で pin されています。どちらかを upgrade するには、pin された version を編集し、再生成して、
生成 diff を慎重にレビューしてください。

## Development Notes

ほとんどの SDK ファイルは生成されています。主な hand-maintained files は次のとおりです:

- `README.md`
- `CHANGELOG.md`
- `LICENSE`
- `package.json`
- `tsconfig.json`
- `vitest.config.ts`
- `scripts/update-sdk`
- `scripts/patch-generated-client.mjs`
- `tests/`

`scripts/patch-generated-client.mjs` は、生成された `ChatCompletionMessage` type に patch を適用します。
現在の spec は chat message variants を anonymous `anyOf` schemas としてモデル化しており、
TypeScript generator は aggregate type を `tool` message shape に折りたたみます。この patch は、source spec が
これらの variants に名前を付ける、または discriminator を追加するまで、通常の `system`、`user`、`assistant`、
`developer`、`tool` messages を type-safe に保ちます。

bug reports と pull requests を歓迎します。

## License

このプロジェクトは [Apache License 2.0](LICENSE) の下でライセンスされています。
