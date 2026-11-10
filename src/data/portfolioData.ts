// ============================================================================
// EVERYTHING THE SITE SAYS ABOUT RAAFI LIVES IN THIS FILE.
// Edit text here and the page, the agent panel and the chatbot all update.
// Sections follow the page from top to bottom.
//
// Formatting you can use inside text marked "rich":
//   **words**          highlighted (bold or brighter, depending on the spot)
//   [label](url)       a link
//   ==words==          blue accent colour
//
// The VideoVoice diagram (AI team, pipeline steps, models) is in videoVoice.ts.
// The browser tab title and Google/link-preview descriptions are in index.html.
// ============================================================================

import videoTransImg from "@/components/photos/videoTrans.png";
import aiuk2025Img from "@/components/photos/aiuk2025.png";
import nlpchallengeImg from "@/components/photos/nlpchallenge.png";
import srganImg from "@/components/photos/SRGAN.png";

// ---------------------------------------------------------------------------
// 1. CONTACT & LINKS
// ---------------------------------------------------------------------------

export const socialLinks = {
    linkedin: "https://www.linkedin.com/in/raafi-riyaz-bb2954202/",
    github: "https://github.com/rafipatel",
    repoUrl: "https://github.com/rafipatel/rafi",
    huggingface: "https://huggingface.co/Rafii",
    cv: "https://drive.google.com/file/d/14RZDtNFdu91xZHUsfjDPN7rgwSZjOTuG/view?usp=sharing"
};

export const contact = {
    email: "rafa.works313@gmail.com",
    linkedin: socialLinks.linkedin,
    github: socialLinks.github,
    huggingface: socialLinks.huggingface,
    x: "https://x.com/rafipatel_rafi",
    location: "London, United Kingdom",
};

// ---------------------------------------------------------------------------
// 2. HERO (top of the page)
// ---------------------------------------------------------------------------

export const hero = {
    headline: "Text taught language models.",
    headlineAccent: "What will teach agents?",
    /** The two pills under the headline. */
    pills: {
        videovoice: "Building",
        feedhire: "Co-founded",
        feedhireStat: "200+ users",
    },
    /** rich */
    curiosity:
        "The internet was full of text, so language models had plenty to learn from. Agents learn from environments: web pages, phones and computers they can act in. Those interactions were never on the internet, so they have to be built. ==That's what I'm primarily interested in at the moment.==",
    /** rich */
    intro:
        "Currently I'm a contractor at [Eigent AI](https://www.eigent.ai/) | [CAMEL-AI](https://www.camel-ai.org/) in London, where I study, build and research scaling laws of agents. Previously I led RL environment engineering at **Tensium**. As a contractor at [Mercor](https://www.mercor.com/), I built coding environments for Anthropic's Claude, extended OpenAI's MLE-bench, created human-feedback data with OpenAI and computer-use data for Gemini. Offered an RL fellowship at [General Reasoning](https://gr.inc). In the pre-ChatGPT era, I worked for around 2 years in computer vision with [ResoluteAI Software](https://resoluteaisoftware.in/) and natural language processing with [Webomates](https://www.webomates.com/). I have a Master's degree in AI from City, University of London.",
};

// What Raafi is focused on right now (used by the chatbot).
export const currentStatus = {
    focus: "Studying, building and researching scaling laws of agents",
    org: "CAMEL-AI | Eigent AI",
    orgNote: "a research lab in London",
    link: "https://www.camel-ai.org/",
};


// ---------------------------------------------------------------------------
// 3. WHAT I'M BUILDING (ventures)
// ---------------------------------------------------------------------------

export const ventures = [
    {
        id: "videovoice",
        name: "VideoVoice",
        role: "Building",
        since: "2025",
        url: "https://videovoice.pages.dev",
        teamUrl: "https://videovoice.pages.dev/team/",
        tagline: "Research engineering the limits of open source in short-form video creation.",
        taglineAccent: "How far can we go?",
        description: "The company itself is run by a team of AI agents, led by an AI CEO.",
        teamLinkLabel: "See the team log",
        points: [] as string[],
        links: [{ label: "videovoice.pages.dev", href: "https://videovoice.pages.dev" }],
    },
    {
        id: "feedhire",
        name: "Feedhire",
        role: "Co-founder",
        since: "Sep 2025",
        url: "https://feedhire.me/",
        teamUrl: "",
        tagline: "AI-powered global job discovery.",
        taglineAccent: "",
        description:
            "A job discovery platform that uses NLP and open-source LLMs to extract and structure job posts automatically. Dockerised backend on Oracle Cloud with logging and monitoring.",
        teamLinkLabel: "",
        points: [
            "200+ users across the US, UK and India",
            "Automated job-post extraction with open-source LLMs",
            "Approved for $1,000 in AWS startup credits",
        ],
        links: [{ label: "feedhire.me", href: "https://feedhire.me/" }],
    },
];

