import { ORG } from "@/data/videoVoice";
/*
 * VideoVoice's AI team as an org chart: an AI CEO on top, a CTO and a CMO under
 * it, and the specialist agents under each.
 */

interface Agent {
  role: string;
}

const CEO: Agent = { role: ORG.ceo };

const BRANCHES: { lead: Agent; reports: Agent[] }[] = ORG.branches.map((b) => ({
  lead: { role: b.lead },
  reports: b.reports.map((role) => ({ role })),
}));


const line = "bg-ro-line2";

const AgentNode = ({ agent, size = "sm" }: { agent: Agent; size?: "lg" | "md" | "sm" }) => (
  <div
    className={`flex w-full flex-col items-center gap-1 rounded-xl border text-center ${
      size === "lg" ? "border-ro-acc bg-ro-tool-bg px-4 py-2.5" : size === "md" ? "border-ro-line2 bg-ro-surface px-3 py-2" : "border-ro-line bg-ro-surface px-1.5 py-2"
    }`}
  >
    <span
      className={`font-semibold leading-tight ${size === "lg" ? "text-lg text-ro-tool-fg" : size === "md" ? "text-[15px]" : "whitespace-nowrap text-[13px] text-ro-body"}`}
    >
      {agent.role}
    </span>
  </div>
);

const VideoVoiceOrgChart = () => {
  const totalReports = BRANCHES.reduce((n, b) => n + b.reports.length, 0);
  // Centre of each branch column, as a % of the chart width (columns are sized by headcount).
  let acc = 0;
  const centres = BRANCHES.map((b) => {
    const w = (b.reports.length / totalReports) * 100;
    const c = acc + w / 2;
    acc += w;
    return c;
  });
  const mid = (centres[0] + centres[centres.length - 1]) / 2;

  return (
    <div>
      <p className="mb-3 text-center font-mono text-xs text-ro-muted">{ORG.label}</p>

      {/* Org chart (tablet and up) */}
      <div className="hidden md:block">
        {/* CEO centred between the CTO and CMO, with rounded elbows leaving its
            left and right sides and dropping onto each lead. */}
        <div className="relative h-[60px]">
          <span
            aria-hidden
            className="absolute bottom-0 top-[22px] rounded-tl-xl border-l border-t "
            style={{ left: `${centres[0]}%`, right: `calc(${100 - mid}% + 80px)`, borderColor: "var(--ro-line2)" }}
          />
          <span
            aria-hidden
            className="absolute bottom-0 top-[22px] rounded-tr-xl border-r border-t"
            style={{ left: `calc(${mid}% + 80px)`, right: `${100 - centres[1]}%`, borderColor: "var(--ro-line2)" }}
          />
          <div className="absolute top-0 w-[160px] -translate-x-1/2" style={{ left: `${mid}%` }}>
            <AgentNode agent={CEO} size="lg" />
          </div>
        </div>

        <div className="relative">
          <div className="flex">
            {BRANCHES.map((b) => (
              <div key={b.lead.role} className="flex flex-col items-center" style={{ flex: b.reports.length }}>
                <div className="w-[150px]">
                  <AgentNode agent={b.lead} size="md" />
                </div>
                <span aria-hidden className={`h-4 w-px ${line}`} />
                <div className="relative w-full">
                  <span
                    aria-hidden
                    className={`absolute top-0 h-px ${line}`}
                    style={{ left: `${50 / b.reports.length}%`, right: `${50 / b.reports.length}%` }}
                  />
                  <div className="flex gap-2 px-1">
                    {b.reports.map((r) => (
                      <div key={r.role} className="flex flex-1 flex-col items-center">
                        <span aria-hidden className={`h-3 w-px ${line}`} />
                        <AgentNode agent={r} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Phones: an indented tree */}
      <ul className="flex flex-col gap-2 md:hidden">
        <li>
          <AgentNode agent={CEO} size="md" />
        </li>
        {BRANCHES.map((b) => (
          <li key={b.lead.role} className="ml-3 flex flex-col gap-2 border-l border-ro-line2 pl-3">
            <AgentNode agent={b.lead} size="md" />
            <ul className="ml-3 grid grid-cols-2 gap-2 border-l border-ro-line2 pl-3">
              {b.reports.map((r) => (
                <li key={r.role}>
                  <AgentNode agent={r} />
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>

    </div>
  );
};

export default VideoVoiceOrgChart;
