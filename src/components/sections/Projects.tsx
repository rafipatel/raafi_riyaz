import { ArrowUpRight } from "lucide-react";
import Observed from "@/components/rollout/Observed";
import SectionHeading from "./SectionHeading";
import { featuredProjects } from "@/data/siteContent";

const Projects = () => (
  <section id="projects" data-state="projects" className="mx-auto max-w-[1240px] scroll-mt-20 border-t border-ro-line px-4 py-20 sm:px-8">
    <SectionHeading
      kicker="projects/"
      title="Things I've built"
      sub="Hackathon builds, research, tools and experiments."
    />

    <div className="grid gap-x-5 gap-y-10 md:grid-cols-2">
      {featuredProjects.map((p, i) => (
        <Observed key={p.title} label={`project[${i}]`} delay={(i % 2) * 0.15} className="h-full">
          <article className="flex h-full flex-col gap-3 rounded-2xl border border-ro-line bg-ro-surface p-6 transition-colors hover:border-ro-line2">
            <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs">
              <span className="text-ro-acc-text">{p.kind}</span>
              <span className="text-ro-muted">{p.year}</span>
            </div>
            <h3 className="text-xl font-semibold tracking-[-0.01em]">{p.title}</h3>
            <p className="text-[15px] leading-relaxed text-ro-body">{p.description}</p>
            <div className="flex flex-wrap gap-1.5">
              {p.stack.map((s) => (
                <span key={s} className="rounded-md bg-ro-inset px-2 py-0.5 font-mono text-[11px] text-ro-muted">
                  {s}
                </span>
              ))}
            </div>
            <div className="mt-auto flex flex-wrap gap-x-4 gap-y-2 pt-2 text-sm font-semibold">
              {p.links.map((l) => (
                <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-ro-acc-text hover:underline">
                  {l.label}
                  <ArrowUpRight className="h-4 w-4" aria-hidden />
                </a>
              ))}
            </div>
          </article>
        </Observed>
      ))}
    </div>

  </section>
);

export default Projects;
