import { useEffect, useMemo, useState, type FormEvent } from "react";
import { toast } from "sonner";
import { CalendarDays } from "lucide-react";
import svgPaths from "../imports/svg-pry7uv8zg5";
import imgVerified from "figma:asset/52e672056319f396f2b1bf45a03eee134d6b47d8.png";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "./ui/calendar";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { cn } from "./ui/utils";

function pad2(n: number) {
  return String(n).padStart(2, "0");
}

function isoToLocalDate(iso: string): Date {
  const [y, m, d] = iso.split("-").map((x) => Number(x));
  return new Date(y, m - 1, d);
}

function dateToIso(d: Date): string {
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
}

function formatDateDisplay(iso: string): string {
  const [y, m, d] = iso.split("-");
  return `${m}/${d}/${y}`;
}

function formatTime12h(time24: string): string {
  const hh = Number(time24.slice(0, 2));
  const mm = time24.slice(3, 5);
  const ampm = hh >= 12 ? "PM" : "AM";
  const hour12 = ((hh + 11) % 12) + 1;
  return `${hour12}:${mm} ${ampm}`;
}

function buildTimeSlots(): Array<{ value: string; label: string }> {
  const startMinutes = 8 * 60;
  const endMinutes = 20 * 60;
  const step = 15;
  const slots: Array<{ value: string; label: string }> = [];

  for (let mins = startMinutes; mins <= endMinutes; mins += step) {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    const value = `${pad2(h)}:${pad2(m)}`;
    slots.push({ value, label: formatTime12h(value) });
  }

  return slots;
}

const testimonials = [
  {
    quote: "Great price, professional and courteous.",
    author: "T. Bradley",
    fullReview:
      "Deno and crew did a great job. They arrived on time and finished in a timely manner. Great price, professional and courteous. Would highly recommend his company.",
  },
  {
    quote: "Fast, accurate, and extremely reasonable pricing.",
    author: "Yeon Young Kim",
    fullReview:
      "Our garage door was completely broken, and Deno responded very quickly. He handled everything promptly and professionally, and I am extremely satisfied. Excellent service at a very reasonable price.",
  },
  {
    quote: "He almost totally redid both doors.",
    author: "Linda W.",
    fullReview:
      "Oh my goodness, this guy is AMAZING. I had all kinds of problems with both doors and he almost totally redid them. Very reasonably priced. I would totally recommend him.",
  },
  {
    quote: "Arrived early, finished quickly, pricing couldn't be beat.",
    author: "Katrina M.",
    fullReview:
      "Deno was friendly and professional. He arrived early and finished quickly. His pricing couldn't be beat! Highly recommend!",
  },
  {
    quote: "Local, honest, and not a big franchise.",
    author: "Cliff C.",
    fullReview:
      "I was looking for a local garage door contractor to replace a broken spring. Came across Garage Cowboy and decided to give them a call. Don't let the lack of reviews fool you—Deno is local and not part of one of the big franchises.",
  },
  {
    quote: "Best prices in town & comes out right away for emergencies.",
    author: "Dee",
    fullReview:
      "Garage Cowboy is the best for fixing garage repairs or replacing the garage door in general. He literally comes out right away for emergencies and has the best prices in town. Very kind and knowledgeable.",
  },
  {
    quote: "Very knowledgeable, even with 25-year-old equipment.",
    author: "Anthony R. (Local Guide)",
    fullReview:
      "Deno was very knowledgeable about my garage door issue, even though my equipment was 25 years old. He offered multiple options and pricing. Definitely A1 in the garage business.",
  },
  {
    quote: "Helped when a DIY project became too much.",
    author: "Eric S.",
    fullReview:
      "I thought I could handle a large roll-up door myself and quickly realized it was too much. Deno was extremely helpful and got everything installed quickly and affordably.",
  },
];

// Shared brand look for every form control — heavy ink border, frosted-white
// well over the yellow panel, token radius/shadow, and a high-visibility yellow
// focus ring. Colors/radii/shadows all resolve from --gc-* tokens (globals.css);
// `rounded-[var(--radius-gc-card)]` is the arbitrary-token form so tailwind-merge
// dedupes it against each primitive's base `rounded-md`. Height is set per control.
const fieldShell =
  "border-2 border-gc-ink rounded-[var(--radius-gc-card)] bg-gc-frost text-gc-ink placeholder:text-gc-ink-75 shadow-gc-faq text-base md:text-sm focus-visible:border-gc-ink focus-visible:ring-gc-yellow focus-visible:ring-[3px]";

