import { Mail, Phone, UserPlus } from "lucide-react";
import { Button } from "./ui/button";

interface ContactQuickActionsProps {
  className?: string;
  showEmail?: boolean;
}

export function ContactQuickActions({
  className,
  showEmail = false,
}: ContactQuickActionsProps) {
  return (
    <div
      className={
        className ??
        "flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
      }
    >
      <Button asChild variant="primary" size="cta">
        <a
          href="/garage-cowboy.vcf"
          download="garage-cowboy.vcf"
          aria-label="Add Garage Cowboy to contacts"
        >
          <UserPlus />
          Add to Contacts
        </a>
      </Button>

      <Button asChild variant="primary" size="cta">
        <a href="tel:+18172560122" aria-label="Call Garage Cowboy">
          <Phone />
          Call Now
        </a>
      </Button>

      {showEmail && (
        <Button asChild variant="primary" size="cta">
          <a href="mailto:deno@garagecowboy.com" aria-label="Email Garage Cowboy">
            <Mail />
            Email Us
          </a>
        </Button>
      )}
    </div>
  );
}

