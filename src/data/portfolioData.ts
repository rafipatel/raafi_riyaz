// Used by both UI components and AI chatbot knowledge base
import videoTransImg from "@/components/photos/videoTrans.png";
import aiuk2025Img from "@/components/photos/aiuk2025.png";
import nlpchallengeImg from "@/components/photos/nlpchallenge.png";
import srganImg from "@/components/photos/SRGAN.png";

export const personalInfo = {
    name: "Raafi Riyaz",
    displayName: "Raafi Riyaz",
    currentRole: "RL Environment Engineer",
    currentCompany: "Tensium",
    location: "London, United Kingdom",
    totalExperience: "Nearly 2 years",
    projectsCompleted: "25+",
    greeting: "Hello!",
};

export const roles = ["RL Environment Engineer", "ML Engineer", "AI Engineer", "Data Scientist"];

export const tagline = {
    primary: "MSc AI from London | RL Environment Engineer @ Tensium",
    secondary: "With over 2 years of experience",
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
    experience: "2 years",
    address: "London, United Kingdom",
    bio: `MSc Artificial Intelligence graduate from City, University of London, selected for a prestigious ML internship in Lung Cancer Research using UK Cancer Research’s TracerX data.

Nearly 2 years of hands-on experience across AI research and production, with roles at Mercor, Curify-AI, Webomates, and ResoluteAI. I’ve built and deployed real-world ML systems spanning medical AI, computer vision, NLP, and large-scale benchmarks.

Co-founded Feedhire, an AI-powered global job discovery platform using NLP and open-source LLMs, scaled to 1,000+ users across multiple countries.

Strong in Python, PyTorch, TensorFlow, and cloud-based ML, with a research-first mindset and experience building production systems.

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
            "Reviewed and successfully delivered 4 tasks in a 20-hour sprint.",
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

export const socialLinks = {
    linkedin: "https://www.linkedin.com/in/raafi-riyaz-bb2954202/",
    github: "https://github.com/rafipatel",
    repoUrl: "https://github.com/rafipatel/rafi",
    huggingface: "https://huggingface.co/Rafii",
    cv: "https://drive.google.com/file/d/14RZDtNFdu91xZHUsfjDPN7rgwSZjOTuG/view?usp=sharing"
};

export const certifications = [
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
