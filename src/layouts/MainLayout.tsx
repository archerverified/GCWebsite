import { Header, Navigation, Footer, ScrollToTop } from "../components/layout";
import { Toaster } from "sonner";
import { PAGE_X_PADDING, SHELL_WRAPPER, SHELL_TOP_ACCENT } from "../styles/layoutStyles";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  // #region agent log
  fetch('http://127.0.0.1:7243/ingest/3b9dec33-55db-414b-9cbe-62f230d8aae6',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'MainLayout.tsx:9',message:'MainLayout rendering',data:{hasChildren:!!children},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'B,C'})}).catch(()=>{});
  // #endregion
  return (
    <div 
      className={`min-h-screen w-full bg-[#f5f5f5] font-product-sans ${PAGE_X_PADDING} py-4 sm:py-6`}
    >
      <Toaster position="top-center" richColors />
      <ScrollToTop />
      
      {/* Outer Shell Wrapper */}
      <div className={`${SHELL_WRAPPER} ${SHELL_TOP_ACCENT}`}>
        <Header />
        <Navigation />
        <main className="flex-grow">{children}</main>
        <Footer />
      </div>
    </div>
  );
}