const labelClass =
  "text-gc-ink font-product-sans font-bold text-xs uppercase tracking-wide";

const errorClass =
  "text-gc-ink font-product-sans font-bold text-xs normal-case";

type FieldKey =
  | "name"
  | "email"
  | "phone"
  | "preferredDate"
  | "preferredTime";

export interface AppointmentBookingSectionProps {
  includeTestimonials?: boolean;
}

export function AppointmentBookingSection({
  includeTestimonials = true,
}: AppointmentBookingSectionProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [emailStatus, setEmailStatus] = useState<"sent" | "failed" | null>(
    null
  );
  const [isDateOpen, setIsDateOpen] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<FieldKey, string>>>({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    zipCode: "",
    message: "",
    preferredDate: "",
    preferredTime: "",
  });

  const selectedDate = useMemo(() => {
    if (!formData.preferredDate) return undefined;
    return isoToLocalDate(formData.preferredDate);
  }, [formData.preferredDate]);

  const timeSlots = useMemo(() => buildTimeSlots(), []);

  useEffect(() => {
    if (!includeTestimonials) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [includeTestimonials]);

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      zipCode: "",
      message: "",
      preferredDate: "",
      preferredTime: "",
    });
    setErrors({});
    setSubmitSuccess(false);
    setEmailStatus(null);
  };

  // Update one field and clear its error (if any) as the user corrects it.
  const updateField = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      if (!(field in prev)) return prev;
      const next = { ...prev };
      delete next[field as FieldKey];
      return next;
    });
  };

  const validate = (): Partial<Record<FieldKey, string>> => {
    const next: Partial<Record<FieldKey, string>> = {};
    if (!formData.name.trim()) next.name = "Please enter your name.";
    if (!formData.email.trim())
      next.email = "Please enter your email address.";
    if (!formData.phone.trim())
      next.phone = "Please enter your phone number.";
    if (!formData.preferredDate)
      next.preferredDate = "Please choose a date.";
    if (!formData.preferredTime)
      next.preferredTime = "Please choose a time.";
    return next;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/booking/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          date: formData.preferredDate,
          time: formData.preferredTime,
          zipCode: formData.zipCode,
          message: formData.message,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.fields) {
          const fieldErrors = Object.values(data.fields).join(", ");
          throw new Error(fieldErrors);
        }
        throw new Error(data.message || "Failed to schedule appointment");
      }

      setSubmitSuccess(true);
      setEmailStatus(data.emailStatus || "sent");

      if (data.emailStatus === "sent") {
        toast.success("Booked! Added to calendar. Confirmation email sent.");
      } else {
        toast.success("Booked! Added to calendar. Email may be delayed.");
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An error occurred";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const requiredMark = <span aria-hidden="true">*</span>;

  return (
    <div
      className={
        includeTestimonials
          ? "bg-gc-yellow rounded-tl-[var(--radius-gc-xl)] rounded-tr-[var(--radius-gc-xl)] border-l-[3px] border-r-[3px] border-gc-ink relative font-product-sans uppercase"
          : "bg-gc-yellow rounded-[var(--radius-gc-xl)] border-x border-b border-t-0 border-gc-ink relative font-product-sans uppercase"
      }
    >
      <div
        className={
          includeTestimonials
            ? "bg-gc-frost border-2 border-gc-ink rounded-tl-[var(--radius-gc-lg)] rounded-tr-[var(--radius-gc-lg)] py-4 lg:py-5"
            : "bg-gc-frost border-2 border-gc-ink rounded-[var(--radius-gc-lg)] py-4 lg:py-5"
        }
      >
        <p className="font-product-sans text-base md:text-lg lg:text-2xl text-center text-gc-ink uppercase px-4 font-black">
          BOOK AN APPOINTMENT & GET A FREE INSPECTION TODAY
        </p>
      </div>

      {submitSuccess ? (
        <div className="px-4 lg:px-8 py-12 lg:py-16 text-center uppercase">
          <div className="max-w-md mx-auto">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="font-product-sans font-black text-2xl text-gc-ink mb-3">
              Appointment Scheduled!
            </h3>
            <p className="font-product-sans text-gc-ink mb-2">
              ✅ Added to calendar
            </p>
            <p className="font-product-sans text-gc-ink mb-6">
              {emailStatus === "sent"
                ? "Confirmation email sent! We'll see you soon!"
                : "Email may be delayed, but your appointment is confirmed. We'll see you soon!"}
            </p>
            <Button type="button" variant="ink" size="cta" onClick={resetForm}>
              Book Another Appointment
            </Button>
          </div>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          noValidate
          className="px-4 lg:px-8 py-8 lg:py-12"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 lg:gap-6">
            {/* Name + Email */}
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="booking-name" className={labelClass}>
                  Name {requiredMark}
                </Label>
                <Input
                  id="booking-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={formData.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  required
                  aria-required="true"
                  aria-invalid={!!errors.name}
                  aria-describedby={
                    errors.name ? "booking-name-error" : undefined
                  }
                  disabled={isSubmitting}
                  className={cn(
                    fieldShell,
                    "h-12 px-4 normal-case",
                    errors.name && "border-destructive"
                  )}
                />
                {errors.name && (
                  <p
                    id="booking-name-error"
                    role="alert"
                    className={errorClass}
                  >
                    {errors.name}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="booking-email" className={labelClass}>
                  Email Address {requiredMark}
                </Label>
                <Input
                  id="booking-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  required
                  aria-required="true"
                  aria-invalid={!!errors.email}
                  aria-describedby={
                    errors.email ? "booking-email-error" : undefined
                  }
                  disabled={isSubmitting}
                  className={cn(
                    fieldShell,
                    "h-12 px-4 normal-case",
                    errors.email && "border-destructive"
                  )}
                />
                {errors.email && (
                  <p
                    id="booking-email-error"
                    role="alert"
                    className={errorClass}
                  >
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            {/* Phone + Zip */}
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="booking-phone" className={labelClass}>
                  Phone Number {requiredMark}
                </Label>
                <Input
                  id="booking-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  value={formData.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  required
                  aria-required="true"
                  aria-invalid={!!errors.phone}
                  aria-describedby={
                    errors.phone ? "booking-phone-error" : undefined
                  }
                  disabled={isSubmitting}
                  className={cn(
                    fieldShell,
                    "h-12 px-4 normal-case",
                    errors.phone && "border-destructive"
                  )}
                />
                {errors.phone && (
                  <p
                    id="booking-phone-error"
                    role="alert"
                    className={errorClass}
                  >
                    {errors.phone}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="booking-zip" className={labelClass}>
                  Zip Code
                </Label>
                <Input
                  id="booking-zip"
                  name="zipCode"
                  type="text"
                  inputMode="numeric"
                  autoComplete="postal-code"
                  value={formData.zipCode}
                  onChange={(e) => updateField("zipCode", e.target.value)}
                  disabled={isSubmitting}
                  className={cn(fieldShell, "h-12 px-4 normal-case")}
                />
              </div>
            </div>

            {/* Date + Time */}
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="booking-date" className={labelClass}>
                  Preferred Date {requiredMark}
                </Label>
                <Popover open={isDateOpen} onOpenChange={setIsDateOpen}>
                  <PopoverTrigger asChild>
                    <button
                      type="button"
                      id="booking-date"
                      disabled={isSubmitting}
                      aria-required="true"
                      aria-invalid={!!errors.preferredDate}
                      aria-describedby={
                        errors.preferredDate
                          ? "booking-date-error"
                          : undefined
                      }
                      className={cn(
                        fieldShell,
                        "flex h-12 w-full items-center justify-between gap-3 px-4 text-left disabled:pointer-events-none disabled:opacity-50",
                        errors.preferredDate && "border-destructive"
                      )}
                    >
                      <span
                        className={
                          formData.preferredDate
                            ? "text-gc-ink"
                            : "text-gc-ink-75"
                        }
                      >
                        {formData.preferredDate
                          ? formatDateDisplay(formData.preferredDate)
                          : "Select a date"}
                      </span>
                      <CalendarDays className="size-4 text-gc-ink-75 shrink-0" />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent
                    align="start"
                    className="w-auto max-w-[calc(100vw-2rem)] p-0"
                    sideOffset={8}
                  >
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={(d) => {
                        if (!d) return;
                        updateField("preferredDate", dateToIso(d));
                        setIsDateOpen(false);
                      }}
                      disabled={(date) => {
                        const today = new Date();
                        today.setHours(0, 0, 0, 0);
                        const candidate = new Date(date);
                        candidate.setHours(0, 0, 0, 0);
                        return candidate < today;
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                {errors.preferredDate && (
                  <p
                    id="booking-date-error"
                    role="alert"
                    className={errorClass}
                  >
                    {errors.preferredDate}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="booking-time" className={labelClass}>
                  Preferred Time {requiredMark}
                </Label>
                <Select
                  value={formData.preferredTime}
                  onValueChange={(v) => updateField("preferredTime", v)}
                  disabled={isSubmitting}
                >
                  <SelectTrigger
                    id="booking-time"
                    aria-required="true"
                    aria-invalid={!!errors.preferredTime}
                    aria-describedby={
                      errors.preferredTime
                        ? "booking-time-error"
                        : undefined
                    }
                    className={cn(
                      fieldShell,
                      "data-[size=default]:h-12 px-4 data-[placeholder]:text-gc-ink-75 [&>span]:text-gc-ink",
                      errors.preferredTime && "border-destructive"
                    )}
                  >
                    <SelectValue placeholder="Select a time" />
                  </SelectTrigger>
                  <SelectContent className="max-h-64">
                    <SelectGroup>
                      {timeSlots.map((slot) => (
                        <SelectItem key={slot.value} value={slot.value}>
                          {slot.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {errors.preferredTime && (
                  <p
                    id="booking-time-error"
                    role="alert"
                    className={errorClass}
                  >
                    {errors.preferredTime}
                  </p>
                )}
              </div>
            </div>

            {/* Message */}
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="booking-message" className={labelClass}>
                Message
              </Label>
              <Textarea
                id="booking-message"
                name="message"
                value={formData.message}
                onChange={(e) => updateField("message", e.target.value)}
                rows={4}
                placeholder="Tell us about your garage door issue (optional)"
                disabled={isSubmitting}
                className={cn(
                  fieldShell,
                  "min-h-[120px] px-4 py-3 normal-case h-full"
                )}
              />
            </div>

            {/* Submit */}
            <div className="flex flex-col items-center justify-center gap-4">
              <Button
                type="submit"
                variant="primary"
                size="cta"
                disabled={isSubmitting}
                className="w-full max-w-[208px]"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin size-4" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    BOOKING...
                  </>
                ) : (
                  "SUBMIT"
                )}
              </Button>
            </div>
          </div>

          <p className="font-product-sans font-black text-[12px] text-gc-ink mt-4">
            *REQUIRED
          </p>
        </form>
      )}

      {includeTestimonials && (
        <div className="bg-white border-[2px] border-gc-ink mx-0 mb-0">
          <div className="py-8 lg:py-12 px-4 lg:px-8 border-b-2 border-gc-ink">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="h-[1.25px] w-20 md:w-40 lg:w-80 bg-gc-gray-500" />
                <img src={imgVerified} alt="Verified" className="w-8 h-8" />
                <div className="h-[1.25px] w-20 md:w-40 lg:w-80 bg-gc-gray-500" />
              </div>
              <h2 className="font-product-sans text-xl md:text-2xl text-gc-ink mb-1 uppercase">
                TAKE IT FROM OUR
              </h2>
              <h3 className="font-product-sans text-xl md:text-2xl text-gc-ink font-black uppercase">
                VALUED CUSTOMERS
              </h3>
            </div>

            <div className="relative max-w-4xl mx-auto">
              <div className="text-center mb-6">
                <p className="font-['Product_Sans:Bold'] text-lg md:text-xl text-black mb-3 italic">
                  "{testimonials[currentSlide].quote}"
                </p>
                <p className="font-['Product_Sans:Regular'] text-base md:text-lg text-black">
                  <span className="text-sm">--</span> {testimonials[currentSlide].author}
                </p>
              </div>

              <div className="overflow-hidden min-h-[100px] mb-6">
                <div className="text-center">
                  <p className="font-['Product_Sans_Regular'] italic text-base md:text-lg lg:text-xl text-black leading-relaxed">
                    "{testimonials[currentSlide].fullReview}"
                  </p>
                </div>
              </div>

              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 text-gc-gray-50 hover:text-gc-yellow transition-colors opacity-90"
                aria-label="Next testimonial"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 25 25">
                  <path d={svgPaths.p63ffa80} />
                </svg>
              </button>
            </div>

            <div className="flex items-center justify-center gap-3 mt-6">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    index === currentSlide
                      ? "bg-black"
                      : "bg-black opacity-20 hover:opacity-50"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
