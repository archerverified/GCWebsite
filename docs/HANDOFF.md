# Garage Cowboy: current state and next steps

Last updated: 2026-08-21
Keep this file current. It is what `/handoff` reads.

---

## Working and verified

- **All serverless functions.** Were returning 500 on every route for months. Fixed by
  `api/tsconfig.json` (PR #11). `GET /api/booking/create` returns 405, which is correct.
- **The full booking chain, proven end to end 2026-08-21.** Form to
  `/api/booking/create` to Google Calendar event to Resend emails. Both the customer
  confirmation and the admin notice to deno@garagecowboy.com were confirmed `delivered`
  in the Resend log, not just assumed.
- **Booking form** live on `/` and `/contact`, with a required SMS consent checkbox and a
  full A2P consent record (exact wording shown, timestamp, IP).
- **`/free-quote`** ads landing page: no nav, source-tagged bookings, noindex, out of the
  sitemap, still prerendered.
- **Resend** verified for garagecowboy.com and sending.

---

## Next steps, highest value first

### 1. Turn on GoHighLevel forwarding (the only functional gap)

No web lead reaches the CRM. Bookings go to the calendar and email only.

The code is merged, deployed, and inert by design. Nothing to write.

- Get the URL: GoHighLevel, Automation, Workflows, Create Workflow, trigger
  **Inbound Webhook**, copy the URL.
- Add it as `GHL_WEBHOOK_URL` on the **gc-website-yiwc** Vercel project, all three
  environments, then redeploy.
- Optional: `GHL_WEBHOOK_SECRET` is sent as an `x-webhook-secret` header so the workflow
  can reject anything not from the site.
- Verify by submitting a booking and confirming the contact appears in GHL.

### 2. Wire the Google Ads conversion (code done 2026-09-30; GTM console steps pending)

The new "Sign-up" conversion action lives on a SECOND Ads account, **AW-18399788005**
(label `zepPCJa2_YMdEOX32cVE`, 1.0 USD). The account GTM already loads, `AW-17367077872`,
stays; the new one is added alongside. The form pushes `booking_submitted` to the
dataLayer with a `booking_source` value, which is the trigger.

- In GTM (`GTM-W7MW64K9`): add a Google tag for `AW-18399788005` on all pages, a Custom
  Event trigger on `booking_submitted`, and a Google Ads Conversion Tracking tag
  (ID `AW-18399788005`, label `zepPCJa2_YMdEOX32cVE`) on that trigger. Publish.
- Escape hatch renamed: set `VITE_ADS_SEND_TO` to a full `AW-XXXXXXXXXX/LABEL` value and
  the code fires the conversion directly. The old `VITE_ADS_CONVERSION_LABEL` (which
  hardcoded `AW-17367077872`) is gone from the code. It was never referenced in
  `.env.example`; confirm it is not set on the Vercel project (could not be checked from
  this session: the Vercel token lacks the `denos-projects-81415503` scope) and delete
  it there if present, since nothing reads it anymore.
- Set the Google Ads final URL to `https://garagecowboy.com/free-quote`.
- Consent Mode v2 is EEA/UK-only, not needed for this US-only site. Enhanced
  conversions for leads deliberately skipped (privacy policy says form data is used
  solely for the appointment).

### 3. Decide: marketing texts, or service only

The current consent covers transactional messages about the appointment, which is what
makes a required checkbox lawful. Marketing consent may not be required as a condition of
service. If promotions are wanted, a second, separate, optional checkbox is needed.

### 4. Smaller open questions

- The LeadConnector chat widget renders on `/free-quote` (it loads site-wide). It overlaps
  the form on mobile. Keep or hide on that page?
- `/free-quote` is `noindex` so it does not compete with `/contact`. Confirm that is wanted.
- Ad headline, for message match between the ad and the landing page headline.

### 5. Housekeeping

- `src/pages/Quote.tsx` is orphaned after `/quote` was removed. Kept per the repo rule
  against deleting files. Delete if wanted.
- Stale remote branches: `feat/reinstate-booking-form`, `feat/quote-form-page`,
  `chore/remove-quote-route`, `temp/remove-contact-forms-widget-auth`.
- `gc-form-preview` project in the archer@1stimpression.co Vercel account is redundant.
- `gddy` CLI is installed but login was never completed.
- Vercel CLI is 54.9.1; current is 59.x.

---

## Gotchas that will cost time if forgotten

- **A merge does NOT reliably trigger a production deploy on this repo.** It failed for
  PR #13 and once before on 2026-08-05. After merging, confirm a `target=production`
  deployment exists for the merge SHA, and if not run
  `vercel deploy --prod --archive=tgz --project gc-website-yiwc`.
- **A calendar invite arriving does not prove a booking worked.** Google sends that
  directly. Email is separate and fails silently: the API still returns 200 and the
  customer still sees "Appointment Scheduled!". Always check the Resend send log and the
  function runtime log.
- **`vercel login` binds to whatever account the BROWSER is signed into**, ignoring the
  username argument. Use Chrome Profile 8 (deno@garagecowboy.com). Verify with
  `vercel api /v2/user`, never the CLI's success banner.
- **Preview URLs cannot be curled**: SSO protection with no bypass secret. Open in Chrome
  Profile 8 and read results from `vercel logs <url>`.
- **`git rev-parse origin/main` reads a cached ref.** Always `git fetch` first.
- **Never `git add -A`** here; the working tree has large untracked scratch directories.
- **`/quote` is not the configurator.** `quote.garagecowboy.com` is a separate app served
  by the `gc-quote` project from the repo's `quote/` directory.
