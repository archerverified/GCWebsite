---
description: Brief me on where the Garage Cowboy site stands and what to do next
---

Give the user a status briefing on this project. Be concise and concrete.

Steps:

1. Read `docs/HANDOFF.md`. It is the source of truth for state and next steps.
2. Read the last ~80 lines of `activities.md` for anything that happened after the
   handoff doc was last updated.
3. **Verify the critical claims rather than repeating them.** The handoff doc can go
   stale. At minimum check:
   - `curl -s -o /dev/null -w '%{http_code}' https://garagecowboy.com/api/booking/create`
     (405 means the API is healthy; 500 means the ESM/CommonJS regression is back)
   - whether `GHL_WEBHOOK_URL` exists yet on the project:
     `vercel api "/v9/projects/gc-website-yiwc/env?teamId=team_EnDfzfunavi8QUxI1qVzhor4"`
     and grep the returned keys (names only, never print values)
   - `git fetch` then compare local `main` to `origin/main`
   If Vercel auth has expired, say so and skip those checks rather than guessing.
4. Report, in this order:
   - **One line** on overall health
   - **What changed** since the handoff doc was written, if anything
   - **The next action**, singular, with the exact steps to do it
   - **Anything else open**, as a short bullet list
   - Any check that came back different from what the doc claims, called out explicitly

Do not restate the whole history. The user was there. Lead with what to do now.

If `$ARGUMENTS` is non-empty, treat it as a focus area and bias the briefing toward it.
