import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

app.use(express.json());

// Initialize Google Gen AI client if key is present
const apiKey = process.env.GEMINI_API_KEY || '';
let aiClient: GoogleGenAI | null = null;
if (apiKey) {
  try {
    aiClient = new GoogleGenAI({ apiKey });
  } catch (err) {
    console.warn('Failed to initialize Google Gen AI client:', err);
  }
}

// Health check endpoint
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    platform: 'Nexora AI Academy',
    version: '2.0.0',
    aiAvailable: !!aiClient,
    timestamp: new Date().toISOString()
  });
});

// AI Learning Assistant endpoint
app.post('/api/ai/assistant', async (req: Request, res: Response) => {
  const { message, context, history } = req.body;
  if (!message) {
    res.status(400).json({ error: 'Message is required' });
    return;
  }

  const systemInstruction = `You are "Nexora AI Mentor", the premier AI tutor and software architect at Nexora AI Academy (Powered by Nexora Studios).
Your mission is to teach students how to build real mobile apps (Flutter, React Native, Swift), 2D & 3D games (Godot, Unity, Three.js), websites (React, Next.js, Tailwind), and master prompt engineering.
Style:
- Ultra clear, encouraging, structured, and modern.
- Use code blocks with language tags when showing code.
- Provide practical AI prompts (enclosed in copyable format) that students can paste into Cursor, Claude, ChatGPT, Midjourney, or Lovable.
- Mention Nexora Academy tips and best practices.
- Keep responses crisp, actionable, and formatted with clean markdown.`;

  if (aiClient) {
    try {
      const response = await aiClient.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [
          { role: 'user', parts: [{ text: `${context ? `Context: ${context}\n\n` : ''}User Question: ${message}` }] }
        ],
        config: {
          systemInstruction,
          temperature: 0.7,
        }
      });

      res.json({ reply: response.text || 'I processed your query. Let us keep building!' });
      return;
    } catch (err: any) {
      console.error('Gemini API Error in assistant:', err?.message || err);
    }
  }

  // High-fidelity fallback when Gemini API key is missing or offline
  const queryLower = message.toLowerCase();
  let fallbackReply = '';

  if (queryLower.includes('app') || queryLower.includes('mobile') || queryLower.includes('flutter') || queryLower.includes('react native')) {
    fallbackReply = `### 📱 Nexora Mobile App Architect Tip

To build a production-ready mobile app using AI:
1. **Define Schema First**: Tell AI your exact data structures (User, Post, Transaction) before asking for UI.
2. **Master Prompt for Claude / Cursor**:
\`\`\`text
You are a senior React Native / Flutter engineer. Generate a modern authentication flow with glassmorphism UI, Biometric check fallback, and Supabase Auth client integration. Include error boundaries and TypeScript strict types.
\`\`\`
3. **Connect Backend**: Use Supabase or Firebase Auth. Keep your client tokens securely stored in SecureStore / Keychain.

Would you like to explore our **AI App Development Masterclass** or generate a full architecture schema?`;
  } else if (queryLower.includes('game') || queryLower.includes('three') || queryLower.includes('unity') || queryLower.includes('godot')) {
    fallbackReply = `### 🎮 Nexora Game Engine Lab

Creating AI-assisted games follows the **Entity-Component-System (ECS)** pattern:
- **Core Loop**: Keep game logic decoupled from renderer cycles.
- **Master Prompt for Game Prototyping**:
\`\`\`text
Act as a lead gameplay programmer. Generate a 3D Endless Runner controller in Three.js with smooth lane-shifting, collision detection against obstacle bounding boxes, particle trail effects, and responsive keyboard/touch listeners.
\`\`\`
- Check out module 3 of **AI Game Development** for asset generation prompts using Scenario & Meshy 3D!`;
  } else if (queryLower.includes('prompt') || queryLower.includes('claude') || queryLower.includes('cursor') || queryLower.includes('gpt')) {
    fallbackReply = `### ⚡ Master Prompt Engineering Framework

Nexora uses the **C.R.E.A.T.E.** framework:
1. **C**ontext: Who is the AI and what is the ecosystem?
2. **R**ole: Lead Full-Stack Architect / Art Director.
3. **E**xpectation: Exact file structure, TypeScript types, zero placeholders.
4. **A**ction: Step-by-step execution.
5. **T**echnical constraints: Tailwind v4, React 19, strict null checks.
6. **E**xample output: Sample json or component snippet.

Explore our **Prompt Library** with over 150+ battle-tested master prompts!`;
  } else {
    fallbackReply = `### 🚀 Nexora AI Academy Assistant

Welcome to Nexora Studios' AI Academy! I can help you with:
- 📱 **Mobile App Development**: Architecting iOS & Android apps with Cursor & Claude.
- 🎮 **Game Development**: Creating 2D & 3D games with AI code and assets.
- 🌐 **Web Development**: Building full-stack SaaS apps, dashboards, and landing pages.
- ⚡ **Prompt Engineering**: Crafting prompts that produce complete, bug-free software.

What specific project or concept would you like to build today?`;
  }

  res.json({ reply: fallbackReply });
});

