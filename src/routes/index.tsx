import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { endpoints } from "@/lib/api";
import {
  Hero,
  ProductCards,
  Highlights,
  RegistrationCertification,
  CustomBrandingTeaser,
  QualityProcess,
  DeliveringLahore,
  WhoWeServe,
  HomeCTA,
} from "@/components/sections/HomeSections";
import { AppSection } from "@/components/sections/AppSection";
import { Newsletter } from "@/components/sections/Newsletter";
import { GoogleReviews } from "@/components/sections/GoogleReviews";

const DEFAULT_TITLE = "ELARA WAVE — Best Mineral Water in Lahore";
const DEFAULT_DESCRIPTION =
  "Premium alkaline & natural mineral water. PFA registered, lab tested, halal certified — delivered fresh across Lahore.";

export const Route = createFileRoute("/")({
  loader: async () => {
    try {
      const seo = await endpoints.seo("/");
      return { seo };
    } catch {
      return { seo: null };
    }
  },
  head: ({ loaderData }) => {
    const title = loaderData?.seo?.title || DEFAULT_TITLE;
    const description = loaderData?.seo?.description || DEFAULT_DESCRIPTION;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: Home,
});

function Home() {
  return (
    <SiteLayout>
      <Hero />
      <Highlights />
      <ProductCards />
      <RegistrationCertification />
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