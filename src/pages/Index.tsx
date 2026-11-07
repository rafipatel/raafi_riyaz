import { useRef, useState } from "react";
import { MotionConfig, motion, type Variants } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import ResumeModal from "@/components/ResumeModal";
import AgentPanel from "@/components/rollout/AgentPanel";
import BootIntro, { shouldBoot } from "@/components/rollout/BootIntro";
import Observed from "@/components/rollout/Observed";
import { ScrollHUD, useScrollEpisode } from "@/components/rollout/ScrollTrajectory";
import type { Selection } from "@/components/rollout/trajectories";
import { useTheme } from "@/components/ThemeProvider";
import { currentStatus, hackathon, proudFeatured, proudMore, socialLinks } from "@/data/portfolioData";

const EASE = [0.22, 1, 0.36, 1] as const;

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11, delayChildren: 0.05 } },
};
const rise: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};
const word: Variants = {
  hidden: { opacity: 0, y: "0.5em", filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.55, ease: EASE } },
};

/** Headline that arrives word by word. */
const Words = ({ text, className = "" }: { text: string; className?: string }) => (
  <motion.span variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }} className={className}>
    {text.split(" ").map((w, i) => (
      <motion.span key={i} variants={word} className="inline-block whitespace-pre">
        {w + " "}
      </motion.span>
    ))}
  </motion.span>
);

/** Section that fades up as it scrolls into view. */
const Reveal = ({ children, className, id }: { children: React.ReactNode; className: string; id?: string }) => (
  <motion.section
    id={id}
    data-state={id}
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.7, ease: EASE }}
    className={className}
  >
    {children}
  </motion.section>
);

const pill = "inline-flex min-h-[44px] items-center rounded-full border border-ro-line2 px-[18px] text-[15px] hover:border-ro-acc";

const ThemeButton = () => {
  const { theme, setTheme } = useTheme();
  const resolved =
    theme === "system" ? (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark") : theme;
  const isDark = resolved === "dark";
  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label="Dark mode"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative inline-flex h-9 w-[68px] shrink-0 items-center rounded-full border border-ro-line2 bg-ro-surface px-1 hover:border-ro-acc"
    >
      <Sun className={`absolute left-2.5 h-3.5 w-3.5 ${isDark ? "text-ro-muted" : "opacity-0"}`} aria-hidden />
      <Moon className={`absolute right-2.5 h-3.5 w-3.5 ${isDark ? "opacity-0" : "text-ro-muted"}`} aria-hidden />
      <motion.span
        layout
        transition={{ type: "spring", stiffness: 500, damping: 32 }}
        className={`relative z-10 flex h-7 w-7 items-center justify-center rounded-full bg-ro-acc text-ro-acc-ink ${isDark ? "ml-auto" : ""}`}
      >
        {isDark ? <Moon className="h-3.5 w-3.5" aria-hidden /> : <Sun className="h-3.5 w-3.5" aria-hidden />}
      </motion.span>
    </button>
  );
};

