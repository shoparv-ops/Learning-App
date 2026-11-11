import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getEntries } from "../api/api";
import LearningEntry from "../components/LearningEntry";
import type { LearningEntry as LearningEntryType } from "../types/LearningEntry";

export default function Entries() {
  const [entries, setEntries] = useState<LearningEntryType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);
  const location = useLocation();
  const saved = Boolean((location.state as { saved?: boolean } | null)?.saved);

  const loadEntries = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getEntries();
      setEntries(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load entries.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadEntries();
  }, [loadEntries, refreshKey]);

  return (
    <div className="page">
      <section className="hero compact-hero">
        <p className="eyebrow">YOUR PROGRESS</p>
        <h1>Learning entries</h1>
        <p>All learning records saved in the database.</p>
      </section>

      <section className="entries-section">
        <div className="entries-toolbar">
          <div>
            <h2>Saved entries</h2>
            <p>{entries.length} {entries.length === 1 ? "entry" : "entries"}</p>
          </div>
          <button className="secondary-button" onClick={() => setRefreshKey(value => value + 1)}>
            Refresh list
          </button>
        </div>

        {saved && <p className="success-message" role="status">Your learning entry was saved successfully.</p>}
        {loading && <p className="status-message">Loading entries...</p>}
        {error && (
          <div className="error-panel">
            <p>{error}</p>
            <p>Check that the backend is running and the database settings are correct.</p>
            <button className="secondary-button" onClick={() => setRefreshKey(value => value + 1)}>Try again</button>
          </div>
        )}
        {!loading && !error && entries.length === 0 && (
          <div className="empty-state">
            <h3>No entries yet</h3>
            <p>Go to Home to add your first learning entry.</p>
          </div>
        )}
        {!loading && !error && entries.length > 0 && (
          <div className="entry-list">
            {entries.map(entry => <LearningEntry key={entry.id} entry={entry} />)}
          </div>
        )}
      </section>
    </div>
  );
}