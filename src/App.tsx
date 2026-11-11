import LearningEntry from "./components/LearningEntry";
import "./App.css";

function App() {
  return (
    <main className="page">
      <div className="page-shell">
        <header className="hero">
          <p className="eyebrow">MY STUDY JOURNAL</p>
          <h1>Learning App</h1>
          <p className="student-name">
            Student: <strong>Arvin Shopon</strong>
          </p>
          <p className="intro">
            A collection of things I have learned during my studies.
          </p>
        </header>

        <section className="entries-section" aria-labelledby="entries-heading">
          <div className="section-heading">
            <div>
              <p className="eyebrow">RECENT ACTIVITY</p>
              <h2 id="entries-heading">My learning entries</h2>
            </div>
            <span className="entry-count">2 ENTRIES</span>
          </div>

          <div className="entries-grid">
            <LearningEntry
              topic="JavaScript and TypeScript"
              date="11 November 2026"
              learned="I learned how TypeScript adds static types to JavaScript. Types make it easier to catch mistakes and understand the data a component expects."
              category="Programming"
            />

            <LearningEntry
              topic="Building a React component"
              date="11 November 2026"
              learned="I learned how to create a reusable React component, pass information through props, and describe those props with a TypeScript interface."
              category="Web Development"
            />
          </div>
        </section>

        <footer className="footer">
          <span>Learning App</span>
          <span>React · TypeScript · Vite</span>
        </footer>
      </div>
    </main>
  );
}

export default App;