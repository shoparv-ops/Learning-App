
import { create } from "zustand";
import type { LearningEntry } from "../types/LearningEntry";

interface EntryState {
  entries: LearningEntry[];
  setEntries: (entries: LearningEntry[]) => void;
}

export const useEntryStore = create<EntryState>((set) => ({
  entries: [],
  setEntries: (entries) => set({ entries }),
}));
