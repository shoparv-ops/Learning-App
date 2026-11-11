export interface LearningEntry {
  id: number;
  topic: string;
  date: string;
  learned: string;
  confidence: number;
  category: string;
}

export type NewLearningEntry = Omit<LearningEntry, "id">;