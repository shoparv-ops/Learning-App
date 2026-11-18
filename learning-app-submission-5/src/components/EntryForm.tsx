
import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { createEntry, getEntries } from "../api/api";
import { useEntryStore } from "../store/entryStore";
import type { NewLearningEntry } from "../types/LearningEntry";

export default function EntryForm() {
  const navigate = useNavigate();

  const setEntries = useEntryStore((state) => state.setEntries);

  // Local state: form values are only needed while the user fills in this form.
  const [topic, setTopic] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [learned, setLearned] = useState("");
  const [confidence, setConfidence] = useState(3);
  const [category, setCategory] = useState("Programming");

  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const entry: NewLearningEntry = {
      topic,
      date,
      learned,
      confidence,
      category,
    };

    try {
      setSaving(true);

      // Save the new entry to the database using POST.
      await createEntry(entry);

      // Fetch the updated entries from the database using GET.
      const updatedEntries = await getEntries();

      // Update the shared Zustand store.
      setEntries(updatedEntries);

      // Navigate to Entries after updating the shared store.
      navigate("/entries", { state: { saved: true } });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Saving failed.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form className="entry-form" onSubmit={handleSubmit}>
      <label>
        Topic
        <input
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          required
          maxLength={150}
          placeholder="e.g. React Router"
        />
      </label>

      <label>
        Date
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </label>

      <label>
        Category
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option>Programming</option>
          <option>Database</option>
          <option>Frontend</option>
          <option>Backend</option>
          <option>Other</option>
        </select>
      </label>

      <label>
        What did you learn?
        <textarea
          value={learned}
          onChange={(e) => setLearned(e.target.value)}
          required
          rows={4}
          placeholder="Write a short description of what you learned..."
        />
      </label>

      <label>
        Confidence (1–5)
        <select
          value={confidence}
          onChange={(e) => setConfidence(Number(e.target.value))}
        >
          <option value={1}>1 - Beginner</option>
          <option value={2}>2 - A little</option>
          <option value={3}>3 - Okay</option>
          <option value={4}>4 - Good</option>
          <option value={5}>5 - Very confident</option>
        </select>
      </label>

      {error && (
        <p className="error-message" role="alert">
          {error}
        </p>
      )}

      <button className="primary-button" type="submit" disabled={saving}>
        {saving ? "Saving..." : "Save learning entry"}
      </button>
    </form>
  );
}
