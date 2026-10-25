# TechGuide Lab

A premium, static React directory for discovering useful AI tools. No database, Supabase, backend, login, or API key required.

## Requirements
- Node.js (LTS version recommended)
- VS Code

## Run on your computer
1. Extract `TechGuide-Lab.zip`.
2. Open the extracted `TechGuide-Lab` folder in VS Code.
3. Open **Terminal → New Terminal**.
4. Run:
   ```bash
   npm install
   ```
5. Then run:
   ```bash
   npm run dev
   ```
6. Open the local URL Vite shows, usually `http://localhost:5173`.

Keep the terminal running while you use the site. Press `Ctrl+C` to stop it.

## Build the production website
```bash
npm run build
```
Vite creates a `dist` folder. You can deploy that folder to a static host such as Cloudflare Pages or Netlify. This site does not save visitor profiles, search history, comments, or form submissions.

## How to update the directory
Open `src/data/tools.js`. Add or edit an object in the `tools` array. Each entry has a name, category, summary, use cases, free-plan note, official URL, and a few tags. Save the file; Vite refreshes the site automatically.

## Important about free plans
AI vendors change plan features and usage caps frequently. The notes on this site are deliberately broad; confirm current limits on each official site before relying on a specific quota. “Free plan” can mean usage limits, not unlimited use.

## Navigation
React Router handles tool detail URLs. The app uses `useLocation()` so direct links, browser back/forward, and internal navigation render correctly.
