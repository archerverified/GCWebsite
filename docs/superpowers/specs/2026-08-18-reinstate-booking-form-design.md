# Reinstate the booking form after GoHighLevel approval

Date: 2026-08-18
Branch: `feat/reinstate-booking-form` (off `main` @ `c5332644`)
Status: implemented, uncommitted, awaiting owner testing

## Background

PR #8 (merge `572b5f0c`, 2026-06-25) temporarily removed the booking form from Home and
Contact so the LeadConnector/HighLevel chat widget could pass auth. Commit `c310a09c`
then re-added the homepage testimonials as a standalone component, because the carousel
had lived inside the booking section. GoHighLevel has now approved, so the form comes
back.

The owner wants to keep the additions made during the removal window, so this is a
forward-fix, not a revert. Both original commits stay in history untouched.

## Goals

1. Booking form renders again on Home and Contact.
2. The standalone `HomeTestimonials` card stays, and testimonials do not render twice.
3. The form collects and records SMS consent, satisfying the A2P carrier requirement for
   an opt-in form that names the legal entity and its DBA.
4. Lead forwarding to GoHighLevel is wired but inert, so it turns on with a Vercel
   environment variable and no code change.

## Non-goals

- Reverting `3e2bb7e5` or `c310a09c`.
- Replacing the custom form with a GHL hosted embed.
- Changing what the booking API does today (Google Calendar event, Resend emails).
- Deleting `FormFiller.tsx`, which becomes unreferenced but stays per the never-delete rule.

## Design

### 1. Page-level re-render

**Home.tsx** gains an import of `AppointmentBookingSection` and one block between
`<HeroSection />` and the existing testimonials:

```tsx
{/* Booking Form */}
<div className="-mt-6 sm:-mt-8 lg:-mt-12 relative z-10 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 2xl:px-28">
  <AppointmentBookingSection includeTestimonials={false} />
</div>
```

Two deliberate differences from what `3e2bb7e5` removed:

- Imports `AppointmentBookingSection` directly rather than `FormFiller`, because
  `FormFiller` hardcodes `includeTestimonials` to true and would render the carousel a
  second time now that `HomeTestimonials` exists.
- `includeTestimonials={false}` also selects the component's fully-rounded card styling
  instead of the flat-bottomed variant designed to butt against the carousel below it.
  Contact already uses that styling, so it is proven.

The negative margin is byte-identical to the original. The hero it overlaps
(`rounded-b-[8px]`, `border-2 border-gc-ink`) is unchanged since June, so the overlap
lands as it did before.

**Contact.tsx** gets its section back verbatim, after Business Hours, before `</main>`.
`<main>` keeps `pb-10 lg:pb-14` from `7e9e74c2`; with the form back that is roughly 40px
of extra bottom space on mobile, which is harmless.

### 2. SMS consent

A required, never-pre-checked consent checkbox is added to `AppointmentBookingSection`.
Consent state lives in its own `useState<boolean>` rather than in `formData`, which is
all strings.

Consent text, defined once as the exported constant `SMS_CONSENT_TEXT` so the same
string is displayed, transmitted, and recorded:

> By checking this box, I agree to receive text messages from AAA Organization LLC DBA
> Garage Cowboy about my appointment at the phone number provided. Message frequency
> varies. Message and data rates may apply. Reply STOP to opt out or HELP for help.

The legal name interpolates from `BUSINESS_INFO.legalName` in `src/seo/site.ts`, so it
cannot drift from the rest of the site. Links to `/terms` and `/privacy` render beside
the text as react-router `Link`s.

The consent is scoped to **transactional** messages about the appointment. That is what
makes a required checkbox defensible: TCPA does not permit conditioning service on
consent to *marketing* messages. Marketing consent, if wanted later, needs a separate
optional checkbox.

**Layout change this forces.** The submit button was the fifth cell of a
`grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5` grid. Consent language must sit
immediately before the submit control at every breakpoint; a full-width block below the
grid would land *after* the button on mobile. So the grid now holds the four field groups
(`grid-cols-1 sm:grid-cols-2 xl:grid-cols-4`) and a new full-width footer row holds
consent on the left and submit on the right. Field markup and styling are untouched.

### 3. Data flow

```
form submit
  -> validate (client)   name, email, phone, date, time, smsConsent
  -> POST /api/booking/create
       { name, phone, email, date, time, zipCode, message,
         smsConsent, consentText, consentTimestamp }
  -> validate (server)   same fields, smsConsent must be exactly true
  -> Google OAuth token refresh
  -> Google Calendar event      (hard dependency: 500 on failure)
  -> Resend admin + customer emails   (soft: booking survives failure)
  -> forwardToGoHighLevel()     (soft: booking survives failure, no-op when unconfigured)
  -> 200 { success, eventId, htmlLink, emailStatus, crmStatus }
```

The consent record written into the calendar event description and forwarded to GHL is
the exact displayed text, the ISO timestamp, and the submitting IP from
`x-forwarded-for`. That triple is what an A2P audit asks for.

### 4. The GoHighLevel seam

New module `api/_lib/ghl.ts` exporting `forwardToGoHighLevel(lead)`.

