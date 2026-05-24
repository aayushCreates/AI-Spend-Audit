import { Tool } from '../types/audit'


export const TOOLS: Tool[] = [
  {
    id: 'cursor',
    name: 'Cursor',
    plans: [
      {
        id: 'hobby',
        name: 'Hobby',
        pricePerSeat: 0,
        bestFor: ['coding'],
        maxSeats: 1,
      },
      {
        id: 'pro',
        name: 'Pro',
        pricePerSeat: 20,
        bestFor: ['coding'],
        maxSeats: 1,
      },
      {
        id: 'business',
        name: 'Business',
        pricePerSeat: 40,
        bestFor: ['coding'],
      },
    ],
  },
  {
    id: 'github_copilot',
    name: 'GitHub Copilot',
    plans: [
      {
        id: 'individual',
        name: 'Individual',
        pricePerSeat: 10,
        bestFor: ['coding'],
        maxSeats: 1,
      },
      {
        id: 'business',
        name: 'Business',
        pricePerSeat: 19,
        bestFor: ['coding'],
      },
      {
        id: 'enterprise',
        name: 'Enterprise',
        pricePerSeat: 39,
        bestFor: ['coding'],
        minSeats: 20,
      },
    ],
  },
  {
    id: 'claude',
    name: 'Claude (Anthropic)',
    plans: [
      {
        id: 'free',
        name: 'Free',
        pricePerSeat: 0,
        bestFor: ['writing', 'research', 'mixed'],
        maxSeats: 1,
      },
      {
        id: 'pro',
        name: 'Pro',
        pricePerSeat: 20,
        bestFor: ['writing', 'research', 'mixed'],
        maxSeats: 1,
      },
      {
        id: 'max',
        name: 'Max',
        pricePerSeat: 100,
        bestFor: ['research', 'data'],
        maxSeats: 1,
      },
      {
        id: 'team',
        name: 'Team',
        pricePerSeat: 30,
        bestFor: ['writing', 'mixed'],
        minSeats: 2,
      },
      {
        id: 'api_direct',
        name: 'API Direct',
        pricePerSeat: 0,
        isApiDirect: true,
        bestFor: ['coding', 'data'],
      },
    ],
  },
  {
    id: 'chatgpt',
    name: 'ChatGPT (OpenAI)',
    plans: [
      {
        id: 'free',
        name: 'Free',
        pricePerSeat: 0,
        bestFor: ['writing', 'mixed'],
        maxSeats: 1,
      },
      {
        id: 'plus',
        name: 'Plus',
        pricePerSeat: 20,
        bestFor: ['writing', 'research', 'mixed'],
        maxSeats: 1,
      },
      {
        id: 'team',
        name: 'Team',
        pricePerSeat: 30,
        bestFor: ['writing', 'mixed'],
        minSeats: 2,
      },
      {
        id: 'api_direct',
        name: 'API Direct',
        pricePerSeat: 0,
        isApiDirect: true,
        bestFor: ['coding', 'data'],
      },
    ],
  },
  {
    id: 'anthropic_api',
    name: 'Anthropic API',
    plans: [
      {
        id: 'api_direct',
        name: 'API Direct (Pay as you go)',
        pricePerSeat: 0,
        isApiDirect: true,
        bestFor: ['coding', 'data'],
      },
    ],
  },
  {
    id: 'openai_api',
    name: 'OpenAI API',
    plans: [
      {
        id: 'api_direct',
        name: 'API Direct (Pay as you go)',
        pricePerSeat: 0,
        isApiDirect: true,
        bestFor: ['coding', 'data'],
      },
    ],
  },
  {
    id: 'gemini',
    name: 'Gemini (Google)',
    plans: [
      {
        id: 'free',
        name: 'Free',
        pricePerSeat: 0,
        bestFor: ['writing', 'research'],
        maxSeats: 1,
      },
      {
        id: 'advanced',
        name: 'Advanced',
        pricePerSeat: 20,
        bestFor: ['writing', 'research', 'mixed'],
        maxSeats: 1,
      },
      {
        id: 'business',
        name: 'Business (Workspace)',
        pricePerSeat: 24,
        bestFor: ['writing', 'mixed'],
      },
      {
        id: 'api_direct',
        name: 'API Direct',
        pricePerSeat: 0,
        isApiDirect: true,
        bestFor: ['coding', 'data'],
      },
    ],
  },
  {
    id: 'windsurf',
    name: 'Windsurf',
    plans: [
      {
        id: 'free',
        name: 'Free',
        pricePerSeat: 0,
        bestFor: ['coding'],
        maxSeats: 1,
      },
      {
        id: 'pro',
        name: 'Pro',
        pricePerSeat: 15,
        bestFor: ['coding'],
        maxSeats: 1,
      },
      {
        id: 'teams',
        name: 'Teams',
        pricePerSeat: 35,
        bestFor: ['coding'],
        minSeats: 2,
      },
    ],
  },
]

export const getToolById = (id: string) =>
  TOOLS.find((t) => t.id === id);

export const getPlanById = (toolId: string, planId: string) =>
  getToolById(toolId)?.plans.find((p) => p.id === planId);