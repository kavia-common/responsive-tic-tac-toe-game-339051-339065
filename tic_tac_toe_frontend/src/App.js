import React, { useMemo, useState } from "react";
import "./App.css";

const LINES = [
  [0, 1, 2], // rows
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6], // cols
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8], // diags
  [2, 4, 6],
];

function getWinner(squares) {
  for (const [a, b, c] of LINES) {
    const v = squares[a];
    if (v && v === squares[b] && v === squares[c]) {
      return { winner: v, line: [a, b, c] };
    }
  }
  return { winner: null, line: null };
}

function isDraw(squares, winner) {
  return !winner && squares.every(Boolean);
}

/**
 * PUBLIC_INTERFACE
 */
export default function App() {
  /** Fully interactive 2-player Tic-Tac-Toe game (local, same device). */
  const [squares, setSquares] = useState(() => Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const { winner, line } = useMemo(() => getWinner(squares), [squares]);
  const draw = useMemo(() => isDraw(squares, winner), [squares, winner]);

  const currentPlayer = xIsNext ? "X" : "O";

  const status = useMemo(() => {
    if (winner) return `Winner: ${winner}`;
    if (draw) return "Draw game";
    return `Turn: ${currentPlayer}`;
  }, [winner, draw, currentPlayer]);

  function handleSquareClick(index) {
    // Ignore clicks after game is over or on an occupied square.
    if (winner || draw || squares[index]) return;

    const next = squares.slice();
    next[index] = currentPlayer;
    setSquares(next);
    setXIsNext((v) => !v);
  }

  function handleNewGame() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }

  function getSquareAriaLabel(i) {
    const value = squares[i];
    const row = Math.floor(i / 3) + 1;
    const col = (i % 3) + 1;
    if (value) return `Row ${row}, column ${col}, ${value}`;
    return `Row ${row}, column ${col}, empty`;
  }

  return (
    <div className="app">
      <main className="card" role="main" aria-label="Tic-Tac-Toe">
        <header className="header">
          <h1 className="title">Tic-Tac-Toe</h1>
          <p className="subtitle">Two players • Responsive • Minimal UI</p>
        </header>

        <section className="game" aria-label="Game area">
          <div className="statusRow" aria-live="polite" aria-atomic="true">
            <div className="status">
              <span className="statusLabel">Status</span>
              <span
                className={[
                  "statusValue",
                  winner ? "statusWin" : "",
                  draw ? "statusDraw" : "",
                ].join(" ")}
              >
                {status}
              </span>
            </div>

            <div className="playerPills" aria-label="Players">
              <span className={["pill", xIsNext ? "pillActiveX" : ""].join(" ")}>
                X
              </span>
              <span className={["pill", !xIsNext ? "pillActiveO" : ""].join(" ")}>
                O
              </span>
            </div>
          </div>

          <div
            className="board"
            role="grid"
            aria-label="Tic-Tac-Toe board"
            aria-disabled={winner || draw ? "true" : "false"}
          >
            {squares.map((value, i) => {
              const isWinning = line?.includes(i);
              const isDisabled = Boolean(value) || Boolean(winner) || Boolean(draw);

              return (
                <button
                  key={i}
                  type="button"
                  className={[
                    "cell",
                    value === "X" ? "cellX" : "",
                    value === "O" ? "cellO" : "",
                    isWinning ? "cellWin" : "",
                  ].join(" ")}
                  onClick={() => handleSquareClick(i)}
                  disabled={isDisabled}
                  role="gridcell"
                  aria-label={getSquareAriaLabel(i)}
                >
                  <span className="cellValue" aria-hidden="true">
                    {value || ""}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="controls">
            <button type="button" className="btnPrimary" onClick={handleNewGame}>
              New game
            </button>

            <div className="hint" role="note">
              {winner || draw ? (
                <span>Press “New game” to play again.</span>
              ) : (
                <span>Tip: first to connect 3 wins.</span>
              )}
            </div>
          </div>
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