const BestRollout = () => {
  return (
    <Reveal id="best" className="relative flex scroll-mt-20 flex-wrap items-center gap-9 border-t border-ro-line py-12 px-4 sm:px-8">
      <Observed label="observe(hackathon_demo.mp4)" reward={0.25} className="min-w-0 flex-[1_1_620px]">
      <div className="relative aspect-video overflow-hidden rounded-2xl border border-ro-line2 bg-ro-surface">
        <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${hackathon.youtubeId}?rel=0`}
            title="Raafi Riyaz — MongoDB Hackathon, 4th place"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
      </div>
      </Observed>
      <Observed label="read(caption)" delay={0.35} className="min-w-0 flex-[1_1_300px]">
      <div className="flex flex-col gap-3">
        <span className="font-mono text-xs text-ro-acc-text">best rollout</span>
        <h2 className="text-4xl font-bold leading-none tracking-[-0.03em] sm:text-[44px]">{hackathon.title}</h2>
        <p className="text-[17px] leading-relaxed text-ro-body">The only solo developer among 150 people competing in teams. One shot, 8 hours hard clock, a working demo at the end. Watch the full build.</p>
        <a href={hackathon.url} target="_blank" rel="noopener noreferrer" className="font-mono text-[13px] text-ro-muted hover:text-ro-fg">
          open on youtube ↗
        </a>
      </div>
      </Observed>
    </Reveal>
  );
};

const Index = () => {
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [selection, setSelection] = useState<Selection>("hire");
  const [replayKey, setReplayKey] = useState(0);
  const [booting, setBooting] = useState(shouldBoot);
  const trackRef = useRef<HTMLDivElement>(null);
  const episode = useScrollEpisode(trackRef);
  const openCv = () => setIsResumeModalOpen(true);
  const stage = booting ? "hidden" : "show";

  return (
    <MotionConfig reducedMotion="user">
    {booting && <BootIntro onDone={() => setBooting(false)} />}
    <div className="min-h-screen bg-ro-bg font-sans text-ro-fg transition-colors duration-200">
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={booting ? { opacity: 0, y: -10 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-x-6 gap-y-3 px-4 py-4 sm:px-8">
        <a href="#top" className="font-mono text-sm">
          raafi
        </a>
        <nav aria-label="Primary" className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[15px]">
          <a href="#best" className="text-ro-muted hover:text-ro-fg">Best rollout</a>
          <a href="#rewards" className="text-ro-muted hover:text-ro-fg">Rewards</a>
          <button type="button" onClick={openCv} className="min-h-[40px] rounded-full border border-ro-line2 px-3.5 hover:border-ro-acc">CV</button>
          <ThemeButton />
        </nav>
      </motion.header>

      <main>
        <section id="top" className="relative isolate mx-auto flex min-h-[calc(100svh-76px)] max-w-[1240px] scroll-mt-4 flex-wrap items-center gap-12 px-4 pb-14 pt-8 sm:px-8 md:pt-10">
          <motion.div variants={stagger} initial="hidden" animate={stage} className="flex min-w-0 flex-[1_1_440px] flex-col gap-6 pt-4">
            <motion.h1 variants={stagger} className="text-[44px] font-bold leading-[1] tracking-[-0.04em] sm:text-[60px]">
              <Words text="Deeply curious about how agents learn." />
              <span className="relative mt-2 block w-fit text-ro-acc-text">
                <Words text={"I work on RL tasks and\u00A0post\u2011training."} />
                <motion.span
                  aria-hidden
                  variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 0.7, delay: 0.5, ease: EASE } } }}
                  className="absolute -bottom-1 left-0 h-[3px] w-full origin-left rounded-full bg-ro-acc"
                />
              </span>
            </motion.h1>
            <motion.p variants={rise} className="max-w-[50ch] text-lg leading-relaxed text-ro-body">
              <span className="text-ro-fg">I'm Raafi Riyaz.</span> I study, build and research scaling laws of agents at{" "}
              <a href={currentStatus.link} target="_blank" rel="noopener noreferrer" className="font-semibold text-ro-acc-text underline-offset-4 hover:underline">
                Eigent AI
              </a>{" "}
              in London. Previously I led RL environment engineering at Tensium and worked on MLE-bench with Meta AI as
              an ML engineer at Mercor. Offered an RL fellowship at General Reasoning. MSc in AI.
            </motion.p>
            <motion.div variants={rise} className="flex flex-wrap gap-2.5">
              <button type="button" onClick={openCv} className="inline-flex min-h-[44px] items-center rounded-full bg-ro-acc px-[22px] text-[15px] font-semibold text-ro-acc-ink hover:opacity-90">
                View CV
              </button>
              <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" className={pill}>GitHub</a>
              <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className={pill}>LinkedIn</a>
              <a href={socialLinks.huggingface} target="_blank" rel="noopener noreferrer" className={pill}>Hugging Face</a>
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.98 }}
            animate={booting ? { opacity: 0, x: 40, scale: 0.98 } : { opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.45, ease: EASE }}
            className="flex min-w-0 flex-[1_1_580px]"
          >
            <AgentPanel
              selection={selection}
              onSelect={setSelection}
              replayKey={replayKey}
              onReplay={() => setReplayKey((k) => k + 1)}
            />
          </motion.div>
        </section>

        <div ref={trackRef} className="relative mx-auto max-w-[1240px]">
        <Reveal id="why" className="relative scroll-mt-20 border-t border-ro-line px-4 py-20 sm:px-8 md:py-28">
          <Observed label="read(why.md)" className="max-w-[900px]">
            <p className="mb-6 font-mono text-xs text-ro-acc-text">why.md</p>
            <p className="text-[28px] font-semibold leading-[1.2] tracking-[-0.02em] sm:text-[40px]">
              <span className="text-ro-muted">Language models learned from text, and the internet was full of it.</span>{" "}
              <span className="text-ro-fg">
                But where do agents learn? From trajectories, and the internet was never built to save them. So who
                builds them?
              </span>{" "}
              <span className="text-ro-acc-text">Can agentic RL take us to AGI?</span>
            </p>
            <p className="mt-6 max-w-[56ch] text-lg leading-relaxed text-ro-body">
              That's what I research and build: the environments and tasks that produce trajectories worth learning from.
            </p>
          </Observed>
        </Reveal>

        <BestRollout />

        <Reveal id="rewards" className="relative scroll-mt-20 border-t border-ro-line pb-20 px-4 pt-12 sm:px-8">
          <h2 className="mb-8 text-[32px] font-bold tracking-[-0.02em]">Episodes that paid off</h2>
          <ol className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-x-4 gap-y-9">
            {proudFeatured.map((item, i) => {
              const body = (
                <>
                  <span className="font-mono text-xs text-ro-pass">✓ {item.date ?? "—"}</span>
                  <span className="text-lg font-semibold leading-snug">{item.title}</span>
                  <span className="text-sm leading-relaxed text-ro-body">{item.detail}</span>
                </>
              );
              const cls = "flex h-full flex-col gap-1.5 rounded-2xl border border-ro-line p-[18px]";
              return (
                <li key={item.title} className="flex">
                  <Observed label={`episode[${i}]`} reward={0.1} delay={i * 0.18} className="w-full">
                  {item.link ? (
                    <a
                      href={item.link}
                      {...(item.link.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className={`${cls} hover:border-ro-acc`}
                    >
                      {body}
                    </a>
                  ) : (
                    <div className={cls}>{body}</div>
                  )}
                  </Observed>
                </li>
              );
            })}
          </ol>
          <Observed label="replay_buffer.sample()" delay={0.2} className="mt-10">
            <ul className="flex flex-wrap gap-x-7 gap-y-2 py-1 text-[15px] text-ro-body">
              {proudMore.map((item) => (
                <li key={item.title}>
                  {item.title} · {item.date}
                </li>
              ))}
            </ul>
          </Observed>
        </Reveal>

      <footer id="contact" data-state="contact" className="relative flex flex-wrap items-center justify-between gap-5 border-t border-ro-line pb-24 px-4 pt-12 sm:px-8">
        <Observed label="episode.end()" reward={0.5}>
        <div className="flex flex-col gap-2">
          <span className="font-mono text-[13px] text-ro-muted">episode.end() · terminated=True</span>
          <span className="text-3xl font-bold tracking-[-0.02em]">Building RL environments? Let's talk.</span>
        </div>
        </Observed>
        <div className="flex flex-wrap gap-2.5">
          <button type="button" onClick={openCv} className="inline-flex min-h-[44px] items-center rounded-full bg-ro-acc px-5 text-[15px] font-semibold text-ro-acc-ink hover:opacity-90">
            View CV
          </button>
          <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className={pill}>LinkedIn</a>
          <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" className={pill}>GitHub</a>
        </div>
      </footer>
        </div>
      </main>

      <ScrollHUD t={episode.t} G={episode.G} event={episode.event} done={episode.done} visible={!booting && episode.t > 4} />

      <ResumeModal isOpen={isResumeModalOpen} onClose={() => setIsResumeModalOpen(false)} />
    </div>
    </MotionConfig>
  );
};

export default Index;
