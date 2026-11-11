import EntryForm from "../components/EntryForm";

export default function Home() {
  return (
    <div className="page">
      <section className="hero">
        <p className="eyebrow">YOUR PERSONAL LEARNING JOURNAL</p>
        <h1>Make your learning visible.</h1>
        <p>Record what you study, when you study it and how confident you feel.</p>
      </section>

      <section className="panel form-panel">
        <div className="section-heading">
          <div>
            <p className="eyebrow">NEW RECORD</p>
            <h2>Add a learning entry</h2>
          </div>
        </div>
        <EntryForm />
      </section>
    </div>
  );
}