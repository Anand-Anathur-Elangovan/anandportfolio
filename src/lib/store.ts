import { create } from 'zustand';

interface PortfolioStore {
  // Chat
  chatOpen: boolean;
  setChatOpen: (open: boolean) => void;

  // Recruiter mode
  recruiterModeActive: boolean;
  recruiterStep: number;
  setRecruiterMode: (active: boolean) => void;
  setRecruiterStep: (step: number) => void;

  // Demo modal
  activeDemoId: string | null;
  setActiveDemo: (id: string | null) => void;

  // Loading
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;

  // Easter eggs
  discoveredEggs: string[];
  discoverEgg: (egg: string) => void;

  // Terminal mode
  terminalMode: boolean;
  setTerminalMode: (active: boolean) => void;
}

export const usePortfolioStore = create<PortfolioStore>((set) => ({
  chatOpen: false,
  setChatOpen: (open) => set({ chatOpen: open }),

  recruiterModeActive: false,
  recruiterStep: 0,
  setRecruiterMode: (active) => set({ recruiterModeActive: active, recruiterStep: 0 }),
  setRecruiterStep: (step) => set({ recruiterStep: step }),

  activeDemoId: null,
  setActiveDemo: (id) => set({ activeDemoId: id }),

  isLoading: true,
  setIsLoading: (loading) => set({ isLoading: loading }),

  discoveredEggs: [],
  discoverEgg: (egg) =>
    set((state) => ({
      discoveredEggs: state.discoveredEggs.includes(egg)
        ? state.discoveredEggs
        : [...state.discoveredEggs, egg],
    })),

  terminalMode: false,
  setTerminalMode: (active) => set({ terminalMode: active }),
}));
