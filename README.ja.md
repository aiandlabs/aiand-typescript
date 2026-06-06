# aiand-typescript

TypeScript で ai& API を使用します。

このパッケージは、公開されている ai& OpenAPI 仕様から
[OpenAPI Generator](https://github.com/OpenAPITools/openapi-generator) を使って生成されています。現在の仕様に含まれる
OpenAI 互換エンドポイントとして、モデル、チャット補完、
補完 (レガシー)、レスポンス、ファイル、チャンクアップロードをカバーしています。

npm パッケージ名は `@aiand/sdk` です。

## インストール

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

## 使い方

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

`OpenaiApi` は、元の仕様の `openai` タグから生成されています。

## チャット補完

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

## 補完

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

## レスポンス

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

## モデルと料金

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

## ファイル

ファイルを一度アップロードし、返された `file_id` をチャット補完リクエストから参照します。

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

ファイルの `purpose` は `vision`、`video`、`audio`、`document` のいずれかです。

## チャンクアップロード

より大きなアセットでは、アップロードを作成し、パートを順番に追加してから完了します。

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

## タイムアウトとヘッダ

生成された各操作は、標準の `fetch` オーバーライド引数を受け付けます:

```ts
const response = await client.listModels({
  signal: AbortSignal.timeout(30_000),
  headers: { "X-Request-Source": "aiand-typescript" },
});
```

API キー認証には `Configuration({ accessToken: ... })` を使用します。ドキュメントでは、ブラウザアプリや
コンソールでの JWT 認証では `X-Org-ID` が必要になる場合があると説明されています。サーバーサイド
API キーでは、組織はキーから解決されます。

## エラー

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

## テスト

ネットワーク呼び出しなしで単体テストを実行します:

```sh
npm test
```

対象を絞った型チェックを実行します:

```sh
npm run lint
```

パッケージをビルドします:

```sh
npm run build
```

`src/` 以下の生成コードは OpenAPI Generator によって再作成されるため、手で再フォーマットするのではなく、
挙動をレビューする必要があります。

## HTTP カセットの記録

テストでは VCR 形式で実際の API 通信を記録するために [PollyJS](https://netflix.github.io/pollyjs/) を使用します。
Polly は HAR フィクスチャをデフォルトの `recordings` ディレクトリに記録します。

コミット済みの記録は、次を実行するとデフォルトで再生されます:

```sh
npm test
```

記録を更新または追加するには、API キーを環境変数に設定して、対象を絞った VCR テストを実行します:

```sh
export AIAND_API_KEY=your-aiand-api-key
npm run test:vcr
```

カセット設定は、HAR フィクスチャが書き込まれる前にリクエストの `Authorization` ヘッダと、
Python SDK と同じレスポンスヘッダをフィルタします。サニタイズ済みのカセットファイルのみをコミットしてください。

VCR テストは、公開エンドポイントグループごとに 1 つの Polly HAR カセットを記録します:

- `list-models`
- `chat-completion`
- `completion`
- `response`
- `files-lifecycle`
- `uploads-complete`
- `uploads-cancel`

これらのカセットを合わせると、現在 OpenAPI 仕様から生成されるすべてのエンドポイントに到達します:
`GET /v1/models`、`POST /v1/chat/completions`、`POST /v1/completions`、
`POST /v1/responses`、`GET /v1/files`、`POST /v1/files`、`GET /v1/files/{id}`、
`GET /v1/files/{id}/content`、`DELETE /v1/files/{id}`、`POST /v1/uploads`、
`POST /v1/uploads/{id}/parts`、`POST /v1/uploads/{id}/complete`、および
`POST /v1/uploads/{id}/cancel` です。

## SDK の更新

前提条件:

- Java。OpenAPI Generator に必要です。
- Node/npm と `npx`。`@openapitools/openapi-generator-cli@2.34.0` の実行に使用します。
- Node 18 以上。

最新の公開仕様から再生成します:

```sh
./scripts/update-sdk
```

このスクリプトは次を行います:

1. `https://api.aiand.com/openapi.json` を `openapi/openapi.json` にダウンロードします。
2. `openapi-generator-config.yaml` で OpenAPI Generator を実行します。
3. TypeScript ジェネレータ固有の互換性のために `scripts/patch-generated-client.mjs` を適用します。

再生成後:

```sh
npm test
npm run lint
npm run build
```

`src/`、`docs/`、`openapi/openapi.json` の生成差分をレビューしてください。

npm ラッパーは `scripts/update-sdk` で固定されており、OpenAPI Generator のバージョンは
`openapitools.json` で固定されています。どちらかをアップグレードするには、固定されたバージョンを編集し、再生成して、
生成差分を慎重にレビューしてください。

## 開発メモ

ほとんどの SDK ファイルは生成されています。主な手動管理ファイルは次のとおりです:

- `README.md`
- `CHANGELOG.md`
- `LICENSE`
- `package.json`
- `tsconfig.json`
- `vitest.config.ts`
- `scripts/update-sdk`
- `scripts/patch-generated-client.mjs`
- `tests/`

`scripts/patch-generated-client.mjs` は、生成された `ChatCompletionMessage` 型にパッチを適用します。
現在の仕様はチャットメッセージのバリアントを匿名の `anyOf` スキーマとしてモデル化しており、
TypeScript ジェネレータは集約型を `tool` メッセージ形状に折りたたみます。このパッチは、元の仕様が
これらのバリアントに名前を付ける、または `discriminator` を追加するまで、通常の `system`、`user`、`assistant`、
`developer`、`tool` メッセージを型安全に保ちます。

バグ報告とプルリクエストを歓迎します。

## ライセンス

このプロジェクトは [Apache License 2.0](LICENSE) の下でライセンスされています。
