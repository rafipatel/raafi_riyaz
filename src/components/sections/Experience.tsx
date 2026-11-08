import { ArrowUpRight, ChevronDown } from "lucide-react";
import Observed from "@/components/rollout/Observed";
import SectionHeading from "./SectionHeading";
import { timeline, type TimelineEntry } from "@/data/portfolioData";

const Bullet = ({ children }: { children: string }) => (
  <li className="flex gap-3 text-[15px] leading-relaxed text-ro-body">
    <span className="mt-2.5 h-1 w-3 shrink-0 rounded-full bg-ro-line2" aria-hidden />
    {children}
  </li>
);

/** The organisation name(s), linked where there's a link. */
const Org = ({ t }: { t: TimelineEntry }) => {
  const cls = "inline-flex items-center gap-0.5 text-ro-acc-text hover:underline";
  if (t.links)
    return (
      <>
        {t.links.map((l, j) => (
          <span key={l.href}>
            {j > 0 && <span className="text-ro-muted"> | </span>}
            <a href={l.href} target="_blank" rel="noopener noreferrer" className={cls}>
              {l.label}
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </a>
          </span>
        ))}
      </>
    );
  if (t.href)
    return (
      <a href={t.href} target="_blank" rel="noopener noreferrer" className={cls}>
        {t.org}
        <ArrowUpRight className="h-4 w-4" aria-hidden />
      </a>
    );
  return <span className="text-ro-acc-text">{t.org}</span>;
};

const Card = ({ t, i }: { t: TimelineEntry; i: number }) => {
  const current = t.tag === "current";
  return (
    <Observed label={`step(${t.org.toLowerCase().replace(/[^a-z]+/g, "_").replace(/_+$/, "")})`} delay={0.05}>
      <article className="flex flex-col gap-3 rounded-2xl border border-ro-line bg-ro-surface p-6 transition-colors hover:border-ro-line2">
        <div className="flex items-baseline justify-between gap-3 font-mono text-xs">
          <span className={current ? "font-semibold text-ro-pass" : "text-ro-acc-text"}>{t.period}</span>
          <span className="text-ro-muted">step {timeline.length - i}</span>
        </div>
        <h3 className="text-xl font-semibold leading-snug">
          {t.role}
          <span className="mt-0.5 block text-[17px]">
            <Org t={t} />
          </span>
        </h3>
        <p className="leading-relaxed text-ro-body">{t.summary}</p>
        {t.points.length > 0 && (
          <ul className="flex flex-col gap-2">
            {t.points.map((p) => (
              <Bullet key={p}>{p}</Bullet>
            ))}
          </ul>
        )}
        {t.projects && (
          <div className="flex flex-col gap-2 pt-1">
            <p className="font-mono text-[11px] text-ro-muted">projects</p>
            <ul className="flex flex-col divide-y divide-ro-line border-y border-ro-line">
              {t.projects.map((p) => (
                <li key={p.name}>
                  <details className="group">
                    <summary className="flex cursor-pointer list-none items-start gap-2.5 py-2.5 text-[15px] leading-snug transition-colors hover:text-ro-acc-text [&::-webkit-details-marker]:hidden">
                      <ChevronDown className="mt-0.5 h-4 w-4 shrink-0 -rotate-90 text-ro-muted transition-transform group-open:rotate-0" aria-hidden />
                      <span className="font-medium">{p.name}</span>
                    </summary>
                    <ul className="flex flex-col gap-1.5 pb-3 pl-[26px]">
                      {p.points.map((pt) => (
                        <li key={pt} className="text-sm leading-relaxed text-ro-body">
                          {pt}
                        </li>
                      ))}
                    </ul>
                  </details>
                </li>
              ))}
            </ul>
          </div>
        )}
      </article>
    </Observed>
  );
};

/** The dot on the line, level with the top of its card. */
const Dot = ({ current, className }: { current: boolean; className: string }) => (
  <span
    aria-hidden
    className={`absolute top-7 z-10 h-[15px] w-[15px] rounded-full border-[3px] border-ro-bg ${current ? "bg-ro-pass" : "bg-ro-acc"} ${className}`}
  >
    {current && <span className="absolute inset-0 animate-ping rounded-full bg-ro-pass opacity-60" />}
  </span>
);

/** Career as a trajectory: newest first, in a staggered zig-zag along one line. */
const Experience = () => (
  <section id="experience" data-state="experience" className="mx-auto max-w-[1240px] scroll-mt-20 border-t border-ro-line px-4 py-20 sm:px-8">
    <SectionHeading
      kicker="trajectory.jsonl"
      title="Experience"
      sub="From computer vision on factory floors to RL environments for frontier labs, newest first."
    />

    <div className="relative pl-8 md:pl-0">
      <span aria-hidden className="absolute bottom-0 left-[7px] top-0 w-px bg-gradient-to-b from-ro-acc via-ro-line2 to-ro-line md:left-1/2 md:-translate-x-1/2" />

      {/* Phones: one column, line down the left */}
      <ol className="flex flex-col gap-8 md:hidden">
        {timeline.map((t, i) => (
          <li key={`${t.org}-${t.role}`} className="relative">
            <Dot current={t.tag === "current"} className="-left-8" />
            <Card t={t} i={i} />
          </li>
        ))}
      </ol>

      {/* Tablet and up: two columns either side of the line, the right one starting lower */}
      <div className="hidden md:grid md:grid-cols-2 md:gap-x-16">
        {[0, 1].map((col) => (
          <ol key={col} className={`flex flex-col gap-8 ${col === 1 ? "pt-32" : ""}`}>
            {timeline.map((t, i) =>
              i % 2 === col ? (
                <li key={`${t.org}-${t.role}`} className="relative">
                  <Dot current={t.tag === "current"} className={col === 0 ? "-right-[39.5px]" : "-left-[39.5px]"} />
                  <Card t={t} i={i} />
                </li>
              ) : null,
            )}
          </ol>
        ))}
      </div>
    </div>
  </section>
);

export default Experience;
