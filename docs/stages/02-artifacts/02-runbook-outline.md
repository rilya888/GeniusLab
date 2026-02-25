# Этап 02 — Launch/Rollback Runbook Outline

## Pre-cutover checklist

1. Redirect map validated for P1.
2. Legal sign-off pack received.
3. Canonical contacts/hours finalized.
4. Consent flows QA passed.
5. Monitoring and alerts (email + Telegram) active.

## Cutover steps (high level)

1. Confirm freeze (48h respected).
2. Deploy final build to production target.
3. Apply DNS switch for `geniuslab.it`.
4. Enable/verify 301 rules for 3 source domains.
5. Run P1 smoke checks (status/canonical/forms).

## Rollback triggers

- Critical user flows unavailable > 30 min.
- Forms failing without workaround.
- Widespread redirect/canonical failures.

## Rollback steps (high level)

1. Revert DNS and routing to previous stable target.
2. Disable faulty redirect ruleset.
3. Confirm legacy endpoints availability.
4. Publish incident note + ETA.

## Ownership

- DRI for Go/No-Go and rollback decision: Owner проекта.
- Execution support: Dev/SEO.
