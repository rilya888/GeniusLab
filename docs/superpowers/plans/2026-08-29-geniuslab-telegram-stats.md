# GeniusLab Statistics in QuietUnit Telegram Report Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add exact previous-day `geniuslab.info` visitor statistics to the existing `quietunit_stat` Telegram report while keeping the QuietUnit report deliverable when GeniusLab is unavailable.

**Architecture:** GeniusLab exposes one aggregate-only endpoint protected by a dedicated bearer token. The QuietUnit bot requests Umami and GeniusLab concurrently for its existing `ReportWindow`, validates both payloads, and treats GeniusLab as an optional section while preserving Umami as the required source and the existing delivery-state rules.

**Tech Stack:** Node.js 20/22, TypeScript, Express 5, Node test runner through `tsx`, Vitest, native `fetch`, Docker Compose, NDJSON persistence.

## Global Constraints

- The reporting timezone is exactly `Europe/Rome`.
- The API interval is inclusive at `startAt` and exclusive at `endAt`.
- The API accepts intervals no longer than 26 hours so both 23-hour and 25-hour DST days work.
- A GeniusLab failure must not block a successful QuietUnit report.
- A partial report that Telegram accepts is marked delivered and is not resent that day.
- An Umami failure keeps the existing failure-warning behavior and must not mark the report delivered.
- The bot must not use the GeniusLab administrator password or administrator JWT.
- `GENIUS_STATS_BOT_TOKEN` must never enter source control, command output, logs, dry-run output, or Telegram messages.
- The existing `/srv/geniuslab/data:/app/data` mount and `VISITS_FILE=/app/data/visits.ndjson` must be preserved.
- Do not import historical GA4 data, add Umami to GeniusLab, or refactor unrelated code.

## File Map

### GeniusLab repository (`/Users/mac/Projects/genius site`)

- Create `web/server/api/bot-stats.ts`: authenticated, exact-window aggregate endpoint.
- Create `web/server/api/bot-stats.test.ts`: handler, authorization, validation, and failure tests.
- Modify `web/server/api/visits.ts`: expose reusable aggregate-window function without exposing raw visits.
- Modify `web/server/api/index.ts`: register `GET /bot/stats`.
- Modify `web/package.json`: add deterministic server test command.
- Modify `web/.env.example`: document the token and persistent visit path.
- Modify `web/DEPLOY.md`: document the endpoint, secret, mount verification, and smoke checks.

### QuietUnit repository (`/Users/mac/Projects/QuietUnit`)

- Create `site/analytics-bot/src/genius-stats-client.ts`: HTTPS client and response validation.
- Create `site/analytics-bot/src/genius-stats-client.test.ts`: request and validation tests.
- Modify `site/analytics-bot/src/types.ts`: GeniusLab snapshot and configuration contracts.
- Modify `site/analytics-bot/src/config.ts` and `config.test.ts`: load the URL and token.
- Modify `site/analytics-bot/src/redact.ts` and `run-report.test.ts`: redact new configured values.
- Modify `site/analytics-bot/src/report.ts` and `report.test.ts`: format two site sections and degraded state.
- Modify `site/analytics-bot/src/run-report.ts` and `run-report.test.ts`: concurrent sources and partial-failure policy.
- Modify `site/analytics-bot/src/index.ts` and `index.test.ts`: construct and inject the new client.
- Modify `site/compose.yaml`, `site/.env.example`, and `site/README.md`: production configuration and operations.

---

### Task 1: Add the protected GeniusLab exact-window endpoint

**Files:**
- Create: `web/server/api/bot-stats.ts`
- Create: `web/server/api/bot-stats.test.ts`
- Modify: `web/server/api/visits.ts`
- Modify: `web/server/api/index.ts`
- Modify: `web/package.json`

**Interfaces:**
- Consumes: existing `StatsSummary`, `readVisits()`, and `aggregateStats(visits)` from `web/server/api/visits.ts`.
- Produces: `getStatsBetween(startAt: number, endAt: number): StatsSummary` and `createBotStatsHandler(dependencies): RequestHandler`.

- [ ] **Step 1: Add the failing server tests and test command**

Add to `web/package.json`:

```json
"test:server": "tsx --test server/api/*.test.ts"
```

