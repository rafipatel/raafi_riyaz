// Public GitHub repositories (github.com/rafipatel), curated and grouped.
// Built from the GitHub API on 2026-11-07; forks and profile repos left out.

export type RepoCategory = "ai" | "hackathons" | "research" | "websites";

export interface Repo {
  name: string;
  title: string;
  category: RepoCategory;
  description: string;
  language: string;
  year: number;
  url: string;
  homepage?: string;
  /** Shown first within its group. */
  featured?: boolean;
}

export const REPO_CATEGORIES: { id: RepoCategory | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "ai", label: "AI & agents" },
  { id: "hackathons", label: "Hackathons" },
  { id: "research", label: "Research & study" },
  { id: "websites", label: "Websites" },
];

export const repos: Repo[] = [
  {
    "name": "alazhari_academy",
    "title": "Al-Azhari Academy",
    "category": "websites",
    "description": "Website for Al-Azhari Academy.",
    "language": "HTML",
    "year": 2026,
    "url": "https://github.com/rafipatel/alazhari_academy",
    "homepage": "https://rafipatel.github.io/alazhari_academy/"
  },
  {
    "name": "citysport",
    "title": "CitySport",
    "category": "websites",
    "description": "Website for CitySport.",
    "language": "JavaScript",
    "year": 2026,
    "url": "https://github.com/rafipatel/citysport",
    "homepage": "https://rafipatel.github.io/citysport/"
  },
  {
    "name": "Ai_constitution_watch",
    "featured": true,
    "title": "ConstitutionWatch",
    "category": "ai",
    "description": "Monitors frontier AI lab constitutions and model specs, surfaces every change as a diff and sends analysis to AI safety researchers.",
    "language": "TypeScript",
    "year": 2026,
    "url": "https://github.com/rafipatel/Ai_constitution_watch",
    "homepage": "https://ai-constitution-watch.vercel.app"
  },
  {
    "name": "cursor_hackathon",
    "title": "Cursor hackathon",
    "category": "hackathons",
    "description": "Build from the Cursor hackathon in London.",
    "language": "TypeScript",
    "year": 2026,
    "url": "https://github.com/rafipatel/cursor_hackathon"
  },
  {
    "name": "realtime_voice_translator_free",
    "featured": true,
    "title": "Free Live Translator",
    "category": "ai",
    "description": "Free real-time voice translator for Arabic and Turkish, built on Whisper v3, for the sessions I attend.",
    "language": "HTML",
    "year": 2026,
    "url": "https://github.com/rafipatel/realtime_voice_translator_free",
    "homepage": "https://rafipatel.github.io/realtime_voice_translator_free/"
  },
  {
    "name": "makechangecompany",
    "title": "Make Change Company",
    "category": "websites",
    "description": "Website for Make Change Company.",
    "language": "TypeScript",
    "year": 2026,
    "url": "https://github.com/rafipatel/makechangecompany",
    "homepage": "https://makechangecompany.vercel.app"
  },
  {
    "name": "medvoice",
    "featured": true,
    "title": "MedVoice",
    "category": "hackathons",
    "description": "Realtime Spanish ↔ English clinical triage console that speaks back in the doctor's cloned voice. Built solo in about 4 hours at the {Tech: Europe} London AI Hackathon.",
    "language": "HTML",
    "year": 2026,
    "url": "https://github.com/rafipatel/medvoice"
  },
  {
    "name": "mongodb_hackathon",
    "featured": true,
    "title": "MediMind",
    "category": "hackathons",
    "description": "Hands-free ward coordination agent for nurses: voice in, protocols fanned out in parallel, memory and vector search on MongoDB Atlas. MongoDB hackathon, London.",
    "language": "HTML",
    "year": 2026,
    "url": "https://github.com/rafipatel/mongodb_hackathon"
  },
  {
    "name": "sultan_portfolio",
    "title": "Sultan Mo portfolio",
    "category": "websites",
    "description": "Portfolio website for Sultan Mo.",
    "language": "JavaScript",
    "year": 2026,
    "url": "https://github.com/rafipatel/sultan_portfolio",
    "homepage": "http://sultanmo.com/"
  },
  {
    "name": "transformer-pytorch-chatbot",
    "featured": true,
    "title": "Transformer chatbot",
    "category": "research",
    "description": "Seq2Seq and Transformer chatbots in PyTorch with attention, compared side by side.",
    "language": "Jupyter Notebook",
    "year": 2026,
    "url": "https://github.com/rafipatel/transformer-pytorch-chatbot"
  },
  {
    "name": "transformerVsLeWM-JEPA",
    "featured": true,
    "title": "Transformer vs LeWM (JEPA)",
    "category": "research",
    "description": "Interactive explainer comparing a standard transformer with LeWM, a JEPA world model, on next-frame prediction.",
    "language": "HTML",
    "year": 2026,
    "url": "https://github.com/rafipatel/transformerVsLeWM-JEPA",
    "homepage": "https://rafipatel.github.io/transformerVsLeWM-JEPA/"
  },
  {
    "name": "videovoice-site",
    "title": "VideoVoice site",
    "category": "ai",
    "description": "Marketing site for VideoVoice, the short-form AI dubbing engine.",
    "language": "HTML",
    "year": 2026,
    "url": "https://github.com/rafipatel/videovoice-site",
    "homepage": "https://rafipatel.github.io/videovoice-site/"
  },
  {
    "name": "zb_electrical",
    "title": "ZB Electrical",
    "category": "websites",
    "description": "Website for ZB Electrical.",
    "language": "TypeScript",
    "year": 2026,
    "url": "https://github.com/rafipatel/zb_electrical",
    "homepage": "https://zb-electrical.vercel.app"
  },
  {
    "name": "design-ripper",
    "featured": true,
    "title": "design-ripper",
    "category": "ai",
    "description": "Scrapes any web page into an AI-ready design package: screenshots, CSS, assets and a design.md spec an agent can build from.",
    "language": "JavaScript",
    "year": 2026,
    "url": "https://github.com/rafipatel/design-ripper"
  },
  {
    "name": "ors_gsm8k",
    "title": "ors_gsm8k",
    "category": "research",
    "description": "Experiments on GSM8K grade-school maths reasoning.",
    "language": "Python",
    "year": 2026,
    "url": "https://github.com/rafipatel/ors_gsm8k"
  },
  {
    "name": "alhasanmasjid",
    "title": "Al-Hasan Masjid",
    "category": "websites",
    "description": "Community website for Al-Hasan Masjid.",
    "language": "TypeScript",
    "year": 2025,
    "url": "https://github.com/rafipatel/alhasanmasjid"
  },
  {
    "name": "video-translator-app",
    "title": "Video translator app",
    "category": "ai",
    "description": "Python video translation app: transcription, translation and voice cloning.",
    "language": "Python",
    "year": 2025,
    "url": "https://github.com/rafipatel/video-translator-app"
  },
  {
    "name": "groq-proxy",
    "title": "groq-proxy",
    "category": "ai",
    "description": "FastAPI proxy for the Groq API that keeps API keys off the client.",
    "language": "Python",
    "year": 2025,
    "url": "https://github.com/rafipatel/groq-proxy"
  },
  {
    "name": "brain_tumor_detection",
    "title": "Brain tumour detection",
    "category": "research",
    "description": "Coursework for Introduction to AI: classifying brain MRI scans.",
    "language": "Jupyter Notebook",
    "year": 2024,
    "url": "https://github.com/rafipatel/brain_tumor_detection"
  },
  {
    "name": "Deep-Reinforcement-Learning",
    "featured": true,
    "title": "Deep reinforcement learning",
    "category": "research",
    "description": "From tabular Q-learning to DQN and Double DQN with prioritised experience replay.",
    "language": "Jupyter Notebook",
    "year": 2024,
    "url": "https://github.com/rafipatel/Deep-Reinforcement-Learning"
  },
  {
    "name": "f1chat",
    "featured": true,
    "title": "F1llama chat",
    "category": "ai",
    "description": "Streamlit assistant for Formula 1 on top of F1llama, my LoRA-tuned Llama 3 8B.",
    "language": "Python",
    "year": 2024,
    "url": "https://github.com/rafipatel/f1chat"
  },
  {
    "name": "Image-Super-Resolution-using-GANs",
    "featured": true,
    "title": "Image super-resolution (SRGAN)",
    "category": "research",
    "description": "PyTorch SRResNet and SRGAN for single-image super-resolution, with first FID baselines for the task.",
    "language": "Jupyter Notebook",
    "year": 2024,
    "url": "https://github.com/rafipatel/Image-Super-Resolution-using-GANs"
  },
  {
    "name": "MSc-Ai",
    "title": "MSc AI",
    "category": "research",
    "description": "Coursework and projects from the MSc in Artificial Intelligence at City, University of London.",
    "language": "Jupyter Notebook",
    "year": 2024,
    "url": "https://github.com/rafipatel/MSc-Ai"
  },
  {
    "name": "AI_Plays_the_Game-Reinforement-Learning-Model",
    "title": "AI plays the game",
    "category": "research",
    "description": "An early, simple reinforcement learning agent that learns to play a game.",
    "language": "Jupyter Notebook",
    "year": 2022,
    "url": "https://github.com/rafipatel/AI_Plays_the_Game-Reinforement-Learning-Model"
  },
  {
    "name": "Basic-CNN-Model-Python",
    "title": "Basic CNN",
    "category": "research",
    "description": "Image recognition with a convolutional neural network.",
    "language": "Jupyter Notebook",
    "year": 2022,
    "url": "https://github.com/rafipatel/Basic-CNN-Model-Python"
  },
  {
    "name": "Breast-Cancer-Prediction-Web-app",
    "title": "Breast cancer prediction app",
    "category": "research",
    "description": "Classifier for breast cancer diagnosis served as a small web app.",
    "language": "Jupyter Notebook",
    "year": 2022,
    "url": "https://github.com/rafipatel/Breast-Cancer-Prediction-Web-app"
  },
  {
    "name": "Tweets-Sentiment-Analysis",
    "title": "Disaster tweets classification",
    "category": "research",
    "description": "NLP classification of disaster tweets, from a Kaggle competition.",
    "language": "Jupyter Notebook",
    "year": 2022,
    "url": "https://github.com/rafipatel/Tweets-Sentiment-Analysis"
  },
  {
    "name": "LinearRegression-Model-with-EDA-FeatureEngineering-PCA-and-MongoDB",
    "title": "Linear regression with EDA",
    "category": "research",
    "description": "Data queried from MongoDB, explored, feature-engineered with PCA and modelled with linear regression.",
    "language": "Jupyter Notebook",
    "year": 2022,
    "url": "https://github.com/rafipatel/LinearRegression-Model-with-EDA-FeatureEngineering-PCA-and-MongoDB"
  },
  {
    "name": "Personal-Assistant-Python",
    "title": "Personal assistant",
    "category": "research",
    "description": "A basic voice personal assistant in Python.",
    "language": "Python",
    "year": 2022,
    "url": "https://github.com/rafipatel/Personal-Assistant-Python"
  },
  {
    "name": "Spam-Mail-Prediction-python",
    "title": "Spam mail prediction",
    "category": "research",
    "description": "Classifying emails as spam or not spam.",
    "language": "Jupyter Notebook",
    "year": 2022,
    "url": "https://github.com/rafipatel/Spam-Mail-Prediction-python"
  },
  {
    "name": "Complete-TEXT_ANALYSIS-using-Python",
    "title": "Text analysis in Python",
    "category": "research",
    "description": "End-to-end text analysis and NLP feature extraction.",
    "language": "Jupyter Notebook",
    "year": 2022,
    "url": "https://github.com/rafipatel/Complete-TEXT_ANALYSIS-using-Python"
  }
];
