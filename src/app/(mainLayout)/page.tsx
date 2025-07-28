import About from "@/components/Home/About";
import FaqSection from "@/components/Home/FaqSection";
import Hero from "@/components/Home/Hero";
import HowItWorks from "@/components/Home/HowItWorks";
import Pricing from "@/components/Home/Pricing";
import ReferSection from "@/components/Home/ReferSection";
import Service from "@/components/Home/Service";
import TestimonialsSection from "@/components/Home/Testimonial";

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <Hero />
      {/* About Section */}
      <About />
      {/* how it works  */}
      <HowItWorks />
      {/* Service Section */}
      <Service />
      {/* reffersection  */}
      <ReferSection/>
      {/* faq section  */}
      <FaqSection />
      {/* Pricing Section */}
      <Pricing />
      {/* Testimonial Section  */}
      <TestimonialsSection />
    </main>
  );
}