export const videoVoice = ventures[0];

// ---------------------------------------------------------------------------
// 4. EXPERIENCE (timeline)
// ---------------------------------------------------------------------------

export const experienceSection = {
    title: "Experience",
    sub: "From computer vision and NLP to RL environments for frontier labs, newest first.",
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
    period: "Nov 2026 – Present",
    role: "RL Environment Engineer/Researcher (contract)",
    org: "CAMEL-AI | Eigent AI",
    links: [
      { label: "CAMEL-AI", href: "https://www.camel-ai.org/" },
      { label: "Eigent AI", href: "https://www.eigent.ai/" },
    ],
    tag: "current",
    summary: "Studying, building and researching how agents scale, at a research lab in London.",
    points: [],
  },
  {
    period: "Apr – Oct 2026",
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
    period: "Oct 2025 – Present",
    role: "Machine Learning Engineer",
    org: "Mercor",
    href: "https://www.mercor.com/",
    summary: "Environments, benchmarks and training data for frontier labs: OpenAI, Anthropic, Google and Meta AI. I have worked on over 10 projects across a wide range of domains, ranging from 200 to 100,000+ people.",
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
        name: "Computer-use data for Gemini",
        points: ["Created computer-use data for Google's Gemini."],
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
    period: "Sep 2025 – Present",
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
      "Built a multi-modal pipeline that detects feature changes in web pages from HTML, console logs and screenshots, combining XGBoost, a CNN and a random forest to improve accuracy by 25%.",
      "Replaced Flask-based request handling with AWS SQS, raising efficiency by 30–50%; the approach was adopted across the team.",
      "Deployed and monitored NLP and computer vision models on AWS EC2, and built a Flask app on the OpenAI API to generate and improve test cases.",
      "Offered a full-time role in month 3 of a 6-month internship.",
    ],
  },
  {
    period: "Oct 2021 – Jan 2022",
    role: "ML Engineer Intern",
    org: "ResoluteAI Software",
    href: "https://resoluteaisoftware.in/",
    summary: "Computer vision for manufacturing.",
    points: [
      "Built a U-Net to detect defects in fabric videos, handling video-to-frame conversion, image augmentation, and model training and testing.",
      "Extracted regions of interest and labelled objects using Canny edge detection.",
      "Led a team of 4 interns on image annotation with OpenCV.",
    ],
  },
];


// ---------------------------------------------------------------------------
// 5. HACKATHON VIDEO ("best rollout")
// ---------------------------------------------------------------------------

export const hackathon = {
    title: "4th place at the MongoDB Hackathon",
    caption:
        "A $15,000 hackathon, and I was the only solo developer among 150 people competing in teams. One shot, 8 hours hard clock, a working demo at the end. Watch the full build.",
    videoTitle: "Raafi Riyaz — MongoDB Hackathon, 4th place",
    youtubeId: "sYy8DrTpudk",
    url: "https://youtu.be/sYy8DrTpudk",
};

// ---------------------------------------------------------------------------
// 6. PROJECTS ("Things I've built")
// ---------------------------------------------------------------------------

export const projectsSection = {
    title: "Things I've built",
    sub: "Hackathon builds, research, tools and experiments.",
};

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
    title: "Image Super Resolution using GANs",
    kind: "Research · MSc",
    year: "2024",
    description:
      "Implemented advanced GAN architectures (SRResNet and SRGAN) for image super-resolution, achieving high-quality upscaling of low-resolution images with remarkable detail preservation and also presented the first baselines for the Frechet Inception Distance (FID).",
    stack: ["Computer Vision", "GANs", "Deep Learning"],
    links: [{ label: "Code", href: "https://github.com/rafipatel/Image-Super-Resolution-using-GANs" }],
  },
  {
    title: "Chatbot using Seq2Seq & Transformer",
    kind: "NLP",
    year: "2024",
    description:
      "Employs Seq2Seq and Transformer architectures with attention mechanisms to enable coherent and contextually relevant conversations. Applications span customer service, healthcare, and education sectors.",
    stack: ["NLP", "Transformer", "PyTorch"],
    links: [{ label: "Code", href: "https://github.com/rafipatel/transformer-pytorch-chatbot" }],
  },
  {
    title: "Neural Network from Scratch",
    kind: "Deep learning",
    year: "2024",
    description:
      "Implemented feedforward neural network from scratch using NumPy, exploring architectures, regularization, and optimizers. Built LSTM in PyTorch for temperature forecasting, gaining deeper intuition on neural network behavior and training.",
    stack: ["Deep Learning", "NumPy", "PyTorch"],
    links: [{ label: "Code", href: "https://github.com/yasirbarlas/neural-network-from-scratch" }],
  },
  {
    title: "ConstitutionWatch (prototype for BlueDot's AI Safety Course)",
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
];


