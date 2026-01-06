// #region agent log
fetch('http://127.0.0.1:7243/ingest/3b9dec33-55db-414b-9cbe-62f230d8aae6',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'GarageDoorRepair.tsx:1',message:'GarageDoorRepair module loading',data:{},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'M'})}).catch(()=>{});
// #endregion
import imgBrokenSpringRepairJpg from "figma:asset/0d6675a94a5aabfd635c22fe5ff422c3d7fc04fe.png";
import imgOpenerRepairInstallationJpg from "figma:asset/1ac7d2002343a9831139ef4d90b7b17778658369.png";
import imgDoorOffTrackJpg from "figma:asset/f527372ca61ec0cc7f6ffa7ded9c984ae03ac584.png";
import imgBrokenCableRepairJpg from "figma:asset/1c62f51752f44c4fd21814716eecceafee19b544.png";
import imgNewDoorInstallationJpg from "figma:asset/273650105c2aa2cdba2fd19a6badb774ff0ae0a3.png";
import imgImage3726 from "figma:asset/506261cfe7744ad1bc312cebba705b1e4dfd119e.png";
import imgRemoteRepairProgram1Jpg from "figma:asset/7f99de03b46383c460c4e6dbd31e2bfd41b5d9a8.png";
import imgGarageDoorRollerRepairJpg from "figma:asset/0b552500288d8ce3f03f67c96b0ae808ebed82f2.png";
import { useNavigate } from "react-router-dom";
import { Group47927 } from "./Group47927";

