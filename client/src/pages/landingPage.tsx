import Header from "../components/Header";
import Hero from "../components/Hero";
import HowItWorks from "../components/HowItWorks";
import Testimonials from "../components/Testimonials";
import FaqSection from "../components/FaqSection";
import Footer from "../components/Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-green-500/30 font-sans relative overflow-hidden">
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-green-500/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="relative z-10">
        <Header />
        <Hero />
        <HowItWorks />
        <Testimonials />
        <FaqSection />
        <Footer />
      </div>
    </div>
  );
}
