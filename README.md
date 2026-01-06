# NeuroLearn - Context-Driven Personalized Education Platform

<div align="center">

![NeuroLearn](https://img.shields.io/badge/NeuroLearn-AI%20Tutor-purple?style=for-the-badge&logo=openai)
![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue?style=for-the-badge&logo=typescript)
![Prisma](https://img.shields.io/badge/Prisma-6.7-2D3748?style=for-the-badge&logo=prisma)

**An intelligent educational platform powered by Multi-Agent Orchestration and MCP Architecture**

[Live Demo](#) · [Documentation](./ARCHITECTURE.md) · [API Reference](#api-endpoints)

</div>

---

## 🎯 Problem Statement

Traditional educational platforms face critical limitations:

| Challenge | Impact |
|-----------|--------|
| **One-size-fits-all content** | 70% of students disengage from static materials |
| **Lack of personalization** | Different learning styles ignored |
| **No adaptive feedback** | Students repeat mistakes without guidance |
| **Fragmented learning tools** | Notes, flashcards, and lessons disconnected |
| **Limited AI integration** | Basic chatbots lack pedagogical understanding |

## 💡 Solution Overview

NeuroLearn addresses these challenges through:

### Multi-Agent Orchestration System
A **6-agent parallel execution** architecture that generates comprehensive, personalized lessons in under 60 seconds:

```
┌─────────────────────────────────────────────────────────────┐
│                    ORCHESTRATOR AGENT                        │
│         (Routes queries, manages context, coordinates)       │
└─────────────────────┬───────────────────────────────────────┘
                      │
        ┌─────────────┼─────────────┐
        ▼             ▼             ▼
┌───────────┐  ┌───────────┐  ┌───────────┐
│  CONTENT  │  │   IMAGE   │  │   VIDEO   │
│   AGENT   │  │   AGENT   │  │   AGENT   │
│           │  │ (3-Tier)  │  │ (YouTube) │
└─────┬─────┘  └─────┬─────┘  └─────┬─────┘
      │              │              │
      └──────────────┼──────────────┘
                     ▼
        ┌─────────────────────────┐
        │     QUIZ GENERATOR      │
        │   (Adaptive Questions)  │
        └─────────────────────────┘
```

### Context-Driven Personalization
- **8 Legendary Scientist Personas** (Einstein, Newton, Curie, Turing, Darwin, Aristotle, Tesla, Hypatia)
- Each persona has unique teaching styles, expertise areas, and personality traits
- AI maintains character consistency throughout interactions

### Second Brain Architecture
- Smart Notes with AI-powered concept extraction
- Spaced Repetition Flashcards (SM-2 algorithm)
- Knowledge Graph visualization
- Cross-linked learning materials

## 🏗️ Architecture

### Tech Stack

| Layer | Technology | Purpose |
|-------|------------|----------|
| **Frontend** | Next.js 14 (App Router) | Server-side rendering, routing |
| **UI** | Tailwind CSS + Framer Motion | Responsive design, animations |
| **Backend** | Next.js API Routes | RESTful endpoints |
| **Database** | PostgreSQL + Prisma ORM | Data persistence |
| **AI** | OpenAI GPT-4o | Content generation, chat |
| **Images** | DALL-E 3 + Tavily + Gemini | 3-tier fallback system |
| **Search** | Tavily API | Real-time web search |

### 3-Tier Image Generation System

```typescript
// Graceful degradation with intelligent fallback
Tier 1: DALL-E 3      → Primary AI generation
Tier 2: Tavily Search → Web image search fallback  
Tier 3: Gemini        → Google AI fallback
Tier 4: Placeholder   → Styled fallback
```

### Database Schema

```prisma
model ChatSession {
  id        String    @id @default(cuid())
  messages  Message[]
  persona   String?
  createdAt DateTime  @default(now())
}

model Note {
  id         String      @id @default(cuid())
  title      String
  content    String
  concepts   Concept[]
  flashcards Flashcard[]
}

model Flashcard {
  id          String   @id @default(cuid())
  front       String
  back        String
  difficulty  String
  reviews     FlashcardReview[]
}
```

## 🚀 Features

### 1. Adaptive Chat Interface
- Persona-aware conversations with historical scientists
- Context-maintained across sessions
- Intelligent agent routing based on query type

### 2. AI Lesson Generation (`/teach`)
- 6-agent orchestration for comprehensive content
- DALL-E generated concept diagrams
- Embedded YouTube videos
- Interactive mind maps (Mermaid.js)
- Adaptive 5-question quizzes

### 3. Second Brain (`/notes`)
- Rich text editor with markdown support
- AI extracts 3-7 key concepts automatically
- Auto-tagging and subject classification
- Knowledge graph visualization

### 4. Spaced Repetition (`/flashcards`)
- SM-2 algorithm implementation
- Auto-generated from notes
- Progress tracking and analytics
- Difficulty-based scheduling

### 5. Analytics Dashboard
- Session history and metrics
- Agent performance statistics
- Learning progress visualization

## 📁 Project Structure

```
nextjs_space/
├── app/
│   ├── api/
│   │   ├── chat/route.ts        # Persona-aware chat
│   │   ├── teach/generate/      # Lesson generation
│   │   ├── notes/               # CRUD operations
│   │   ├── flashcards/          # SM-2 logic
│   │   └── images/generate/     # 3-tier images
│   ├── chat/page.tsx            # Chat interface
│   ├── teach/page.tsx           # Lesson UI
│   ├── notes/page.tsx           # Second Brain
│   ├── flashcards/page.tsx      # Review system
│   └── dashboard/page.tsx       # Analytics
├── lib/
│   ├── personas.ts              # 8 scientist definitions
│   ├── teaching-agents.ts       # Multi-agent system
│   ├── image-generator.ts       # 3-tier fallback
│   ├── agent-router.ts          # Query routing
│   └── tavily-search.ts         # Web search
├── components/
│   ├── message-bubble.tsx       # Chat messages
│   ├── agent-indicator.tsx      # Active agent
│   └── model-toggle.tsx         # Model selection
└── prisma/
    └── schema.prisma            # Database schema
```

## 🔧 Installation

### Prerequisites
- Node.js 18+
- PostgreSQL database
- API Keys: OpenAI, Tavily, Gemini (optional)

### Setup

```bash
# Clone repository
git clone https://github.com/yourusername/neurolearn.git
cd neurolearn/nextjs_space

# Install dependencies
yarn install

# Setup environment
cp .env.example .env
# Add your API keys to .env

# Initialize database
yarn prisma generate
yarn prisma db push

# Start development
yarn dev
```

### Environment Variables

```env
DATABASE_URL="postgresql://..."
OPENAI_API_KEY="sk-..."
TAVILY_API_KEY="tvly-..."
GEMINI_API_KEY="AIza..."  # Optional
```

## 📡 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/chat` | POST | Persona-aware chat |
| `/api/teach/generate` | POST | Generate lesson |
| `/api/notes` | GET/POST | List/create notes |
| `/api/notes/[id]` | PUT/DELETE | Update/delete note |
| `/api/flashcards` | GET | List flashcards |
| `/api/flashcards/generate` | POST | Generate from note |
| `/api/flashcards/review` | POST | Submit review (SM-2) |
| `/api/images/generate` | POST | 3-tier image generation |

## 🧪 Testing

```bash
# Type checking
yarn tsc --noEmit

# Build test
yarn build

# Development server
yarn dev
```

## 📚 Documentation

- [Architecture Deep Dive](./ARCHITECTURE.md)
- [Multi-Agent System](./ARCHITECTURE.md#multi-agent-orchestration)
- [MCP Architecture](./ARCHITECTURE.md#mcp-model-context-protocol)
- [API Reference](#api-endpoints)

## 🔗 References

- [Next.js Documentation](https://nextjs.org/docs)
- [OpenAI API Reference](https://platform.openai.com/docs)
- [Prisma ORM Guide](https://www.prisma.io/docs)
- [Tavily Search API](https://tavily.com/docs)
- [SM-2 Algorithm](https://www.supermemo.com/en/archives1990-2015/english/ol/sm2)

## 📄 License

MIT License - see [LICENSE](./LICENSE) for details.

---

<div align="center">

**Built with ❤️ using Next.js, OpenAI, and Modern AI Architecture**

</div>
