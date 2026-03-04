import { create } from 'zustand';

export type UiTheme = 'light' | 'dark' | 'system';

interface UiState {
    isSidebarOpen: boolean;
    theme: UiTheme;
    isTimerModalOpen: boolean;
    toggleSidebar: () => void;
    setSidebarOpen: (isOpen: boolean) => void;
    setTheme: (theme: UiTheme) => void;
    setTimerModalOpen: (isOpen: boolean) => void;
}

export const useUiStore = create<UiState>((set) => ({
    isSidebarOpen: false,
    theme: 'system',
    isTimerModalOpen: false,
    toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
    setSidebarOpen: (isOpen) => set({ isSidebarOpen: isOpen }),
    setTheme: (theme) => set({ theme }),
    setTimerModalOpen: (isOpen) => set({ isTimerModalOpen: isOpen }),
}));
