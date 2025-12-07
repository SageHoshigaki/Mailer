// app/(site)/LandingPage.jsx
import Hero from "@/components/Hero";
import InfoDiagram from "../InfoDiagram";
import Metrics from "@components/Metrics";
import Nav from "../Nav";
import FooterCTA from "../Footer";
import ValueCTA from "../ValueCta";

export default function LandingPage() {
  return (
    <main className="bg-black min-h-screen text-white">
      <Nav/>
      {/* Hero */}
      <Hero />

      {/* ⬇️ Drop new sections here as we build them */}
      <InfoDiagram/>
      <ValueCTA/>
      {/* <WhySection /> */}
      <Metrics/>
      {/* <FeaturesSection /> */}
      {/* <SocialProof /> */}
      <FooterCTA /> 

    </main>
  );
}