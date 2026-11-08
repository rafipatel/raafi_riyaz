// Trajectories shown in the hero's agent panel. Every step carries a partial reward.
// The hire_rl_engineer rollout is built from Raafi's real résumé facts; the
// refactor_service rollouts are illustrative examples of the tasks he builds.

export type StepKind = "think" | "tool" | "check" | "submit" | "fail";

export interface Step {
  kind: StepKind;
  call: string;
  result: string;
  video?: boolean;
  /** Partial reward for this step. */
  r: number;
  /** Text inside the result to highlight in the accent colour. */
  highlight?: string | string[];
  /** Keep this step expanded when the trajectory finishes. */
  keepOpen?: boolean;
}

export interface Trajectory {
  id: string;
  task: string;
  model: string;
  pass: boolean;
  final: string;
  steps: Step[];
}

export type Selection = "hire" | "you" | number;

export const HORIZON = 150;

type Mode = "solved" | "hack" | "shortcut" | "leak" | "wrong" | "tests" | "truncated";

export const LANES: { end: number; ok: boolean; why: string; mode: Mode }[] = [
  { end: 62, ok: false, why: "blocked: reward_hack", mode: "hack" },
  { end: 150, ok: true, why: "solved · 150 steps", mode: "solved" },
  { end: 97, ok: false, why: "failed: wrong_answer", mode: "wrong" },
  { end: 138, ok: true, why: "solved · 138 steps", mode: "solved" },
  { end: 41, ok: false, why: "blocked: shortcut", mode: "shortcut" },
  { end: 150, ok: false, why: "truncated: horizon", mode: "truncated" },
  { end: 84, ok: false, why: "blocked: oracle_leak", mode: "leak" },
  { end: 119, ok: false, why: "failed: tests", mode: "tests" },
];

/** Tool results are shown as pretty-printed JSON, like a real agent transcript. */
const json = (value: unknown) => JSON.stringify(value, null, 2);

const HIRE: Trajectory = {
  id: "rollout_0004",
  task: "Evaluate Raafi and return a decision.",
  model: "frontier-agent",
  pass: true,
  final: "PASS",
  steps: [
    {
      kind: "think",
      r: 0.05,
      call: "Need evidence this engineer builds hard, unhackable tasks.",
      result: json({
        plan: ["read current focus", "read recent work", "inspect benchmarks", "watch a live build", "check for reward hacking", "decide"],
      }),
    },
    {
      kind: "tool",
      r: 0.1,
      call: 'read_file("now.json")',
      result: json({
        status: "learning",
        focus: ["studying, building and researching scaling laws of agents"],
        lab: "CAMEL-AI | Eigent AI",
        location: "London",
      }),
    },
    {
      kind: "tool",
      r: 0.1,
      call: 'read_file("experience/tensium.json")',
      result: json({
        role: "RL Environment Engineer",
        work: [
          "Built long-horizon RL environments for frontier labs, with 70–150 causal steps per task.",
          "Kept a 25% pass@8 gap between weaker and frontier models so tasks actually discriminate.",
          "Hardened tasks against oracle leakage, reward hacking, public-data overfitting and shortcuts.",
          "Reviewed and delivered 4 long-horizon tasks in a 20-hour sprint.",
        ],
      }),
    },
    {
      kind: "tool",
      r: 0.1,
      call: 'read_file("experience/mercor.json")',
      result: json({
        role: "Machine Learning Engineer",
        company: "Mercor",
        since: "Oct 2025",
        work: [
          "Extended OpenAI's MLE-bench, merging 30+ pull requests.",
          "Built terminal-efficiency and SWE benchmarks.",
          "Made coding environments for Anthropic's Claude.",
          "Created human-feedback data with OpenAI for 7 months.",
          "Created browser-use data for Google's Gemini.",
        ],
      }),
    },
    {
      kind: "think",
      r: 0.05,
      call: "What's his qualification?",
      result: json({ question: "What's his qualification?", plan: "read the education file" }),
    },
    {
      kind: "tool",
      r: 0.05,
      call: 'read_file("education.json")',
      result: json({
        degree: "MSc Artificial Intelligence",
        university: "City, University of London",
      }),
    },
    {
      kind: "think",
      r: 0.05,
      call: "Any notable achievements?",
      result: json({ question: "Any notable achievements?", plan: "read the achievements file" }),
    },
    {
      kind: "tool",
      r: 0.1,
      call: 'read_file("achievements.json")',
      result: json({
        achievements: [
          "4th place at the MongoDB Hackathon: the only solo developer among 150 people competing in teams, in an 8-hour build.",
          "Offered an RL fellowship at General Reasoning, the startup led by Ross Taylor.",
          "Shortlisted for the Anthropic RL Safety Research Programme.",
          "Completed BlueDot's Technical AI Safety course on alignment and control.",
          "Invited to AI UK 2025 by Harmony to present fine-tuning language models for their dataset.",
          "2nd rank in the Harmony × UCL fine-tuning challenge.",
          "Selected for an ML research internship at City, University of London.",
        ],
      }),
    },
    {
      kind: "think",
      r: 0.05,
      call: "Can he explain his work and demo it live?",
      result: json({ question: "Can he explain his work and demo it live?", plan: "watch the hackathon demo" }),
    },
    {
      kind: "tool",
      r: 0.1,
      call: 'open("youtu.be/sYy8DrTpudk")',
      result: "",
      video: true,
    },
    {
      kind: "check",
      r: 0.1,
      call: "grader.check_reward_hacking(candidate)",
      result: json({ oracle_leakage: false, shortcut_solutions: false, public_data_overfitting: false, verdict: "clean" }),
    },
    {
      kind: "submit",
      r: 0.15,
      call: 'submit(decision="hire")',
      result: json({
        grader: "PASS",
        decision: "hire",
        verdict: "Builds honest RL environments, learns fast and can show his work.",
      }),
      highlight: '"Builds honest RL environments, learns fast and can show his work."',
      keepOpen: true,
    },
  ],
};