// AI Prompt Improvement Tool endpoint
app.post('/api/ai/improve-prompt', async (req: Request, res: Response) => {
  const { prompt, category, targetTool } = req.body;
  if (!prompt) {
    res.status(400).json({ error: 'Prompt is required' });
    return;
  }

  const systemInstruction = `You are the Lead Prompt Engineer at Nexora Studios.
Your task is to take a raw, simple, or rough user prompt and turn it into an industry-grade, highly effective MASTER PROMPT.
Target tool: ${targetTool || 'Cursor / Claude / GPT-4o'}.
Category: ${category || 'Software Development'}.

Output format:
Return clean markdown with:
1. The **Optimized Master Prompt** (inside a markdown code block so it can be copied easily).
2. **Why This Works**: 3 bullet points explaining the improvements (Role definition, Constraints, Output formatting).
3. **Recommended Parameters** (Temperature, Model, Top-P).`;

  if (aiClient) {
    try {
      const response = await aiClient.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [
          { role: 'user', parts: [{ text: `Original raw prompt:\n"${prompt}"\n\nEnhance this into a master prompt.` }] }
        ],
        config: {
          systemInstruction,
          temperature: 0.6,
        }
      });

      res.json({ result: response.text });
      return;
    } catch (err: any) {
      console.error('Gemini error in improve-prompt:', err?.message || err);
    }
  }

  // Realistic fallback enhancement
  const improved = `### 💎 Nexora Engineered Master Prompt

\`\`\`text
[ROLE]: You are an elite principal engineer and technical architect specializing in ${category || 'Full-Stack Modern Development'}.
[OBJECTIVE]: ${prompt.trim()}

[TECHNICAL CONSTRAINTS]:
- Modern architecture with TypeScript, modular separation of concerns, and clean error handling.
- Zero placeholder comments ("// TODO", "// implement here"); provide the full, working implementation.
- Mobile-first, responsive, and accessible (ARIA compliant).
- Follow clean code principles, SOLID patterns, and defensive programming.

[EXECUTION STEPS]:
1. Define the complete data contracts and TypeScript interfaces.
2. Implement core state management and persistence handlers.
3. Build responsive UI components with modern glassmorphism styling and smooth micro-interactions.
4. Add input validation, toast notifications, and loading skeletons.
\`\`\`

#### 🚀 Why This Works:
- **Role Anchoring**: Establishes strict authority and expectations so the AI avoids generic beginner snippets.
- **Negative Constraints**: Explicitly forbids "// TODO" placeholders, forcing complete code output.
- **Clear Execution Flow**: Directs the reasoning path from interfaces -> state -> UI -> polish.

#### ⚙️ Recommended Settings:
- Model: Claude 3.5 Sonnet / Gemini 2.5 Pro / GPT-4o
- Temperature: 0.3 (deterministic code generation)`;

  res.json({ result: improved });
});

