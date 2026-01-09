import { Header, Navigation, Footer, ScrollToTop } from "../components/layout";
import { Toaster } from "sonner";
import { PAGE_X_PADDING, SHELL_WRAPPER, SHELL_TOP_ACCENT } from "../styles/layoutStyles";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
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
