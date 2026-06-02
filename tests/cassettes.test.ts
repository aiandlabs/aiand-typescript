import { describe, expect, it } from "vitest";

import { redactRecording } from "./helpers/cassettes";

describe("cassette redaction", () => {
  it("redacts sensitive cassette headers", () => {
    const recording = {
      request: {
        headers: [
          { name: "Authorization", value: "Bearer token" },
        ],
      },
      response: {
        headers: [
          { name: "Authorization", value: "Bearer token" },
          { name: "CF-Ray", value: "cf-secret" },
          { name: "Set-Cookie", value: "cookie-value" },
          { name: "X-AIAND-Org-ID", value: "org-secret" },
          { name: "X-Org-ID", value: "org-secret" },
          { name: "X-Request-ID", value: "req-secret" },
          { name: "X-RateLimit-Remaining-Requests", value: "42" },
        ],
      },
    };

    redactRecording(recording);

    expect(recording.request.headers).toEqual([
      { name: "Authorization", value: "Bearer <AIAND_API_KEY>" },
    ]);
    expect(recording.response.headers).toEqual([
      { name: "Authorization", value: "<filtered>" },
      { name: "CF-Ray", value: "<filtered>" },
      { name: "Set-Cookie", value: "<filtered>" },
      { name: "X-AIAND-Org-ID", value: "<filtered>" },
      { name: "X-Org-ID", value: "<filtered>" },
      { name: "X-Request-ID", value: "<filtered>" },
      { name: "X-RateLimit-Remaining-Requests", value: "<filtered>" },
    ]);
  });
});
