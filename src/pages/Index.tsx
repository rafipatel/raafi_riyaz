import { useState } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Resume from "@/components/Resume";
import Achievements from "@/components/Achievements";
import OpenSourceContributions from "@/components/OpenSourceContributions";
import Projects from "@/components/Projects";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ResumeModal from "@/components/ResumeModal";
import AnimatedBackground from "@/components/AnimatedBackground";
import SourceCodeBadge from "@/components/SourceCodeBadge";

const Index = () => {
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <AnimatedBackground />
      <Navigation />
      <SourceCodeBadge />
      <Hero onViewResume={() => setIsResumeModalOpen(true)} />
      <About />
      <Resume onViewResume={() => setIsResumeModalOpen(true)} />
      <Achievements />
      <OpenSourceContributions />
      <Projects />
      <Certifications />
      <Contact />
      <Footer />
      <ResumeModal isOpen={isResumeModalOpen} onClose={() => setIsResumeModalOpen(false)} />
    </div>
  );
};

export default Index;