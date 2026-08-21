import { useLocation } from "react-router-dom";
import { Header, Navigation, Footer, ScrollToTop } from "../components/layout";
import { StickyCallBar } from "../components/layout/StickyCallBar";
import { Toaster } from "sonner";
import { PAGE_X_PADDING, SHELL_WRAPPER, SHELL_TOP_ACCENT } from "../styles/layoutStyles";

interface MainLayoutProps {
  children: React.ReactNode;
}

/**
 * Routes that render WITHOUT site chrome: no header, nav, footer, sticky bar, or shell
 * wrapper. Paid-traffic landing pages live here, because every nav link is an exit on a
 * click that was paid for. These pages own their full-bleed layout entirely.
 */
const BARE_ROUTES = ["/free-quote", "/quote"];

export function MainLayout({ children }: MainLayoutProps) {
  const { pathname } = useLocation();

  if (BARE_ROUTES.includes(pathname)) {
    // Toaster stays: the booking form depends on it for success/error toasts.
    // ScrollToTop stays so navigation lands at the top of the page.
    return (
      <>
        <Toaster position="top-center" richColors />
        <ScrollToTop />
        {children}
      </>
    );
  }

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

      {/* Mobile spacer so the fixed call bar never covers the footer */}
      <div className="h-20 md:hidden" aria-hidden="true" />
      <StickyCallBar />
    </div>
  );
}
