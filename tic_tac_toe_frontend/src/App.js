import React from "react";
import "./App.css";

/**
 * PUBLIC_INTERFACE
 */
export default function App() {
  /** Root app shell. Game implementation will be added in subsequent steps. */
  return (
    <div className="app">
      <main className="card" role="main" aria-label="Tic-Tac-Toe">
        <header className="header">
          <h1 className="title">Tic-Tac-Toe</h1>
          <p className="subtitle">
            Two players • Responsive • Minimal UI
          </p>
        </header>

        <section className="placeholder" aria-label="Game area">
          <p className="placeholderText">
            App scaffold is ready. Game UI will render here.
          </p>
        </section>

        <footer className="footer">
          <span className="muted">
            Frontend URL: {process.env.REACT_APP_FRONTEND_URL || "—"}
          </span>
        </footer>
      </main>
    </div>
  );
}