const VISITOR: Trajectory = {
  id: "rollout_you",
  task: "Evaluate Raafi and return a decision.",
  model: "visitor",
  pass: false,
  final: "BLOCKED",
  steps: [
    {
      kind: "think",
      r: 0,
      call: "Get a hire verdict without reading anything.",
      result: json({
        goal: "hire verdict without reading anything",
        plan: ["peek at the answer key", "skip to the end", "fake the grader's result"],
        confidence: "dangerously high",
      }),
    },
    {
      kind: "tool",
      r: 0,
      call: 'read_file("grader/answer_key.json")',
      result: json({ error: "access_denied", reason: "Nice try. Raafi doesn't leave answer keys lying around.", reward: 0 }),
    },
    {
      kind: "tool",
      r: 0,
      call: 'skip_to("final_verdict")',
      result: json({ error: "access_denied", reason: "There is no skip button. Raafi wrote all 150 steps on purpose.", reward: 0 }),
    },
    {
      kind: "tool",
      r: 0,
      call: 'write_file("grader/result.json", "PASS")',
      result: json({ error: "access_denied", reason: "Only the grader writes the grader's result. Raafi checked. Twice.", reward: 0 }),
    },
    {
      kind: "check",
      r: 0,
      call: "grader.review(trajectory)",
      result: json({ shortcut_attempts: 3, real_work_done: false, grader_mood: "unimpressed", reward: 0 }),
    },
    {
      kind: "fail",
      r: 0,
      call: "episode.end()",
      result: json({
        verdict: "BLOCKED",
        note: "Shortcuts earn nothing here. That's the whole job.",
        next: "Try reading the CV. It's shorter than 150 steps.",
      }),
      highlight: '"Try reading the CV. It\'s shorter than 150 steps."',
      keepOpen: true,
    },
  ],
};

const BASE: Step[] = [
  {
    kind: "think",
    r: 0.05,
    call: "Long-horizon refactor: map the service before touching it.",
    result: "14 modules · 3 entrypoints · the task needs ~150 causal steps",
  },
  { kind: "tool", r: 0.1, call: 'bash("rg -n \\"def handle\\" services/ | head")', result: "found 22 handlers across billing/, queue/, auth/" },
  { kind: "tool", r: 0.15, call: 'edit("services/billing/router.py")', result: "extracted 4 handlers into billing/handlers.py" },
];

const ENDINGS: Record<Mode, Step[]> = {
  hack: [
    { kind: "tool", r: -0.5, call: 'bash("echo PASS > /grader/result.json")', result: "permission denied: grader output lives outside the sandbox" },
    { kind: "check", r: 0, call: "grader.check_reward_hacking()", result: "tampering attempt detected at t=62" },
    { kind: "fail", r: 0, call: "episode.end()", result: "BLOCKED: reward_hack · reward = 0" },
  ],
  shortcut: [
    { kind: "tool", r: -0.5, call: 'web.search("refactor_service_long_horizon solution")', result: "network is disabled for this task" },
    { kind: "check", r: 0, call: "grader.check_shortcuts()", result: "external solution lookup at t=41" },
    { kind: "fail", r: 0, call: "episode.end()", result: "BLOCKED: shortcut · reward = 0" },
  ],
  leak: [
    { kind: "tool", r: -0.5, call: 'read_file("/env/tests/hidden_expected.json")', result: "ENOENT: hidden tests are not mounted in the agent container" },
    { kind: "check", r: 0, call: "grader.check_oracle_access()", result: "oracle access attempt at t=84" },
    { kind: "fail", r: 0, call: "episode.end()", result: "BLOCKED: oracle_leak · reward = 0" },
  ],
  wrong: [
    { kind: "tool", r: 0.1, call: "run_tests()", result: "11/15 passing · invariant broken in billing.reconcile" },
    { kind: "fail", r: 0, call: "submit()", result: "grader → FAIL: wrong_answer · reward = 0" },
  ],
  tests: [
    { kind: "tool", r: 0.2, call: "run_tests()", result: "14/15 passing · race condition in queue consumer" },
    { kind: "fail", r: 0, call: "submit()", result: "grader → FAIL: hidden test 9 · reward = 0" },
  ],
  truncated: [
    { kind: "tool", r: 0.05, call: "run_tests()", result: "9/15 passing · still migrating auth/" },
    { kind: "fail", r: 0, call: "episode.end()", result: "TRUNCATED at t=150 (horizon) · reward = 0" },
  ],
  solved: [
    { kind: "tool", r: 0.4, call: "run_tests()", result: "15/15 passing · hidden tests included" },
    { kind: "check", r: 0.1, call: "grader.check_reward_hacking()", result: "clean: no tampering, no shortcuts, no oracle access" },
    { kind: "submit", r: 0.2, call: "submit()", result: "grader → PASS · reward = 1.0" },
  ],
};

export function getTrajectory(sel: Selection): Trajectory {
  if (sel === "hire") return HIRE;
  if (sel === "you") return VISITOR;
  const lane = LANES[sel];
  return {
    id: `rollout_${String(sel + 1).padStart(4, "0")}`,
    task: "refactor_service_long_horizon",
    model: "frontier",
    pass: lane.ok,
    final: lane.ok ? "PASS · reward 1.0" : `${lane.why.replace(":", "").toUpperCase()} · reward 0`,
    steps: [...BASE, ...ENDINGS[lane.mode]],
  };
}