const servicesData = [
  {
    image: imgBrokenSpringRepairJpg,
    title: "BROKEN SPRING REPAIR",
    roundedCorner: "",
    cardStyle: { borderRadius: "20px 0px 0px 0px" },
    imageStyle: {
      borderRadius: "0px 20px 0px 0px",
      borderTopLeftRadius: "20px",
      borderWidth: "0px",
      borderColor: "rgba(0, 0, 0, 0)",
      borderStyle: "none",
      borderImage: "none"
    },
    services: [
      { name: "Spring Repair", highlighted: false },
      { name: "Torsion & Extantion", highlighted: true },
      { name: "Spring Adjustment", highlighted: false },
      { name: "System Conversion", highlighted: true }
    ]
  },
  {
    image: imgOpenerRepairInstallationJpg,
    title: "GARAGE OPENER REPAIR & INSTALL",
    roundedCorner: "",
    cardStyle: { borderRadius: "0px 0px 0px 0px" },
    services: [
      { name: "Opener Repair", highlighted: false },
      { name: "Opener Installation", highlighted: true },
      { name: "Keypads & Remotes", highlighted: false },
      { name: "Sensors Replacement", highlighted: true }
    ]
  },
  {
    image: imgDoorOffTrackJpg,
    title: "FIXING DOOR OFF-TRACK",
    roundedCorner: "",
    cardStyle: { borderRadius: "0px 0px 0px 0px" },
    services: [
      { name: "Off-Track Repair", highlighted: true },
      { name: "Balance & Adjust", highlighted: true },
      { name: "Panel Maintenance", highlighted: false },
      { name: "Garage Door Repair", highlighted: true }
    ]
  },
  {
    image: imgBrokenCableRepairJpg,
    title: "BROKEN CABLE REPAIR",
    roundedCorner: "",
    cardStyle: { borderRadius: "0px 20px 0px 0px", borderWidth: "2px" },
    imageStyle: { borderTopRightRadius: "20px" },
    services: [
      { name: "Cable Installation", highlighted: false },
      { name: "Adjust Door Roller", highlighted: true },
      { name: "Emergency Cable Fix", highlighted: false },
      { name: "Cable Replacement", highlighted: true }
    ]
  },
  {
    image: imgNewDoorInstallationJpg,
    title: "NEW GARAGE DOOR INSTALLS",
    roundedCorner: "",
    cardStyle: { borderRadius: "0px 0px 0px 20px" },
    services: [
      { name: "Door Installation", highlighted: false },
      { name: "Door Maintenance", highlighted: true },
      { name: "Panel Replacements", highlighted: false },
      { name: "Bent Off-Track Rails", highlighted: true }
    ]
  },
  {
    image: imgImage3726,
    title: "DOOR SERVICE & MAINTENANCE",
    roundedCorner: "",
    cardStyle: { borderRadius: "0px 0px 0px 0px" },
    services: [
      { name: "Lubricate Parts", highlighted: false },
      { name: "Test Door Balance", highlighted: true },
      { name: "Clean & Paint Door", highlighted: false },
      { name: "Clearing the Tracks", highlighted: true }
    ]
  },
  {
    image: imgRemoteRepairProgram1Jpg,
    title: "GARAGE DOOR REMOTES",
    roundedCorner: "",
    cardStyle: { borderRadius: "0px", borderWidth: "3px" },
    services: [
      { name: "Remote Programming", highlighted: false },
      { name: "New Garage Remote", highlighted: true },
      { name: "Car Remote Program", highlighted: false },
      { name: "Remote Replacements", highlighted: true }
    ]
  },
  {
    image: imgGarageDoorRollerRepairJpg,
    title: "GARAGE DOOR ROLLER REPAIR",
    roundedCorner: "",
    cardStyle: { borderRadius: "0px 0px 20px 0px" },
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
  roundedCorner?: string;
  cardStyle?: React.CSSProperties;
  imageStyle?: React.CSSProperties;
  onReadMore?: () => void;
}

function ServiceCard({ image, title, services, roundedCorner = "", cardStyle, imageStyle, onReadMore }: ServiceCardProps) {
  return (
    <div 
      className="flex flex-col bg-white overflow-hidden border-[3px] border-black shadow-lg hover:shadow-xl transition-all rounded-b-[20px] px-[0px] py-[-39px] font-product-sans font-black"
      style={cardStyle}
    >
      {/* Image */}
      <div className={`relative w-full aspect-[265/195] overflow-hidden ${roundedCorner}`}>
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover"
          style={imageStyle}
        />
        <div aria-hidden="true" className={`absolute border-[3px_3px_0px] border-black border-solid inset-0 pointer-events-none ${roundedCorner}`} />
      </div>

      {/* Title */}
      <div className="bg-[#fec300] border-t-[3px] border-black py-3 px-4">
        <div aria-hidden="true" className="absolute border-[3px] border-black border-solid inset-0 pointer-events-none" />
        <h3 className="font-product-sans font-black text-lg md:text-xl text-[#222] text-center uppercase leading-[22px] whitespace-pre-line">
          {title}
        </h3>
      </div>

      {/* Services List */}
      <div className="flex-1 p-4 space-y-2.5">
        {services.map((service, idx) => (
          <div
            key={idx}
            className="px-3 py-3 rounded-[4px] text-center text-[#0a0a0a]"
            style={{ backgroundColor: "rgba(48, 49, 53, 0.1)" }}
          >
            <p className="font-product-sans font-medium text-base text-[#0a0a0a] uppercase leading-[10px] flex justify-center flex-wrap flex-shrink-0">
              {service.name}
            </p>
          </div>
        ))}
      </div>

      {/* Read More Button */}
      <div className="p-4 pt-0">
        <button
          onClick={onReadMore}
          className="w-full bg-[#e6e6e6] border-2 border-[#f7bd15] rounded-bl-[10px] rounded-br-[10px] py-2 hover:bg-[#fec300] transition-all"
        >
          <span className="font-product-sans font-black text-lg text-[#303135] uppercase leading-[21px]">
            Read More
          </span>
        </button>
      </div>
    </div>
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
      style={{ backgroundColor: "rgba(255, 255, 255, 1)" }}
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
              roundedCorner={service.roundedCorner}
              cardStyle={service.cardStyle}
              imageStyle={service.imageStyle}
              onReadMore={() => handleReadMore(service.title)}
            />
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-12 lg:mt-20 text-center">
          <h2 className="font-['Product_Sans_Regular'] text-3xl md:text-4xl lg:text-5xl text-[#323232] uppercase mb-8 font-extrabold">
            NEED HELP NOW?
          </h2>
          
          <div className="bg-white border-2 border-[#f7bd15] rounded-[10px] shadow-lg max-w-3xl mx-auto p-8">
            <p className="font-['Product_Sans_Regular'] text-xl md:text-2xl text-[#323232] mb-6">
              Call one of our neighborhood technicians in your area
            </p>
            
            <a
              href="tel:8712560122"
              className="inline-flex items-center gap-3 bg-[#fec300] border-2 border-[#35363a] rounded-[10px] px-8 py-4 shadow-lg hover:shadow-xl transition-all hover:scale-105"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
              </svg>
              <span className="font-['Product_Sans_Regular'] text-xl md:text-2xl text-[#222] uppercase font-semibold">
                SCHEDULE REPAIR
              </span>
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}