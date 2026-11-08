// Content for the long-form sections of the site (below the hero).
// The site intentionally says more than the CV: only the hero mirrors it.

export const ventures = [
  {
    id: "videovoice",
    name: "VideoVoice",
    role: "Building",
    since: "2025",
    url: "https://videovoice.pages.dev",
    teamUrl: "https://videovoice.pages.dev/team/",
    tagline: "Research engineering the limits of open source in short-form video creation.",
    description:
      "The company itself is run by a team of AI agents, led by an AI CEO.",
    models: ["Vision models", "Language models", "Speech-to-text", "Voice cloning & TTS"],
    agents: [
      "CEO",
      "CTO",
      "CMO",
      "ML/Platform Engineer",
      "Growth Engineer",
      "Head of SEO",
      "Blog Editor",
      "Content Producer",
      "Social Media Manager",
      "Community & Partnerships",
    ],
    points: [] as string[],
    links: [{ label: "videovoice.pages.dev", href: "https://videovoice.pages.dev" }],
  },
  {
    id: "feedhire",
    name: "Feedhire",
    role: "Co-founder",
    since: "Sep 2025",
    url: "https://feedhire.me/",
    tagline: "AI-powered global job discovery.",
    description:
      "A job discovery platform that uses NLP and open-source LLMs to extract and structure job posts automatically. Dockerised backend on Oracle Cloud with logging and monitoring.",
    points: [
      "200+ users across the US, UK and India",
      "Automated job-post extraction with open-source LLMs",
      "Approved for $1,000 in AWS startup credits",
    ],
    links: [{ label: "feedhire.me", href: "https://feedhire.me/" }],
  },
];

/** VideoVoice, with the extra fields its card uses. */
export const videoVoice = ventures[0] as (typeof ventures)[0] & {
  teamUrl: string;
  models: string[];
  agents: string[];
};

export interface TimelineEntry {
  period: string;
  role: string;
  org: string;
  href?: string;
  /** Several organisations, each with its own link, shown separated by a pipe. */
  links?: { label: string; href: string }[];
  tag?: string;
  summary: string;
  points: string[];
  /** Grouped sub-projects, shown collapsed. */
  projects?: { name: string; points: string[] }[];
}

