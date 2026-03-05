import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Download } from "lucide-react";
import { useState, useEffect } from "react";
import MagneticButton from "@/components/MagneticButton";
import { roles, personalInfo, tagline } from "@/data/portfolioData";
import { SplineScene } from "@/components/ui/splite";
import { Spotlight } from "@/components/ui/spotlight";

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
        setTimeout(() => setCurrentIndex((prev) => prev + 1), 2000);
      }
    }, 150);

    return () => clearInterval(typingInterval);
  }, [currentIndex]);

  return (
    <section
      id="home"
      className="relative w-full h-screen flex overflow-hidden bg-black"
    >
      {/* Ambient glows */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsla(173,80%,40%,0.12),transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,hsla(217,91%,60%,0.10),transparent_55%)] pointer-events-none" />

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{ y: [0, -30, 0], opacity: [0.2, 0.5, 0.2] }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Spotlight */}
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />

      {/* ── Left: text ── */}
      <div className="relative z-10 flex flex-col justify-center w-full md:w-1/2 px-10 md:px-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span className="text-primary text-base font-medium mb-3 block tracking-wide">
            {personalInfo.greeting}
          </span>
          <h1 className="text-5xl md:text-7xl font-bold mb-4 leading-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
              I'm{" "}
            </span>
            <span className="gradient-text">{personalInfo.displayName}</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="h-12 mb-4"
        >
          <h2 className="text-xl md:text-2xl font-semibold text-primary">
            {displayedText}
            <span className="animate-pulse">|</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="space-y-1 mb-10"
        >
          <p className="text-lg md:text-xl text-neutral-200">{tagline.primary}</p>
          <p className="text-sm md:text-base text-neutral-400">{tagline.secondary}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.7 }}
          className="flex flex-wrap gap-3"
        >
          <MagneticButton strength={0.4}>
            <Button
              size="lg"
              variant="outline"
              className="border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white"
              asChild
            >
              <a
                href="https://www.linkedin.com/in/raafi-riyaz-bb2954202/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center"
              >
                <Linkedin className="mr-2 h-5 w-5" />
                LinkedIn
              </a>
            </Button>
          </MagneticButton>

          <MagneticButton strength={0.4}>
            <Button
              size="lg"
              variant="outline"
              className="border-neutral-400 text-neutral-300 hover:bg-neutral-200 hover:text-black"
              asChild
            >
              <a
                href="https://github.com/rafipatel"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center"
              >
                <Github className="mr-2 h-5 w-5" />
                Github
              </a>
            </Button>
          </MagneticButton>

          <MagneticButton strength={0.4}>
            <Button
              size="lg"
              variant="outline"
              className="border-yellow-400 text-yellow-300 hover:bg-yellow-400 hover:text-black"
              asChild
            >
              <a
                href="https://huggingface.co/Rafii"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center"
              >
                <span className="text-xl">🤗</span>
                <span className="ml-2">Hugging Face</span>
              </a>
            </Button>
          </MagneticButton>

          <Button
            size="lg"
            variant="outline"
            className="border-primary/60 text-primary hover:bg-primary hover:text-primary-foreground"
            onClick={onViewResume}
          >
            <Download className="mr-2 h-5 w-5" />
            View CV
          </Button>
        </motion.div>
      </div>

      {/* ── Right: 3D robot ── */}
      <div className="hidden md:block absolute right-0 top-0 w-1/2 h-full">
        <SplineScene
          scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
          className="w-full h-full"
        />
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-3 bg-primary rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;