// ---------------------------------------------------------------------------
// 7. OPEN SOURCE, WRITING & TALKS
// ---------------------------------------------------------------------------

export const openSourceContributions = [
    {
        title: "Exo (40k+ stars)",
        role: "Contributor",
        date: "Jan 2026",
        description: "Architected multimodal support by integrating **Vision-Language Models**.",
        link: "https://github.com/exo-explore/exo/pull/1080",
    },
    {
        title: "MuseTalk (5k+ stars)",
        role: "Contributor",
        date: "Nov 2025",
        description: "Added **Docker support** deployment support and **FastAPI** serving.",
        link: "https://github.com/TMElyralab/MuseTalk/pull/394",
    },
    {
        title: "Medium Technical Blog",
        role: "Author",
        date: "Feb 2026",
        description: "Published a technical article on **recovering model architecture and fine-tuning PyTorch models from weights alone**",
        link: "https://medium.com/@rafipatel3562/recovering-model-architecture-and-fine-tuning-a-pytorch-model-from-weights-alone-ca3f653f3b8a",
    },
    {
        title: "Guest Speaker at JMI University",
        role: "Guest Speaker",
        date: "Jan 2025",
        description: "**Introduction to RL** session for final-year BTech students in collaboration with Bytes Classes.",
        link: "https://www.linkedin.com/posts/raafi-riyaz-bb2954202_grateful-to-have-recently-delivered-a-activity-7262204530212106243-eMVD",
    },
    {
        title: "Technical Author",
        role: "Author",
        date: "Mar 2023",
        description: "Authored articles for AI in the software testing domain for Webomates, USA.",
        link: "https://www.webomates.com/author/rafi/",
    },
];


// ---------------------------------------------------------------------------
// 8. ACHIEVEMENTS ("Episodes that paid off")
// ---------------------------------------------------------------------------

export interface ProudItem {
    title: string;
    date?: string;
    detail: string;
    link?: string;
}

// The achievements Raafi is proudest of, in his own order.
export const proudFeatured: ProudItem[] = [
    {
        title: "4th place, MongoDB Hackathon",
        detail: "Placed 4th at a $15,000 hackathon as the only solo developer among 150 people competing in teams, in an 8-hour build.",
        link: "#best",
    },
    {
        title: "Offered RL fellowship, General Reasoning",
        date: "Mar 2026",
        detail: "Landed an offer for the RL fellowship at General Reasoning, the startup led by Ross Taylor, focused on RL research and long-horizon reasoning.",
        link: "https://gr.inc",
    },
    {
        title: "Shortlisted, Anthropic RL Safety Research Programme",
        detail: "Shortlisted for Anthropic's research programme on reinforcement-learning safety.",
    },
    {
        title: "Technical AI Safety, BlueDot Impact",
        date: "May 2026",
        detail: "Completed BlueDot's application-based course on alignment and control (60% acceptance rate).",
    },
];

export const proudMore: ProudItem[] = [
    {
        title: "Invited to AI UK 2025 by Harmony",
        date: "Mar 2025",
        detail: "Presented how I fine-tuned language models for Harmony's psychology-survey dataset at The Alan Turing Institute's national showcase. Compensated £1,250 for contributing to mental-health AI research.",
        link: "https://www.turing.ac.uk/ai-uk",
    },
    {
        title: "NLP Challenge Winner",
        date: "Jan 2025",
        detail: "Won the Harmony NLP Challenge with a £250 prize by improving the algorithm for psychology survey question similarity ratings, reducing MAE from 24 to 20.544. Organised by researchers from UCL, Ulster University and Fast Data Science.",
        link: "https://harmonydata.ac.uk/matching-challenge-winner-announcement/",
    },
    {
        title: "Selected for ML research internship, City, University of London",
        date: "Jul 2024",
        detail: "Selected for an AI/ML research internship at City, University of London, using UK Cancer Research and TracerX datasets (publication in progress).",
    },
    {
        title: "Early career offer",
        date: "Jan 2023",
        detail: "Offered a full-time role in the 3rd month of a 6-month internship, based on performance and contributions at Webomates, Stamford, USA (remote).",
    },
];

// ---------------------------------------------------------------------------
// 9. ABOUT
// ---------------------------------------------------------------------------

