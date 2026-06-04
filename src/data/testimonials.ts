/**
 * Real, attributed customer testimonials: the single source of truth shared by
 * the home appointment section (AppointmentBookingSection) and the /reviews page.
 *
 * These are genuine reviews left for Garage Cowboy. NOTHING here is invented.
 * The business carries a verified 5.0-star rating across 24 Google reviews; a
 * 5.0 average means every review is 5 stars, so each shown testimonial is a
 * 5-star review (see REVIEW_SUMMARY + the Review schema on /reviews).
 *
 * `source` records where the review was originally left so the /reviews page can
 * attribute it honestly. `quote` is a short pull-quote; `fullReview` is the
 * complete review text as the customer wrote it.
 */

export type TestimonialSource = "Google" | "Yelp" | "Facebook";

export interface Testimonial {
  quote: string;
  author: string;
  fullReview: string;
  source: TestimonialSource;
}

export const testimonials: Testimonial[] = [
  {
    quote: "Great price, professional and courteous.",
    author: "T. Bradley",
    fullReview:
      "Deno and crew did a great job. They arrived on time and finished in a timely manner. Great price, professional and courteous. Would highly recommend his company.",
    source: "Google",
  },
  {
    quote: "Fast, accurate, and extremely reasonable pricing.",
    author: "Yeon Young Kim",
    fullReview:
      "Our garage door was completely broken, and Deno responded very quickly. He handled everything promptly and professionally, and I am extremely satisfied. Excellent service at a very reasonable price.",
    source: "Google",
  },
  {
    quote: "He almost totally redid both doors.",
    author: "Linda W.",
    fullReview:
      "Oh my goodness, this guy is AMAZING. I had all kinds of problems with both doors and he almost totally redid them. Very reasonably priced. I would totally recommend him.",
    source: "Google",
  },
  {
    quote: "Arrived early, finished quickly, pricing couldn't be beat.",
    author: "Katrina M.",
    fullReview:
      "Deno was friendly and professional. He arrived early and finished quickly. His pricing couldn't be beat! Highly recommend!",
    source: "Google",
  },
  {
    quote: "Local, honest, and not a big franchise.",
    author: "Cliff C.",
    fullReview:
      "I was looking for a local garage door contractor to replace a broken spring. Came across Garage Cowboy and decided to give them a call. Don't let the lack of reviews fool you. Deno is local and not part of one of the big franchises.",
    source: "Google",
  },
  {
    quote: "Best prices in town & comes out right away for emergencies.",
    author: "Dee",
    fullReview:
      "Garage Cowboy is the best for fixing garage repairs or replacing the garage door in general. He literally comes out right away for emergencies and has the best prices in town. Very kind and knowledgeable.",
    source: "Google",
  },
  {
    quote: "Very knowledgeable, even with 25-year-old equipment.",
    author: "Anthony R. (Local Guide)",
    fullReview:
      "Deno was very knowledgeable about my garage door issue, even though my equipment was 25 years old. He offered multiple options and pricing. Definitely A1 in the garage business.",
    source: "Google",
  },
  {
    quote: "Helped when a DIY project became too much.",
    author: "Eric S.",
    fullReview:
      "I thought I could handle a large roll-up door myself and quickly realized it was too much. Deno was extremely helpful and got everything installed quickly and affordably.",
    source: "Google",
  },
];

/**
 * Owner-verified Google Business Profile summary. ratingValue/reviewCount stay
 * in lockstep with the LocalBusiness #localbusiness node in seo/schemas.ts
 * (5.0 / 24). Do not edit one without the other.
 */
export const REVIEW_SUMMARY = {
  ratingValue: 5.0,
  reviewCount: 24,
  bestRating: 5,
  worstRating: 1,
} as const;

/**
 * Public links to the real Google Business Profile (reviews + map). Same URLs
 * already used in the site nav/footer; first-party, nothing invented.
 */
export const GOOGLE_REVIEWS_URL =
  "https://www.google.com/search?q=garage+cowboy+fort+worth&sca_esv=cea07bd29ebaa7bd&ei=giRYafyPA4eWvr0P4rHXmAk&ved=0ahUKEwj82MWY0-2RAxUHi68BHeLYFZMQ4dUDCBE&uact=5&oq=garage+cowboy+fort+worth&gs_lp=Egxnd3Mtd2l6LXNlcnAiGGdhcmFnZSBjb3dib3kgZm9ydCB3b3J0aDIFECEYoAEyBRAhGKABSMwYUOEBWKUXcAN4AZABAJgBYqAB5giqAQIxM7gBA8gBAPgBAZgCEKACkQnCAgoQABiwAxjWBBhHwgINEAAYsAMY1gQYRxjJA8ICDhAAGIAEGLADGJIDGIoFwgIKEAAYgAQYQxiKBcICBRAAGIAEwgIGEAAYFhgewgIFEAAY7wXCAggQABiABBiiBMICCxAAGIAEGIYDGIoFmAMAiAYBkAYJkgcEMTUuMaAHw0eyBwQxMi4xuAeICcIHBjIuMTMuMcgHHYAIAA&sclient=gws-wiz-serp&lqi=ChhnYXJhZ2UgY293Ym95IGZvcnQgd29ydGhIm9TVhM2zgIAIWiYQABABGAAYARgCGAMiGGdhcmFnZSBjb3dib3kgZm9ydCB3b3J0aJIBFGdhcmFnZV9kb29yX3N1cHBsaWVymgFEQ2k5RFFVbFJRVU52WkVOb2RIbGpSamx2VDJ0RmVsb3dTakZSYkRsTlkwZG9XbE5YVWpKU2VsWk9UVmQ0U0dReVl4QUL6AQUIkwMQPQ";

export const GOOGLE_MAPS_URL = "https://share.google/cW1X5hiNDh12RmEl9";
