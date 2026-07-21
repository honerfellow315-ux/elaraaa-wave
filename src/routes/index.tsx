import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import {
  Hero,
  ProductCards,
  Highlights,
  CustomBrandingTeaser,
  QualityProcess,
  DeliveringLahore,
  WhoWeServe,
  HomeCTA,
} from "@/components/sections/HomeSections";
import { AppSection } from "@/components/sections/AppSection";
import { Newsletter } from "@/components/sections/Newsletter";
import { GoogleReviews } from "@/components/sections/GoogleReviews";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ELARA WAVE — Best Mineral Water in Lahore" },
      {
        name: "description",
        content:
          "Premium alkaline & natural mineral water. PFA registered, lab tested, halal certified — delivered fresh across Lahore.",
      },
      { property: "og:title", content: "ELARA WAVE — Flow With Freshness" },
      {
        property: "og:description",
        content: "Premium alkaline & mineral water delivered across Lahore.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <SiteLayout>
      <Hero />
      <Highlights />
      <ProductCards />
      <CustomBrandingTeaser />
      <QualityProcess />
      <DeliveringLahore />
      <WhoWeServe />
      <GoogleReviews />
      <HomeCTA />
      <AppSection />
      <Newsletter />
    </SiteLayout>
  );
}
