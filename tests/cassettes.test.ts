import { describe, expect, it } from "vitest";

import { sanitizeRequestHeaders } from "./helpers/cassettes";

describe("cassette redaction", () => {
  it("redacts request credentials and organization identifiers", () => {
    const headers = sanitizeRequestHeaders(
      new Headers({
        Authorization: "Bearer sk-real-secret",
        Cookie: "session=secret",
        "X-AIAND-Org-ID": "org-secret",
        "X-Org-ID": "org-secret",
        "X-Request-Source": "aiand-typescript-tests",
      }),
    );

    expect(headers.authorization).toBe("Bearer <AIAND_API_KEY>");
    expect(headers.cookie).toBe("<filtered>");
    expect(headers["x-aiand-org-id"]).toBe("<filtered>");
    expect(headers["x-org-id"]).toBe("<filtered>");
    expect(headers["x-request-source"]).toBe("aiand-typescript-tests");
  });
});
