# Changelog

All notable changes to this project will be documented in this file.

This project follows semantic versioning before `1.0`, where minor versions may include
breaking changes while the SDK surface is still settling.

## [0.1.0] - 2026-06-02

Initial public TypeScript SDK release for the ai& API.

### Added

- Generated `@aiand/sdk` TypeScript package from the public ai& OpenAPI spec.
- OpenAI-compatible API coverage for models, chat completions, legacy completions,
  responses, files, and chunked uploads.
- Type exports for generated request and response shapes.
- API-key authentication through `Configuration({ accessToken: ... })`.
- Default API server support for `https://api.aiand.com`.
- Package metadata for Node 18 and newer.
- Comprehensive README with installation, usage, cassette recording, testing, and SDK
  regeneration instructions.
- `scripts/update-sdk` for downloading the latest spec and regenerating the client with
  OpenAPI Generator.
- PollyJS VCR-style cassette test harness for live API coverage.
- Apache License 2.0.

### Implementation Notes

- Generates directly from the public OpenAPI spec.
- Uses the `typescript-fetch` generator for a small fetch-based SDK with browser and
  modern Node support.
- Keeps OpenAPI model property names as originally specified, so request and response
  objects use the API's snake_case field names.
- Applies a small generated-client compatibility patch for chat message `anyOf` typing.
- Uses PollyJS with filesystem-persisted HAR cassettes for recorded API tests.
