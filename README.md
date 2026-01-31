# Portfolio Website

A modern, responsive portfolio website built with cutting-edge web technologies. This project showcases professional work, projects, and skills with an elegant, high-performance design, with your own free personal AI assistant.

## Overview

This portfolio website is a demonstration of full-stack web development capabilities, featuring:

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

## RAFA: AI Profile Assistant with Groq

**RAFA** is an AI-powered assistant system that uses **Groq's lightning-fast LLM inference** to answer questions about the portfolio owner's profile and expertise.

### Architecture & Deployment

RAFA operates independently from this portfolio website:

- **Frontend**: This portfolio website (React + Vite) is deployed on **GitHub Pages** as a static site
- **AI Backend**: RAFA runs separately using **Groq API** for high-speed LLM inference
- **Communication**: The portfolio can integrate API calls to RAFA when deployed on a full-stack platform with backend support

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
# Edit .env.local and add your Render backend URL
```

**Note**: `.env.local` is in `.gitignore` and should never be committed to version control.

**Groq API Key**:
- Obtained from [Groq Console](https://console.groq.com/keys)
- Uses `llama-3.3-70b-versatile` model (free tier available)
- Requires signing up at console.groq.com

#### Backend Architecture

```
Portfolio (Frontend - GitHub Pages)
    |
    | HTTPS Request
    v
Render FastAPI Service (groq-proxy)
    |
    | API Call + GROQ_API_KEY
    v
Groq LLM API (llama-3.3-70b-versatile)
    |
    | LLM Response
    v
Render Service → Backend Response
    |
    v
Portfolio (Displays Response)
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

**Built with ❤️ by Rafi Patel**
