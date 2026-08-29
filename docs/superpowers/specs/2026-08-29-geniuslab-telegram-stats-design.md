# GeniusLab Statistics in QuietUnit Telegram Report — Design

## Goal

Add `geniuslab.info` visitor statistics to the existing daily Telegram report sent by the `quietunit_stat` bot. The report must continue to arrive with the `quietunit.com` section when GeniusLab statistics are temporarily unavailable.

## Current State

- The QuietUnit analytics bot runs as the healthy `analytics-bot` Docker Compose service under `/srv/quietunit`.
- The bot queries one Umami website for the previous calendar day in `Europe/Rome` and sends one Telegram message.
- GeniusLab records anonymous visits in an NDJSON file and exposes aggregated data through `GET /api/admin/stats?days=N`.
- The existing GeniusLab endpoint requires an administrator JWT and only accepts a rolling number of days. It cannot safely provide the exact previous Rome calendar day to an unattended service.
- GeniusLab is deployed independently from the QuietUnit bot. Its visit file therefore needs persistent storage across application deployments and restarts.

## Chosen Approach

Create a dedicated read-only GeniusLab endpoint protected by a separate shared token. The QuietUnit bot will query this endpoint for the exact reporting window it already calculates for Umami, then combine both results into one Telegram message.

The bot will not use the GeniusLab administrator password or administrator JWT. Direct filesystem or SSH access between services is also excluded.

## Components and Responsibilities

### GeniusLab statistics API

Add a route:

```text
GET /api/bot/stats?startAt=<epoch-ms>&endAt=<epoch-ms>
Authorization: Bearer <GENIUS_STATS_BOT_TOKEN>
```

Responsibilities:

- require a configured `GENIUS_STATS_BOT_TOKEN`;
- compare the supplied bearer token without leaking token details;
- validate `startAt` and `endAt` as finite integer epoch-millisecond values;
- require `startAt < endAt` and reject windows longer than 26 hours;
- filter visits with an inclusive start and exclusive end: `startAt <= visit.ts < endAt`;
- reuse the existing aggregation rules for visits, unique visitors, devices, referrers, and paths;
- return JSON only and never expose visitor hashes, IP-related data, raw visit rows, or server paths.

Successful response:

```json
{
  "totalVisits": 42,
  "uniqueVisitors": 31,
  "byDevice": {
    "mobile": 18,
    "tablet": 2,
    "desktop": 22
  },
  "byReferrer": {
    "(direct)": 25,
    "https://www.google.com": 17
  },
  "byPath": {
    "/": 28,
    "/servizi/iphone": 14
  }
}
```

Response rules:

- `401` for a missing or incorrect bearer token;
- `400` for an invalid or excessive time window;
- `500` with a generic error message when stored visits cannot be read;
- no caching of authenticated responses.

### GeniusLab visit persistence

The production service must store visits on a persistent Railway Volume or equivalent persistent mount. Set:

```text
VISITS_FILE=/data/visits.ndjson
```

The `/data` directory must be backed by the persistent volume before the bot integration is enabled. Existing statistics are preserved when a recoverable source file is available; no destructive migration is performed.

### QuietUnit GeniusLab client

Add a focused HTTP client to the QuietUnit analytics bot. It consumes the existing `ReportWindow.startMs` and `ReportWindow.endMs` values and returns the validated GeniusLab aggregate response.

Configuration:

```text
GENIUS_STATS_URL=https://geniuslab.info/api/bot/stats
GENIUS_STATS_BOT_TOKEN=<shared-secret>
```

The client must:

- send the bearer token only to the configured HTTPS endpoint;
- apply a bounded request timeout;
- reject non-2xx responses and malformed JSON;
- validate all numeric counts as non-negative finite integers;
- never include the token, authorization header, or response body in logs or Telegram warnings.

### Report orchestration and formatting

The daily run starts the Umami and GeniusLab requests independently for the same previous-day window.

- A successful run formats two clearly labelled sections: `quietunit.com` and `geniuslab.info`.
- The GeniusLab section includes visits, unique visitors, device totals, and a compact list of top paths and referrers.
- If GeniusLab fails but Umami succeeds, the bot sends the QuietUnit section plus a short GeniusLab-unavailable warning.
- If Umami fails, existing QuietUnit failure handling remains authoritative and no normal daily report is marked delivered.
- A message successfully sent with a GeniusLab warning is marked delivered. The bot does not resend the whole report later that day, preventing duplicate QuietUnit reports.
- A GeniusLab failure never exposes technical error details in Telegram; sanitized details may be written to container logs.

## Data Flow

1. The scheduler determines the previous calendar day in `Europe/Rome`.
2. The bot obtains `startMs` and `endMs` from the existing report window.
3. The bot queries QuietUnit Umami and the authenticated GeniusLab endpoint.
4. Each successful response is validated before formatting.
5. The bot sends one Telegram message containing both sections or the QuietUnit section with a GeniusLab warning.
6. Existing delivery state records the date only after Telegram confirms the message was sent.

## Security

- Use a new high-entropy token that is unrelated to the GeniusLab administrator password, JWT secret, Telegram token, and Umami credentials.
- Store the token only in GeniusLab production variables and `/srv/quietunit/.env`; never commit it.
- Keep the endpoint read-only and limited to aggregate statistics.
- Return the same unauthorized response for missing and incorrect tokens.
- Redact the new URL and token through the bot's existing error-sanitization boundary.
- Do not place credentials in query parameters.

## Testing

### GeniusLab

- missing, malformed, and incorrect authorization return `401`;
- valid authorization reaches the handler;
- invalid timestamps, reversed ranges, and windows over 26 hours return `400`;
- start is inclusive and end is exclusive;
- a 23-hour or 25-hour daylight-saving reporting window is accepted;
- aggregation matches the existing admin statistics semantics;
- responses never contain visitor hashes or raw rows;
- storage failures return a generic `500` response.

### QuietUnit bot

- the client sends the exact existing report-window boundaries and bearer header;
- timeouts, non-2xx responses, and malformed payloads are rejected and sanitized;
- two successful sources produce both report sections;
- GeniusLab failure still sends and marks a QuietUnit report delivered;
- Umami failure preserves the existing failure-notification and delivery-state behavior;
- dry-run output contains no secrets;
- all existing bot tests continue to pass.

## Deployment Sequence

1. Provision and verify persistent GeniusLab visit storage.
2. Deploy the protected GeniusLab endpoint with a newly generated shared token.
3. Verify unauthorized access is rejected and an authorized one-day query returns aggregates.
4. Add the matching URL and token to `/srv/quietunit/.env` without printing either value to logs.
5. Deploy the updated bot container.
6. Run a dry report and verify both sections and the exact report date.
7. Test the degraded path with the GeniusLab URL temporarily overridden in an isolated dry run.
8. Restart the bot container, confirm it is healthy, and confirm delivery state is preserved.

## Non-Goals

- Replacing GeniusLab's existing admin statistics page.
- Importing historical GA4 data.
- Adding Umami to GeniusLab.
- Sending a second recovery message later in the same day.
- Sharing the administrator password or JWT with the bot.
- Refactoring unrelated analytics or administration code.

## Acceptance Criteria

- The next scheduled report contains separate QuietUnit and GeniusLab sections for the same previous Rome calendar day.
- GeniusLab totals match its authenticated API for the exact supplied interval.
- A GeniusLab outage does not prevent the QuietUnit report from arriving.
- No secrets appear in source control, logs, dry-run output, or Telegram messages.
- GeniusLab visit data survives a normal deployment and restart.
- Both applications' automated tests pass, and the production bot remains healthy after deployment.
