import { motion } from "framer-motion";
import { useScrollReveal, scrollVariants } from "@/hooks/use-scroll-reveal";
import { MapPin, Phone, Mail, Linkedin, Github } from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";
import InteractiveElement from "@/components/InteractiveElement";


const Contact = () => {
  const { ref, isInView } = useScrollReveal();

  const contactInfo = [
    {
      icon: MapPin,
      title: "Address",
      value: "London, United Kingdom",
    },
    {
      icon: Phone,
      title: "Contact Number",
      value: "+44 777 487 4773",
      link: "tel:+447774874773",
    },
    {
      icon: Mail,
      title: "Email Address",
      value: "rafa.works313@gmail.com",
      link: "mailto:rafa.works313@gmail.com",
    },
  ];

  const socials = [
    {
      icon: Linkedin,
      label: "LinkedIn",
      link: "https://www.linkedin.com/in/raafi-riyaz-bb2954202/",
    },
    {
      icon: FaXTwitter,
      label: "Twitter",
      link: "https://x.com/rafipatel_rafi",
    },
    {
      icon: Github,
      label: "GitHub",
      link: "https://github.com/rafipatel",
    },
    {
      icon: () => <span className="text-2xl">🤗</span>, // Emoji for Hugging Face
      label: "Hugging Face",
      link: "https://huggingface.co/Rafii",
    },
  ];

  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/20 to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsla(173_80%_40%/0.1),transparent_70%)]" />

      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <motion.div
          initial={scrollVariants.floatUp.initial}
          animate={isInView ? scrollVariants.floatUp.animate : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Below are the details to reach out to me!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {contactInfo.map((info, index) => {
            const Icon = info.icon;
            return (
              <InteractiveElement key={index}>
                <motion.div
                  initial={scrollVariants.assemble.initial}
                  animate={isInView ? scrollVariants.assemble.animate : {}}
                  transition={{
                    duration: 0.9,
                    delay: index * 0.15,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  className="glass p-8 rounded-2xl text-center group h-full"
                >
                  <motion.div
                    className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:animate-glow-pulse"
                    whileHover={{ scale: 1.15, rotate: 10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Icon className="w-8 h-8 text-primary" />
                  </motion.div>
                  <h3 className="text-xl font-bold mb-3 text-foreground">{info.title}</h3>
                  {info.link ? (
                    <a
                      href={info.link}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {info.value}
                    </a>
                  ) : (
                    <p className="text-muted-foreground">{info.value}</p>
                  )}
                </motion.div>
              </InteractiveElement>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center"
        >
          <h3 className="text-3xl font-bold mb-8">
            Have a <span className="text-primary">Question?</span>
          </h3>
          <p className="text-muted-foreground mb-6">Find me on</p>
          <div className="flex justify-center gap-4">
            {socials.map((social, index) => {
              const Icon = social.icon;
              return (
                <InteractiveElement
                  key={index}
                  as="a"
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  glowColor="hsl(217 91% 60%)"
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0, rotate: -180 }}
                    animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
                    transition={{
                      duration: 0.7,
                      delay: 0.6 + index * 0.1,
                      ease: [0.22, 1, 0.36, 1]
                    }}
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    className="w-14 h-14 rounded-full glass flex items-center justify-center group"
                    aria-label={social.label}
                  >
                    <Icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
                  </motion.div>
                </InteractiveElement>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;