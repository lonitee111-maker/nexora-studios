import { Course, PromptItem, AITool, CommunityPost, LeaderboardEntry, PlatformAnnouncement, BankAccountDetail, PaymentReceipt } from '../types/index.js';
import { Badge } from '../utils/gamification.js';

export const INITIAL_BADGES: Badge[] = [
  {
    id: 'badge-prompt-initiate',
    name: 'Prompt Initiate',
    description: 'Copied your first AI master prompt from the library',
    icon: 'Sparkles',
    category: 'prompt'
  },
  {
    id: 'badge-prompt-master',
    name: 'Prompt Maestro',
    description: 'Copied and tested over 20 professional prompts',
    icon: 'Zap',
    category: 'prompt'
  },
  {
    id: 'badge-first-lesson',
    name: 'Genesis Learner',
    description: 'Completed your first course lesson in Nexora AI Academy',
    icon: 'BookOpen',
    category: 'web'
  },
  {
    id: 'badge-dedicated-scholar',
    name: 'Dedicated Scholar',
    description: 'Completed 10 interactive AI lessons',
    icon: 'Award',
    category: 'app'
  },
  {
    id: 'badge-streak-warrior',
    name: 'Streak Master',
    description: 'Maintained a 7-day daily learning streak',
    icon: 'Flame',
    category: 'streak'
  },
  {
    id: 'badge-community-builder',
    name: 'Community Pioneer',
    description: 'Published your first project or question in the Nexora Community',
    icon: 'Users',
    category: 'community'
  },
  {
    id: 'badge-certified-builder',
    name: 'Nexora Certified Architect',
    description: 'Earned an official Nexora AI Academy Course Certificate',
    icon: 'ShieldCheck',
    category: 'game'
  }
];

