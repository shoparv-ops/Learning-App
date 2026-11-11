import type { LearningEntry, NewLearningEntry } from "../types/LearningEntry";

const API_BASE_URL = "http://localhost:3001/api";

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(body.message || `Request failed (${response.status})`);
  }
  return response.json() as Promise<T>;
}

export async function getEntries(): Promise<LearningEntry[]> {
  const response = await fetch(`${API_BASE_URL}/entries`);
  return handleResponse<LearningEntry[]>(response);
}

export async function createEntry(entry: NewLearningEntry): Promise<LearningEntry> {
  const response = await fetch(`${API_BASE_URL}/entries`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(entry)
  });
  return handleResponse<LearningEntry>(response);
}