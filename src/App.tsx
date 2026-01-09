import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
const Privacy = lazy(() => import("./pages/Privacy").then(m => ({ default: m.Privacy })));
const Terms = lazy(() => import("./pages/Terms").then(m => ({ default: m.Terms })));
const Contact = lazy(() => import("./pages/Contact").then(m => ({ default: m.Contact })));
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
            <Route path="/contact" element={<Contact />} />
            <Route path="/contac" element={<Navigate to="/contact" replace />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </MainLayout>
    </BrowserRouter>
  );
}
