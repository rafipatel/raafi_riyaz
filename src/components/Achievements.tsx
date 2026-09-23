import { motion } from "framer-motion";
import { useScrollReveal, scrollVariants } from "@/hooks/use-scroll-reveal";
import { Trophy, Award, Target, Briefcase } from "lucide-react";
import InteractiveElement from "@/components/InteractiveElement";

const Achievements = () => {
  const { ref, isInView } = useScrollReveal();

  const achievements = [
    {
      icon: Trophy,
      title: "RL Fellowship at General Reasoning",
      date: "March 2026",
      description: "Offered the Reinforcement Learning Fellowship at General Reasoning, led by Meta Llama's reasoning lead and the founder of Papers with Code, working on RL research and long-horizon reasoning systems.",
      link: "https://gr.inc",
    },
    {
      icon: Target,
      title: "AI UK 2025 Invitation",
      date: "March 2025",
      description: "Invited as AI specialist to AIUK 2025 at The Alan Turing Institute by Harmony research team in recognition of contributions to their mental health production tool. Compensated £1,250 for two-day event.",
      link: "https://www.turing.ac.uk/ai-uk",
    },
    {
      icon: Award,
      title: "NLP Challenge Winner",
      date: "Jan 2025",
      description: "Won Harmony NLP Challenge with £250 prize by improving the algorithm for psychology survey question similarity ratings, reducing MAE from 24 to 20.544. Organised by researchers from UCL, Ulster University, and Fast Data Science.",
      link: "https://harmonydata.ac.uk/matching-challenge-winner-announcement/",
    },
    {
      icon: Trophy,
      title: "Research Internship",
      date: "July 2024",
      description: "Selected for AI/ML Research Internship at City, University of London utilising UK Cancer Research, and TracerX datasets (publication in progress).",
    },
    {
      icon: Briefcase,
      title: "Early Career Offer",
      date: "Jan 2023",
      description: "Offered a full-time role in the 3rd month of a 6-month internship based on exceptional performance and contributions at Webomates, Stamford, USA (remote).",
    },
  ];

  return (
    <section id="achievements" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />
      
      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <motion.div
          initial={scrollVariants.floatUp.initial}
          animate={isInView ? scrollVariants.floatUp.animate : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="gradient-text">Achievements</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon;
            const variant = index % 2 === 0 ? scrollVariants.scattered : scrollVariants.scatteredRight;
            return (
              <InteractiveElement 
                key={index}
                as={achievement.link ? "a" : "div"}
                href={achievement.link}
                target={achievement.link ? "_blank" : undefined}
                rel={achievement.link ? "noopener noreferrer" : undefined}
                className="block"
              >
                <motion.div
                  initial={variant.initial}
                  animate={isInView ? variant.animate : {}}
                  transition={{ 
                    duration: 0.8, 
                    delay: index * 0.12,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  className="glass p-8 rounded-2xl h-full group"
                >
                  <div className="flex items-start space-x-4">
                    <motion.div 
                      className="flex-shrink-0"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:animate-glow-pulse">
                        <Icon className="w-8 h-8 text-primary" />
                      </div>
                    </motion.div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
                        {achievement.title}
                      </h3>
                      <p className="text-secondary text-sm font-semibold mb-3">{achievement.date}</p>
                      <p className="text-muted-foreground leading-relaxed">{achievement.description}</p>
                    </div>
                  </div>
                </motion.div>
              </InteractiveElement>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Achievements;