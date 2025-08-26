import CTA from "@/components/site/cta";
import EmpowerBusiness from "@/components/site/emp-business";
import FAQ from "@/components/site/faq";
import Footer from "@/components/site/footer";
import Header from "@/components/site/header";
import Hero from "@/components/site/hero";
import Pricing2 from "@/components/site/pricing";
import EcommercePlatform from "@/components/site/steps";
import Testimonials from "@/components/site/testimonial";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <EmpowerBusiness />
      <EcommercePlatform />
      <Testimonials />
      <Pricing2 isWhatsApp={false} isMembershipInactive={false} />
      <FAQ />
      <CTA />
      <Footer />


    </div>
  );
}