export const INITIAL_COURSES: Course[] = [
  {
    id: 'course-ai-app-dev',
    title: 'AI Mobile App Mastery: Android & iOS',
    slug: 'ai-mobile-app-mastery',
    category: 'app',
    categoryLabel: 'AI App Development',
    level: 'Beginner',
    duration: '8h 30m',
    rating: 4.95,
    reviewCount: 342,
    isPro: false,
    thumbnail: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=800&auto=format&fit=crop',
    instructor: {
      name: 'Elena Rostova',
      role: 'Principal Mobile Architect at Nexora Studios',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop'
    },
    tagline: 'Build production iOS & Android apps with AI agents, React Native, and Supabase.',
    description: 'Learn step-by-step how to construct native mobile applications without getting stuck on boilerplate. From writing precise UI prompts for Cursor to wiring up biometric authentication, offline sync, and app store deployment.',
    objectives: [
      'Create responsive iOS and Android app architectures with React Native & Expo',
      'Generate stunning glassmorphic and cyberpunk UI layouts with AI prompts',
      'Wire up user authentication, session tokens, and database integration',
      'Deploy applications to TestFlight and Google Play Internal Testing'
    ],
    prerequisites: ['Basic understanding of programming concepts (no prior mobile experience required)'],
    tags: ['React Native', 'Expo', 'Mobile AI', 'Supabase', 'Cursor', 'iOS', 'Android'],
    resources: [
      { id: 'res-1', title: 'Nexora Mobile Boilerplate Repo', fileType: 'zip', size: '14.2 MB', downloadUrl: '#' },
      { id: 'res-2', title: 'Mobile Prompt Engineering Cheatsheet', fileType: 'pdf', size: '2.1 MB', downloadUrl: '#' },
      { id: 'res-3', title: 'Figma Mobile App Design Kit', fileType: 'figma', size: '48 MB', downloadUrl: '#' }
    ],
    lessons: [
      {
        id: 'les-app-1',
        title: '01. Architecting Native Mobile Apps with AI Prompts',
        duration: '18m',
        type: 'video',
        videoThumbnail: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=800&auto=format&fit=crop',
        transcript: 'Welcome to Nexora AI Academy. In this lesson, we break down how modern AI code assistants perceive mobile architectures. Rather than generating spaghetti code, we teach you the Modular Screen Protocol...',
        content: `### 🎯 Architecting Your First AI-Powered Mobile App

When building mobile applications with AI:
1. **Never ask for the entire app at once.** Start with data models and TypeScript schemas.
2. **Define State Boundaries**: Separate UI views from networking and persistence.
3. **Use the C.R.E.A.T.E. Framework**: Role, Context, Constraints, and Step-by-Step implementation.`,
        codeSnippet: {
          language: 'typescript',
          filename: 'types/user.ts',
          code: `export interface UserProfile {\n  id: string;\n  name: string;\n  email: string;\n  avatarUrl: string;\n  planTier: 'free' | 'pro';\n  streakDays: number;\n  createdAt: string;\n}`
        },
        starterPrompt: `Act as a senior React Native architect. Scaffold an Expo project structure with folder-based routing, TypeScript strict mode, and Tailwind (NativeWind). Include a shared layout with dark mode background and glowing accents.`,
        quiz: [
          {
            id: 'q1',
            question: 'What is the best approach when prompting AI for mobile application development?',
            options: [
              'Ask for the entire 20-screen app in a single prompt',
              'Break down the architecture into data schemas, modular components, and state handlers',
              'Copy random snippets from StackOverflow without context',
              'Disable TypeScript strict mode'
            ],
            correctIndex: 1,
            explanation: 'Breaking down requirements prevents hallucination and guarantees clean, composable component boundaries.'
          }
        ],
        assignment: {
          task: 'Generate a User Profile screen with avatar upload preview, streak counter, and dark mode toggle.',
          hint: 'Specify NativeWind classes and include Lucide icons for the UI layout.',
          solutionPrompt: 'Create a React Native UserProfileScreen using NativeWind with a dark midnight background, glassmorphic stats card, and animated streak badge.'
        }
      },
      {
        id: 'les-app-2',
        title: '02. Designing Modern Glassmorphism Mobile Interfaces',
        duration: '22m',
        type: 'video',
        videoThumbnail: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=800&auto=format&fit=crop',
        transcript: 'In lesson 2, we turn to mobile aesthetic engineering: crafting depth, subtle borders, backdrop blurs, and neon purple glow highlights that elevate your app above 99% of competitors...',
        content: `### 🔮 Visual Hierarchy in Cyberpunk & Modern UI

High-converting modern applications utilize:
- **High Contrast Dark Mode**: #05050a base with 10% opacity borders.
- **Micro-interactions**: Subtle scaling on press and haptic feedback.
- **Zero-Pill Discipline**: Clean, sharp geometry with rounded-xl corners.`,
        codeSnippet: {
          language: 'tsx',
          filename: 'components/GlassCard.tsx',
          code: `import React from 'react';\nimport { View, StyleSheet } from 'react-native';\n\nexport const GlassCard: React.FC<{ children: React.ReactNode }> = ({ children }) => (\n  <View style={styles.card}>\n    {children}\n  </View>\n);\n\nconst styles = StyleSheet.create({\n  card: {\n    backgroundColor: 'rgba(20, 24, 40, 0.75)',\n    borderColor: 'rgba(139, 92, 246, 0.25)',\n    borderWidth: 1,\n    borderRadius: 16,\n    padding: 16,\n  }\n});`
        },
        starterPrompt: `Generate a glassmorphism card component in React Native with subtle purple border glows and backdrop blur fallback for Android.`,
        quiz: [
          {
            id: 'q2',
            question: 'Which visual principle prevents dark-mode mobile apps from looking flat?',
            options: [
              'Using 100% pure black for every layer without distinction',
              'Using layered elevation with subtle borders, gradients, and backdrop blurs',
              'Adding rainbow neon colors everywhere',
              'Using serif typography for all body text'
            ],
            correctIndex: 1,
            explanation: 'Layered elevation with subtle 1px translucent borders creates depth and hierarchy.'
          }
        ],
        assignment: {
          task: 'Build a mobile stats widget displaying daily active hours and XP gained.',
          hint: 'Use a linear gradient border and high-contrast numerical typography.',
          solutionPrompt: 'Create a MobileStatsWidget with dual metrics, circular progress bar, and purple glow badge.'
        }
      },
      {
        id: 'les-app-3',
        title: '03. Authentication, Secure Storage & Supabase Integration',
        duration: '26m',
        type: 'video',
        videoThumbnail: 'https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?q=80&w=800&auto=format&fit=crop',
        transcript: 'Security is paramount. In this lesson, we connect Supabase Auth to our mobile client and store tokens in hardware-backed SecureStore rather than unencrypted local storage...',
        content: `### 🔐 Production-Grade Mobile Auth

Key rules for mobile authentication:
1. Store session refresh tokens in Expo SecureStore or iOS Keychain.
2. Handle offline reconnection gracefully with optimistic UI states.
3. Use Row Level Security (RLS) on all Supabase tables.`,
        codeSnippet: {
          language: 'typescript',
          filename: 'lib/supabase.ts',
          code: `import { createClient } from '@supabase/supabase-js';\nimport * as SecureStore from 'expo-secure-store';\n\nconst ExpoSecureStoreAdapter = {\n  getItem: (key: string) => SecureStore.getItemAsync(key),\n  setItem: (key: string, value: string) => SecureStore.setItemAsync(key, value),\n  removeItem: (key: string) => SecureStore.deleteItemAsync(key),\n};\n\nexport const supabase = createClient(\n  process.env.EXPO_PUBLIC_SUPABASE_URL!,\n  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!,\n  { auth: { storage: ExpoSecureStoreAdapter, persistSession: true } }\n);`
        },
        starterPrompt: `Create a complete Supabase authentication service for React Native Expo using SecureStore adapter and biometric FaceID fallback.`,
        quiz: [
          {
            id: 'q3',
            question: 'Where should mobile authentication tokens be persisted?',
            options: [
              'Plain Async Storage or localStorage',
              'Encrypted SecureStore / iOS Keychain / Android Keystore',
              'In the Redux store state without persistence',
              'In a public GitHub repository'
            ],
            correctIndex: 1,
            explanation: 'SecureStore encrypts sensitive tokens using the device OS hardware security module.'
          }
        ],
        assignment: {
          task: 'Implement a login form with validation, error handling, and password toggle.',
          hint: 'Remember to show clear inline error feedback if an email is malformed.',
          solutionPrompt: 'Generate a React Native LoginForm with real-time Zod validation, animated input borders, and loading state.'
        }
      }
    ]
  },
  {
    id: 'course-ai-game-dev',
    title: '3D & 2D Game Development with AI',
    slug: 'ai-game-development-3d-2d',
    category: 'game',
    categoryLabel: 'AI Game Development',
    level: 'Intermediate',
    duration: '11h 15m',
    rating: 4.98,
    reviewCount: 489,
    isPro: true,
    thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop',
    instructor: {
      name: 'Kaelen Vance',
      role: 'Lead Game Technologist & Engine Specialist',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop'
    },
    tagline: 'Create 2D and 3D web games, racing titles, physics engines, and multiplayer worlds using AI.',
    description: 'Turn your gameplay ideas into playable, high-performance web and PC games. Master prompt engineering for Three.js, WebGL, sprite generation with Scenario, 3D asset meshing, and spatial audio.',
    objectives: [
      'Build playable 3D games with Three.js, custom shaders, and particle systems',
      'Create responsive arcade controls (WASD, touch, gamepad)',
      'Generate game textures, sprites, and 3D models using AI pipelines',
      'Add global high-score leaderboards and in-game upgrade shops'
    ],
    prerequisites: ['Basic JavaScript / TypeScript logic', 'Familiarity with Cartesian coordinate systems (X, Y, Z)'],
    tags: ['Three.js', 'WebGL', 'Game Dev', 'AI Sprites', 'Physics', 'Shader Art', 'Multiplayer'],
    resources: [
      { id: 'res-g1', title: 'Nexora 3D Game Starter Template', fileType: 'zip', size: '28.4 MB', downloadUrl: '#' },
      { id: 'res-g2', title: 'Game Prompt Master Collection', fileType: 'pdf', size: '3.8 MB', downloadUrl: '#' }
    ],
    lessons: [
      {
        id: 'les-game-1',
        title: '01. Setting Up the Three.js Game Loop & AI Coding Principles',
        duration: '24m',
        type: 'video',
        videoThumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop',
        transcript: 'Welcome to game development at Nexora. In this lesson, we demystify the 60FPS game loop. AI assistants often mix up React renders with game loops; here is how we separate them...',
        content: `### 🎮 Decoupled Game Loop Architecture

Never call React \`setState\` at 60Hz inside \`requestAnimationFrame\`.
Instead:
- Store player coordinates, velocity, and inputs in mutable memory or refs.
- Only dispatch state updates to React when milestone events occur (e.g. score changes, game over, level complete).
- Use delta time (\`clock.getDelta()\`) for frame-rate independent movement.`,
        codeSnippet: {
          language: 'typescript',
          filename: 'game/GameEngine.ts',
          code: `import * as THREE from 'three';\n\nexport class GameEngine {\n  scene: THREE.Scene;\n  camera: THREE.PerspectiveCamera;\n  renderer: THREE.WebGLRenderer;\n  clock: THREE.Clock;\n\n  constructor(canvas: HTMLCanvasElement) {\n    this.scene = new THREE.Scene();\n    this.camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);\n    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true });\n    this.clock = new THREE.Clock();\n  }\n}`
        },
        starterPrompt: `Create a Three.js 3D Endless Runner engine with a player cube, procedural highway generation, dynamic neon lighting, and arrow key lane switching.`,
        quiz: [
          {
            id: 'q-g1',
            question: 'Why should you NOT call React setState on every frame of a 3D game loop?',
            options: [
              'Because React does not support 3D math',
              'It triggers excessive DOM re-renders, causing severe lag and frame drops',
              'WebGL only works with class components',
              'State can only be updated once per minute'
            ],
            correctIndex: 1,
            explanation: 'Re-rendering the entire React component tree at 60Hz destroys frame rates and causes micro-stuttering.'
          }
        ],
        assignment: {
          task: 'Build a moving player object with smooth deceleration and boundary clamping.',
          hint: 'Clamp X position between -4 and +4 to keep the player on track.',
          solutionPrompt: 'Write a TypeScript Three.js player controller with acceleration, friction, and lane clamping.'
        }
      },
      {
        id: 'les-game-2',
        title: '02. 3D Cyberpunk Racing Game & Vehicle Physics',
        duration: '31m',
        type: 'video',
        videoThumbnail: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=800&auto=format&fit=crop',
        transcript: 'Today we build a high-speed cyber hovercraft racing game. We explore procedural road curvature, boost pads, and camera damping that gives players a thrilling sense of speed...',
        content: `### 🏎️ Simulating Hovercraft Physics

Hovercraft physics require:
- **Thrust**: Forward vector based on player orientation.
- **Drift / Lateral Friction**: A slip factor that lets the vehicle slide around corners.
- **Camera Lag**: Soft lerping (\`camera.position.lerp\`) for dynamic weight and momentum.`,
        codeSnippet: {
          language: 'typescript',
          filename: 'game/Physics.ts',
          code: `export function updateHovercraft(vehicle: any, inputs: { forward: boolean; steer: number }, delta: number) {\n  if (inputs.forward) vehicle.speed += 25 * delta;\n  vehicle.speed *= 0.98; // Friction\n  vehicle.rotation.y += inputs.steer * 2.5 * delta;\n  vehicle.position.x += Math.sin(vehicle.rotation.y) * vehicle.speed * delta;\n  vehicle.position.z += Math.cos(vehicle.rotation.y) * vehicle.speed * delta;\n}`
        },
        starterPrompt: `Generate a Three.js arcade vehicle physics script with acceleration, brake, drift angle, and trail particle effects.`,
        quiz: [
          {
            id: 'q-g2',
            question: 'What technique provides a thrilling sense of momentum to a racing game camera?',
            options: [
              'Snapping camera position rigidly to player coordinates',
              'Lerping (linear interpolating) camera position and tilting based on steering angle',
              'Disabling camera movements entirely',
              'Rotating camera 360 degrees every second'
            ],
            correctIndex: 1,
            explanation: 'Camera smoothing with subtle banking creates cinematic weight and visceral speed.'
          }
        ],
        assignment: {
          task: 'Add speed booster pads along the road that give a 2-second burst of 150% speed.',
          hint: 'Check distance between vehicle and pad position in the game loop.',
          solutionPrompt: 'Create a booster pad collision detector with FOV expansion animation and nitro particle burst.'
        }
      }
    ]
  },
  {
    id: 'course-ai-web-dev',
    title: 'AI Website & Full-Stack SaaS Development',
    slug: 'ai-website-saas-development',
    category: 'web',
    categoryLabel: 'AI Website Development',
    level: 'Beginner',
    duration: '9h 45m',
    rating: 4.96,
    reviewCount: 610,
    isPro: false,
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop',
    instructor: {
      name: 'Marcus Sterling',
      role: 'Full-Stack Founder & Nexora Engineering Lead',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop'
    },
    tagline: 'Build modern landing pages, e-commerce storefronts, and full-stack SaaS with AI tools.',
    description: 'Learn the exact workflow top software engineers use to build and deploy modern web apps in hours instead of months. Covers Tailwind v4, React 19, server actions, payment gateways, and database modeling.',
    objectives: [
      'Build ultra-clean, high-converting landing pages with dark mode cyberpunk aesthetics',
      'Architect full-stack SaaS apps with user roles and payment subscriptions',
      'Create dynamic analytics dashboards with interactive charts and filtering',
      'Connect payment gateways (Stripe & Paystack) for international monetization'
    ],
    prerequisites: ['Basic HTML & CSS knowledge'],
    tags: ['Next.js', 'React 19', 'Tailwind CSS', 'SaaS', 'Full-Stack', 'Paystack', 'Dashboards'],
    resources: [
      { id: 'res-w1', title: 'Nexora SaaS Design System Kit', fileType: 'zip', size: '18.9 MB', downloadUrl: '#' },
      { id: 'res-w2', title: 'Landing Page Conversion Formula', fileType: 'pdf', size: '1.4 MB', downloadUrl: '#' }
    ],
    lessons: [
      {
        id: 'les-web-1',
        title: '01. Building Ultra-High-Converting AI Landing Pages',
        duration: '20m',
        type: 'video',
        videoThumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop',
        transcript: 'Welcome to Full-Stack Web Development. Today, we dissect what makes a SaaS landing page instantly believable and irresistible: hierarchy, zero-pill aesthetics, luminous dark mode, and social proof...',
        content: `### 🚀 Anatomy of a World-Class SaaS Landing Page

1. **Above-the-Fold Authority**: Clear value proposition in <= 8 words, supporting subtitle, dual CTA buttons, and interactive product demo.
2. **Social Proof Wall**: Real student metrics, trust badges, and verified reviews.
3. **Feature Showcases**: Bento grid layouts with live interactive elements.`,
        codeSnippet: {
          language: 'tsx',
          filename: 'components/HeroSection.tsx',
          code: `export const HeroSection = () => (\n  <div className="relative py-24 px-6 text-center overflow-hidden">\n    <h1 className="text-5xl font-extrabold tracking-tight text-white mb-6">\n      Build Anything with <span className="text-purple-400">Artificial Intelligence</span>\n    </h1>\n    <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-8">\n      Learn to code, design, and monetize apps and games.\n    </p>\n  </div>\n);`
        },
        starterPrompt: `Create a high-converting hero section with midnight black background, glowing purple radial gradient, animated badge, and dual CTA buttons.`,
        quiz: [
          {
            id: 'q-w1',
            question: 'What is the most effective above-the-fold CTA pattern for modern SaaS?',
            options: [
              'No CTA buttons to make users search around',
              'A high-contrast primary CTA paired with an exploratory secondary action (e.g. "Start Learning Free" and "Explore Catalog")',
              'A form requiring 15 fields before anything is shown',
              'A popup that blocks the entire screen immediately'
            ],
            correctIndex: 1,
            explanation: 'Dual CTAs provide a direct path for ready buyers while offering a lower-friction path for exploratory visitors.'
          }
        ],
        assignment: {
          task: 'Create a Bento grid section highlighting 4 core platform capabilities with hover glow.',
          hint: 'Use grid-cols-1 md:grid-cols-3 with col-span-2 on the primary feature card.',
          solutionPrompt: 'Build a responsive Tailwind Bento Grid with glassmorphic borders and interactive badge icons.'
        }
      },
      {
        id: 'les-web-2',
        title: '02. SaaS Analytics Dashboards & Data Visualization',
        duration: '28m',
        type: 'video',
        videoThumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
        transcript: 'In this lesson, we design and code an enterprise-grade SaaS analytics dashboard with revenue charts, user retention heatmaps, and downloadable exports...',
        content: `### 📊 Dashboard Architecture

Clean dashboards follow 3 golden rules:
- **Top KPIs**: 4 summary cards showing gross metrics, deltas (+14%), and sparklines.
- **Faceted Filters**: Date range switcher (7d, 30d, 90d, All) and category drilldown.
- **Responsive Tables**: Paginated, sortable rows with status badges and quick actions.`,
        codeSnippet: {
          language: 'tsx',
          filename: 'components/MetricCard.tsx',
          code: `export const MetricCard = ({ label, value, delta }: { label: string; value: string; delta: string }) => (\n  <div className="p-6 rounded-2xl bg-white/5 border border-white/10">\n    <span className="text-sm text-slate-400">{label}</span>\n    <div className="text-3xl font-bold text-white mt-1">{value}</div>\n    <span className="text-xs text-emerald-400 mt-2 block">{delta} vs last month</span>\n  </div>\n);`
        },
        starterPrompt: `Build an enterprise SaaS dashboard in React and Tailwind with KPI cards, revenue area chart, and recent user signups table.`,
        quiz: [
          {
            id: 'q-w2',
            question: 'What is essential for high usability in complex dashboards?',
            options: [
              'Displaying all data unformatted in a giant raw table',
              'Prominent KPI summaries at the top followed by visual trends and granular tables',
              'Hiding all numbers behind 4 dropdown menus',
              'Auto-scrolling the screen every 5 seconds'
            ],
            correctIndex: 1,
            explanation: 'Top-level KPIs provide immediate status at a glance, allowing users to drill into details as needed.'
          }
        ],
        assignment: {
          task: 'Build a metric card with delta indicator and glowing hover effect.',
          hint: 'Use text-emerald-400 for positive deltas and text-rose-400 for negative.',
          solutionPrompt: 'Create a MetricCard component with icon, value, delta pill, and hover glow.'
        }
      }
    ]
  },
  {
    id: 'course-prompt-engineering',
    title: 'Prompt Engineering Masterclass: Architecting Intelligence',
    slug: 'prompt-engineering-masterclass',
    category: 'prompt',
    categoryLabel: 'Prompt Engineering',
    level: 'Advanced',
    duration: '7h 10m',
    rating: 4.99,
    reviewCount: 820,
    isPro: true,
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop',
    instructor: {
      name: 'Dr. Aaron Thorne',
      role: 'Chief AI Research Scientist at Nexora Studios',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop'
    },
    tagline: 'Master chain-of-thought, system prompts, negative constraints, and code generation prompts.',
    description: 'Learn the mathematical and cognitive principles behind leading frontier models. Learn how to write prompts that eliminate hallucinations, guarantee valid JSON schemas, and command code agents to build complete software.',
    objectives: [
      'Master the Nexora C.R.E.A.T.E. Master Prompting Framework',
      'Eliminate hallucination using grounding, negative constraints, and few-shot examples',
      'Structure prompts for full-stack code generators to avoid lazy "// TODO" comments',
      'Craft multi-agent prompt chains that collaborate on complex product builds'
    ],
    prerequisites: ['Experience working with ChatGPT, Claude, or Cursor'],
    tags: ['Prompt Engineering', 'LLMs', 'System Prompts', 'JSON Mode', 'Reasoning', 'Code Agents'],
    resources: [
      { id: 'res-p1', title: 'Nexora Master Prompt Bible (200+ Prompts)', fileType: 'pdf', size: '12.4 MB', downloadUrl: '#' },
      { id: 'res-p2', title: 'System Prompt Templates for Coding Agents', fileType: 'zip', size: '3.1 MB', downloadUrl: '#' }
    ],
    lessons: [
      {
        id: 'les-prompt-1',
        title: '01. The Nexora C.R.E.A.T.E. Master Prompting Framework',
        duration: '22m',
        type: 'video',
        videoThumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop',
        transcript: 'Welcome to the Prompt Engineering Masterclass. Today we unveil the C.R.E.A.T.E. framework developed at Nexora Studios to extract flawless results from frontier models...',
        content: `### ⚡ The C.R.E.A.T.E. Framework

- **C - Context**: Define the ecosystem, domain, and objective.
- **R - Role**: Anchor the AI persona to an elite level ("Staff Systems Architect").
- **E - Expectation**: Specify exact output schema (e.g. Strict JSON or complete code file).
- **A - Action**: Explicit numbered execution steps.
- **T - Technical Constraints**: Negative constraints ("DO NOT leave placeholders; DO NOT use deprecated APIs").
- **E - Example**: Provide 1-2 few-shot exemplars.`,
        codeSnippet: {
          language: 'markdown',
          filename: 'prompts/master-template.md',
          code: `[ROLE]: Senior Software Architect\n[OBJECTIVE]: Build a real-time collaborative whiteboard\n[CONSTRAINTS]:\n- Must use HTML5 Canvas & WebSockets\n- Zero placeholder comments\n- Fully typed with TypeScript`
        },
        starterPrompt: `Act as a senior engineer. Apply the C.R.E.A.T.E. framework to generate a complete React 19 custom hook for handling real-time WebSocket reconnection with exponential backoff.`,
        quiz: [
          {
            id: 'q-p1',
            question: 'What is the role of Negative Constraints in a master prompt?',
            options: [
              'To insult the AI model',
              'To explicitly forbid lazy habits such as placeholder comments, mock data, and deprecated APIs',
              'To slow down inference speed',
              'To make the prompt as confusing as possible'
            ],
            correctIndex: 1,
            explanation: 'Negative constraints prevent the model from taking shortcuts and ensure 100% production-ready output.'
          }
        ],
        assignment: {
          task: 'Take a vague prompt ("make an auth system") and turn it into a 6-part C.R.E.A.T.E. master prompt.',
          hint: 'Include Role, Schema, Negative Constraints, and strict TypeScript types.',
          solutionPrompt: 'Write a C.R.E.A.T.E. master prompt for generating a complete JWT authentication flow with refresh tokens and rate limiting.'
        }
      }
    ]
  }
];