Create `web/server/api/bot-stats.test.ts` with Node's test runner. Use an injected loader so tests never read or modify the production NDJSON file:

```ts
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
    const handler = createBotStatsHandler({
      token: "test-secret",
      loadStats: () => ({ totalVisits: 0, uniqueVisitors: 0, byDevice: { mobile: 0, tablet: 0, desktop: 0 }, byReferrer: {}, byPath: {} }),
      logError: mock.fn(),
    });
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
    assert.equal(JSON.stringify(logError.mock.calls).includes("test-secret"), false);
  });
});
```

- [ ] **Step 2: Run the new test and verify the expected failure**

Run:

```bash
npm --prefix web run test:server
```

Expected: FAIL because `web/server/api/bot-stats.ts` and its exports do not exist.

- [ ] **Step 3: Add pure interval aggregation to the existing visit module**

Export `aggregateStats` and add this function to `web/server/api/visits.ts`:

```ts
export function getStatsBetween(startAt: number, endAt: number): StatsSummary {
  const filtered = readVisits().filter((visit) => {
    const timestamp = Date.parse(visit.ts);
    return Number.isFinite(timestamp) && timestamp >= startAt && timestamp < endAt;
  });
  return aggregateStats(filtered);
}
```

Keep `Visit` rows private to the server response boundary. Do not add raw-row fields to `StatsSummary`.

- [ ] **Step 4: Implement the authenticated handler**

Create `web/server/api/bot-stats.ts`:

```ts
import crypto from "node:crypto";
import type { RequestHandler } from "express";
import type { StatsSummary } from "./visits";

const MAX_WINDOW_MS = 26 * 60 * 60 * 1000;

interface BotStatsDependencies {
  token: string;
  loadStats(startAt: number, endAt: number): StatsSummary;
  logError(message: string): void;
}

function digest(value: string): Buffer {
  return crypto.createHash("sha256").update(value).digest();
}

function isAuthorized(header: string | undefined, expectedToken: string): boolean {
  if (!expectedToken || !header?.startsWith("Bearer ")) return false;
  const suppliedToken = header.slice("Bearer ".length);
  if (!suppliedToken) return false;
  return crypto.timingSafeEqual(digest(suppliedToken), digest(expectedToken));
}

function parseEpoch(value: unknown): number | null {
  if (typeof value !== "string" || !/^\d+$/.test(value)) return null;
  const parsed = Number(value);
  return Number.isSafeInteger(parsed) ? parsed : null;
}

export function createBotStatsHandler(dependencies: BotStatsDependencies): RequestHandler {
  return (req, res) => {
    res.set("Cache-Control", "no-store");
    if (!isAuthorized(req.headers.authorization, dependencies.token)) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    const startAt = parseEpoch(req.query.startAt);
    const endAt = parseEpoch(req.query.endAt);
    if (startAt === null || endAt === null || startAt >= endAt || endAt - startAt > MAX_WINDOW_MS) {
      res.status(400).json({ error: "Invalid report window" });
      return;
    }
    try {
      res.json(dependencies.loadStats(startAt, endAt));
    } catch {
      dependencies.logError("[BotStats] visit storage read failed");
      res.status(500).json({ error: "Failed to read stats" });
    }
  };
}
```

- [ ] **Step 5: Register the endpoint**

In `web/server/api/index.ts`, import `createBotStatsHandler` and `getStatsBetween`, then create and register the handler:

```ts
const botStatsHandler = createBotStatsHandler({
  token: process.env.GENIUS_STATS_BOT_TOKEN ?? "",
  loadStats: getStatsBetween,
  logError: (message) => console.error(message),
});

router.get("/bot/stats", botStatsHandler);
```

Register it with the public route declarations, but rely exclusively on its dedicated bearer-token check. Do not attach `requireAuth`.

- [ ] **Step 6: Run focused and full GeniusLab verification**

Run:

```bash
npm --prefix web run test:server
npm --prefix web run build
npm --prefix web run check:analytics-contract
```

Expected: all server tests pass, Vite build succeeds, and the analytics contract check passes.

- [ ] **Step 7: Commit the GeniusLab API change**

```bash
git add web/package.json web/server/api/bot-stats.ts web/server/api/bot-stats.test.ts web/server/api/visits.ts web/server/api/index.ts
git commit -m "feat: expose protected GeniusLab daily statistics"
```