export const about = {
    photoAlt: "Raafi at the Harmony stand at AI UK 2025, The Alan Turing Institute",
    photoCaption: "AI UK 2025, The Alan Turing Institute, presenting fine-tuned language models for Harmony.",
    /** rich: **words** show in the brighter text colour */
    paragraphs: [
        "**I came to AI through engineering.** A diploma in mechanical engineering, a BSc in IT in Mumbai, then computer vision for detecting fabric defects and AI for software testing in production, where I was offered a full-time role three months into an internship.",
        "An MSc in Artificial Intelligence in London pulled me towards research: lung cancer survival models, GANs, deep RL. Since then I've worked on the data and environments frontier models learn from, at Mercor and Tensium, and now on how agents scale at CAMEL-AI | Eigent AI.",
        "Outside work I build products (VideoVoice, Feedhire), enter hackathons solo, write, and have given a talk introducing RL to final-year students. I speak English, Urdu, Hindi and Marathi.",
    ],
    spokenLanguages: ["English", "Urdu", "Hindi", "Marathi"],
};

export const education = [
    {
        date: "2023-2024",
        title: "Master of Science in Artificial Intelligence (MSc AI)",
        institution: "City, University of London",
        grade: "Grade: Merit",
    },
    {
        date: "2019-2021",
        title: "Bachelor of Science in Information Technology (BSc IT)",
        institution: "University of Mumbai",
        grade: "Grade: Distinction",
    },
    {
        date: "2016-2019",
        title: "Diploma in Mechanical Engineering",
        institution: "Maharashtra State Board",
        grade: "Grade: Distinction",
    },
];

export const certifications = [
    {
        date: "May 2026",
        title: "Technical AI Safety",
        organization: "BlueDot Impact",
        description: "Application-based course on alignment and control.",
    },
    {
        date: "May 2025 - Present",
        title: "AI Agents Course",
        organization: "HuggingFace",
        description: "Advanced training in building autonomous AI agents, learning cutting-edge techniques in agent design, tool use, and multi-agent systems.",
    },
    {
        date: "Aug 2023",
        title: "Langchain for LLM Application Development",
        organization: "DeepLearning.ai",
        description: "Specialized course on building LLM-powered applications using Langchain framework, covering chains, agents, and memory systems.",
    },
    {
        date: "Oct 2022",
        title: "Neural Networks and Deep Learning",
        organization: "DeepLearning.ai, Coursera",
        description: "Comprehensive deep learning specialization covering neural network architectures, backpropagation, and optimization techniques.",
    },
    {
        date: "Jun 2022",
        title: "Machine Learning",
        organization: "Stanford Online (Andrew Ng), Coursera",
        description: "Foundational machine learning course covering supervised learning, unsupervised learning, and best practices in ML.",
    },
    {
        date: "Sep 2022",
        title: "Python Master Certification Course",
        organization: "Perfect E-Learning",
        description: "Advanced Python programming certification covering data structures, OOP, and software development best practices.",
    },
    {
        date: "Jan 2021",
        title: "Python and ML for Data Science",
        organization: "Kaggle",
        description: "Practical course on applying Python and machine learning techniques to data science problems and competitions.",
    },
];

export const toolbox: { group: string; items: string[] }[] = [
  { group: "RL & evaluation", items: ["RL environment design", "Graders & rubrics", "Harbour", "HUD", "MLE-bench", "Reward-hacking defences"] },
  { group: "Models", items: ["PyTorch", "TensorFlow", "Hugging Face", "LoRA fine-tuning", "LangGraph", "Whisper", "Voice cloning / TTS"] },
  { group: "Engineering", items: ["Python", "TypeScript", "FastAPI", "Docker", "GitHub Actions", "MongoDB", "SQL"] },
  { group: "Cloud", items: ["AWS", "Azure", "Oracle Cloud", "H100 clusters"] },
];


// ---------------------------------------------------------------------------
// 10. FOOTER
// ---------------------------------------------------------------------------

export const footer = {
    heading: "Building environments, agents or post-training data? Let's talk.",
};

// ---------------------------------------------------------------------------
// 11. AGENT PANEL (the hero's "Evaluate Raafi" rollout)
// Each object below is shown as the JSON the agent reads.
// ---------------------------------------------------------------------------

