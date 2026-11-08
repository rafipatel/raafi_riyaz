import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import Observed from "@/components/rollout/Observed";
import SectionHeading from "./SectionHeading";
import { proudFeatured, proudMore, type ProudItem } from "@/data/portfolioData";

const REWARD = 0.1;

const external = (link: string) => (link.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {});

/**
 * Achievements as an episode log: each row is a rewarded episode, and a bar on the
 * right fills as the return accumulates down the list. Smaller wins sit underneath
 * as the replay buffer.
 */
const Rewards = () => {
  const reduce = useReducedMotion();
  const total = proudFeatured.length * REWARD;

  return (
    <section id="rewards" data-state="rewards" className="relative scroll-mt-20 border-t border-ro-line px-4 py-20 sm:px-8">
      <SectionHeading
        kicker="rewards/"
        title="Episodes that paid off"
        right={
          <div className="flex items-baseline gap-2 font-mono">
            <span className="text-xs text-ro-muted">total reward =</span>
            <span className="text-3xl font-bold text-ro-pass">+{total.toFixed(2)}</span>
          </div>
        }
      />

      <Observed label="episode_log" delay={0.05}>
        <ol className="flex flex-col border-t border-ro-line">
          {proudFeatured.map((item: ProudItem, i) => {
            const g = (i + 1) * REWARD;
            const Row = item.link ? "a" : "div";
            return (
              <li key={item.title} className="border-b border-ro-line">
                <Row
                  {...(item.link ? { href: item.link, ...external(item.link) } : {})}
                  className={`group grid grid-cols-[auto_minmax(0,1fr)] items-start gap-x-5 gap-y-3 py-6 md:grid-cols-[56px_minmax(0,1fr)_180px] ${item.link ? "cursor-pointer" : ""}`}
                >
                  <span className="flex flex-col items-start gap-1 font-mono">
                    <span className="text-xs text-ro-muted">ep {String(i + 1).padStart(2, "0")}</span>
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-ro-pass-bg text-ro-pass">
                      <Check className="h-4 w-4" aria-hidden />
                    </span>
                  </span>

                  <span className="flex flex-col gap-1.5">
                    <span className="flex items-start gap-1.5 text-xl font-semibold leading-snug tracking-[-0.01em] transition-colors group-hover:text-ro-acc-text">
                      {item.title}
                      {item.link && <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-ro-muted group-hover:text-ro-acc-text" aria-hidden />}
                    </span>
                    <span className="max-w-[70ch] text-[15px] leading-relaxed text-ro-body">{item.detail}</span>
                  </span>

                  {/* reward and running return */}
                  <span className="col-span-2 flex flex-col gap-1.5 font-mono text-xs md:col-span-1 md:pt-1">
                    <span className="flex justify-between">
                      <span className="text-ro-pass">r = +{REWARD.toFixed(2)}</span>
                      <span className="text-ro-muted">{item.date ?? ""}</span>
                    </span>
                    <span className="h-1.5 overflow-hidden rounded-full bg-ro-track" aria-hidden>
                      <motion.span
                        className="block h-full rounded-full bg-ro-pass"
                        initial={{ width: reduce ? `${(g / total) * 100}%` : "0%" }}
                        whileInView={{ width: `${(g / total) * 100}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                      />
                    </span>
                    <span className="text-ro-muted">total = +{g.toFixed(2)}</span>
                  </span>
                </Row>
              </li>
            );
          })}
        </ol>
      </Observed>

      {/* Smaller wins */}
      <Observed label="replay_buffer.sample()" delay={0.2} className="mt-10">
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {proudMore.map((item) => {
            const inner = (
              <>
                <span className="font-mono text-[11px] text-ro-muted">{item.date}</span>
                <span className="flex items-start gap-1 font-semibold leading-snug group-hover:text-ro-acc-text">
                  {item.title}
                  {item.link && <ArrowUpRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-ro-muted group-hover:text-ro-acc-text" aria-hidden />}
                </span>
                <span className="text-sm leading-relaxed text-ro-body">{item.detail}</span>
              </>
            );
            const cls = "group flex flex-col gap-1.5 rounded-xl bg-ro-inset px-4 py-4 transition-colors";
            return item.link ? (
              <a key={item.title} href={item.link} {...external(item.link)} className={`${cls} hover:bg-ro-tool-bg`}>
                {inner}
              </a>
            ) : (
              <div key={item.title} className={cls}>
                {inner}
              </div>
            );
          })}
        </div>
      </Observed>
    </section>
  );
};

export default Rewards;
