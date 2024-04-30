import { create } from "zustand";

interface FamilyCrestState {
  crest: string | null;
  updateCrest: (crest: string) => void;
}

export const useFamilyCrestStore = create<FamilyCrestState>((set) => ({
  crest: null,
  updateCrest: (crest) => set({ crest }),
}));