export const agentPanel = {
    task: "Evaluate Raafi and return a decision.",
    now: {
        status: "learning",
        focus: ["studying, building and researching scaling laws of agents"],
        lab: "CAMEL-AI | Eigent AI",
        location: "London",
    },
    tensium: {
        role: "RL Environment Engineer",
        work: [
            "Built long-horizon RL environments for frontier labs, with 70–150 causal steps per task.",
            "Kept a 25% pass@8 gap between weaker and frontier models so tasks actually discriminate.",
            "Hardened tasks against oracle leakage, reward hacking, public-data overfitting and shortcuts.",
            "Reviewed and delivered 4 long-horizon tasks in a 20-hour sprint.",
        ],
    },
    mercor: {
        role: "Machine Learning Engineer",
        company: "Mercor",
        since: "Oct 2025",
        work: [
            "Extended OpenAI's MLE-bench, merging 30+ pull requests.",
            "Built terminal-efficiency and SWE benchmarks.",
            "Made coding environments for Anthropic's Claude.",
            "Created human-feedback data with OpenAI for 7 months.",
            "Created computer-use data for Google's Gemini.",
        ],
    },
    education: {
        degree: "MSc Artificial Intelligence",
        university: "City, University of London",
    },
    achievements: [
        "4th place at the MongoDB Hackathon: the only solo developer among 150 people competing in teams, in an 8-hour build.",
        "Offered an RL fellowship at General Reasoning, the startup led by Ross Taylor.",
        "Shortlisted for the Anthropic RL Safety Research Programme.",
        "Completed BlueDot's Technical AI Safety course on alignment and control.",
        "Invited to AI UK 2025 by Harmony to present fine-tuning language models for their dataset.",
        "Won the Harmony NLP Challenge (£250 prize), cutting MAE from 24 to 20.544.",
        "Offered a full-time role in month 3 of a 6-month internship at Webomates.",
        "Selected for an ML research internship at City, University of London.",
    ],
    verdict: "Builds honest RL environments, learns fast and can show his work.",
};

// ---------------------------------------------------------------------------
// 12. CHATBOT ("Ask my agent")
// Its knowledge is built from everything above; these are its own words.
// ---------------------------------------------------------------------------

export const chatbot = {
    greeting:
        "Hi, I'm Raafi's agent. Ask me about his RL environment work, VideoVoice, his projects or his background. You can also paste a job description and I'll tell you how he fits.",
    /** Shown while the first reply loads (the agent's server may be waking up). */
    firstReplyNote: "Waking up the agent. The first reply can take up to 20 seconds; after that it's quick.",
    /** Shown if a later reply takes longer than a few seconds. */
    slowReplyNote: "Still working on it. The model is busy, so this one is taking a little longer.",
    /** One-line summary of what he works on, used in the chatbot's instructions. */
    thesis:
        "Language models learned from the internet's text, but agents learn from trajectories, which the internet never saved; so the environments and tasks that produce good trajectories have to be built. He researches and builds them.",
};

// ============================================================================
// NOT SHOWN ON THE SITE: data from the previous version of the site.
// Nothing reads it any more; kept only for reference. Some of it is out of
// date (for example Feedhire's user count), so don't copy from it.
// ============================================================================

export const personalInfo = {
    name: "Raafi Riyaz",
    displayName: "Raafi Riyaz",
    currentRole: "RL Environment Engineer",
    currentCompany: "Tensium",
    location: "London, United Kingdom",
    totalExperience: "4+ years",
    projectsCompleted: "25+",
    greeting: "Hello!",
};

export const roles = ["RL Environment Engineer", "ML Engineer", "AI Engineer", "Data Scientist"];

export const tagline = {
    primary: "MSc AI from London | RL Environment Engineer @ Tensium",
    secondary: "With over 4 years of experience",
};

export const skills = [
    { name: "Python", level: 95 },
    { name: "Machine Learning", level: 75 },
    { name: "Computer Vision", level: 80 },
    { name: "Natural Language Processing", level: 90 },
    { name: "Reinforcement Learning", level: 50 },
    { name: "Amazon Web Services", level: 70 },
];

export const personalDetails = [
    { label: "Profile", value: "Data Science, Machine Learning & Artificial Intelligence" },
    { label: "Domain", value: "Medical, Ecommerce, Research & Customer Services" },
    { label: "Education", value: "Masters of Science in Artificial Intelligence" },
    { label: "Frameworks", value: "Pytorch, TensorFlow, Flask, FastAPI" },
    { label: "Other Skills", value: "AWS, Azure, MongoDB, Excel, Git, SQL, Kibana" },
    { label: "Interest", value: "Sports, Fitness, Reading" },
    { label: "Language", value: "English, Urdu, Hindi, Marathi" },
];

