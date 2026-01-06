import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout";

// Lazy load page components for code-splitting
const Home = lazy(() => import("./pages/Home").then(m => ({ default: m.Home })));
const AboutUs = lazy(() => import("./pages/AboutUs").then(m => ({ default: m.AboutUs })));
const Services = lazy(() => import("./pages/Services").then(m => ({ default: m.Services })));
const ServiceDetail = lazy(() => import("./pages/ServiceDetail").then(m => ({ default: m.ServiceDetail })));
const Texas = lazy(() => import("./pages/Texas").then(m => ({ default: m.Texas })));
const CityDetail = lazy(() => import("./pages/CityDetail").then(m => ({ default: m.CityDetail })));
const Residential = lazy(() => import("./pages/Residential").then(m => ({ default: m.Residential })));
const Commercial = lazy(() => import("./pages/Commercial").then(m => ({ default: m.Commercial })));
const NotFound = lazy(() => import("./pages/NotFound").then(m => ({ default: m.NotFound })));

// Loading fallback component
function PageLoader() {
  return (
    <div className="flex justify-center items-center min-h-[400px]">
      <div className="animate-pulse flex flex-col items-center gap-4">
        <div className="w-16 h-16 bg-[#fec300] rounded-full animate-bounce" />
        <p className="font-product-sans text-lg text-[#323232]">Loading...</p>
      </div>
    </div>
  );
}

export default function App() {
  // #region agent log
  fetch('http://127.0.0.1:7243/ingest/3b9dec33-55db-414b-9cbe-62f230d8aae6',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'App.tsx:29',message:'App component rendering',data:{pathname:typeof window!=='undefined'?window.location.pathname:'unknown'},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'B'})}).catch(()=>{});
  // #endregion
  return (
    <BrowserRouter>
      <MainLayout>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:slug" element={<ServiceDetail />} />
            <Route path="/texas" element={<Texas />} />
            <Route path="/texas/:city" element={<CityDetail />} />
            <Route path="/residential" element={<Residential />} />
            <Route path="/commercial" element={<Commercial />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </MainLayout>
    </BrowserRouter>
  );
}
