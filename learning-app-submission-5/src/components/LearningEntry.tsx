import type { LearningEntry as LearningEntryType } from "../types/LearningEntry";

interface Props {
  entry: LearningEntryType;
}

export default function LearningEntry({ entry }: Props) {
  return (
    <article className="entry-card">
      <div className="entry-topline">
        <span className="category-tag">{entry.category}</span>
        <time dateTime={entry.date}>{entry.date}</time>
      </div>
      <h3>{entry.topic}</h3>
      <p className="entry-learned">{entry.learned}</p>
      <p className="confidence">Confidence: {entry.confidence}/5</p>
    </article>
  );
}