export const aboutMe = {
    name: "Rafi Riyaz",
    jobRole: "RL Environment Engineer",
    experience: "4 years",
    address: "London, United Kingdom",
    bio: `MSc Artificial Intelligence graduate from City, University of London, selected for a prestigious ML internship in Lung Cancer Research using UK Cancer Research’s TracerX data.

Over 4 years of hands-on experience across AI research and production, with roles at Mercor, Curify-AI, Webomates, and ResoluteAI. I’ve built and deployed real-world ML systems spanning medical AI, computer vision, NLP, and large-scale benchmarks.

Co-founded Feedhire, an AI-powered global job discovery platform using NLP and open-source LLMs, scaled to 1,000+ users across multiple countries.

Strong in Python, PyTorch, TensorFlow, and cloud-based ML, with a research-first mindset and experience building production systems.

Currently studying, building and researching scaling laws of agents at CAMEL-AI | Eigent AI in London.

While I enjoy AI broadly, my primary interests lie in Research AI and Medical AI, where I aim to create meaningful, high-impact solutions.`,
};

export const experiences = [
    {
        date: "Apr 2026 - Present",
        title: "RL Environment Engineer",
        company: "Tensium",
        points: [
            "Created long-horizon reinforcement-learning environments in Harbour format with 70–150 causal steps for frontier labs, maintaining a 25% pass@8 performance gap between weaker and frontier models to ensure meaningful task discrimination.",
            "Used the HUD platform to design, debug, and analyze RL environments, engineering tasks resistant to oracle leakage, reward hacking, public-data overfitting, and shortcut-based solutions while targeting challenging long-horizon reasoning and coding behavior.",
            "Built an automated PR-triggered long-horizon RL QA pipeline with GitHub Actions and an internal harness, running isolated environment/grader checks and surfacing automated pass/block verdicts to replace manual soundness review.",
            "Reviewed and successfully delivered 4 long-horizon tasks in a 20-hour sprint.",
        ],
    },
    {
        date: "Oct 2025 - Present",
        title: "Machine Learning Engineer",
        company: "Mercor",
        link: "https://www.mercor.com/",
        points: [
            "### Software Engineering Efficiency (Project SWE Benchmark)",
            "Selected to evaluate human developer performance on real-world software engineering tasks using only official Python documentation to create high-quality benchmarks for AI models.",
            "Replication of pre-GPT development environment to measure true, documentation-driven coding efficiency for AI model training data.",
            "### Terminal Efficiency v2 (Project TE Benchmark)",
            "Contributed to benchmark creation by solving real-world software engineering tasks using only official documentation, replicating pre-GPT development workflows.",
            "Generated high-quality human performance data used to train and evaluate AI models deployed to millions of users worldwide.",
            "### Rubrics Academy Fellow (Project Rubric)",
            "Focused on complex prompt reasoning and technical problem-solving through first-principles architectural design with strict constraint on using AI tools.",
            "Engaged in rigorous technical challenges focused on first-principles reasoning and human-led architectural design with strict constraint on using AI tools.",
            "### Machine Learning Engineer (Project Launchpad)",
            "Contributed to Meta AI Research’s expansion of OpenAI’s MLE-bench by analyzing buggy code blocks and implementing fixes in LLM-generated solutions for complex ML tasks.",
            "Utilized the AIRA-dojo development environment and Jupiter mega-cluster powered by 6× NVIDIA H100 GPUs on AWS for rapid large-scale experimentation.",
            "Developed high-quality plan-and-code pairs for post-training data and supported collection of debugging traces from fixing LLM-generated Python code.",
            "Merged 30+ pull requests covering task conversions, dataset integrations, bug fixes, and evaluation improvements.",
            "### Machine Learning Engineer (Project Vulcan)",
            "Collaborated with Meta to extend OpenAI’s MLE-bench into a more comprehensive benchmark by transforming Kaggle competitions into reproducible, Docker-based evaluation tasks.",
            "Extended MLE-bench with recent NeurIPS, ICML, and ICLR datasets across computer vision, NLP, time-series, and tabular domains to reflect modern ML challenges.",

        ],
    },

    {
        date: "Sep 2025 - Present",
        title: "Co-founder",
        company: "Feedhire",
        link: "https://feedhire.me/",
        points: [
            "Co-founded an AI-powered global job discovery platform using NLP and open-source LLMs for automated job post extraction.",
            "Built and dockerized backend services for cloud deployment on Oracle, with logging, monitoring, and iterative feature improvements.",
            "Scaled the platform to 1000+ users within 3 months, with active users from the US, UK, and India.",
            "Approved for $1,000 in AWS credits through the Amazon startup program to support cloud infrastructure and scaling."
        ],
    },
    {
        date: "Mar 2025 - Nov 2025",
        title: "Founding ML Research Engineer",
        company: "Curify-AI",
        link: "https://www.curify-ai.com/en/about",
        points: [
            "Implementing end-to-end video translation pipelines with transcription, translation, voice cloning, and lip-sync synchronization.",
            "Built and deployed FastAPI microservices (ChatterBox multilingual TTS, WhisperX transcription, PaddleOCR) with Docker on Azure cloud.",
            "Integrated state-of-the-art models including ElevenLabs and XTTS for voice cloning.",
        ],
    },
    {
        date: "July-Oct 2024",
        title: "Research Intern (AI / ML)",
        company: "City, University of London",
        link: "https://www.city.ac.uk/",
        points: [
            "Integrated clinical and phylogenetic data to enhance machine learning models for predicting survival in lung cancer patients.",
            "Applied 5 different AI/ML model techniques to improve patient's survival prediction.",
            "Presented findings at weekly research meetings and subsequently submitted results (publication in progress).",
        ],
    },
    {
        date: "Sep 2022 - Sep 2023",
        title: "Artificial Intelligence (AI) Engineer",
        company: "Webomates",
        link: "https://www.webomates.com",
        points: [
            "Worked on AI Defect Predictor tool, which led to an 11x increase in release speed, a 73% reduction in production defects, and a 50% reduction in costs.",
            "Deployed multiple NLP and computer vision models, which are currently operational in production.",
            "Recognised for exceptional contributions and promoted by the 3rd month of a 6-month internship.",
        ],
    },
    {
        date: "Oct 2021 - Jan 2022",
        title: "Machine Learning Engineer Intern",
        company: "ResoluteAI Software",
        link: "https://resoluteaisoftware.in/",
        points: [
            "Developed a U-NET Neural Network architecture to detect defects in fabric videos.",
            "Organised a webinar, instructed, and led a team of interns in image annotation tasks.",
        ],
    },
];

