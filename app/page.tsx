import { CalculateEarnings } from "@/components/calculate-earnings";
import { DiveIntoTheFuture } from "@/components/dive-into-the-future";
import { FaqSection } from "@/components/faq-section";
import { FeaturesSection } from "@/components/features-section";
import { Footer } from "@/components/footer";
import { GetStarted } from "@/components/get-started";
import { HeroSection } from "@/components/hero-section";
import { Newsletter } from "@/components/newsletter";
import { Testimonial } from "@/components/testimonial";
import { navigationConstants } from "@/constants/navigation-link";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <FeaturesSection />
      <GetStarted />
      <DiveIntoTheFuture />
      <Testimonial />
      <FaqSection />
      <CalculateEarnings />
      <Newsletter />
      <Footer navigation={navigationConstants} />
    </div>
  );
}