export const INITIAL_PROMPTS: PromptItem[] = [
  {
    id: 'pr-web-1',
    title: 'Full-Stack Modern SaaS Landing Page with Glassmorphism',
    category: 'Website Development',
    description: 'Generates a complete, responsive dark-mode SaaS landing page with animated gradients, bento grid, and pricing cards.',
    promptText: `Act as an elite frontend engineer and award-winning UI designer.
Create a production-ready, highly responsive SaaS landing page in React 19, TypeScript, and Tailwind CSS.

[DESIGN SYSTEM]:
- Background: Midnight black (#05050a) with subtle glowing radial gradients (purple #8b5cf6 and cyan #06b6d4).
- Glassmorphism: Cards with backdrop-blur-md, bg-white/5, and 1px borders of rgba(255,255,255,0.1).
- Typography: Clean geometric sans-serif with high contrast white headlines and slate-400 subtitles.

[REQUIRED SECTIONS]:
1. Navigation bar with blurred glass background, logo badge, nav links, and "Get Started" glowing button.
2. Hero section: Eye-catching headline, subtitle, interactive preview card, and dual CTAs.
3. Bento Grid: 4 feature cards showcasing core platform features with micro-animations.
4. Interactive Pricing Switcher: Monthly vs Yearly toggle with 20% discount badge and feature checklists.
5. Footer: Categorized links, newsletter input, and copyright notice.

[CONSTRAINTS]:
- Provide the complete, pristine code without "// TODO" or placeholders.
- Accessible ARIA labels on all interactive elements.`,
    tags: ['React', 'Tailwind', 'SaaS', 'Landing Page', 'Glassmorphism'],
    tokens: 380,
    targetTools: ['Cursor', 'Claude 3.5 Sonnet', 'v0 by Vercel'],
    isPro: false,
    copiedCount: 1420,
    author: 'Nexora Studios'
  },
  {
    id: 'pr-app-1',
    title: 'Cross-Platform React Native E-Commerce App Architecture',
    category: 'Mobile App Development',
    description: 'Scaffolds an entire mobile shopping app with product carousel, filter drawer, animated cart drawer, and checkout flow.',
    promptText: `You are a Lead Mobile Architect specializing in React Native and Expo.
Generate a complete, modular mobile shopping application interface with NativeWind (Tailwind CSS for mobile).

[REQUIREMENTS]:
1. Main Feed: Sticky header with search bar, category chips horizontal scroll, and 2-column masonry product cards.
2. Product Card: Image with zoom pinch, title, rating stars, price, and instant "+ Add to Cart" haptic button.
3. Floating Animated Cart Bar: Slides up when items > 0 showing total price and "Slide to Checkout".
4. Filter Modal: Price range slider, brand checkboxes, in-stock only toggle, and "Apply Filters" button.

[TECHNICAL CONSTRAINTS]:
- Strict TypeScript types for Product, CartItem, and FilterState.
- Zero external unvetted dependencies; use native React Native components and Lucide icons.
- Provide full working state management with React Context or Zustand.`,
    tags: ['React Native', 'Expo', 'E-Commerce', 'Mobile UI', 'Zustand'],
    tokens: 420,
    targetTools: ['Cursor', 'Claude', 'GPT-4o'],
    isPro: true,
    copiedCount: 980,
    author: 'Elena Rostova'
  },
  {
    id: 'pr-game-1',
    title: '3D Cyberpunk Endless Runner with Three.js & Particle Effects',
    category: 'Game Development',
    description: 'Complete Three.js arcade game engine with dynamic highway generation, obstacle dodging, speed boost, and high score HUD.',
    promptText: `Act as a senior WebGL and Three.js game engineer.
Build a complete 3D endless runner game that renders directly inside an HTML canvas element.

[GAMEPLAY SPECIFICATIONS]:
- The player controls a glowing neon hovercraft on a 3-lane futuristic highway.
- Controls: ArrowLeft/A and ArrowRight/D for swift lane changes, ArrowUp/W for temporary shield/boost.
- Obstacles: Procedurally generated glowing cyber barriers that move towards the player.
- Collectibles: Floating data orbs that increase score and fill the boost meter.
- Visuals: Dark cyber grid horizon, neon fog, particle exhaust trail, and dynamic FOV camera changes during boost.

[ENGINE ARCHITECTURE]:
- Decouple the game update loop from UI rendering.
- Use delta time for consistent 60FPS physics.
- Include a responsive Canvas HUD displaying Score, Multiplier, and Game Over screen with Restart button.`,
    tags: ['Three.js', 'WebGL', '3D Game', 'Endless Runner', 'Cyberpunk'],
    tokens: 490,
    targetTools: ['Cursor', 'Claude Code', 'Bolt.new'],
    isPro: true,
    copiedCount: 1640,
    author: 'Kaelen Vance'
  },
  {
    id: 'pr-img-1',
    title: 'Photorealistic Futuristic Tech Hardware & Holographic UI',
    category: 'AI Image Generation',
    description: 'Prompt designed for Midjourney v6 and DALL-E 3 to generate cinematic futuristic devices and interfaces.',
    promptText: `Futuristic holographic neural interface device floating in a minimalist dark obsidian laboratory, glowing electric purple and cyan fiber optic circuitry, volumetric raytraced lighting, 8k resolution, cinematic depth of field, hyper-detailed product photography, shot on Hasselblad H6D-100c, studio rim lighting, pristine glass reflections --ar 16:9 --v 6.0 --style raw`,
    tags: ['Midjourney', 'DALL-E 3', 'Hardware', 'Hologram', 'Cinematic'],
    tokens: 95,
    targetTools: ['Midjourney v6', 'DALL-E 3', 'Flux.1'],
    isPro: false,
    copiedCount: 2890,
    author: 'Nexora Studios'
  },
  {
    id: 'pr-logo-1',
    title: 'Minimalist Cyberpunk Vector Tech Logo & Emblem',
    category: 'Logo Design',
    description: 'Generates precision vector emblems for modern AI startups, developer tools, and futuristic studios.',
    promptText: `Minimalist geometric logo for an advanced AI academy named "Nexora", interlocking geometric polygon letter "N" combined with a glowing neural synapse node, clean vector art, electric violet and cyan neon gradients on a solid pitch black background, sleek tech corporate identity, Swiss typography aesthetic, flat design with subtle outer glow, SVG icon style --no complex text, messy gradients`,
    tags: ['Logo Design', 'Vector', 'AI Brand', 'Minimalist', 'Emblem'],
    tokens: 85,
    targetTools: ['Midjourney v6', 'Recraft.ai', 'Ideogram'],
    isPro: false,
    copiedCount: 1750,
    author: 'Nexora Studios'
  },
  {
    id: 'pr-biz-1',
    title: 'AI Startup Pitch Deck & Product Positioning Blueprint',
    category: 'Business',
    description: 'Generates an investor-ready 10-slide pitch outline, TAM/SAM/SOM market sizing, and monetization strategy.',
    promptText: `Act as a Silicon Valley venture partner and startup strategist.
Analyze the following AI startup concept and output an investor-ready 10-slide pitch deck structure with exact slide headlines, key statistics, moat analysis, and unit economics.

[CONCEPT]: [Insert your AI product idea here]

[REQUIRED SLIDE BREAKDOWN]:
Slide 1: Vision & The One-Line Hook
Slide 2: The Urgent Market Pain (with quantifiable friction)
Slide 3: The Proprietary Solution & AI Architecture
Slide 4: Market Size (TAM, SAM, SOM in USD)
Slide 5: Product Walkthrough & Key Differentiators
Slide 6: Defensible Moat & Data Flywheel
Slide 7: Business Model & Pricing Tiers (Freemium, Pro, Enterprise)
Slide 8: Go-to-Market Strategy & Viral Acquisition Loops
Slide 9: Founding Team Credentials
Slide 10: The Ask, Funding Allocation & 18-Month Milestones`,
    tags: ['Pitch Deck', 'Business', 'Startup', 'VC', 'Monetization'],
    tokens: 280,
    targetTools: ['Claude 3.5 Sonnet', 'GPT-4o'],
    isPro: false,
    copiedCount: 1120,
    author: 'Nexora Studios'
  },
  {
    id: 'pr-anim-1',
    title: 'CSS Keyframe & Motion Micro-Interactions Specification',
    category: 'Animation',
    description: 'Generates butter-smooth micro-animations, glowing hover ripples, and magnetic button effects.',
    promptText: `Act as a creative developer and motion designer.
Write clean, performant CSS keyframe animations and Framer Motion spring physics variants for:
1. Floating Card Hover: Subtle 3D tilt with dynamic light glare that tracks cursor coordinates.
2. Magnetic Glowing Button: Elastic pull towards cursor position with trailing blur particle glow.
3. Pulse Radar Beacon: Expanding ripple waves for live status badges.
Ensure GPU acceleration using transform and opacity only.`,
    tags: ['CSS Animation', 'Framer Motion', 'Micro-Interactions', 'UI'],
    tokens: 190,
    targetTools: ['Cursor', 'Claude', 'v0'],
    isPro: false,
    copiedCount: 840,
    author: 'Nexora Studios'
  },
  {
    id: 'pr-gfx-1',
    title: 'Bento Grid 3D Asset & Icon Style Guide',
    category: 'Graphic Design',
    description: 'Creates unified prompt instructions for generating cohesive 3D glass icons for SaaS feature sections.',
    promptText: `Isometric 3D render of an AI neural processor chip with glowing neon violet tracks, floating atop a frosted glass pedestal, minimalist cyberpunk aesthetic, blender Cycles render, octane render style, soft ambient occlusion, clean transparent background, 4k resolution, high polish --v 6.0`,
    tags: ['3D Asset', 'Bento Grid', 'Iconography', 'Graphic Design'],
    tokens: 78,
    targetTools: ['Midjourney v6', 'Flux.1'],
    isPro: false,
    copiedCount: 960,
    author: 'Nexora Studios'
  }
];

