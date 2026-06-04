// Optimized WebP service images
import brokenSpringImg from "../assets/services/broken-spring-repair.webp";
import openerRepairImg from "../assets/services/garage-opener-repair-install.webp";
import offTrackImg from "../assets/services/fixing-door-off-track.webp";
import brokenCableImg from "../assets/services/broken-cable-repair.webp";
import newInstallImg from "../assets/services/new-garage-door-installs.webp";
import maintenanceImg from "../assets/services/door-service-maintenance.webp";
import remotesImg from "../assets/services/garage-door-remotes.webp";
import rollerRepairImg from "../assets/services/garage-door-roller-repair.webp";
import { useNavigate } from "react-router-dom";
import { Group47927 } from "./Group47927";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter } from "./ui/card";

const servicesData = [
  {
    image: brokenSpringImg,
    title: "BROKEN SPRING REPAIR",
    objectPosition: "50% 35%", // Springs often at top of image
    roundedCorner: "",
    // Top-left frame corner of the 4-col grid.
    cardStyle: { borderRadius: "var(--radius-gc-xl) 0 0 0" },
    services: [
      { name: "Spring Repair", highlighted: false },
      { name: "Torsion & Extension", highlighted: true },
      { name: "Spring Adjustment", highlighted: false },
      { name: "System Conversion", highlighted: true }
    ]
  },
  {
    image: openerRepairImg,
    title: "GARAGE DOOR OPENER REPAIR",
    objectPosition: "50% 40%", // Opener mechanism focus
    roundedCorner: "",
    services: [
      { name: "Opener Repair", highlighted: false },
      { name: "Opener Installation", highlighted: true },
      { name: "Keypads & Remotes", highlighted: false },
      { name: "Sensors Replacement", highlighted: true }
    ]
  },
  {
    image: offTrackImg,
    title: "FIXING DOOR OFF-TRACK",
    roundedCorner: "",
    services: [
      { name: "Off-Track Repair", highlighted: true },
      { name: "Balance & Adjust", highlighted: true },
      { name: "Panel Maintenance", highlighted: false },
      { name: "Garage Door Repair", highlighted: true }
    ]
  },
  {
    image: brokenCableImg,
    title: "BROKEN GARAGE CABLE REPAIR",
    roundedCorner: "",
    // Top-right frame corner of the 4-col grid.
    cardStyle: { borderRadius: "0 var(--radius-gc-xl) 0 0" },
    services: [
      { name: "Cable Installation", highlighted: false },
      { name: "Adjust Door Roller", highlighted: true },
      { name: "Emergency Cable Fix", highlighted: false },
      { name: "Cable Replacement", highlighted: true }
    ]
  },
  {
    image: newInstallImg,
    title: "NEW GARAGE DOOR REPLACEMENT",
    roundedCorner: "",
    // Bottom-left frame corner of the 4-col grid.
    cardStyle: { borderRadius: "0 0 0 var(--radius-gc-xl)" },
    services: [
      { name: "Door Installation", highlighted: false },
      { name: "Door Maintenance", highlighted: true },
      { name: "Panel Replacements", highlighted: false },
      { name: "Bent Off-Track Rails", highlighted: true }
    ]
  },
  {
    image: maintenanceImg,
    title: "GARAGE DOOR REPAIR & SERVICE",
    roundedCorner: "",
    services: [
      { name: "Lubricate Parts", highlighted: false },
      { name: "Test Door Balance", highlighted: true },
      { name: "Clean & Paint Door", highlighted: false },
      { name: "Clearing the Tracks", highlighted: true }
    ]
  },
  {
    image: remotesImg,
    title: "GARAGE DOOR REMOTES",
    roundedCorner: "",
    services: [
      { name: "Remote Programming", highlighted: false },
      { name: "New Garage Remote", highlighted: true },
      { name: "Car Remote Program", highlighted: false },
      { name: "Remote Replacements", highlighted: true }
    ]
  },
  {
    image: rollerRepairImg,
    title: "GARAGE DOOR ROLLER REPAIR",
    roundedCorner: "",
    // Bottom-right frame corner of the 4-col grid.
    cardStyle: { borderRadius: "0 0 var(--radius-gc-xl) 0" },
    services: [
      { name: "Door Roller Repair", highlighted: false },
      { name: "Adjust Door Roller", highlighted: true },
      { name: "Door Roller Parts", highlighted: false },
      { name: "Roller Maintenance", highlighted: true }
    ]
  }
];

interface ServiceCardProps {
  image: string;
  title: string;
  services: { name: string; highlighted: boolean }[];
  objectPosition?: string;
  roundedCorner?: string;
  cardStyle?: React.CSSProperties;
  onReadMore?: () => void;
}