export const projects = [
    {
        title: "VideoVoice Cloning & Translation",
        description: "End-to-end video translation and voice cloning pipeline using Whisper large-v3 for transcription, Google Translate, and Chatterbox, Qwen TTS for voice cloning. Supports 23 languages with temporal alignment, voice cloning and automated audio-video synchronization.",
        badges: ["Computer Vision", "NLP", "Voice Clone"],
        link: "https://rafipatel.github.io/VideoVoice/",
        image: videoTransImg,
        date: "December 2025",
    },
    {
        title: "AI UK 2025 Showcase",
        description: "Invited by the Harmony NLP research team to attend AIUK 2025 — the UK's national showcase of AI and data science hosted by The Alan Turing Institute. Compensated £1,250 for contributing to mental health AI research.",
        badges: ["AI UK", "The Alan Turing Institute", "Recognition"],
        link: "https://www.turing.ac.uk/ai-uk",
        image: aiuk2025Img,
        date: "2025",
    },
    {
        title: "NLP Challenge Winner",
        description: "Won Natural Language Processing competition with £250 prize by improving psychology survey question similarity algorithm, reducing MAE from 24 to 20.544. Organized by researchers from UCL, Ulster University, and Fast Data Science.",
        badges: ["NLP", "Competition", "Research"],
        link: "https://harmonydata.ac.uk/matching-challenge-winner-announcement/",
        image: nlpchallengeImg,
    },
    {
        title: "Medical AI Research",
        description: "ML in Lung Cancer research project, led research on integrating evolutionary cancer trees with machine learning for improved lung cancer survival prediction. Collaborated with researchers from Oxford University and City, University of London.",
        badges: ["Machine Learning", "Medical AI", "Research"],
        link: "https://drive.google.com/file/d/1cTheOGj38NBJrVf2i9XaaAm81jER86iy/view?usp=sharing",
        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
    },
    {
        title: "AI Defect Predictor",
        description: "Defect detection in web pages, worked on improvement of an AI system that resulted in faster releases and considerable reduction in production defects. Implemented using AWS services and advanced ML techniques.",
        badges: ["AWS", "Machine Learning", "Production"],
        link: "https://www.webomates.com/aihealing/",
        image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&q=80",
    },
    {
        title: "F1llama - Fine-tuned LLM",
        description: "Fine-tuned Meta-Llama-3-8B model with Low-Rank Adaptation (LoRA) achieving domain-specific adaptability with 200+ downloads. Demonstrates expertise in large language model fine-tuning and deployment.",
        badges: ["LLM", "Fine-tuning", "LoRA"],
        link: "https://huggingface.co/Rafii/f1llama/",
        image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80",
    },
    {
        title: "Image Super Resolution using GANs",
        description: "Implemented advanced GAN architectures (SRResNet and SRGAN) for image super-resolution, achieving high-quality upscaling of low-resolution images with remarkable detail preservation and also presented the first baselines for the Frechet Inception Distance (FID).",
        badges: ["Computer Vision", "GANs", "Deep Learning"],
        link: "https://github.com/rafipatel/Image-Super-Resolution-using-GANs",
        image: srganImg,
    },
    {
        title: "Chatbot using Seq2Seq & Transformer",
        description: "Employs Seq2Seq and Transformer architectures with attention mechanisms to enable coherent and contextually relevant conversations. Applications span customer service, healthcare, and education sectors.",
        badges: ["NLP", "Transformer", "PyTorch"],
        link: "https://github.com/rafipatel/transformer-pytorch-chatbot",
        image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&q=80",
    },
    {
        title: "Neural Network from Scratch",
        description: "Implemented feedforward neural network from scratch using NumPy, exploring architectures, regularization, and optimizers. Built LSTM in PyTorch for temperature forecasting, gaining deeper intuition on neural network behavior and training.",
        badges: ["Deep Learning", "NumPy", "PyTorch"],
        link: "https://github.com/yasirbarlas/neural-network-from-scratch",
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
    },
    {
        title: "Deep Reinforcement Learning",
        description: "Implemented and analyzed reinforcement learning algorithms from Q-learning to DQN and Double DQN with prioritized experience replay. Explored parameter sensitivity, convergence, and transition from tabular methods to deep learning-based RL.",
        badges: ["Reinforcement Learning", "Deep Learning", "Q-Learning"],
        link: "https://github.com/rafipatel/Deep-Reinforcement-Learning/tree/main",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    },
];