export const INITIAL_AI_TOOLS: AITool[] = [
  {
    id: 'tool-cursor',
    name: 'Cursor',
    category: 'Code Assistant',
    description: 'The AI-first code editor built for pair programming with Claude 3.5 Sonnet and GPT-4o directly inside your repo.',
    pricing: 'Freemium',
    url: 'https://cursor.com',
    featured: true,
    iconName: 'Terminal',
    recommendedCourseId: 'course-ai-web-dev'
  },
  {
    id: 'tool-v0',
    name: 'v0 by Vercel',
    category: 'Full-Stack App Generator',
    description: 'Generative UI system by Vercel that converts natural language prompts into production React components with Tailwind.',
    pricing: 'Freemium',
    url: 'https://v0.dev',
    featured: true,
    iconName: 'Layout',
    recommendedCourseId: 'course-ai-web-dev'
  },
  {
    id: 'tool-claude-code',
    name: 'Claude Code',
    category: 'Code Assistant',
    description: 'Anthropic\'s agentic command-line tool that operates directly in your terminal to build features and fix bugs.',
    pricing: 'Paid',
    url: 'https://anthropic.com',
    featured: true,
    iconName: 'Cpu',
    recommendedCourseId: 'course-prompt-engineering'
  },
  {
    id: 'tool-scenario',
    name: 'Scenario AI',
    category: 'Game & 3D',
    description: 'AI-powered game asset generation engine that creates consistent sprites, textures, and UI elements.',
    pricing: 'Freemium',
    url: 'https://scenario.com',
    featured: true,
    iconName: 'Gamepad2',
    recommendedCourseId: 'course-ai-game-dev'
  },
  {
    id: 'tool-meshy',
    name: 'Meshy 3D',
    category: 'Game & 3D',
    description: 'Transform text prompts and 2D concept images into fully textured 3D models with glTF and FBX export.',
    pricing: 'Freemium',
    url: 'https://meshy.ai',
    featured: false,
    iconName: 'Box',
    recommendedCourseId: 'course-ai-game-dev'
  },
  {
    id: 'tool-lovable',
    name: 'Lovable',
    category: 'Full-Stack App Generator',
    description: 'Full-stack AI software engineer that scaffolds web apps, connects Supabase backends, and deploys with one click.',
    pricing: 'Freemium',
    url: 'https://lovable.dev',
    featured: true,
    iconName: 'Sparkles',
    recommendedCourseId: 'course-ai-app-dev'
  },
  {
    id: 'tool-midjourney',
    name: 'Midjourney v6',
    category: 'Image & Asset',
    description: 'Industry-standard AI image synthesis model for concept art, UI mockups, realistic textures, and branding.',
    pricing: 'Paid',
    url: 'https://midjourney.com',
    featured: true,
    iconName: 'Image',
    recommendedCourseId: 'course-prompt-engineering'
  },
  {
    id: 'tool-elevenlabs',
    name: 'ElevenLabs',
    category: 'Audio & Voice',
    description: 'Leading voice AI platform for realistic voice acting in games, video narration, and conversational agents.',
    pricing: 'Freemium',
    url: 'https://elevenlabs.io',
    featured: false,
    iconName: 'Headphones',
    recommendedCourseId: 'course-ai-game-dev'
  }
];