---

### Task 2: Document and deploy the GeniusLab endpoint safely

**Files:**
- Modify: `web/.env.example`
- Modify: `web/DEPLOY.md`

**Interfaces:**
- Consumes: `GENIUS_STATS_BOT_TOKEN` from the GeniusLab container environment.
- Produces: live `GET https://geniuslab.info/api/bot/stats` with aggregate-only JSON.

- [ ] **Step 1: Document production variables and persistence**

Add to `web/.env.example`:

```dotenv
VISITS_FILE=/app/data/visits.ndjson
GENIUS_STATS_BOT_TOKEN=replace-with-a-dedicated-random-secret
```

Update `web/DEPLOY.md` so the required environment list includes both names and explicitly preserves:

```yaml
volumes:
  - ./data:/app/data
```

Document `401` as the expected unauthenticated response and `200` as the expected authenticated response for a valid interval.

- [ ] **Step 2: Verify docs and commit them**

Run:

```bash
git diff --check
git grep -n "GENIUS_STATS_BOT_TOKEN\|VISITS_FILE=/app/data/visits.ndjson" -- web/.env.example web/DEPLOY.md
```

Expected: no whitespace errors and both production settings documented without a real secret.

Commit:

```bash
git add web/.env.example web/DEPLOY.md
git commit -m "docs: add GeniusLab bot statistics operations"
```

- [ ] **Step 3: Release the reviewed GeniusLab commits**

After explicit release approval, push the reviewed branch through the normal repository workflow. On the server, use the documented deployment path:

```bash
ssh rilya-server
cd /srv/geniuslab/src
git pull --ff-only
cd /srv/geniuslab
sudo docker compose up -d --build
sudo docker compose ps web
```

Expected: `geniuslab-web-1` is running and still mounts `/srv/geniuslab/data` at `/app/data`.

- [ ] **Step 4: Install the shared secret without exposing it**

Generate one 32-byte-or-longer random value in a password manager. Using an interactive editor on the server, add the same value as `GENIUS_STATS_BOT_TOKEN` to `/srv/geniuslab/.env` and later to `/srv/quietunit/.env`. Do not paste the value into a command argument, shell history, issue, commit, or task output. Recreate the GeniusLab container after saving the environment.

- [ ] **Step 5: Smoke-test the live endpoint**

First confirm unauthenticated rejection:

```bash
curl -sS -o /dev/null -w '%{http_code}\n' 'https://geniuslab.info/api/bot/stats?startAt=1787954400000&endAt=1788040800000'
```

Expected: `401`.

Then run an authenticated request from an interactive server shell after loading `/srv/geniuslab/.env`; write the JSON to a temporary file, inspect only aggregate keys with `jq '{totalVisits,uniqueVisitors,byDevice,byReferrer,byPath}'`, and delete the temporary file. Expected: `200` and no raw visits or visitor hashes.

---

### Task 3: Add the typed GeniusLab client to the QuietUnit bot

**Files:**
- Create: `site/analytics-bot/src/genius-stats-client.ts`
- Create: `site/analytics-bot/src/genius-stats-client.test.ts`
- Modify: `site/analytics-bot/src/types.ts`
- Modify: `site/analytics-bot/src/config.ts`
- Modify: `site/analytics-bot/src/config.test.ts`
- Modify: `site/analytics-bot/src/redact.ts`

**Interfaces:**
- Consumes: `ReportWindow.startAt`, `ReportWindow.endAt`, `GENIUS_STATS_URL`, and `GENIUS_STATS_BOT_TOKEN`.
- Produces: `GeniusStatsClient.getSnapshot(window: ReportWindow): Promise<GeniusStatsSnapshot>`.

- [ ] **Step 1: Write failing client and configuration tests**

Add `GENIUS_STATS_URL=https://geniuslab.info/api/bot/stats` and `GENIUS_STATS_BOT_TOKEN=genius-test-secret` to the `env()` fixture in `config.test.ts`. Assert both values load, an HTTP URL is rejected, and a missing token reports its exact variable name.

Create `genius-stats-client.test.ts` with a fetch double and assert:

