import { useState } from "react";
import { Moon, Sun } from "lucide-react";
import ResumeModal from "@/components/ResumeModal";
import AgentPanel from "@/components/rollout/AgentPanel";
import type { Selection } from "@/components/rollout/trajectories";
import { useTheme } from "@/components/ThemeProvider";
import { currentStatus, hackathon, proudFeatured, proudMore, socialLinks } from "@/data/portfolioData";

const pill = "inline-flex min-h-[44px] items-center rounded-full border border-ro-line2 px-[18px] text-[15px] hover:border-ro-acc";

const ThemeButton = () => {
  const { theme, setTheme } = useTheme();
  const resolved =
    theme === "system" ? (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark") : theme;
  const next = resolved === "dark" ? "light" : "dark";
  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      aria-label={`Switch to ${next} theme`}
      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ro-line2 hover:border-ro-acc"
    >
      {resolved === "dark" ? <Moon className="h-4 w-4" aria-hidden /> : <Sun className="h-4 w-4" aria-hidden />}
    </button>
  );
};

const BestRollout = () => {
  return (
    <section id="best" className="mx-auto flex max-w-[1240px] scroll-mt-20 flex-wrap items-center gap-9 border-t border-ro-line px-4 py-12 sm:px-8">
      <div className="relative aspect-video min-w-0 flex-[1_1_620px] overflow-hidden rounded-2xl border border-ro-line2 bg-ro-surface">
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
      <div className="flex min-w-0 flex-[1_1_300px] flex-col gap-3">
        <span className="font-mono text-xs text-ro-acc-text">best rollout</span>
        <h2 className="text-4xl font-bold leading-none tracking-[-0.03em] sm:text-[44px]">{hackathon.title}</h2>
        <p className="text-[17px] leading-relaxed text-ro-body">The only solo developer among 150 people competing in teams. One shot, 8 hours hard clock, a working demo at the end. Watch the full build.</p>
        <a href={hackathon.url} target="_blank" rel="noopener noreferrer" className="font-mono text-[13px] text-ro-muted hover:text-ro-fg">
          open on youtube ↗
        </a>
      </div>
    </section>
  );
};