export const INITIAL_COMMUNITY_POSTS: CommunityPost[] = [
  {
    id: 'post-1',
    author: {
      name: 'Tariq Al-Mansoor',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop',
      role: 'Mobile AI Developer',
      isPro: true
    },
    createdAt: '2 hours ago',
    title: '🚀 Shipped my first AI habit app using the Nexora React Native template!',
    category: 'Showcase',
    content: 'Just launched OrbitHabit on TestFlight! Built 100% with Cursor using the master prompts from Lesson 2. The glassmorphism card component with animated streak counters is getting awesome feedback. Thank you Elena and the Nexora team!',
    tags: ['MobileApp', 'ReactNative', 'Cursor', 'Showcase'],
    likes: 47,
    isLiked: false,
    commentsCount: 6,
    projectUrl: 'https://github.com/nexora-students/orbithabit-preview',
    imageUrl: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=800&auto=format&fit=crop',
    comments: [
      {
        id: 'c1',
        author: 'Elena Rostova',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
        text: 'Sensational execution Tariq! The haptic feedback on streak completion feels super crisp.',
        time: '1 hour ago'
      },
      {
        id: 'c2',
        author: 'Maya Lin',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
        text: 'Did you use SecureStore for auth tokens? Looks really polished!',
        time: '45 mins ago'
      }
    ]
  },
  {
    id: 'post-2',
    author: {
      name: 'Kenji Sato',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
      role: 'Game Programmer',
      isPro: true
    },
    createdAt: '5 hours ago',
    title: '⚡ Prompt Tip: How to stop Claude from using deprecated Three.js Geometry constructors',
    category: 'Prompt Tip',
    content: 'If Claude keeps outputting `new THREE.Geometry()`, add this negative constraint to your system prompt:\n\n```text\n[NEGATIVE CONSTRAINT]: Strictly use BufferGeometry subclasses (e.g. BoxGeometry, SphereGeometry, BufferGeometry). Never invoke THREE.Geometry, as it was deprecated in Three.js r125.\n```\nIt solved 100% of my WebGL compile crashes!',
    tags: ['ThreeJS', 'PromptTip', 'GameDev', 'WebGL'],
    likes: 82,
    isLiked: true,
    commentsCount: 9,
    comments: [
      {
        id: 'c3',
        author: 'Kaelen Vance',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
        text: 'Gold standard advice Kenji! Adding this to the official Course 2 syllabus.',
        time: '3 hours ago'
      }
    ]
  },
  {
    id: 'post-3',
    author: {
      name: 'Samantha Wright',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
      role: 'Full-Stack Student',
      isPro: false
    },
    createdAt: '1 day ago',
    title: '❓ Question: Best way to handle Paystack webhook verification on serverless?',
    category: 'Question',
    content: 'Hey everyone, I am building my SaaS checkout flow with Paystack. When verifying the HMAC SHA512 signature on the raw request body, Express body-parser was parsing it as JSON first. How did you handle the raw buffer?',
    tags: ['Paystack', 'Payments', 'Backend', 'WebDev'],
    likes: 19,
    isLiked: false,
    commentsCount: 3,
    comments: [
      {
        id: 'c4',
        author: 'Marcus Sterling',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
        text: 'Use `express.json({ verify: (req, res, buf) => { req.rawBody = buf; } })`! That preserves the unparsed crypto bytes.',
        time: '18 hours ago'
      }
    ]
  }
];

