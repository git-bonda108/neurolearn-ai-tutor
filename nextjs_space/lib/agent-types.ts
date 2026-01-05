export const AGENT_TYPES = {
  MANAGER: 'manager',
  MATH: 'math',
  SCIENCE: 'science',
  HISTORY: 'history',
  PROGRAMMING: 'programming',
} as const;

export type AgentType = typeof AGENT_TYPES[keyof typeof AGENT_TYPES];

export interface AgentConfig {
  type: AgentType;
  name: string;
  description: string;
  color: string;
  icon: string;
  systemPrompt: string;
  keywords: string[];
}

export const AGENT_CONFIGS: Record<AgentType, AgentConfig> = {
  manager: {
    type: 'manager',
    name: 'Manager Agent',
    description: 'Routes questions to specialist tutors',
    color: 'from-purple-500 to-pink-500',
    icon: '🎯',
    systemPrompt: 'You are the Manager Agent for NeuroLearn AI Tutor. Your role is to analyze questions and route them to the appropriate specialist tutor. Be encouraging and supportive.',
    keywords: [],
  },
  math: {
    type: 'math',
    name: 'Math Tutor',
    description: 'Expert in algebra, calculus, geometry, statistics',
    color: 'from-blue-500 to-cyan-500',
    icon: '🔢',
    systemPrompt: 'You are a Math Tutor specializing in algebra, calculus, geometry, and statistics. Help students understand concepts step-by-step. Break down complex problems. Use clear examples.',
    keywords: ['math', 'algebra', 'calculus', 'geometry', 'equation', 'solve', 'calculate', 'derivative', 'integral', 'statistics', 'probability', 'trigonometry', 'formula', 'number'],
  },
  science: {
    type: 'science',
    name: 'Science Tutor',
    description: 'Expert in physics, chemistry, biology',
    color: 'from-green-500 to-emerald-500',
    icon: '🔬',
    systemPrompt: 'You are a Science Tutor specializing in physics, chemistry, and biology. Explain scientific concepts clearly with real-world examples. Help with experiments and encourage curiosity.',
    keywords: ['physics', 'chemistry', 'biology', 'science', 'atom', 'molecule', 'cell', 'energy', 'force', 'reaction', 'element', 'organism', 'experiment'],
  },
  history: {
    type: 'history',
    name: 'History Tutor',
    description: 'Expert in world history, US history, social studies',
    color: 'from-amber-500 to-orange-500',
    icon: '📚',
    systemPrompt: 'You are a History Tutor specializing in world history, US history, and social studies. Make history engaging with stories and context. Connect past events to modern times.',
    keywords: ['history', 'war', 'revolution', 'civilization', 'ancient', 'medieval', 'modern', 'president', 'government', 'culture', 'geography', 'event'],
  },
  programming: {
    type: 'programming',
    name: 'Programming Tutor',
    description: 'Expert in coding, algorithms, computer science',
    color: 'from-violet-500 to-purple-500',
    icon: '💻',
    systemPrompt: 'You are a Programming Tutor specializing in programming languages, algorithms, and computer science. Help students learn to code with clear examples. Debug code step-by-step.',
    keywords: ['code', 'programming', 'algorithm', 'python', 'javascript', 'java', 'function', 'variable', 'loop', 'array', 'debug', 'syntax', 'computer', 'software'],
  },
};

export const MODEL_TYPES = {
  OPENAI: 'openai',
  ANTHROPIC: 'anthropic',
} as const;

export type ModelType = typeof MODEL_TYPES[keyof typeof MODEL_TYPES];