import { ArrowUpRight, ChevronDown } from "lucide-react";
import Observed from "@/components/rollout/Observed";
import SectionHeading from "./SectionHeading";
import { timeline } from "@/data/siteContent";

/** Career as a trajectory: newest state first, each role a step. */
const Experience = () => (
  <section id="experience" data-state="experience" className="mx-auto max-w-[1240px] scroll-mt-20 border-t border-ro-line px-4 py-20 sm:px-8">
    <SectionHeading
      kicker="trajectory.jsonl"
      title="Experience"
      sub="From computer vision on factory floors to RL environments for frontier labs, newest first."
    />

    <ol className="relative flex flex-col">
      {timeline.map((t, i) => (
        <li key={`${t.org}-${t.role}`} className="grid gap-x-8 gap-y-2 border-t border-ro-line py-8 first:border-t-0 first:pt-0 md:grid-cols-[180px_1fr]">
          <div className="flex items-baseline gap-3 font-mono text-xs md:flex-col md:gap-1.5">
            <span className="text-ro-muted">s{timeline.length - i}</span>
            <span className={t.tag === "current" ? "font-semibold text-ro-pass" : "text-ro-body"}>
              {t.tag === "current" && <span className="mr-1.5 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-ro-pass align-middle" aria-hidden />}
              {t.period}
            </span>
          </div>

          <Observed label={`step(${t.org.toLowerCase().replace(/[^a-z]+/g, "_").replace(/_+$/, "")})`} delay={0.05}>
            <div className="flex max-w-[760px] flex-col gap-3">
              <h3 className="text-xl font-semibold leading-snug sm:text-2xl">
                {t.role}{" "}
                <span className="text-ro-muted">·</span>{" "}
                {t.href ? (
                  <a href={t.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-0.5 text-ro-acc-text hover:underline">
                    {t.org}
                    <ArrowUpRight className="h-4 w-4" aria-hidden />
                  </a>
                ) : (
                  <span className="text-ro-acc-text">{t.org}</span>
                )}
              </h3>
              <p className="leading-relaxed text-ro-body">{t.summary}</p>
              {t.points.length > 0 && (
                <ul className="flex flex-col gap-2">
                  {t.points.map((p) => (
                    <li key={p} className="flex gap-3 text-[15px] leading-relaxed text-ro-body">
                      <span className="mt-2.5 h-1 w-3 shrink-0 rounded-full bg-ro-line2" aria-hidden />
                      {p}
                    </li>
                  ))}
                </ul>
              )}
              {t.projects && (
                <div className="flex flex-col gap-2 pt-1">
                  {t.projects.map((p) => (
                    <details key={p.name} className="group rounded-xl border border-ro-line bg-ro-surface open:bg-ro-surface">
                      <summary className="flex min-h-[44px] cursor-pointer list-none items-center justify-between gap-3 px-4 py-2.5 font-medium [&::-webkit-details-marker]:hidden">
                        {p.name}
                        <ChevronDown className="h-4 w-4 shrink-0 text-ro-muted transition-transform group-open:rotate-180" aria-hidden />
                      </summary>
                      <ul className="flex flex-col gap-2 px-4 pb-4">
                        {p.points.map((pt) => (
                          <li key={pt} className="flex gap-3 text-[15px] leading-relaxed text-ro-body">
                            <span className="mt-2.5 h-1 w-3 shrink-0 rounded-full bg-ro-line2" aria-hidden />
                            {pt}
                          </li>
                        ))}
                      </ul>
                    </details>
                  ))}
                </div>
              )}
            </div>
          </Observed>
        </li>
      ))}
    </ol>
  </section>
);

export default Experience;