export const timeline: TimelineEntry[] = [
  {
    period: "Now",
    role: "Researcher, scaling laws of agents",
    org: "CAMEL-AI | Eigent AI",
    links: [
      { label: "CAMEL-AI", href: "https://www.camel-ai.org/" },
      { label: "Eigent AI", href: "https://www.eigent.ai/" },
    ],
    tag: "current",
    summary: "Studying, building and researching how agents scale, at a small research lab in London.",
    points: [],
  },
  {
    period: "Apr 2026",
    role: "RL Environment Engineer",
    org: "Tensium",
    summary: "Led RL environment engineering: long-horizon environments for frontier labs.",
    points: [
      "Built long-horizon RL environments in Harbour format with 70–150 causal steps, keeping a 25% pass@8 gap between weaker and frontier models.",
      "Used the HUD platform to design, debug and analyse environments, hardening tasks against oracle leakage, reward hacking, public-data overfitting and shortcut solutions.",
      "Built a PR-triggered QA pipeline with GitHub Actions and an internal harness that runs isolated environment and grader checks and returns pass/block verdicts.",
      "Reviewed and delivered 4 long-horizon tasks in a 20-hour sprint.",
    ],
  },
  {
    period: "Oct 2025",
    role: "Machine Learning Engineer",
    org: "Mercor",
    href: "https://www.mercor.com/",
    summary: "Environments, benchmarks and training data for frontier labs: OpenAI, Anthropic, Google and Meta AI.",
    points: [],
    projects: [
      {
        name: "Coding environments for Anthropic (Claude)",
        points: ["Built coding environments used to train and evaluate Claude."],
      },
      {
        name: "Human feedback data with OpenAI · 7 months",
        points: ["Created human-feedback data for OpenAI models over seven months."],
      },
      {
        name: "Browser-use data for Gemini",
        points: ["Created browser-use data for Google's Gemini."],
      },
      {
        name: "Project Launchpad · extending OpenAI's MLE-bench (Meta AI)",
        points: [
          "Fixed bugs in LLM-generated solutions for complex ML tasks to extend OpenAI's MLE-bench.",
          "Worked in the AIRA-dojo environment on a 6× H100 cluster on AWS.",
          "Produced plan-and-code pairs for post-training and merged 30+ pull requests.",
        ],
      },
      {
        name: "Project Vulcan",
        points: [
          "Turned Kaggle competitions and recent NeurIPS, ICML and ICLR datasets into reproducible, Docker-based evaluation tasks.",
        ],
      },
      {
        name: "Terminal efficiency & SWE benchmarks",
        points: [
          "Solved real software engineering tasks with official documentation only, recreating pre-GPT workflows to build human baselines for model training and evaluation.",
        ],
      },
      {
        name: "Rubrics Academy Fellow",
        points: ["First-principles reasoning and architecture design under a strict no-AI-tools constraint."],
      },
    ],
  },
  {
    period: "Sep 2025",
    role: "Co-founder",
    org: "Feedhire",
    href: "https://feedhire.me/",
    summary: "AI-powered global job discovery platform.",
    points: [
      "Built and dockerised the backend on Oracle Cloud with logging and monitoring.",
      "Grew to 200+ users across the US, UK and India.",
    ],
  },
  {
    period: "Mar – Nov 2025",
    role: "Founding ML Research Engineer",
    org: "Curify-AI",
    href: "https://www.curify-ai.com/en/about",
    summary: "End-to-end video translation: transcription, translation, voice cloning and lip-sync.",
    points: [
      "Built and deployed FastAPI microservices (Chatterbox multilingual TTS, WhisperX, PaddleOCR) with Docker on Azure.",
      "Integrated ElevenLabs and XTTS for voice cloning.",
    ],
  },
  {
    period: "Jul – Oct 2024",
    role: "AI/ML Research Intern",
    org: "City, University of London",
    href: "https://www.city.ac.uk/",
    summary: "Lung cancer survival prediction with clinical and phylogenetic data (TracerX), with Oxford and City researchers.",
    points: [
      "Integrated evolutionary cancer trees with clinical data and compared five modelling approaches.",
      "Presented findings at weekly research meetings; publication in progress.",
    ],
  },
  {
    period: "Sep 2022 – Sep 2023",
    role: "AI Engineer",
    org: "Webomates",
    href: "https://www.webomates.com",
    summary: "AI for software testing, in production.",
    points: [
      "Worked on the AI Defect Predictor: 11× faster releases, 73% fewer production defects and 50% lower costs.",
      "Deployed NLP and computer vision models to production; promoted in month 3 of a 6-month internship.",
    ],
  },
  {
    period: "Oct 2021 – Jan 2022",
    role: "ML Engineer Intern",
    org: "ResoluteAI Software",
    href: "https://resoluteaisoftware.in/",
    summary: "Computer vision for manufacturing.",
    points: ["Built a U-Net to detect defects in fabric videos and led a team of 4 interns on annotation."],
  },
];

export interface FeaturedProject {
  title: string;
  kind: string;
  year: string;
  description: string;
  stack: string[];
  links: { label: string; href: string }[];
}