```ts
expect(url.searchParams.get('startAt')).toBe(String(window.startAt));
expect(url.searchParams.get('endAt')).toBe(String(window.endAt));
expect(init?.headers).toEqual({ Authorization: 'Bearer genius-test-secret' });
```

Use a successful fixture containing all five aggregate fields. Add separate tests for an HTTP `500`, invalid JSON, negative totals, fractional counts, invalid device fields, and invalid record values. Assert thrown messages contain neither the token nor the response body.

- [ ] **Step 2: Run the focused tests and verify failure**

Run:

```bash
cd /Users/mac/Projects/QuietUnit/site/analytics-bot
npm test -- src/config.test.ts src/genius-stats-client.test.ts
```

Expected: FAIL because the new configuration fields, snapshot type, and client do not exist.

- [ ] **Step 3: Add the contracts and validated configuration**

Add to `types.ts`:

```ts
export interface GeniusStatsSnapshot {
  totalVisits: number;
  uniqueVisitors: number;
  byDevice: { mobile: number; tablet: number; desktop: number };
  byReferrer: Record<string, number>;
  byPath: Record<string, number>;
}
```

Add `geniusStatsUrl: string` and `geniusStatsBotToken: string` to `BotConfig`. In `config.ts`, validate the URL through this helper:

```ts
function requiredHttpsUrl(env: NodeJS.ProcessEnv, key: string): string {
  const value = required(env, key);
  const url = new URL(value);
  if (url.protocol !== 'https:' || url.username || url.password) {
    throw new Error(`${key} must be an HTTPS URL without credentials`);
  }
  return url.toString();
}
```

Load:

```ts
geniusStatsUrl: requiredHttpsUrl(env, 'GENIUS_STATS_URL'),
geniusStatsBotToken: required(env, 'GENIUS_STATS_BOT_TOKEN'),
```

Add both configured values to `redactConfiguredValues`.

- [ ] **Step 4: Implement the client with strict payload validation**

Create a `GeniusStatsClient` that accepts `BotConfig` and an injectable `fetch`. Build a fresh `URL`, set `startAt` and `endAt`, use `AbortSignal.timeout(10_000)`, and send only the authorization header. Validate every total as a non-negative safe integer and every `byReferrer`/`byPath` value with the same rule before returning `GeniusStatsSnapshot`.

Errors must use stable messages only:

```ts
throw new Error(`GeniusLab statistics request failed with HTTP ${response.status}`);
throw new Error('GeniusLab statistics response is invalid');
```

Never append a response body, request URL, header, or token to an error.

- [ ] **Step 5: Run client tests, typecheck, and build**

Run:

```bash
cd /Users/mac/Projects/QuietUnit/site/analytics-bot
npm test -- src/config.test.ts src/genius-stats-client.test.ts
npm run typecheck
npm run build
```

Expected: focused tests pass, TypeScript reports no errors, and `dist/index.js` builds.

- [ ] **Step 6: Commit the client**

```bash
cd /Users/mac/Projects/QuietUnit
git add site/analytics-bot/src/types.ts site/analytics-bot/src/config.ts site/analytics-bot/src/config.test.ts site/analytics-bot/src/redact.ts site/analytics-bot/src/genius-stats-client.ts site/analytics-bot/src/genius-stats-client.test.ts
git commit -m "feat: add GeniusLab statistics client"
```

---

### Task 4: Combine both sources without blocking the QuietUnit report

**Files:**
- Modify: `site/analytics-bot/src/report.ts`
- Modify: `site/analytics-bot/src/report.test.ts`
- Modify: `site/analytics-bot/src/run-report.ts`
- Modify: `site/analytics-bot/src/run-report.test.ts`
- Modify: `site/analytics-bot/src/index.ts`
- Modify: `site/analytics-bot/src/index.test.ts`

**Interfaces:**
- Consumes: `UmamiClient.getSnapshot(window)` and `GeniusStatsClient.getSnapshot(window)`.
- Produces: one formatted report and the unchanged result union `'sent' | 'skipped' | 'dry-run'`.

- [ ] **Step 1: Write failing formatting tests**

Change `formatReport` tests to pass a `GeniusStatsSnapshot` and assert an exact two-section message containing:

