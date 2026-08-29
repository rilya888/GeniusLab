import assert from "node:assert/strict";
import { describe, it, mock } from "node:test";
import type { Request, Response } from "express";
import { createBotStatsHandler } from "./bot-stats";

function responseDouble() {
  let statusCode = 200;
  let body: unknown;
  const headers = new Map<string, string>();
  const response = {
    set(name: string, value: string) { headers.set(name, value); return this; },
    status(value: number) { statusCode = value; return this; },
    json(value: unknown) { body = value; return this; },
  } as unknown as Response;
  return { response, status: () => statusCode, body: () => body, headers };
}

const request = (authorization?: string, startAt = "1787954400000", endAt = "1788040800000") => ({
  headers: { authorization },
  query: { startAt, endAt },
}) as unknown as Request;

const emptyStats = () => ({
  totalVisits: 0,
  uniqueVisitors: 0,
  byDevice: { mobile: 0, tablet: 0, desktop: 0 },
  byReferrer: {},
  byPath: {},
});

describe("createBotStatsHandler", () => {
  it("rejects missing and incorrect tokens with the same response", () => {
    for (const authorization of [undefined, "Bearer wrong-token"]) {
      const output = responseDouble();
      createBotStatsHandler({ token: "test-secret", loadStats: mock.fn(), logError: mock.fn() })(
        request(authorization), output.response, mock.fn(),
      );
      assert.equal(output.status(), 401);
      assert.deepEqual(output.body(), { error: "Unauthorized" });
    }
  });

  it("passes exact inclusive/exclusive boundaries to the aggregate loader", () => {
    const loadStats = mock.fn(() => ({
      totalVisits: 2,
      uniqueVisitors: 1,
      byDevice: { mobile: 1, tablet: 0, desktop: 1 },
      byReferrer: { "(direct)": 2 },
      byPath: { "/": 2 },
    }));
    const output = responseDouble();
    createBotStatsHandler({ token: "test-secret", loadStats, logError: mock.fn() })(
      request("Bearer test-secret"), output.response, mock.fn(),
    );
    assert.equal(output.status(), 200);
    assert.deepEqual(loadStats.mock.calls[0].arguments, [1787954400000, 1788040800000]);
    assert.equal(output.headers.get("Cache-Control"), "no-store");
  });

  it("accepts 23-hour and 25-hour windows and rejects invalid or longer windows", () => {
    const handler = createBotStatsHandler({ token: "test-secret", loadStats: emptyStats, logError: mock.fn() });
    for (const hours of [23, 25]) {
      const output = responseDouble();
      handler(request("Bearer test-secret", "1000000000000", String(1000000000000 + hours * 3_600_000)), output.response, mock.fn());
      assert.equal(output.status(), 200);
    }
    for (const [startAt, endAt] of [["bad", "2"], ["2", "1"], ["1000000000000", String(1000000000000 + 27 * 3_600_000)]]) {
      const output = responseDouble();
      handler(request("Bearer test-secret", startAt, endAt), output.response, mock.fn());
      assert.equal(output.status(), 400);
    }
  });

  it("returns a generic 500 and logs no request credentials when storage fails", () => {
    const logError = mock.fn();
    const output = responseDouble();
    createBotStatsHandler({ token: "test-secret", loadStats: () => { throw new Error("disk path"); }, logError })(
      request("Bearer test-secret"), output.response, mock.fn(),
    );
    assert.equal(output.status(), 500);
    assert.deepEqual(output.body(), { error: "Failed to read stats" });
    assert.equal(logError.mock.calls.every((call) => !JSON.stringify(call.arguments).includes("test-secret")), true);
  });
});
