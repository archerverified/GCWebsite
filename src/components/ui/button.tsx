import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background text-foreground hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        // Garage Cowboy brand CTAs — colors/radius/shadow all from --gc-* tokens
        // (globals.css). `rounded-[var(--radius-gc-md)]` is the arbitrary-token
        // form so tailwind-merge dedupes it against the base `rounded-md`.
        // `primary`: the solid yellow call-to-action used site-wide.
        primary:
          "bg-gc-yellow text-gc-ink border-2 border-gc-ink font-black uppercase rounded-[var(--radius-gc-md)] shadow-gc-button hover:bg-gc-yellow-press hover:shadow-gc-button-hover active:bg-gc-yellow-press",
        // `secondary`: outline variant (was the unused shadcn gray secondary).
        // Flat ink outline that fills with ink on hover for a crisp inversion.
        secondary:
          "bg-transparent text-gc-ink border-2 border-gc-ink font-black uppercase rounded-[var(--radius-gc-md)] hover:bg-gc-ink hover:text-gc-fg-on-dark",
        // `ink`: solid dark-fill CTA (the brand's secondary CTA, e.g. on yellow
        // sections / the 404 page). Same footprint as `primary`, inverted color.
        ink:
          "bg-gc-ink text-gc-fg-on-dark border-2 border-gc-ink font-black uppercase rounded-[var(--radius-gc-md)] shadow-gc-button hover:bg-gc-gray-700 hover:shadow-gc-button-hover",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9 rounded-md",
        // Large brand CTA footprint — bumped ~30-40% for stronger presence.
        // Keeps a comfortable >=56px tap target on mobile and scales up on
        // >=sm. Pairs with the `primary`/`secondary`/`ink` variants. Bumps icon
        // size to 24px (overrides the base size-4 via tailwind-merge since both
        // share the same `[&_svg…]:` modifier — last wins).
        cta: "min-h-14 gap-3 px-8 text-lg sm:min-h-16 sm:px-10 sm:text-xl [&_svg:not([class*='size-'])]:size-6",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