export type CurrentItemType = "building" | "reading" | "scaling" | "working" | "fellowship";

export interface CurrentItemData {
    iconName: "brain" | "clapperboard" | "rocket" | "book-open" | "building-2";
    title: string;
    subtitle: string;
    description: string;
    badges: string[];
    link?: string;
    accentColor: string;
    type: CurrentItemType;
}

export const currentlyWorkingOn: CurrentItemData[] = [
    {
        iconName: "building-2",
        title: "Mercor & Tensium — ML/RL Engineer",
        subtitle: "Frontier-model benchmarks and long-horizon RL environments",
        description:
            "At Tensium, creating long-horizon reinforcement-learning environments with 70–150 causal steps, engineered against reward hacking and shortcut solutions, with an automated PR-triggered QA pipeline. At Mercor, contributing to Meta AI's expansion of OpenAI's MLE-bench, building high-quality ML benchmarks across computer vision, NLP, and time-series domains.",
        badges: ["Reinforcement Learning", "RL Environments", "MLE-bench", "Benchmarks", "H100 GPUs"],
        link: "https://www.mercor.com/",
        accentColor: "217 91% 60%",
        type: "working",
    },
    {
        iconName: "clapperboard",
        title: "VideoVoice",
        subtitle: "AI Video Translation & Voice Cloning",
        description:
            "Research-engineering the limits of open source models for single-speaker TTS for Reels, Shorts & TikToks, building a pipeline that ambitiously rivals ElevenLabs with Whisper, Chatterbox, Qwen3-TTS, and real-time voice cloning across 23 languages.",
        badges: ["TTS Research", "Voice Cloning", "Qwen3-TTS", "Open Source"],
        link: "https://rafipatel.github.io/VideoVoice/",
        accentColor: "173 80% 40%",
        type: "building",
    },
    {
        iconName: "rocket",
        title: "Feedhire",
        subtitle: "AI-Powered Global Job Discovery",
        description:
            "Scaling an AI-powered job discovery platform using NLP and open-source LLMs. Now hitting 2000+ global traffic and 200+ registered users across the US, UK, and India with automated job post extraction.",
        badges: ["NLP", "LLMs", "Docker", "Oracle Cloud"],
        link: "https://feedhire.me/",
        accentColor: "38 92% 50%",
        type: "scaling",
    },
    {
        iconName: "book-open",
        title: "AI Engineering",
        subtitle: "by Chip Huyen",
        description:
            "Deep-diving into production AI systems — covering LLM deployment patterns, evaluation frameworks, prompt engineering, and building reliable AI applications at scale.",
        badges: ["LLMs", "MLOps", "Production AI", "Book"],
        link: "https://www.oreilly.com/library/view/ai-engineering/9781098166298/",
        accentColor: "270 70% 55%",
        type: "reading",
    },
];

export const currentTypeLabels: Record<CurrentItemType, string> = {
    fellowship: "Fellowship",
    building: "Building",
    reading: "Reading",
    scaling: "Scaling",
    working: "Working at",
};