```text
📊 Ежедневная статистика — 23 августа 2026

quietunit.com
👤 Уникальные посетители: 18
↩️ Визиты: 25

Приложения:
• CaloriGram — App Store: 5
• Ajar — Download: 0

geniuslab.info
👤 Уникальные посетители: 31
↩️ Визиты: 42
📱 Устройства: mobile 18 · tablet 2 · desktop 22

Популярные страницы:
• / — 28
• /servizi/iphone — 14

Источники:
• (direct) — 25
• https://www.google.com — 17
```

Add a `null` GeniusLab case that ends with:

```text
geniuslab.info
⚠️ Статистика временно недоступна
```

Limit paths and referrers to five rows and render `• Нет данных` for an empty successful record.

- [ ] **Step 2: Write failing orchestration tests**

Extend every `runReport` dependency fixture with `genius: { getSnapshot }` and `logError`. Add tests proving:

- both source promises start before either settles;
- both successes appear in the sent message;
- GeniusLab rejection still sends once and calls `state.markDelivered(window.date)`;
- the degraded message contains the public warning but not the error details;
- `logError` receives only a sanitized message;
- Umami rejection still follows the current warning path and does not mark delivery;
- a dry run with GeniusLab failure prints the degraded report and mutates no state.

Include `config.geniusStatsUrl` and `config.geniusStatsBotToken` in `configuredIdentifiers` so the existing leakage assertions cover both.

- [ ] **Step 3: Run the report tests and verify failure**

Run:

```bash
cd /Users/mac/Projects/QuietUnit/site/analytics-bot
npm test -- src/report.test.ts src/run-report.test.ts src/index.test.ts
```

Expected: FAIL because the formatter and dependency interfaces still support one source.

- [ ] **Step 4: Update report formatting**

Change the signature to:

```ts
export function formatReport(
  window: ReportWindow,
  quietUnit: AnalyticsSnapshot,
  geniusLab: GeniusStatsSnapshot | null,
  targets: AnalyticsTarget[],
  zone: string,
): string
```

Sort `byPath` and `byReferrer` by descending count, slice to five, and use the exact copy from Step 1. Treat `null` as unavailable; do not treat an all-zero snapshot as a failure.

- [ ] **Step 5: Fetch both sources concurrently and preserve required-source behavior**

Add `genius` and `logError` to `ReportDependencies`. After the duplicate-delivery check, run:

```ts
const [umamiResult, geniusResult] = await Promise.allSettled([
  retry(() => umami.getSnapshot(window)),
  retry(() => genius.getSnapshot(window)),
]);
```

Move the existing Umami failure-warning branch to operate on a rejected `umamiResult`. For a rejected `geniusResult`, sanitize it, call `logError` with a stable `GeniusLab statistics unavailable: ...` prefix, pass `null` to `formatReport`, and continue through the existing Telegram-send and delivery-state path.

- [ ] **Step 6: Wire the client at the CLI boundary**

In `index.ts`, construct:

```ts
const genius = new GeniusStatsClient(config);
```

Pass `genius` and `logError` into both one-shot and scheduled `runReport` calls. Update `index.test.ts` fixtures with the two new required environment variables and assert the scheduled dependency object contains a GeniusLab client with `getSnapshot`.

- [ ] **Step 7: Run the complete bot suite**

Run:

```bash
cd /Users/mac/Projects/QuietUnit/site/analytics-bot
npm test
npm run typecheck
npm run build
```

Expected: all Vitest tests pass, TypeScript reports no errors, and the production bundle builds.

- [ ] **Step 8: Commit report integration**

```bash
cd /Users/mac/Projects/QuietUnit
git add site/analytics-bot/src/report.ts site/analytics-bot/src/report.test.ts site/analytics-bot/src/run-report.ts site/analytics-bot/src/run-report.test.ts site/analytics-bot/src/index.ts site/analytics-bot/src/index.test.ts
git commit -m "feat: include GeniusLab in daily Telegram report"
```

---

### Task 5: Configure, deploy, and verify the QuietUnit bot

**Files:**
- Modify: `site/compose.yaml`
- Modify: `site/.env.example`
- Modify: `site/README.md`

**Interfaces:**
- Consumes: the live GeniusLab endpoint and the shared secret installed in Task 2.
- Produces: a healthy `quietunit-analytics-bot-1` container and verified two-section dry run.

- [ ] **Step 1: Add production configuration**

