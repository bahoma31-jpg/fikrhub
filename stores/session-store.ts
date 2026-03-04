import { create } from 'zustand';

// Mock types since we might not have access to A1's full types yet.
// These should ideally be imported from @/types if they are fully available.
export interface Session {
    id: string;
    title: string;
    techniqueId?: string;
    status: 'active' | 'archived' | 'completed';
    timeRemaining?: number;
    participantsCount: number;
}

interface SessionState {
    currentSession: Session | null;
    isLoading: boolean;
    timeRemaining: number;
    isTimerRunning: boolean;
    startSession: (session: Session) => void;
    endSession: () => void;
    updateTimeRemaining: (time: number) => void;
    toggleTimer: () => void;
}

export const useSessionStore = create<SessionState>((set) => ({
    currentSession: null,
    isLoading: false,
    timeRemaining: 0,
    isTimerRunning: false,
    startSession: (session) => set({ currentSession: session, timeRemaining: session.timeRemaining || 0 }),
    endSession: () => set({ currentSession: null, timeRemaining: 0, isTimerRunning: false }),
    updateTimeRemaining: (time) => set({ timeRemaining: time }),
    toggleTimer: () => set((state) => ({ isTimerRunning: !state.isTimerRunning })),
}));
