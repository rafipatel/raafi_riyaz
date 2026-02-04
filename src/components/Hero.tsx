import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Download } from "lucide-react";
import { useState, useEffect } from "react";
import MagneticButton from "@/components/MagneticButton";
import { roles, personalInfo, tagline, socialLinks } from "@/data/portfolioData";

const HuggingFaceIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 95 88" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M47.21 73.5909C54.2668 73.5909 60 67.8577 60 60.8009C60 53.7441 54.2668 48.0109 47.21 48.0109C40.1532 48.0109 34.42 53.7441 34.42 60.8009C34.42 67.8577 40.1532 73.5909 47.21 73.5909Z" />
    <path d="M81.09 60.8009C81.09 53.7441 75.3568 48.0109 68.3 48.0109C61.2432 48.0109 55.51 53.7441 55.51 60.8009C55.51 67.8577 61.2432 73.5909 68.3 73.5909C75.3568 73.5909 81.09 67.8577 81.09 60.8009Z" />
    <path fillRule="evenodd" clipRule="evenodd" d="M47.5 87.5C74.0767 87.5 95.5 68.6142 95.5 44.5C95.5 20.3858 74.0767 1.5 47.5 1.5C20.9233 1.5 -0.5 20.3858 -0.5 44.5C-0.5 68.6142 20.9233 87.5 47.5 87.5ZM27 61.4109C27 54.3541 32.7332 48.6209 39.79 48.6209C46.8468 48.6209 52.58 54.3541 52.58 61.4109C52.58 68.4677 46.8468 74.2009 39.79 74.2009C32.7332 74.2009 27 68.4677 27 61.4109ZM68.3 48.6209C61.2432 48.6209 55.51 54.3541 55.51 61.4109C55.51 68.4677 61.2432 74.2009 68.3 74.2009C75.3568 74.2009 81.09 68.4677 81.09 61.4109C81.09 54.3541 75.3568 48.6209 68.3 48.6209Z" />
  </svg>
);

interface HeroProps {
  onViewResume: () => void;
}

const Hero = ({ onViewResume }: HeroProps) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const role = roles[currentIndex % roles.length];
    let charIndex = 0;

    const typingInterval = setInterval(() => {
      if (charIndex <= role.length) {
        setDisplayedText(role.substring(0, charIndex));
        charIndex++;
      } else {
        clearInterval(typingInterval);
        setTimeout(() => {
          setCurrentIndex((prev) => prev + 1);
        }, 2000);
      }
    }, 150);

    return () => clearInterval(typingInterval);
  }, [currentIndex]);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsla(173_80%_40%/0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,hsla(217_91%_60%/0.15),transparent_50%)]" />

      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-primary text-lg font-medium mb-4 block">{personalInfo.greeting}</span>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              I'm <span className="gradient-text">{personalInfo.displayName}</span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="h-16 mb-8"
          >
            <h2 className="text-2xl md:text-4xl font-semibold text-primary">
              {displayedText}
              <span className="animate-pulse">|</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="space-y-2 mb-8"
          >
            <p className="text-xl md:text-2xl text-foreground/90">{tagline.primary}</p>
            <p className="text-lg md:text-xl text-muted-foreground">{tagline.secondary}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <MagneticButton strength={0.4}>
              <Button
                size="lg"
                variant="outline"
                className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-400 dark:hover:text-black"
                asChild
              >
                <a href="https://www.linkedin.com/in/raafi-riyaz-bb2954202/" target="_blank" rel="noopener noreferrer" className="flex items-center">
                  <Linkedin className="mr-2 h-5 w-5" />
                  LinkedIn
                </a>
              </Button>
            </MagneticButton>

            <MagneticButton strength={0.4}>
              <Button
                size="lg"
                variant="outline"
                className="border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white dark:border-gray-200 dark:text-gray-200 dark:hover:bg-gray-200 dark:hover:text-black"
                asChild
              >
                <a href="https://github.com/rafipatel" target="_blank" rel="noopener noreferrer" className="flex items-center">
                  <Github className="mr-2 h-5 w-5" />
                  Github
                </a>
              </Button>
            </MagneticButton>

            <MagneticButton strength={0.4}>
              <Button
                size="lg"
                variant="outline"
                className="border-[#FEEA3B] text-[#FEEA3B] hover:bg-[#FEEA3B] hover:text-black dark:border-[#FFD700] dark:text-[#FFD700] dark:hover:bg-[#FFD700] dark:hover:text-black"
                asChild
              >
                <a
                  href="https://huggingface.co/Rafii"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center"
                >
                  <span className="text-2xl">🤗</span>
                  <span className="ml-2">Hugging Face</span>
                </a>
              </Button>
            </MagneticButton>


            <Button
              size="lg"
              variant="outline"
              className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground dark:border-secondary-dark dark:text-secondary-dark dark:hover:bg-secondary-dark/80 dark:hover:text-secondary-foreground"
              onClick={onViewResume}
            >
              <Download className="mr-2 h-5 w-5" />
              View CV
            </Button>




          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-6 h-10 border-2 border-primary rounded-full flex justify-center"
            >
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1 h-3 bg-primary rounded-full mt-2"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;