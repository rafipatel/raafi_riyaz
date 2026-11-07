import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import Observed from "@/components/rollout/Observed";
import SectionHeading from "./SectionHeading";
import { featuredProjects } from "@/data/siteContent";
import { REPO_CATEGORIES, repos, type RepoCategory } from "@/data/repos";

const LANG_COLOR: Record<string, string> = {
  Python: "#3572A5",
  TypeScript: "#3178C6",
  JavaScript: "#F1E05A",
  "Jupyter Notebook": "#DA5B0B",
  HTML: "#E34C26",
  CSS: "#563D7C",
};

// Strongest work first: hackathon builds and AI tools, then research and study, then websites.
const ORDER: RepoCategory[] = ["hackathons", "ai", "research", "websites"];

const RepoExplorer = () => {
  const [filter, setFilter] = useState<RepoCategory | "all">("all");
  const [showAll, setShowAll] = useState(false);
  const list = useMemo(
    () =>
      repos
        .filter((r) => filter === "all" || r.category === filter)
        .sort(
          (a, b) =>
            ORDER.indexOf(a.category) - ORDER.indexOf(b.category) ||
            Number(!!b.featured) - Number(!!a.featured) ||
            b.year - a.year,
        ),
    [filter],
  );
  const visible = showAll ? list : list.slice(0, 10);

  return (
    <div id="repos" className="scroll-mt-20 pt-16">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
        <div className="flex flex-col gap-2">
          <p className="font-mono text-xs text-ro-acc-text">github.com/rafipatel</p>
          <h3 className="text-2xl font-bold tracking-[-0.02em]">Every public repository</h3>
        </div>
        <div role="tablist" aria-label="Filter repositories" className="flex flex-wrap gap-1.5">
          {REPO_CATEGORIES.map((c) => {
            const count = c.id === "all" ? repos.length : repos.filter((r) => r.category === c.id).length;
            const active = filter === c.id;
            return (
              <button
                key={c.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => {
                  setFilter(c.id);
                  setShowAll(false);
                }}
                className={`min-h-[38px] rounded-full border px-3.5 text-sm transition-colors ${
                  active ? "border-ro-acc bg-ro-acc text-ro-acc-ink" : "border-ro-line2 text-ro-body hover:border-ro-acc hover:text-ro-fg"
                }`}
              >
                {c.label} <span className={active ? "opacity-80" : "text-ro-muted"}>{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      <ul className="overflow-hidden rounded-2xl border border-ro-line">
        <AnimatePresence initial={false}>
          {visible.map((r) => (
            <motion.li
              key={r.name}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="grid gap-x-6 gap-y-1.5 border-b border-ro-line bg-ro-surface px-5 py-4 last:border-b-0 hover:bg-ro-inset md:grid-cols-[minmax(0,240px)_minmax(0,1fr)_190px]"
            >
              <div className="flex min-w-0 flex-col gap-1">
                <a href={r.url} target="_blank" rel="noopener noreferrer" className="truncate font-semibold hover:text-ro-acc-text">
                  {r.title}
                </a>
                <span className="truncate font-mono text-xs text-ro-muted">{r.name}</span>
              </div>
              <p className="text-[15px] leading-relaxed text-ro-body">{r.description}</p>
              <div className="flex items-center gap-4 font-mono text-xs text-ro-muted md:justify-end">
                {r.language && (
                  <span className="inline-flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: LANG_COLOR[r.language] ?? "#8C919A" }} aria-hidden />
                    {r.language}
                  </span>
                )}
                <span>{r.year}</span>
                {r.homepage && (
                  <a href={r.homepage} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-0.5 text-ro-acc-text hover:underline">
                    live <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                  </a>
                )}
                <a href={r.url} target="_blank" rel="noopener noreferrer" aria-label={`${r.title} on GitHub`} className="hover:text-ro-fg">
                  <Github className="h-4 w-4" aria-hidden />
                </a>
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 font-mono text-xs text-ro-muted">
        <span>
          showing {visible.length} of {list.length} · plus private work and contributions to Exo and MuseTalk
        </span>
        {list.length > 10 && (
          <button type="button" onClick={() => setShowAll((s) => !s)} className="min-h-[38px] rounded-full border border-ro-line2 px-4 text-ro-fg hover:border-ro-acc">
            {showAll ? "Show fewer" : `Show all ${list.length}`}
          </button>
        )}
      </div>
    </div>
  );
};

const Projects = () => (
  <section id="projects" data-state="projects" className="mx-auto max-w-[1240px] scroll-mt-20 border-t border-ro-line px-4 py-20 sm:px-8">
    <SectionHeading
      kicker="projects/"
      title="Things I've built"
      sub="Hackathon builds, research, tools and experiments. A CV has room for three of these; this page has room for all of them."
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

    <RepoExplorer />
  </section>
);

export default Projects;
