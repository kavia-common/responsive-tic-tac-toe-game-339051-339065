# Responsive Tic-Tac-Toe (React Frontend)

A simple, responsive, two-player Tic-Tac-Toe game built as a **frontend-only React** application.

## Key Features (MVP)

- **Playable 3×3 grid** (local two-player, same device)
- **Turn indicator** (X starts by default)
- **Win detection** (rows, columns, diagonals)
- **Draw detection** (board full, no winner)
- **Reset / New Game** button
- **Responsive layout** (usable on small screens)
- **Light, modern minimal styling** (primary: `#3b82f6`, accent: `#06b6d4`)

## Project Structure

- `tic_tac_toe_frontend/` — React frontend container (the app)
- `kavia-docs/CodeWiki/Specs/` — Product + architecture documentation

## Run Locally (Preview)

From the repository workspace:

```bash
cd tic_tac_toe_frontend
npm install
npm start
```

Then open the URL printed in the console (typically `http://localhost:3000`).

### Environment Variables

This container has environment variables available via `.env` (prefixed with `REACT_APP_`). For the **frontend-only** tic-tac-toe MVP, backend/WS variables are typically **unused**, but may exist due to a template:

- `REACT_APP_API_BASE`
- `REACT_APP_BACKEND_URL`
- `REACT_APP_FRONTEND_URL`
- `REACT_APP_WS_URL`
- (and others)

If you see build-time warnings about missing env vars, add them to your local `.env` as needed for your environment/tooling.

## Documentation

- **PRD (Product Requirements):**  
  `kavia-docs/CodeWiki/Specs/FeatureSpecs/tic-tac-toe-frontend-prd.md`

- **Architecture Spec:**  
  `kavia-docs/CodeWiki/Specs/ArchitectureSpecs/tic-tac-toe-frontend-architecture.md`

- **Specs Index:**  
  `kavia-docs/CodeWiki/Specs/index.md`

## Non-Goals / Out of Scope

- AI opponent
- Online multiplayer
- User accounts / persistence
- Backend/API integration
- Database

Task completed: README updated with app overview, preview instructions, key features, and links to PRD + architecture docs.