// AI Project Idea Generator endpoint
app.post('/api/ai/generate-ideas', async (req: Request, res: Response) => {
  const { domain, difficulty, techStack } = req.body;

  const systemInstruction = `You are a startup incubator director and head of curriculum at Nexora Studios.
Generate 3 novel, exciting, and monetizable AI project ideas tailored for ${difficulty || 'Beginner to Intermediate'} developers in the ${domain || 'Web & Mobile'} domain using ${techStack || 'Modern AI Tools'}.
Each project must have:
- Title & Hook
- What students learn
- Core features
- Estimated build time
- The Starter Master Prompt to begin building immediately.`;

  if (aiClient) {
    try {
      const response = await aiClient.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [{ role: 'user', parts: [{ text: `Generate 3 project ideas for ${domain} (${difficulty}).` }] }],
        config: { systemInstruction }
      });
      res.json({ ideas: response.text });
      return;
    } catch (err: any) {
      console.error('Gemini error in generate-ideas:', err?.message || err);
    }
  }

  const sampleIdeas = `### 💡 Curated Nexora AI Projects

#### 1. 🪐 OrbitSaaS: AI Habit & Streak Tracker with Voice Check-in
- **Domain**: ${domain || 'Mobile & Web App'}
- **Tech Stack**: React Native / React, Tailwind, Web Speech API, LocalStorage/Supabase
- **What You Learn**: Real-time voice transcription, gamified streak math, local offline cache, dark cyberpunk UI.
- **Build Time**: 3-4 hours with AI assistance.
- **Starter Prompt**:
\`\`\`text
Build an OrbitSaaS habit tracking application with interactive orbital ring progress bars, daily streak counter, voice-to-text logging using Web Speech API, and confetti celebration on goal completion.
\`\`\`

#### 2. ⚡ CyberDrift 3D: Micro Racing Game with AI Track Generation
- **Domain**: Game Development
- **Tech Stack**: Three.js, WebGL, Howler audio, Canvas HUD
- **What You Learn**: Procedural curve generation, vehicle physics, collision detection, responsive touch & keyboard controls.
- **Build Time**: 5-6 hours with AI assistance.

#### 3. 🎯 PromptPulse: Developer Prompt Analytics & Snippet Vault
- **Domain**: Full-Stack Web Development
- **Tech Stack**: Next.js/React, Tailwind CSS, Monaco/CodeMirror editor, Export to JSON/CLI
- **What You Learn**: Syntax highlighting, token count estimation, copy-to-clipboard, tag-based faceted search.
- **Build Time**: 2-3 hours.`;

  res.json({ ideas: sampleIdeas });
});

// Paystack checkout simulation / validation endpoint
app.post('/api/paystack/initialize', (req: Request, res: Response) => {
  const { email, amount, plan, currency = 'USD' } = req.body;
  if (!email || !amount) {
    res.status(400).json({ error: 'Email and amount are required' });
    return;
  }

  const reference = `NX-${Date.now()}-${Math.floor(Math.random() * 100000)}`;
  res.json({
    status: 'success',
    message: 'Payment initialized successfully',
    data: {
      reference,
      amount,
      plan: plan || 'pro_monthly',
      currency,
      email,
      provider: 'Paystack',
      checkoutUrl: `https://checkout.paystack.com/${reference}`,
      accessCode: reference
    }
  });
});

app.post('/api/paystack/verify', (req: Request, res: Response) => {
  const { reference } = req.body;
  if (!reference) {
    res.status(400).json({ error: 'Reference is required' });
    return;
  }

  res.json({
    status: 'success',
    message: 'Payment verified and Nexora Pro Membership activated!',
    data: {
      reference,
      paidAt: new Date().toISOString(),
      membershipTier: 'pro_unlimited',
      accessGranted: true
    }
  });
});

// Setup Vite middleware in dev or serve dist in production
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`⚡ Nexora AI Academy server running at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
