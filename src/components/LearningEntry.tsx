import type { LearningEntryProps } from "../types/LearningEntry";

function LearningEntry({ topic, date, learned, category }: LearningEntryProps) {
  return (
    <article className="entry-card">
      <div className="entry-card__top">
        <span className="category">{category}</span>
        <time className="entry-date">{date}</time>
      </div>

      <h2>{topic}</h2>
      <p>{learned}</p>
    </article>
  );
}

export default LearningEntry;