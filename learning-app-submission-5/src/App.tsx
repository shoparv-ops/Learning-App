import { NavLink, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Entries from "./pages/Entries";

export default function App() {
  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="header-inner">
          <NavLink to="/" className="brand">Learning App</NavLink>
          <nav aria-label="Main navigation" className="main-nav">
            <NavLink to="/" end className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
              Home
            </NavLink>
            <NavLink to="/entries" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
              Entries
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/entries" element={<Entries />} />
          <Route path="*" element={
            <section className="panel">
              <h1>Page not found</h1>
              <p>The page you requested does not exist.</p>
              <NavLink to="/" className="button-link">Back to Home</NavLink>
            </section>
          } />
        </Routes>
      </main>

      <footer className="site-footer">Learning App · Personal learning journal</footer>
    </div>
  );
}