export const featuredProjects: FeaturedProject[] = [
  {
    title: "MediMind",
    kind: "Hackathon · MongoDB, London",
    year: "2026",
    description:
      "A hands-free ward coordination agent. A nurse speaks, the system remembers and fans out protocols in parallel to the right teams. Memory is infrastructure: LangGraph checkpoints and vector search on MongoDB Atlas.",
    stack: ["LiveKit", "LangGraph", "MongoDB Atlas", "Voyage"],
    links: [
      { label: "Code", href: "https://github.com/rafipatel/mongodb_hackathon" },
      { label: "Demo", href: "https://youtu.be/sYy8DrTpudk" },
    ],
  },
  {
    title: "MedVoice",
    kind: "Hackathon · {Tech: Europe}, solo",
    year: "2026",
    description:
      "Realtime Spanish ↔ English clinical triage. The patient speaks Spanish, the doctor gets a live English transcript and a structured triage summary, and follow-up questions are spoken back in the doctor's own cloned voice. Built solo in about 4 hours.",
    stack: ["Gemini 2.5 Flash", "Gradium STT/TTS", "Voice cloning"],
    links: [{ label: "Code", href: "https://github.com/rafipatel/medvoice" }],
  },
  {
    title: "ConstitutionWatch",
    kind: "AI safety tooling",
    year: "2026",
    description:
      "Tracks every change to frontier AI lab constitutions and model specs, starting with Anthropic's, and delivers diffs and analysis to AI safety researchers. Inspired by the BlueDot community.",
    stack: ["Next.js", "Prisma", "NextAuth"],
    links: [
      { label: "Live", href: "https://ai-constitution-watch.vercel.app" },
      { label: "Code", href: "https://github.com/rafipatel/Ai_constitution_watch" },
    ],
  },
  {
    title: "Transformer vs LeWM",
    kind: "Interactive explainer",
    year: "2026",
    description:
      "Click through how a standard transformer and LeWM, a JEPA world model, each predict the next frame, and why predicting in embedding space beats blurry pixel predictions.",
    stack: ["JEPA", "World models", "Explainer"],
    links: [
      { label: "Live", href: "https://rafipatel.github.io/transformerVsLeWM-JEPA/" },
      { label: "Code", href: "https://github.com/rafipatel/transformerVsLeWM-JEPA" },
    ],
  },
  {
    title: "Lung cancer survival prediction",
    kind: "Research · City, University of London",
    year: "2024",
    description:
      "Integrated evolutionary cancer trees with clinical data from UK Cancer Research's TracerX study to improve survival prediction, with researchers from Oxford and City.",
    stack: ["Survival analysis", "Medical AI", "Python"],
    links: [{ label: "Paper draft", href: "https://drive.google.com/file/d/1cTheOGj38NBJrVf2i9XaaAm81jER86iy/view?usp=sharing" }],
  },
  {
    title: "F1llama",
    kind: "LLM fine-tuning",
    year: "2024",
    description: "Meta-Llama-3-8B fine-tuned with LoRA for Formula 1 knowledge, with 200+ downloads on Hugging Face and a Streamlit chat app.",
    stack: ["Llama 3", "LoRA", "Hugging Face"],
    links: [
      { label: "Model", href: "https://huggingface.co/Rafii/f1llama/" },
      { label: "App code", href: "https://github.com/rafipatel/f1chat" },
    ],
  },
  {
    title: "Free Live Translator",
    kind: "Side project",
    year: "2026",
    description: "A free, real-time Arabic and Turkish voice translator I built so I could follow the talks I attend. No sign-up, just speak.",
    stack: ["Whisper v3", "Web Audio"],
    links: [{ label: "Live", href: "https://rafipatel.github.io/realtime_voice_translator_free/" }],
  },
  {
    title: "Image super-resolution with GANs",
    kind: "Research · MSc",
    year: "2024",
    description: "SRResNet and SRGAN in PyTorch for single-image super-resolution, presenting the first FID baselines for the setup.",
    stack: ["PyTorch", "GANs", "Computer vision"],
    links: [{ label: "Code", href: "https://github.com/rafipatel/Image-Super-Resolution-using-GANs" }],
  },
];

export const toolbox: { group: string; items: string[] }[] = [
  { group: "RL & evaluation", items: ["RL environment design", "Graders & rubrics", "Harbour", "HUD", "MLE-bench", "Reward-hacking defences"] },
  { group: "Models", items: ["PyTorch", "TensorFlow", "Hugging Face", "LoRA fine-tuning", "LangGraph", "Whisper", "Voice cloning / TTS"] },
  { group: "Engineering", items: ["Python", "TypeScript", "FastAPI", "Docker", "GitHub Actions", "MongoDB", "SQL"] },
  { group: "Cloud", items: ["AWS", "Azure", "Oracle Cloud", "H100 clusters"] },
];

export const contact = {
  email: "rafa.works313@gmail.com",
  linkedin: "https://www.linkedin.com/in/raafi-riyaz-bb2954202/",
  github: "https://github.com/rafipatel",
  huggingface: "https://huggingface.co/Rafii",
  x: "https://x.com/rafipatel_rafi",
  location: "London, United Kingdom",
};