Add to `site/.env.example`:

```dotenv
GENIUS_STATS_URL=https://geniuslab.info/api/bot/stats
GENIUS_STATS_BOT_TOKEN=replace-on-server
```

Pass both variables through `site/compose.yaml`:

```yaml
GENIUS_STATS_URL: ${GENIUS_STATS_URL}
GENIUS_STATS_BOT_TOKEN: ${GENIUS_STATS_BOT_TOKEN}
```

Update `site/README.md` with the new endpoint, the partial-report policy, dry-run verification, and the rule that both services receive the same dedicated token.

- [ ] **Step 2: Verify configuration rendering without real secrets**

Run:

```bash
cd /Users/mac/Projects/QuietUnit/site
docker compose --env-file .env.example config
npm run bot:test
npm run bot:typecheck
npm run bot:build
```

Expected: Compose renders both new environment keys, all tests pass, typecheck passes, and the bundle builds.

- [ ] **Step 3: Commit deployment configuration**

```bash
cd /Users/mac/Projects/QuietUnit
git add site/compose.yaml site/.env.example site/README.md
git commit -m "docs: configure GeniusLab daily statistics"
```

- [ ] **Step 4: Review both repository diffs before release**

Run in both repositories:

```bash
git status --short
git log --oneline -8
git diff --check origin/main...HEAD
```

Expected: only planned files are changed, no `.env` or built `dist` file is tracked, and both commit sequences are reviewable.

- [ ] **Step 5: Release the reviewed QuietUnit commits**

After explicit release approval, sync only the runtime files documented by QuietUnit:

```bash
cd /Users/mac/Projects/QuietUnit/site
rsync -avz --relative analytics-bot/dist/index.js analytics-bot/Dockerfile compose.yaml .env.example rilya-server:/srv/quietunit/
```

Use an interactive editor to add `GENIUS_STATS_URL=https://geniuslab.info/api/bot/stats` and the previously stored `GENIUS_STATS_BOT_TOKEN` to `/srv/quietunit/.env` without printing the token.

- [ ] **Step 6: Run success and degraded dry runs before replacing the container**

On the server:

```bash
cd /srv/quietunit
sudo docker compose build analytics-bot
sudo docker compose run --rm analytics-bot node /app/index.js --dry-run
sudo docker compose run --rm -e GENIUS_STATS_URL=https://127.0.0.1:1/api/bot/stats analytics-bot node /app/index.js --dry-run
```

Expected: the first output has both site sections; the second has the full QuietUnit section and `⚠️ Статистика временно недоступна`. Neither output contains configured URLs, credentials, or internal errors.

- [ ] **Step 7: Start and verify the production bot**

```bash
cd /srv/quietunit
sudo docker compose up -d analytics-bot
sudo docker compose ps analytics-bot
sudo docker compose logs --tail=100 analytics-bot
```

Expected: `quietunit-analytics-bot-1` becomes `healthy`, no secret appears in logs, and no unscheduled Telegram message is sent.

- [ ] **Step 8: Verify the first scheduled report**

After the next 09:00 `Europe/Rome` delivery, compare the GeniusLab section with an authenticated API query using the same `startAt` and `endAt`. Confirm both sites use the same report date, the message arrived once, and the bot remains healthy.

If GeniusLab is unavailable at delivery time, accept the warning section as correct, confirm the QuietUnit data arrived, and do not manually resend the report unless the user explicitly requests it.

---

## Final Verification Checklist

- [ ] `npm --prefix web run test:server` passes.
- [ ] `npm --prefix web run build` passes.
- [ ] The live GeniusLab endpoint returns `401` without the dedicated token.
- [ ] The live GeniusLab endpoint returns only aggregates for an authorized exact window.
- [ ] `/srv/geniuslab/data/visits.ndjson` remains present after the GeniusLab container rebuild.
- [ ] QuietUnit `npm test`, `npm run typecheck`, and `npm run build` pass.
- [ ] Successful dry run contains both `quietunit.com` and `geniuslab.info`.
- [ ] Degraded dry run contains QuietUnit data and the public GeniusLab warning.
- [ ] No secret is tracked or printed.
- [ ] Both production containers are running; the bot is healthy.
- [ ] The next scheduled Telegram report is delivered exactly once.
