import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { HeroSection } from "../components/home/HeroSection";
import { LiveOpsCounter } from "../components/home/LiveOpsCounter";
import { PainAgitation } from "../components/home/PainAgitation";
import { ServicesCards } from "../components/home/ServicesCards";
import { Testimonials } from "../components/home/Testimonials";
import { HowItWorks } from "../components/home/HowItWorks";
import { FinalCTA } from "../components/home/FinalCTA";

const BASE_URL = "https://skyfreightsquad.com";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Freight Back-Office Built Exclusively for Brokers & 3PLs | SkyFreightSquad" },
      { name: "description", content: "SkyFreightSquad runs 24/7 dispatch, track & trace, billing & customer support inside your TMS and SOPs. Start your 7-day pilot today. No contracts." },
      { property: "og:title", content: "Freight Back-Office Built Exclusively for Brokers & 3PLs | SkyFreightSquad" },
      { property: "og:description", content: "SkyFreightSquad runs 24/7 dispatch, track & trace, billing & customer support inside your TMS and SOPs. Start your 7-day pilot today. No contracts." },
      { property: "og:image", content: "/SkyFreightSquad_Logo_Horizontal_LightBG.png" },
    ],
    links: [
      { rel: "canonical", href: BASE_URL },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": ["Organization", "LocalBusiness"],
          name: "SkyFreightSquad",
          description: "24/7 back-office operations support for freight brokers and 3PL providers including dispatch, track and trace, billing, and customer support.",
          url: BASE_URL,
          logo: `${BASE_URL}/SkyFreightSquad_Logo_Horizontal_LightBG.png`,
          areaServed: "United States",
          serviceType: ["Freight Dispatch", "Track and Trace", "Invoice Processing", "Customer Support"],
          address: { "@type": "PostalAddress", addressCountry: "US" },
          contactPoint: { "@type": "ContactPoint", contactType: "customer service", availableLanguage: "English", hoursAvailable: "Mo-Su 00:00-23:59" },
        }),
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.slice(1);
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, []);

  return (
    <>
      <HeroSection />
      <LiveOpsCounter />
      <PainAgitation />
      <ServicesCards />
      <Testimonials />
      <HowItWorks />
      <FinalCTA />
    </>
  );
}