const Index = () => {
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [selection, setSelection] = useState<Selection>("hire");
  const [replayKey, setReplayKey] = useState(0);
  const openCv = () => setIsResumeModalOpen(true);

  return (
    <div className="min-h-screen bg-ro-bg font-sans text-ro-fg transition-colors duration-200">
      <header className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-x-6 gap-y-3 px-4 py-4 sm:px-8">
        <a href="#top" className="font-mono text-sm">
          raafi
        </a>
        <nav aria-label="Primary" className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[15px]">
          <a href="#best" className="text-ro-muted hover:text-ro-fg">Best rollout</a>
          <a href="#rewards" className="text-ro-muted hover:text-ro-fg">Rewards</a>
          <button type="button" onClick={openCv} className="min-h-[40px] rounded-full border border-ro-line2 px-3.5 hover:border-ro-acc">CV</button>
          <ThemeButton />
        </nav>
      </header>

      <main>
        <section id="top" className="mx-auto flex max-w-[1240px] scroll-mt-4 flex-wrap items-start gap-12 px-4 pb-14 pt-8 sm:px-8 md:pt-10">
          <div className="flex min-w-0 flex-[1_1_440px] flex-col gap-6 pt-4">
            <h1 className="text-[44px] font-bold leading-[1] tracking-[-0.04em] sm:text-[60px]">
              I build the worlds frontier agents learn in.
              <span className="mt-2 block text-ro-acc-text">Then I make them unhackable.</span>
            </h1>
            <p className="max-w-[46ch] text-lg leading-relaxed text-ro-body">
              <span className="text-ro-fg">Raafi Riyaz, RL Environment Engineer.</span> Long-horizon tasks for frontier
              labs, MLE-bench with Meta AI, an RL fellowship at General Reasoning. If a model can game the reward, the
              task isn't finished.
            </p>
            <p className="flex max-w-[52ch] flex-wrap items-baseline gap-x-2 gap-y-1 rounded-xl border border-ro-line bg-ro-surface px-4 py-3 text-[15px] leading-relaxed">
              <span className="font-mono text-xs text-ro-pass">● now</span>
              <span>
                {currentStatus.focus} at{" "}
                <a href={currentStatus.link} target="_blank" rel="noopener noreferrer" className="font-semibold text-ro-acc-text underline-offset-4 hover:underline">
                  {currentStatus.org}
                </a>
                <span className="text-ro-body">, London.</span>
              </span>
            </p>
            <div className="flex flex-wrap gap-2.5">
              <button type="button" onClick={openCv} className="inline-flex min-h-[44px] items-center rounded-full bg-ro-acc px-[22px] text-[15px] font-semibold text-ro-acc-ink hover:opacity-90">
                View CV
              </button>
              <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" className={pill}>GitHub</a>
              <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className={pill}>LinkedIn</a>
              <a href={socialLinks.huggingface} target="_blank" rel="noopener noreferrer" className={pill}>Hugging Face</a>
            </div>
            <ul className="flex flex-col gap-2.5 pt-2 font-mono text-[13px] text-ro-muted">
              <li>Press run on the right to watch an agent evaluate me. Then:</li>
              <li><span className="text-ro-acc-text">→</span> click a step to inspect its tool call</li>
              <li><span className="text-ro-acc-text">→</span> try to reward-hack the grader yourself</li>
            </ul>
          </div>
          <AgentPanel
            selection={selection}
            onSelect={setSelection}
            replayKey={replayKey}
            onReplay={() => setReplayKey((k) => k + 1)}
          />
        </section>

        <BestRollout />

        <section id="rewards" className="mx-auto max-w-[1240px] scroll-mt-20 border-t border-ro-line px-4 pb-20 pt-12 sm:px-8">
          <h2 className="mb-5 text-[32px] font-bold tracking-[-0.02em]">Episodes that paid off</h2>
          <ol className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-3">
            {proudFeatured.map((item) => {
              const body = (
                <>
                  <span className="font-mono text-xs text-ro-pass">✓ {item.date ?? "—"}</span>
                  <span className="text-lg font-semibold leading-snug">{item.title}</span>
                  <span className="text-sm leading-relaxed text-ro-body">{item.detail}</span>
                </>
              );
              const cls = "flex h-full flex-col gap-1.5 rounded-2xl border border-ro-line p-[18px]";
              return (
                <li key={item.title}>
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
                </li>
              );
            })}
          </ol>
          <ul className="flex flex-wrap gap-x-7 gap-y-2 pt-5 text-[15px] text-ro-body">
            {proudMore.map((item) => (
              <li key={item.title}>
                {item.title} · {item.date}
              </li>
            ))}
          </ul>
        </section>
      </main>

      <footer id="contact" className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-5 border-t border-ro-line px-4 pb-24 pt-12 sm:px-8">
        <div className="flex flex-col gap-2">
          <span className="font-mono text-[13px] text-ro-muted">episode.end() · terminated=True</span>
          <span className="text-3xl font-bold tracking-[-0.02em]">Building RL environments? Let's talk.</span>
        </div>
        <div className="flex flex-wrap gap-2.5">
          <button type="button" onClick={openCv} className="inline-flex min-h-[44px] items-center rounded-full bg-ro-acc px-5 text-[15px] font-semibold text-ro-acc-ink hover:opacity-90">
            View CV
          </button>
          <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className={pill}>LinkedIn</a>
          <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" className={pill}>GitHub</a>
        </div>
      </footer>

      <ResumeModal isOpen={isResumeModalOpen} onClose={() => setIsResumeModalOpen(false)} />
    </div>
  );
};

export default Index;
