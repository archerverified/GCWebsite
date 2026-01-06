import { Link } from "react-router-dom";

export function ServiceAreasSection() {
  // #region agent log
  fetch('http://127.0.0.1:7243/ingest/3b9dec33-55db-414b-9cbe-62f230d8aae6',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'ServiceAreasSection.tsx:4',message:'ServiceAreasSection rendering',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'home-fix-1',hypothesisId:'J'})}).catch(()=>{});
  // #endregion
  const leftColumnCities = [
    { name: "Fort Worth", slug: "fort-worth" },
    { name: "Arlington", slug: "arlington" },
    { name: "Dallas", slug: "dallas" },
    { name: "Grand Prairie", slug: "grand-prairie" },
    { name: "Plano", slug: "plano" },
    { name: "Frisco", slug: "frisco" },
    { name: "McKinney", slug: "mckinney" },
    { name: "Keller", slug: "keller" }
  ];

  const rightColumnCities = [
    { name: "Mansfield", slug: "mansfield" },
    { name: "Weatherford", slug: "weatherford" },
    { name: "Denton", slug: "denton" },
    { name: "Southlake", slug: "southlake" },
    { name: "Irving", slug: "irving" },
    { name: "Burleson", slug: "burleson" },
    { name: "Cleburne", slug: "cleburne" }
  ];

  return (
    <section className="w-full bg-[#323232] border-t-[4px] border-b-[4px] border-[#f7bd15] py-12 lg:py-16 font-product-sans px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 2xl:px-24" data-font-probe="service-areas">
      <div className="container mx-auto max-w-6xl lg:px-16 px-8 py-[27px] my-[0px]">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-['Product_Sans_Medium:Regular'] text-3xl md:text-4xl lg:text-5xl text-white leading-tight mb-2 font-[Product_Sans_Black]">
            SERVICE AREAS IN TEXAS
          </h2>
          <p className="font-['Product_Sans_Black:Regular'] text-3xl md:text-4xl lg:text-5xl text-[#f7bd15] underline decoration-solid font-[Product_Sans_Black]">
            (MAJOR HUBS)
          </p>
        </div>

        {/* Cities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 max-w-5xl mx-auto">
          {/* Left Column */}
          <div className="space-y-4 lg:space-y-6 p-[0px] m-[0px]">
            {leftColumnCities.map((city, index) => (
              <div key={index} className="flex items-center gap-4">
                <svg className="w-5 h-7 flex-shrink-0" fill="#F7BD15" viewBox="0 0 16.3854 27" style={{ transform: 'scaleX(-1)' }}>
                  <path d="M0.538467 13.5L15.8469 0.538467L15.8469 26.4615L0.538467 13.5Z" />
                </svg>
                <Link
                  to={`/texas/${city.slug}`}
                  className="font-['Product_Sans:Regular'] text-4xl md:text-5xl lg:text-6xl text-white leading-7 px-[0px] py-[10px] font-[Product_Sans] hover:text-[#f7bd15] transition-colors"
                  style={{ textDecoration: 'none' }}
                >
                  {city.name}
                </Link>
              </div>
            ))}
          </div>

          {/* Right Column */}
          <div className="space-y-4 lg:space-y-6">
            {rightColumnCities.map((city, index) => (
              <div key={index} className="flex items-center gap-4">
                <svg className="w-5 h-7 flex-shrink-0" fill="#F7BD15" viewBox="0 0 16.3854 27" style={{ transform: 'scaleX(-1)' }}>
                  <path d="M0.538467 13.5L15.8469 0.538467L15.8469 26.4615L0.538467 13.5Z" />
                </svg>
                <Link
                  to={`/texas/${city.slug}`}
                  className="font-['Product_Sans:Regular'] text-4xl md:text-5xl lg:text-6xl text-white leading-7 px-[0px] py-[10px] font-[Product_Sans] hover:text-[#f7bd15] transition-colors"
                  style={{ textDecoration: 'none' }}
                >
                  {city.name}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
