# habitio

A consistency tracker that helps you build habits by measuring momentum, not just checkmarks. Track daily routines, visualize streaks, and stay motivated with data-driven insights.

## Features

### Momentum Tracking
- **Dynamic Streak Counters** — current streak + all-time best with flame progression (🌱 → 🔥 → 🔥🔥🔥)
- **Rolling 30-Day Consistency** — percentage score so one bad day doesn't kill your morale
- **Streak Progress Bar** — visual fill toward your personal best

### Smart Scheduling
- **Flexible Cadence** — daily, weekdays, weekends, X times/week, or custom day-of-week schedules
- **Skip Tokens** — 2 per month to pause a streak for life events without resetting progress
- **Time-of-Day Groups** — filter habits by Morning / Afternoon / Evening to reduce cognitive load

### Interaction & UX
- **One-Tap Logging** — click to toggle or swipe right (done) / left (skip) on touch devices
- **Archive vs Delete** — archive preserves history; delete is permanent with confirmation
- **Theme Toggle** — dark and light mode with CSS custom properties

### Analytics & Visuals
- **GitHub-Style Contribution Grid** — 365-day heat map (collapsible)
- **Weekly Overview** — 7-day grid showing daily completion status
- **Time-of-Day Patterns** — per-slot completion rates showing when you're most consistent
- **Milestone Badges** — 10 earnable badges (7-day streak, 100 total completions, 95% consistency, etc.)

### User System
- **Login / Signup** — email-based auth with session persistence (localStorage demo — swap in Firebase/Supabase easily)
- **Profile Menu** — avatar with initials, email display, logout

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 |
| Build | Vite |
| Styling | CSS Custom Properties (dark/light themes) |
| State | React hooks + localStorage |
| Persistence | localStorage (auth + habits) |

## Quick Start

```bash
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

### Production Build

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── AddHabitForm.jsx      — habit creation with cadence & time-of-day
│   ├── AuthModal.jsx          — login/signup modal
│   ├── BadgeDisplay.jsx       — milestone badges
│   ├── ContributionGrid.jsx   — 365-day heat map
│   ├── HabitItem.jsx          — single habit row (toggle, skip, swipe, streak)
│   ├── HabitList.jsx          — filtered habit list
│   ├── Header.jsx             — title, theme toggle, user menu
│   ├── StatsBar.jsx           — aggregate stats
│   ├── ThemeToggle.jsx        — dark/light mode switch
│   ├── TimeAnalytics.jsx      — time-of-day performance breakdown
│   ├── TimeFilter.jsx         — filter by time of day / archived
│   ├── UserMenu.jsx           — avatar dropdown
│   └── WeekView.jsx           — 7-day completion grid
├── context/
│   ├── AuthContext.jsx         — auth state (login, signup, logout, profile)
│   └── ThemeContext.jsx        — theme state + toggle
├── hooks/
│   └── useLocalStorage.js     — localStorage persistence hook
├── utils/
│   ├── badges.js              — badge definitions & checking
│   └── helpers.js             — date utils, streak & consistency calculations
├── App.jsx                    — root component
├── App.css                    — component styles (CSS variables)
├── index.css                  — global resets & theme variables
└── main.jsx                   — entry point
```

## Deployment

### Vercel (recommended)

```bash
npm i -g vercel
vercel
```

Or connect your GitHub repo directly via [vercel.com](https://vercel.com).

### Netlify

```bash
npm run build
npx netlify deploy --prod --dir=dist
```

Or connect your GitHub repo via [netlify.com](https://netlify.com).

### Build settings

- Build command: `npm run build`
- Output directory: `dist`
- No extra configuration needed (Vite handles it).

## Data Storage

All data is stored in `localStorage` under these keys:
- `habitio_data` — habits and logs
- `habitio_users` — registered accounts (simulated)
- `habitio_session` — current user session
- `habitio_theme` — theme preference

To reset your data, clear localStorage via browser DevTools → Application → Local Storage.

## License

MIT
