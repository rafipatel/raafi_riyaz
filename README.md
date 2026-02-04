# Portfolio Website

A modern, responsive portfolio website built with cutting-edge web technologies. This project showcases professional work, projects, and skills with an elegant, high-performance design, with your own free personal AI assistant.

## 🆕 Recent Updates (February 2026)

### Latest Features & Improvements

- **🔐 Pollen API Integration**: Added support for Pollen API with secure credential management
  - GitHub Actions secret: `POLLEN_API_KEY_SECONDARY`
  - Environment-based configuration for secure deployments
  - See [Pollen API Configuration](#pollen-api-configuration) section for setup

- **📊 Enhanced Analytics Setup**: Refactored Google Analytics configuration
  - Moved gtag snippet from hardcoded HTML to environment variables
  - Uses `VITE_GTAG_ID` for build-time injection
  - No measurement IDs in version control - forker-friendly setup
  - See [Configuration for Forkers](#configuration-for-forkers) section

- **🛠️ Improved Development Workflow**: Better environment management
  - Updated `.env.example` with all required API keys
  - Clear documentation for local and production setups
  - GitHub environment variables for CI/CD pipelines



## Overview

This portfolio website is a demonstration of full-stack web development capabilities, featuring:
- **Personal AI Assistant** : Your own personal AI assistant, that answers question on your behalf
- **📊 Google Analytics Integration**: Real-time visitor insights with detailed analytics dashboard showing page visits, user engagement, and geographic distribution by country

- **Modern UI/UX**: Clean, minimalist design with smooth animations and transitions
- **Responsive Design**: Fully responsive across all devices and screen sizes
- **Performance Optimized**: Fast load times and optimized bundle sizes
- **Type-Safe**: Built with TypeScript for robust, maintainable code
- **Styling**: Tailwind CSS for utility-first, scalable styling with Shadcn UI components



## Tech Stack

- **Frontend Framework**: React with Vite for blazing-fast development
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn UI
- **Build Tool**: Vite
- **Package Manager**: Bun

## 📊 Analytics & Insights

This portfolio includes integrated Google Analytics that provides real-time visitor tracking and comprehensive insights:

### Visitor Metrics
- **Active Users**: Track concurrent visitors on the portfolio
- **User Growth**: Monitor growth trends over 90-day periods
- **Geographic Distribution**: See visitor distribution across 60+ countries


### Easy & Free Setup
-   Just 3 lines of code to add Google Analytics — completely free and takes under 5 minutes.
-   Simply create a GA property, copy your Measurement ID, and paste the snippet into your site’s <head> section.

Example (Google Analytics 4):
```
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>

```

### Configuration for Forkers

**Important**: If you fork this repository, you need to replace the Google Analytics measurement ID with your own:

1. **Get Your Measurement ID**:
   - Go to [Google Analytics](https://analytics.google.com/)
   - Create a new GA4 property or use an existing one
   - Copy your Measurement ID (format: `G-XXXXXXXXXX`)

2. **Add to Environment Variables**:
   - Copy `.env.example` to `.env.local`:
     ```bash
     cp .env.example .env.local
     ```
   - Edit `.env.local` and replace the placeholder:
     ```
     VITE_GTAG_ID=G-YOUR_MEASUREMENT_ID_HERE
     ```

3. **Deploy**:
   - The analytics script will be automatically injected during build
   - No hardcoded IDs in the repository
   - Each fork can use its own analytics setup

> **Note**: The `.env.local` file is in `.gitignore` - never commit your analytics ID to version control!

founders).


The analytics dashboard helps understand how visitors interact with the portfolio and which content resonates most with the audience worldwide.

## Getting Started

### Prerequisites

- Node.js (v16 or higher) - [Install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
- npm or Bun

### Installation

1. **Clone the repository**
   ```bash
   git clone <YOUR_GIT_URL>
   cd rafi
   ```

2. **Navigate to project directory**
   ```bash
   cd rafi
   ```

3. **Install dependencies**
   ```bash
   npm install
   # or
   bun install
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   bun run dev
   ```

   The development server will start with hot module reloading (HMR) for instant feedback on changes.

## Development

### Available Scripts

- `npm run dev` - Start development server with HMR
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

### Project Structure

```
rafi/
├── src/              # Source files
│   ├── components/   # React components
│   ├── pages/        # Page components
│   └── App.tsx       # Main application component
├── public/           # Static assets
├── index.html        # HTML entry point
├── tailwind.config.ts  # Tailwind CSS configuration
├── tsconfig.json     # TypeScript configuration
└── vite.config.ts    # Vite configuration
```

## Editing Code

There are several ways to modify and extend this project:

### Local Development with IDE

Clone the repository and use your preferred code editor:

```bash
git clone <YOUR_GIT_URL>
cd rafi
npm install
npm run dev
```

Make changes in your IDE and they will automatically reload in the browser thanks to Vite's HMR.

### GitHub Web Editor

1. Navigate to any file in the repository
2. Click the pencil (edit) icon
3. Make your changes
4. Commit directly to the main branch

### GitHub Codespaces

Develop directly in the browser:

1. Go to the main repository page
2. Click "Code" (green button)
3. Select "Codespaces" tab
4. Click "New codespace"
5. Edit files and commit changes

## Deployment

The project is deployed to GitHub Pages automatically on every commit to the main branch.

### Manual Deployment

```bash
npm run build
```

This creates an optimized production build in the `dist` directory.

### Custom Domain

To connect a custom domain:

1. Update your domain's DNS records to point to GitHub Pages
2. Add the domain in repository settings
3. Enable HTTPS in repository settings

See [GitHub Pages Documentation](https://docs.github.com/en/pages) for detailed instructions.

## Performance

Optimizations included:

- Tree-shaking for minimal bundle size
- Code splitting with Vite
- Lazy loading of components
- Optimized images and assets
- CSS purging with Tailwind

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## AI Tech Stacks

- **Antigravity**: Advanced deployment and infrastructure automation
- **Claude**: AI-powered development assistance and code generation
- **Lovable**: UI/UX design and rapid prototyping

## Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - feel free to use this project as a template or reference.

## Live Demo

Visit the live portfolio: [https://rafipatel.github.io/rafi/](https://rafipatel.github.io/rafi/)

## Support

For issues, questions, or suggestions, please open an issue on GitHub.

## RAFA: AI Profile Assistant with Pollinations.ai & Groq

**RAFA** is an AI-powered assistant system that uses **Pollinations.ai** as its primary provider (Amazon Nova Micro model) and **Groq's lightning-fast LLM inference** as a fallback to answer questions about the portfolio owner's profile and expertise.

### Architecture & Deployment

RAFA operates with a dual-provider robustness:

- **Primary Provider**: **Pollinations.ai** using the `nova-fast` (Amazon Nova Micro) model.
- **Fallback Provider**: **Groq API** using the `llama-3.3-70b-versatile` model.
- **Frontend**: This portfolio website (React + Vite) is deployed on **GitHub Pages** as a static site.
- **Dynamic Feedback**: The UI dynamically displays which model and provider is currently powering the conversation.

### Groq Integration

**Groq** provides:
- Ultra-fast LLM inference (token generation in milliseconds)
- Free tier for development and testing
- Seamless integration with popular LLM models
- Perfect for building responsive AI applications

### How RAFA Works

1. **Profile Context**: RAFA is trained/fine-tuned with information about your skills, experience, and projects
2. **Query Processing**: When asked questions about your profile, RAFA uses Groq to generate contextual responses
3. **Real-time Responses**: Groq's speed enables instant, conversational replies

### Integration with Portfolio

When this portfolio evolves to include interactive features:

```
User Query on Portfolio
        |
        v
RAFA AI System (Groq Backend)
        |
        v
Instant Response
```

### Tech Stack for RAFA

- **LLM Provider**: Groq (free tier)
- **Inference Speed**: ~10x faster than traditional cloud LLMs
- **Use Case**: Profile Q&A, skill-based recommendations, experience highlights
- **Deployment**: Serverless or containerized backend (separate from GitHub Pages)

### Current Setup

This portfolio is currently a **frontend-only static site on GitHub Pages**. RAFA integration would require:
- Backend API service (Node.js, Python, etc.)
- Groq API key for authentication
- API endpoint for portfolio to call RAFA
- Database for storing refined profile context
- 
### Backend Hosting & API Credentials

The RAFA backend is deployed on **Render** (free tier) as a FastAPI application.

**Repository**: [rafipatel/groq-proxy](https://github.com/rafipatel/groq-proxy)  
**Hosted On**: Render (Free Plan)  
**Backend Service URL++: Set via environment variable `VITE_RAFA_API_URL`

#### API Endpoints

| Endpoint | Method | Purpose |
|----------|--------|----------|
| `/chat` | POST | Send messages to RAFA, get AI responses |
| `/get-key` | GET | Retrieve Groq API key (for authenticated clients) |
| `/docs` | GET | Interactive API documentation (Swagger UI) |
| `/redoc` | GET | ReDoc API documentation |

#### API Credentials

**Environment Variables** (stored securely on Render):

```bash
GROQ_API_KEY=<your-groq-api-key>
```
#### Frontend Configuration

**For local development**, copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
# Edit .env.local and add your API keys
VITE_POLLEN_API_KEY_SECONDARY=your_pollinations_api_key
VITE_GROQ_API_KEY=your_groq_api_key
```

**Note**: The Pollinations API key is used as the primary driver for text completions, with Groq acting as a high-performance fallback if the primary service is unavailable or rate-limited.

**Note**: `.env.local` is in `.gitignore` and should never be committed to version control.

**Groq API Key**:
- Obtained from [Groq Console](https://console.groq.com/keys)
- Uses `llama-3.3-70b-versatile` model (free tier available)
- Requires signing up at console.groq.com

#### Backend & API Architecture

```
Portfolio (Frontend - GitHub Pages)
    |
    |---[ Try Primary: Pollinations AI (nova-fast) ]
    |       |
    |       |--- Success: Display Response (Pollinations AI)
    |       |
    |       |--- Failure: Log Error & Trigger Fallback
    |               |
    |               v
    |---[ Fallback: Groq LLM API (llama-3.3-70b-versatile) ]
            |
            |--- Success: Display Response (Groq)
            |--- Failure: Display User-facing Error
```

#### How to Deploy Your Own RAFA Backend

1. **Clone groq-proxy repo**:
   ```bash
   git clone https://github.com/rafipatel/groq-proxy.git
   ```

2. **Set up Render account**:
   - Go to [render.com](https://render.com)
   - Connect your GitHub account
   - Create a new Web Service from your groq-proxy fork

3. **Configure environment variables** on Render:
   - Set `GROQ_API_KEY` to your key from Groq console

4. **Deploy**:
   - Render automatically deploys from git push
   - Free tier includes auto-deploys from main branch

5. **Get your API URL**:
   - Store your backend API endpoint URL in a `.env.local` file (see `.env.example`)
- Use the environment variable `VITE_RAFA_API_URL` in your frontend code
- Call `/chat` and `/get-key` endpoints from the portfolio
   - Use this to call `/chat` and `/get-key` endpoints from the portfolio

#### API Request Example

```bash
curl -X POST $VITE_RAFA_API_URL/chat \260


  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      {"role": "user", "content": "Tell me about Rafi's skills"}
    ]
  }'
```

#### Security Notes

- **API Key Protection**: Never expose `GROQ_API_KEY` in frontend code
- **CORS Configuration**: Backend CORS allows `*` origins (configure in production)
- **Rate Limiting**: Implement rate limiting for production use
- **Authentication**: Consider adding API key validation for frontend requests
- 

- 

---

## Pollen API Configuration

This portfolio includes support for Pollen API integration for advanced features.

### Setup

1. **Get Your Pollen API Key**:
   - Sign up at [Pollen API](https://pollen.io/)
   - Generate an API key from your dashboard
   - Your key will be in the format `sk_...`

2. **Store as GitHub Actions Secret**:
   - Go to repository **Settings > Secrets and variables > Actions**
   - Click **New repository secret**
   - Name: `POLLEN_API_KEY_SECONDARY`
   - Value: Paste your Pollen API key

3. **Local Development**:
   - Copy `.env.example` to `.env.local`
   - Add your Pollen API key:
     ```
     POLLEN_API_KEY_SECONDARY=sk_your_key_here
     ```

### Security Considerations

- **Never commit secrets**: The `.env.local` file is in `.gitignore` and should never be committed
- **Use GitHub Secrets for CI/CD**: Store sensitive keys as GitHub Actions secrets, not in code
- **Rotate keys regularly**: Periodically update your Pollen API keys for security
- **Scope permissions**: Use API keys with minimal required permissions

---

**Built with ❤️ by Rafi Patel**

**Built with ❤️ by Rafi Patel**
