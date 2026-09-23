import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import { experiences, education } from "@/data/portfolioData";

interface ResumeProps {
  onViewResume: () => void;
}

const Resume = ({ onViewResume }: ResumeProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="resume" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-card/50 via-background to-background" />

      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            My <span className="gradient-text">Resume</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            With over 4 years of experience in developing and deploying AI solutions. Specializing in machine learning, computer vision, and NLP.
          </p>
        </motion.div>

        {/* Experience Timeline */}
        <div className="mb-16">
          <motion.h3
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold mb-12 text-center text-primary"
          >
            Experience
          </motion.h3>

          <div className="relative">
            {/* Timeline line */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-primary via-accent to-primary opacity-30" />

            {/* Timeline items */}
            <div className="space-y-12">
              {experiences.map((exp, index) => {
                const isLeft = index % 2 === 0;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: index * 0.15 }}
                    className={`relative flex flex-col md:flex-row ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                      } items-center gap-8`}
                  >
                    {/* Content card */}
                    <div className="w-full md:w-[calc(50%-2rem)]">
                      <div className="glass p-6 rounded-xl hover:shadow-[var(--shadow-elegant)] transition-all duration-300 group">
                        <span className="text-secondary text-sm font-semibold block mb-2">{exp.date}</span>
                        <h4 className="text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">{exp.title}</h4>
                        {exp.link ? (
                          <a href={exp.link} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-accent transition-colors font-medium">
                            {exp.company} →
                          </a>
                        ) : (
                          <span className="text-primary font-medium">{exp.company}</span>
                        )}
                        <ul className="mt-4 space-y-3 text-muted-foreground text-sm">
                          {exp.points.map((point, i) => {
                            const isHeader = point.startsWith('###');
                            const cleanPoint = isHeader ? point.replace('###', '').trim() : point;

                            return (
                              <li key={i} className={`${isHeader ? 'mt-4 first:mt-0' : 'flex'}`}>
                                {isHeader ? (
                                  <h5 className="font-bold text-foreground text-base mb-1">{cleanPoint}</h5>
                                ) : (
                                  <>
                                    <span className="text-primary mr-2 flex-shrink-0">•</span>
                                    <span>{cleanPoint}</span>
                                  </>
                                )}
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </div>

                    {/* Timeline dot */}
                    <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background shadow-lg z-10">
                      <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-75" />
                    </div>

                    {/* Empty space for alternating layout */}
                    <div className="hidden md:block w-[calc(50%-2rem)]" />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Education */}
        <div className="mb-12">
          <motion.h3
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-3xl font-bold mb-8 text-center text-primary"
          >
            Education
          </motion.h3>

          <div className="grid md:grid-cols-3 gap-6">
            {education.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                className="glass p-6 rounded-xl hover:shadow-[var(--shadow-elegant)] transition-all duration-300 group"
              >
                <span className="text-secondary text-sm font-semibold block mb-2">{edu.date}</span>
                <h4 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{edu.title}</h4>
                <p className="text-primary mb-2 font-medium">{edu.institution}</p>
                <p className="text-muted-foreground text-sm">{edu.grade}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* View Resume Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center"
        >
          <Button
            size="lg"
            onClick={onViewResume}
            className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground"
          >
            <FileText className="mr-2 h-5 w-5" />
            View Full Resume
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Resume;