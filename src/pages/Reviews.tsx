import { Phone, Star, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { ReadyToGetStartedCTA } from "../components/sections/ReadyToGetStartedCTA";
import { Seo } from "../components/seo/Seo";
import { buildReviewsLocalBusiness } from "../seo/schemas";
import {
  testimonials,
  REVIEW_SUMMARY,
  GOOGLE_REVIEWS_URL,
} from "../data/testimonials";

/**
 * /reviews: aggregates the real, attributed customer reviews shown across the
 * site (single-sourced from src/data/testimonials.ts) and represents the
 * owner-verified Google Business Profile rating of 5.0 across 24 reviews. Nothing
 * is invented; the page links out to the live Google profile so visitors can
 * verify and read every review.
 */

function Stars({ count = 5, label }: { count?: number; label?: string }) {
  return (
    <div className="flex items-center gap-1" role="img" aria-label={label ?? `${count} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={i < count ? "size-5 fill-gc-yellow text-gc-yellow" : "size-5 text-gc-gray-300"}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

export function Reviews() {
  const schemas: object[] = [buildReviewsLocalBusiness(testimonials)];

  return (
    <main className="bg-white">
      <Seo
        title="Garage Door Repair Reviews"
        description="Read real Garage Cowboy customer reviews. We hold a verified 5.0-star rating across 24 Google reviews in Dallas-Fort Worth. Licensed, insured, same-day. Call (817) 256-0122."
        canonicalPath="/reviews"
        schema={schemas}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Reviews", path: "/reviews" },
        ]}
      />

      {/* Hero */}
      <section className="relative bg-gc-ink flex items-center justify-center">
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto py-16 lg:py-20">
          <h1 className="font-product-sans font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white mb-4">
            What Our Customers Say
          </h1>
          <div className="mb-4 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Stars label={`${REVIEW_SUMMARY.ratingValue} out of 5 stars`} />
            <p className="font-product-sans text-lg font-black text-white">
              {REVIEW_SUMMARY.ratingValue.toFixed(1)} stars across {REVIEW_SUMMARY.reviewCount} Google reviews
            </p>
          </div>
          <p className="font-product-sans text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Garage Cowboy is locally owned, licensed, and insured. Every one of our Google reviews is a
            5-star review. Here are some of them, in our customers' own words.
          </p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild variant="primary" size="cta">
              <a href="tel:8172560122">
                <Phone />
                Call (817) 256-0122
              </a>
            </Button>
            <Button
              asChild
              variant="secondary"
              size="cta"
              className="border-white text-white hover:bg-white hover:text-gc-ink"
            >
              <a href={GOOGLE_REVIEWS_URL} target="_blank" rel="noopener noreferrer">
                Read on Google
                <ExternalLink />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Review cards */}
      <section className="px-4 py-12 sm:px-6 md:px-10 lg:px-16 lg:py-20 xl:px-24">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((review, index) => (
              <Card
                key={index}
                className="flex h-full flex-col border-2 border-gc-ink rounded-[var(--radius-gc-md)] shadow-gc-card"
              >
                <CardContent className="flex h-full flex-col gap-4 p-6">
                  <Stars />
                  <p className="font-product-sans text-base font-black leading-snug text-gc-ink">
                    “{review.quote}”
                  </p>
                  <p className="font-product-sans text-base leading-relaxed text-gc-ink">
                    {review.fullReview}
                  </p>
                  <div className="mt-auto flex items-center justify-between pt-2">
                    <span className="font-product-sans text-sm font-bold text-gc-ink">
                      {review.author}
                    </span>
                    <span className="font-product-sans text-xs uppercase tracking-wide text-gc-gray-600">
                      via {review.source}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <p className="mx-auto mt-10 max-w-3xl text-center font-product-sans text-base text-gc-gray-600">
            These reviews are real and shown as our customers wrote them. We have not edited or invented
            any of them. You can read every review on our{" "}
            <a
              href={GOOGLE_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-gc-ink underline transition-colors hover:text-gc-yellow"
            >
              Google Business Profile
            </a>
            , or see our{" "}
            <Link to="/faq" className="font-bold text-gc-ink underline transition-colors hover:text-gc-yellow">
              frequently asked questions
            </Link>
            .
          </p>
        </div>
      </section>

      {/* CTA */}
      <ReadyToGetStartedCTA
        title="Ready to Work With Garage Cowboy?"
        subtitle="Locally owned, licensed and insured, with 24/7 same-day service across DFW"
      />
    </main>
  );
}

export default Reviews;
