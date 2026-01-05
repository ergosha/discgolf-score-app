# Discgolf Score App

A small web app to track disc golf rounds, scores, and round history. Built with Next.js (app router) and TypeScript — focused on a simple, mobile-first scorecard and round history.

## Features

- Real-time scorecard for tracking strokes per hole
- Round history with per-round detail pages
- Mobile-friendly layout and bottom navigation
- Lightweight, no-signup local-first experience (stores data in browser)

## Tech Stack

- Next.js (App Router)
- TypeScript
- React
- Tailwind / CSS modules (project styles)

## Prerequisites

- Node.js 18+ and a package manager (`npm`, `pnpm`, or `yarn`).

## Install

Open a terminal in the project root and run:

```bash
npm install
```

## Development

Start the dev server:

```bash
npm run dev
```

Open http://localhost:3000 to view the app.

## Build

```bash
npm run build
npm run start
```

## Project Structure (high level)

- `src/app/` — Next.js app routes and pages
- `src/app/components/` — React components (layout, navigation, scorecard)
- `src/app/round/` — Round creation and scoring screens
- `src/app/history/` — Round history and detail pages

