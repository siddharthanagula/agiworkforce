# AGI Workforce - AI-Powered Employee Platform

A cutting-edge platform that brings together AI employees powered by Google Gemini, ElevenLabs voice synthesis, Auth0 authentication, and Agentuity agent orchestration. Built for hackathon submission targeting 4 prize categories.

## 🏆 Hackathon Prize Categories

This project is designed to compete in all four prize categories:

### 1. **Best Use of Gemini API** ✨
- **6 Specialized AI Employee Types**: Developer, Designer, Marketer, Writer, Analyst, Support
- **Context-Aware Conversations**: Full conversation history management
- **Intent Classification**: Automatic routing to the right AI employee
- **Document Analysis**: Summary, insights, and recommendations
- **Code Generation**: AI-powered code creation with explanations
- **Streaming Responses**: Real-time chat experience

### 2. **Best Use of ElevenLabs** 🎙️
- **Unique Voice Profiles**: Each AI employee has a distinct, professional voice
- **Text-to-Speech Integration**: Automatic voice generation for all AI responses
- **Voice Playback**: One-click audio playback for messages
- **Voice Previews**: Demo voices for each employee type
- **Professional Voice Settings**: Optimized stability, similarity, and speaker boost

### 3. **Best Use of Auth0** 🔐
- **Secure Authentication**: Protected routes with Auth0
- **User Management**: Complete auth flow with login/register
- **Protected Resources**: Dashboard and chat require authentication
- **Session Management**: Persistent authentication state
- **Ready for Enhancement**: MFA and social logins can be added

