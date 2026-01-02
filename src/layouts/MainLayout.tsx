import { Header, Navigation, Footer, ScrollToTop } from "../components/layout";
import { Toaster } from "sonner";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  // #region agent log
  fetch('http://127.0.0.1:7243/ingest/3b9dec33-55db-414b-9cbe-62f230d8aae6',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'MainLayout.tsx:9',message:'MainLayout rendering',data:{hasChildren:!!children},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'B,C'})}).catch(()=>{});
  // #endregion
  return (
    <div 
      className="min-h-screen w-full bg-white font-product-sans px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 2xl:px-24"
      style={{ backgroundColor: "rgba(255, 255, 255, 1)" }}
    >
      <Toaster position="top-center" richColors />
      <ScrollToTop />
      <Header />
      <Navigation />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
