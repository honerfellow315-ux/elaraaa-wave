import type { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { WhatsappFloat } from "./WhatsappFloat";
import { VisitorPopup } from "./VisitorPopup";

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-white text-text-dark">
      <Header />
      <main className="pt-20">{children}</main>
      <Footer />
      <WhatsappFloat />
      <VisitorPopup />
    </div>
  );
}