function ServiceCard({ image, title, services, objectPosition, roundedCorner = "", cardStyle, onReadMore }: ServiceCardProps) {
  return (
    <Card
      className="flex flex-col gap-0 overflow-hidden rounded-none border-2 border-gc-ink shadow-gc-card transition-all font-product-sans font-black"
      style={cardStyle}
    >
      {/* Image */}
      <div className={`relative w-full aspect-[265/195] overflow-hidden ${roundedCorner}`}>
        <img
          src={image}
          alt={`${title.charAt(0)}${title.slice(1).toLowerCase()} in Dallas-Fort Worth`}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover object-center"
          style={{ objectPosition: objectPosition ?? "50% 50%" }}
        />
        <div aria-hidden="true" className={`absolute border-[2px_2px_0px] border-gc-ink border-solid inset-0 pointer-events-none ${roundedCorner}`} />
      </div>

      {/* Title */}
      <div className="bg-gc-yellow border-t-2 border-gc-ink py-3 px-4">
        <div aria-hidden="true" className="absolute border-2 border-gc-ink border-solid inset-0 pointer-events-none" />
        <h3 className="font-product-sans font-black text-lg md:text-xl text-gc-ink text-center uppercase leading-[22px] whitespace-pre-line">
          {title}
        </h3>
      </div>

      {/* Services List */}
      <CardContent className="flex-1 p-4 flex flex-col gap-2.5">
        {services.map((service, idx) => (
          <div
            key={idx}
            className="px-3 py-3 rounded-[var(--radius-gc-sm)] text-center bg-gc-list-tile text-gc-ink"
          >
            <p className="font-product-sans font-medium text-base text-gc-ink uppercase leading-[10px] flex justify-center flex-wrap flex-shrink-0">
              {service.name}
            </p>
          </div>
        ))}
      </CardContent>

      {/* Read More Button — tertiary card action (gray pill that fills yellow
          on hover), intentionally distinct from the yellow primary CTAs. */}
      <CardFooter className="p-4 pt-0">
        <button
          onClick={onReadMore}
          className="w-full bg-gc-gray-200 border-2 border-gc-yellow rounded-b-[var(--radius-gc-md)] py-2 hover:bg-gc-yellow transition-all"
        >
          <span className="font-product-sans font-black text-lg text-gc-ink uppercase leading-[21px]">
            Read More
          </span>
        </button>
      </CardFooter>
    </Card>
  );
}

export function GarageDoorRepair() {
  const navigate = useNavigate();

  const titleToSlug: Record<string, string> = {
    "BROKEN SPRING REPAIR": "broken-spring-repair",
    "OPENER REPAIR & INSTALLATION": "opener-repair-installation",
    "GARAGE OPENER REPAIR & INSTALL": "opener-repair-installation",
    "FIXING DOOR OFF-TRACK": "garage-door-off-track",
    "BROKEN CABLE REPAIR": "broken-cable-repair",
    "GARAGE DOOR INSTALLATION": "new-door-installation",
    "NEW GARAGE DOOR INSTALLS": "new-door-installation",
    "GARAGE DOOR REMOTE OPENERS": "remote-repair-programming",
    "GARAGE DOOR REMOTE & REPAIR": "remote-repair-programming",
    "GARAGE DOOR REMOTES": "remote-repair-programming",
    "GARAGE DOOR ROLLER REPAIR": "garage-door-roller-repair",
    "DOOR SERVICE & MAINTENANCE": "door-service-maintenance",
    "GARAGE DOOR SERVICE & MAINTENANCE": "door-service-maintenance",
    "GARAGE DOOR OPENER REPAIR": "opener-repair-installation",
    "GARAGE DOOR REPAIR & SERVICE": "door-service-maintenance",
    "NEW GARAGE DOOR REPLACEMENT": "new-door-installation",
    "BROKEN GARAGE CABLE REPAIR": "broken-cable-repair",
  };

  const handleReadMore = (serviceName: string) => {
    const slug = titleToSlug[serviceName];
    if (slug) {
      navigate(`/services/${slug}`);
    }
  };

  return (
    <section
      className="w-full bg-white py-12 lg:py-20 font-product-sans px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 2xl:px-32"
      data-font-probe="gdr"
    >
      <div className="container mx-auto max-w-6xl px-4 lg:px-8 flex flex-col justify-center items-center">
        {/* Logo Title */}
        <div className="w-full lg:mb-16 mb-12">
          <Group47927 />
        </div>

        {/* Services Grid - No gaps, border collapse effect */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10">
          {servicesData.map((service, index) => (
            <ServiceCard
              key={index}
              image={service.image}
              title={service.title}
              services={service.services}
              objectPosition={service.objectPosition}
              roundedCorner={service.roundedCorner}
              cardStyle={service.cardStyle}
              onReadMore={() => handleReadMore(service.title)}
            />
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-12 lg:mt-20 text-center">
          <h2 className="font-product-sans font-black text-3xl md:text-4xl lg:text-5xl text-gc-ink uppercase mb-8">
            NEED HELP NOW?
          </h2>

          <Card className="border-2 border-gc-yellow rounded-[var(--radius-gc-md)] shadow-gc-card max-w-3xl mx-auto">
            <CardContent className="p-8">
              <p className="font-product-sans text-xl md:text-2xl text-gc-ink mb-6">
                Call one of our neighborhood technicians in your area
              </p>

              <Button asChild variant="primary" size="cta">
                <a href="tel:8172560122">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                  </svg>
                  SCHEDULE REPAIR
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                  </svg>
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