- Reads `GHL_WEBHOOK_URL`. Unset or empty means return `{ forwarded: false, reason:
  'not_configured' }` immediately, doing nothing. This is the shipping state, so behavior
  today is byte-identical to before.
- When set, POSTs flat JSON (GoHighLevel inbound webhooks expect flat keys) with a 5s
  `AbortController` timeout.
- Optional `GHL_WEBHOOK_SECRET` is sent as an `x-webhook-secret` header when present.
- Never throws. Every failure path is caught, logged, and returned as a reason string.
  A GHL outage can never fail a customer's booking.

`create.ts` awaits it after the email block and surfaces the result as `crmStatus` in the
JSON response for debugging. The client ignores that field.

`.env.example` documents both new variables.

### 5. Incidental fix

`create.ts` built the calendar event summary as `Garage Cowboy Inspection`, a U+2014
em-dash, then the customer name. That was the only em-dash anywhere in `api/`; the June
purge missed it because it only swept `src/`. Changed to a hyphen. It is customer-visible
text in calendar invites, and the standing house rule is no em-dashes.

Note that pre-existing em-dashes inside *code comments* are deliberately left alone, which
matches the June purge's stated scope ("code/CSS comments untouched"). One such comment
survives in `AppointmentBookingSection.tsx`.

## Error handling

| Failure | Behavior |
|---|---|
| Client validation fails | Inline field errors, toast, no request sent |
| Consent unchecked | Inline error under the checkbox, submit blocked |
| Server validation fails | 400 with per-field messages, rendered inline |
| Google token refresh fails | 500, generic message, raw Google error logged only |
| Calendar insert fails | 500, booking not confirmed |
| Resend fails | 200, `emailStatus: 'failed'`, success screen says email may be delayed |
| GHL webhook fails or times out | 200, `crmStatus` carries the reason, customer unaffected |
| GHL not configured | 200, `crmStatus: 'not_configured'`, zero network calls |

## Testing

Repo has no test runner, so verification is the established gate sequence:

1. `tsc --noEmit` for `src` (0 errors). `tsconfig.json` only includes `src`, so `api/` is
   type-checked separately with an explicit `tsc --noEmit` over the API files.
2. `vite build`.
3. Prerender all 53 routes. Note the local workaround: `npm run build`'s prerender step
   polls 127.0.0.1 while vite preview binds localhost, so run
   `npx vite preview --port N --host 127.0.0.1` and then
   `PRERENDER_BASE_URL=http://127.0.0.1:N node scripts/seo/prerender.mjs`.
4. Playwright render check at 390px and 1280px: form present on both pages, exactly one
   testimonials carousel on Home, consent checkbox present and unchecked, hero overlap
   correct, no console errors, no horizontal overflow.
5. Owner runs a real test booking from a Vercel preview deployment before merge, to prove
   the Google refresh token and Resend key still work after roughly two months idle.

## Verification results (2026-08-18, steps 1 to 4)

- `tsc --noEmit` over `src`: 0 errors.
- Explicit strict `tsc` over `api/booking/create.ts`, `api/_lib/ghl.ts`, `api/_lib/email.ts`:
  1 error, `create.ts` URLSearchParams built from possibly-undefined env values.
  Reproduced identically against `main`'s copy of the file, so it is pre-existing and not
  a regression. No new errors introduced.
- `vite build`: clean, 3.85s. The `AppointmentBookingSection` chunk is back at 107.89 kB
  (32.89 kB gzip).
- Prerender: 53/53 routes.
- Built HTML: Home and Contact each have exactly 1 `<form>`, 1 booking headline, and the
  consent checkbox rendering `data-state="unchecked"`. Home has exactly 1 testimonials
  carousel. The DBA string appears on both pages. 0 em-dashes and 0 `&mdash;` entities in
  any built HTML; the only U+2014 in `build/` remain in `robots.txt` and
  `.well-known/ai.txt`, both pre-existing.
- Playwright at 390px and 1280px, Home and Contact: consent checkbox present and
  unchecked, Terms and Privacy links resolve inside the label, submitting without consent
  raises the inline error and sends no request, checking it clears the error, no console
  errors, no horizontal overflow.
- Hero overlap measured at three breakpoints: 24.0px at 390, 32.0px at 700, 48.0px at
  1280. Exactly matches `-mt-6 / sm:-mt-8 / lg:-mt-12`.

Step 5 is the owner's, and nothing ships until it passes.

## Rollout

Three focused commits, so any piece can be rolled back alone:

1. Page-level re-render (Home.tsx, Contact.tsx).
2. Consent checkbox (AppointmentBookingSection.tsx, api/booking/create.ts).
3. GHL seam (api/_lib/ghl.ts, api/booking/create.ts, .env.example).

Owner tests locally first. Nothing is committed or pushed until they say so.

Deploy notes carried forward: the apex `garagecowboy.com` is served by the
**gc-website-yiwc** Vercel project, not `gc-website`, which stopped producing production
deploys after `db0e2764`. Prerendered HTML stays CDN-cached until a new deployment lands,
so verify the live site after the deploy completes, never straight after the merge.
