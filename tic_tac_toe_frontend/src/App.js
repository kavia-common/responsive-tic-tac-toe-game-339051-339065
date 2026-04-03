import React, { useMemo, useState } from "react";
import "./App.css";

const PLAYERS = {
  X: "X",
  O: "O",
};

const GAME_STATUS = {
  IN_PROGRESS: "IN_PROGRESS",
  WON: "WON",
  DRAW: "DRAW",
};

/**
 * Determine the winner for a given board.
 * @param {Array<"X"|"O"|null>} squares 9-element board array.
 * @returns {{ winner: "X"|"O"|null, line: number[]|null }} Winner and winning line indices.
 */
function calculateWinner(squares) {
  const lines = [
    // rows
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // cols
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // diagonals
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: [a, b, c] };
    }
  }
  return { winner: null, line: null };
}

/**
 * Determine whether the game is a draw.
 * @param {Array<"X"|"O"|null>} squares 9-element board array.
 * @returns {boolean} True if board is full and no winner.
 */
function isDraw(squares) {
  return squares.every((s) => s !== null);
}

// PUBLIC_INTERFACE
function App() {
  /**
   * PUBLIC_INTERFACE
   * TicTacToe game UI entrypoint.
   * - Local 2-player game on a 3x3 board.
   * - Detects win/draw.
   * - Provides a reset/new game control.
   * @returns {JSX.Element} Rendered application.
   */
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const winnerResult = useMemo(() => calculateWinner(squares), [squares]);
  const winner = winnerResult.winner;
  const winningLine = winnerResult.line;

  const status = useMemo(() => {
    if (winner) return GAME_STATUS.WON;
    if (isDraw(squares)) return GAME_STATUS.DRAW;
    return GAME_STATUS.IN_PROGRESS;
  }, [winner, squares]);

  const currentPlayer = xIsNext ? PLAYERS.X : PLAYERS.O;

  function getStatusText() {
    if (status === GAME_STATUS.WON) return `Winner: ${winner}`;
    if (status === GAME_STATUS.DRAW) return "It's a draw";
    return `Turn: ${currentPlayer}`;
  }

  function handleSquareClick(index) {
    // Ignore moves if game ended or square already filled.
    if (status !== GAME_STATUS.IN_PROGRESS) return;
    if (squares[index] !== null) return;

    setSquares((prev) => {
      const next = prev.slice();
      next[index] = currentPlayer;
      return next;
    });
    setXIsNext((prev) => !prev);
  }

  function resetGame() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }

  return (
    <div className="App">
      <main className="ttt-page" aria-label="Tic Tac Toe">
        <section className="ttt-card">
          <header className="ttt-header">
            <h1 className="ttt-title">Tic‑Tac‑Toe</h1>
            <p
              className={`ttt-status ${
                status === GAME_STATUS.WON
                  ? "is-win"
                  : status === GAME_STATUS.DRAW
                    ? "is-draw"
                    : ""
              }`}
              role="status"
              aria-live="polite"
            >
              {getStatusText()}
            </p>
          </header>

          <div className="ttt-board" role="grid" aria-label="Game board">
            {squares.map((value, i) => {
              const isWinningCell = Boolean(winningLine?.includes(i));
              const disabled =
                status !== GAME_STATUS.IN_PROGRESS || value !== null;

              return (
                <button
                  key={i}
                  type="button"
                  className={`ttt-cell ${value ? "is-filled" : ""} ${
                    isWinningCell ? "is-winning" : ""
                  }`}
                  onClick={() => handleSquareClick(i)}
                  disabled={disabled}
                  role="gridcell"
                  aria-label={`Cell ${i + 1}${value ? `: ${value}` : ""}`}
                >
                  <span className={`ttt-mark ${value === "X" ? "is-x" : "is-o"}`}>
                    {value ?? ""}
                  </span>
                </button>
              );
            })}
          </div>

          <footer className="ttt-footer">
            <button
              type="button"
              className="ttt-btn"
              onClick={resetGame}
              aria-label="Start a new game"
            >
              New game
            </button>
            <p className="ttt-hint">
              Play locally with two players. X starts first.
            </p>
          </footer>
        </section>
      </main>
    </div>
  );
}

export default App;