export const INITIAL_LEADERBOARD: LeaderboardEntry[] = [
  { rank: 1, name: 'Tariq Al-Mansoor', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop', xp: 4250, level: 18, country: 'UAE', isPro: true, badge: 'Grandmaster' },
  { rank: 2, name: 'Kenji Sato', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop', xp: 3820, level: 16, country: 'Japan', isPro: true, badge: '3D Virtuoso' },
  { rank: 3, name: 'Maya Lin', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop', xp: 3450, level: 14, country: 'Singapore', isPro: true, badge: 'Prompt Archon' },
  { rank: 4, name: 'Lucas Rossi', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop', xp: 2980, level: 12, country: 'Brazil', isPro: true, badge: 'Full-Stack Titan' },
  { rank: 5, name: 'Alex Chen', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop', xp: 850, level: 4, country: 'United States', isPro: true, badge: 'Nexora Pro' },
  { rank: 6, name: 'Amara Okafor', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop', xp: 740, level: 3, country: 'Nigeria', isPro: false, badge: 'Rising Star' }
];

export const INITIAL_ANNOUNCEMENTS: PlatformAnnouncement[] = [
  {
    id: 'ann-1',
    title: '🔥 Weekly Build Challenge: Create a 3D Game with AI in 48 Hours',
    content: 'Join 500+ builders this weekend for our Game Jam! Top 3 games get featured on the Nexora Showcase and win 1 year of Nexora Pro + 2,000 XP.',
    date: 'Nov 4, 2026',
    author: 'Nexora Studios',
    tag: 'Challenge'
  },
  {
    id: 'ann-2',
    title: '✨ 25 New Master Prompts Added to Prompt Library',
    content: 'We just updated the prompt library with tested prompts for Claude 3.5 Sonnet, Cursor rules, and Next.js 15 Server Actions.',
    date: 'Nov 2, 2026',
    author: 'Sarah Nexora',
    tag: 'Update'
  }
];

export const OFFICIAL_BANK_ACCOUNTS: BankAccountDetail[] = [
  {
    id: 'bank-opay-ayomide',
    bankName: 'OPay Digital Services (OPay)',
    accountName: 'Ayomide Omojola Emmanuel',
    accountNumber: '9134992916',
    currency: 'NGN',
    branchOrSortCode: '999992',
    instructions: 'Instant transfer via OPay app or any Nigerian commercial bank app / USSD. Fast confirmation.'
  },
  {
    id: 'bank-opay-jesuloni',
    bankName: 'OPay Digital Services (OPay)',
    accountName: 'JESULONI ENOCH AYODELE',
    accountNumber: '8127933781',
    currency: 'NGN',
    branchOrSortCode: '999992',
    instructions: 'Instant transfer via OPay app or any Nigerian commercial bank app / USSD. Fast confirmation.'
  },
  {
    id: 'bank-kuda-ngn',
    bankName: 'Kuda Microfinance Bank',
    accountName: 'Nexora Studios Academy',
    accountNumber: '2001948572',
    currency: 'NGN',
    instructions: 'Zero-fee instant transfer from Kuda or any commercial bank.'
  },
  {
    id: 'bank-wire-usd',
    bankName: 'Nexora Global USD Domiciliary & Wire',
    accountName: 'Nexora Studios International',
    accountNumber: '0492817492',
    currency: 'USD',
    swiftCode: 'OPAYNGLA',
    instructions: 'For international wire or USD transfers. Please upload SWIFT receipt.'
  }
];

export const INITIAL_RECEIPTS: PaymentReceipt[] = [
  {
    id: 'rcp-101',
    studentName: 'Amara Okafor',
    studentEmail: 'amara.okafor@gmail.com',
    plan: 'pro_yearly',
    amount: 385950,
    currency: 'NGN',
    bankName: 'OPay Digital Services (OPay)',
    senderAccountName: 'Amara Chioma Okafor',
    transactionReference: 'OPAY-TRF-20261105-9842',
    receiptImage: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=800&auto=format&fit=crop',
    notes: 'Paid ₦385,950 for 1 Year Nexora Pro membership to Ayomide Omojola Emmanuel (OPay 9134992916). Please approve full access.',
    submittedAt: 'Today at 08:45 AM',
    status: 'pending'
  },
  {
    id: 'rcp-102',
    studentName: 'Babatunde Adeleke',
    studentEmail: 'tunde.adeleke@gmail.com',
    plan: 'pro_monthly',
    amount: 44950,
    currency: 'NGN',
    bankName: 'Zenith Bank PLC',
    senderAccountName: 'Babatunde Adeleke',
    transactionReference: 'ZEN-APP-8841920',
    receiptImage: 'https://images.unsplash.com/photo-1554224154-26032ffc0d07?q=80&w=800&auto=format&fit=crop',
    notes: 'Transfer verified and confirmed.',
    submittedAt: 'Yesterday at 04:20 PM',
    status: 'approved',
    reviewedAt: 'Yesterday at 04:35 PM',
    reviewedBy: 'DE PHANTOM (Lead Admin)'
  }
];

