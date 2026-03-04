import { create } from 'zustand';

export interface Idea {
    id: string;
    content: string;
    votes: number;
    createdAt: string;
    userId?: string;
    sessionId?: string;
}

interface IdeasState {
    ideas: Idea[];
    isLoading: boolean;
    addIdea: (idea: Omit<Idea, 'id' | 'createdAt'>) => Promise<void>;
    voteIdea: (ideaId: string) => Promise<void>;
    deleteIdea: (ideaId: string) => Promise<void>;
    setIdeas: (ideas: Idea[]) => void;
    setLoading: (isLoading: boolean) => void;
}

export const useIdeasStore = create<IdeasState>((set, get) => ({
    ideas: [],
    isLoading: false,
    setLoading: (isLoading) => set({ isLoading }),
    setIdeas: (ideas) => set({ ideas }),
    addIdea: async (ideaDto) => {
        // In actual implementation, this would call the API.
        // Assuming adding succeeds and we add to local state for fast UI update
        const newIdea: Idea = {
            ...ideaDto,
            id: crypto.randomUUID(),
            createdAt: new Date().toISOString(),
            votes: ideaDto.votes || 0,
        };
        set((state) => ({ ideas: [newIdea, ...state.ideas] }));
    },
    voteIdea: async (ideaId) => {
        // Optimistic UI update
        set((state) => ({
            ideas: state.ideas.map((idea) =>
                idea.id === ideaId ? { ...idea, votes: idea.votes + 1 } : idea
            ),
        }));
    },
    deleteIdea: async (ideaId) => {
        // Optimistic UI update
        set((state) => ({
            ideas: state.ideas.filter((idea) => idea.id !== ideaId),
        }));
    },
}));