### 4. **Best Use of Agentuity** 🤖
- **Agent Registry**: Central management of AI employee agents
- **Performance Tracking**: Metrics for tasks completed, response time, success rate
- **Intelligent Routing**: Auto-route queries to best available agent
- **Multi-Agent Collaboration**: Coordinate multiple agents for complex tasks
- **Health Monitoring**: Agent status and availability tracking

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Google Gemini API key ([Get one here](https://makersuite.google.com/app/apikey))
- ElevenLabs API key ([Sign up here](https://elevenlabs.io/))
- Auth0 account ([Create one here](https://auth0.com/))

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd agiworkforce-app
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**

Create a `.env` file in the root directory:

```env
# Auth0 Configuration
VITE_AUTH0_DOMAIN=your-domain.auth0.com
VITE_AUTH0_CLIENT_ID=your_client_id
VITE_AUTH0_REDIRECT_URI=http://localhost:5173

# Google Gemini API
VITE_GEMINI_API_KEY=your_gemini_api_key_here

# ElevenLabs API
VITE_ELEVENLABS_API_KEY=your_elevenlabs_api_key_here

# Agentuity (Optional - using local implementation)
VITE_AGENTUITY_API_KEY=your_agentuity_api_key_here
```

4. **Run the development server**
```bash
npm run dev
```

5. **Open your browser**
Navigate to `http://localhost:5173`

## 🔧 API Setup Guide

### Google Gemini API Setup

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Click "Get API Key"
3. Create a new API key or use an existing one
4. Copy the API key and add it to your `.env` file as `VITE_GEMINI_API_KEY`

**Features Used:**
- `gemini-pro` model for text generation
- Chat sessions with conversation history
- Content generation and analysis
- Intent classification for routing

### ElevenLabs API Setup

1. Sign up at [ElevenLabs](https://elevenlabs.io/)
2. Navigate to your profile settings
3. Copy your API key from the API section
4. Add it to your `.env` file as `VITE_ELEVENLABS_API_KEY`

**Voice Profiles Used:**
- **Developer (Alex)**: Rachel - Professional and clear
- **Designer (Aria)**: Domi - Creative and friendly
- **Marketer (Morgan)**: Bella - Confident and engaging
- **Writer (Jordan)**: Antoni - Warm and narrative
- **Analyst (Riley)**: Arnold - Authoritative and clear
- **Support (Casey)**: Adam - Friendly and helpful

### Auth0 Setup

1. Create an Auth0 account at [auth0.com](https://auth0.com/)
2. Create a new "Single Page Application"
3. Configure the following settings:
   - **Allowed Callback URLs**: `http://localhost:5173`
   - **Allowed Logout URLs**: `http://localhost:5173`
   - **Allowed Web Origins**: `http://localhost:5173`
4. Copy your Domain and Client ID to `.env`

**Production Deployment:**
Update the URLs to your production domain (e.g., `https://yourdomain.com`)

### Agentuity Setup

Currently using a custom local implementation. To integrate with Agentuity cloud:

1. Sign up at [Agentuity](https://agentuity.com/)
2. Get your API key from the dashboard
3. Add it to your `.env` file as `VITE_AGENTUITY_API_KEY`

## 📁 Project Structure

```
agiworkforce-app/
├── src/
│   ├── components/
│   │   ├── auth/              # Auth0 components
│   │   │   └── ProtectedRoute.tsx
│   │   └── ui/                # UI components (shadcn)
│   │       ├── ai-prompt-box.tsx
│   │       ├── ai-voice-input.tsx
│   │       ├── scroll-expansion-hero.tsx
│   │       └── ...
│   ├── pages/
│   │   ├── auth/              # Login/Register pages
│   │   ├── chat/              # Enhanced chat interface
│   │   │   └── EnhancedChatPage.tsx
│   │   ├── dashboard/         # Dashboard page
│   │   ├── LandingPage.tsx    # Marketing landing page
│   │   └── MarketplacePage.tsx # AI employee marketplace
│   ├── services/              # API integrations
│   │   ├── gemini.ts          # Google Gemini service
│   │   ├── elevenlabs.ts      # ElevenLabs TTS service
│   │   ├── agentuity.ts       # Agent orchestration
│   │   └── auth0.ts           # Auth0 configuration
│   ├── lib/                   # Utilities
│   └── App.tsx                # Main app component
├── .env                       # Environment variables
├── package.json
└── README.md
```

## 🎯 Key Features

### AI Chat Interface
- **6 Specialized AI Employees**: Switch between different AI personalities
- **Real-time Responses**: Powered by Google Gemini
- **Voice Synthesis**: Every AI response can be played as audio
- **Conversation History**: Context-aware multi-turn conversations
- **Typing Indicators**: Visual feedback during AI processing
- **Error Handling**: Graceful fallbacks and user notifications

### AI Employee Types

1. **Developer** 🛠️
   - Expert in software development, coding, debugging
   - Voice: Professional and technical (Alex)
   - Skills: React, Node.js, TypeScript, AWS, Docker

2. **Designer** 🎨
   - UI/UX design, branding, prototyping
   - Voice: Creative and friendly (Aria)
   - Skills: Figma, UI Design, Branding, Prototyping

3. **Marketer** 📈
   - Digital marketing, SEO, campaigns
   - Voice: Confident and persuasive (Morgan)
   - Skills: SEO, Content, Analytics, Social Media

4. **Writer** ✍️
   - Content creation, copywriting, editing
   - Voice: Warm and storytelling (Jordan)
   - Skills: Copywriting, SEO, Editing, Storytelling

5. **Analyst** 📊
   - Data analysis, statistics, reporting
   - Voice: Analytical and precise (Riley)
   - Skills: Python, SQL, Tableau, Statistics

6. **Support** 🆘
   - Customer service, troubleshooting
   - Voice: Friendly and empathetic (Casey)
   - Skills: Support, Communication, Problem Solving

### Authentication
- Secure login with Auth0
- Protected routes for chat and dashboard
- Persistent session management
- User profile integration

### Agent Orchestration
- Automatic intent classification
- Intelligent routing to best AI employee
- Performance metrics tracking
- Multi-agent collaboration support

## 🎬 Demo Script

Perfect for hackathon presentations:

1. **Landing Page** → Showcase the modern UI with scroll effects
2. **Login** → Demonstrate Auth0 authentication
3. **Marketplace** → Browse available AI employees
4. **Chat Selection** → Choose an AI employee type
5. **Conversation** → Ask a technical question (shows Gemini)
6. **Voice Playback** → Play the AI response (shows ElevenLabs)
7. **Switch Employee** → Change to different AI type (shows routing)
8. **Dashboard** → View agent metrics (shows Agentuity)

## 🔨 Build and Deploy

### Build for Production

```bash
npm run build
```

Output will be in the `dist/` directory.

### Deploy to Vercel

```bash
npm install -g vercel
vercel
```

**Important**: Add all environment variables in Vercel dashboard under Settings → Environment Variables.

### Deploy to Netlify

```bash
npm install -g netlify-cli
netlify deploy --prod
```

## 🧪 Testing the Integration

### Test Gemini Integration

1. Navigate to `/chat`
2. Select any AI employee type
3. Send a message like "Explain React hooks"
4. Verify you get an intelligent, context-aware response

### Test ElevenLabs Integration

1. After receiving an AI response
2. Click the "Play" button next to the message
3. Verify you hear the voice playback
4. Try different AI employee types to hear different voices

### Test Auth0 Integration

1. Try to access `/dashboard` without logging in
2. Verify you're redirected to login
3. Log in with Auth0
4. Verify you can now access protected routes

### Test Agentuity Integration

1. Send messages with different intents
2. Verify automatic routing to appropriate AI employee
3. Check agent performance metrics in dashboard

## 📝 Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_AUTH0_DOMAIN` | Yes | Your Auth0 domain |
| `VITE_AUTH0_CLIENT_ID` | Yes | Your Auth0 client ID |
| `VITE_AUTH0_REDIRECT_URI` | Yes | Callback URL for Auth0 |
| `VITE_GEMINI_API_KEY` | Yes | Google Gemini API key |
| `VITE_ELEVENLABS_API_KEY` | Yes | ElevenLabs API key |
| `VITE_AGENTUITY_API_KEY` | Optional | Agentuity API key |

## 🐛 Troubleshooting

### "Gemini API is not configured"
- Verify `VITE_GEMINI_API_KEY` is set in `.env`
- Restart the dev server after adding the key
- Check that your API key is valid

### "ElevenLabs is not configured"
- Verify `VITE_ELEVENLABS_API_KEY` is set in `.env`
- Restart the dev server
- Voice features will be disabled if not configured (chat still works)

### Auth0 callback errors
- Check that your redirect URI matches exactly in Auth0 dashboard
- Verify domain and client ID are correct
- For production, update to production URLs

### Build warnings about Node modules
- These are expected warnings from elevenlabs-node dependencies
- They don't affect production build or functionality

## 🚀 Advanced Features (Optional Enhancements)

### Add MFA to Auth0
1. Enable MFA in Auth0 dashboard
2. Configure OTP or SMS authentication
3. Test multi-factor login flow

### Add Social Logins
1. Enable social connections in Auth0 (Google, GitHub, etc.)
2. Configure OAuth credentials
3. Update login page to show social buttons

### Implement Streaming Responses
- Use `streamChatResponse()` from gemini.ts
- Update UI to show tokens as they arrive
- Better UX for long responses

### Add Document Upload
- Integrate file upload to chat
- Use Gemini's document analysis features
- Show analysis results with voice

## 📄 License

MIT License - feel free to use for your hackathon submissions!

## 🙋 Support

For issues or questions:
- Check the troubleshooting section above
- Review API documentation for each service
- Verify all environment variables are set correctly

## 🎉 Hackathon Submission Checklist

- [ ] All 4 APIs integrated and working
- [ ] `.env` file configured with all keys
- [ ] Build succeeds without errors
- [ ] Demo script prepared
- [ ] Deployed to production (Vercel/Netlify)
- [ ] Video demo recorded (if required)
- [ ] Submission form completed

---

**Built with** ❤️ **for hackathons using:**
- React 19 + TypeScript + Vite
- Google Gemini API
- ElevenLabs API
- Auth0
- Agentuity
- Tailwind CSS + shadcn/ui
