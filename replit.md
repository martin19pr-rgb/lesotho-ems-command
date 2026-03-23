# Lesotho EMS Command Centre

A real-time Emergency Medical Services (EMS) command and control dashboard for the Kingdom of Lesotho Ministry of Health.

## Overview

This is a frontend-only React + Vite application built with TypeScript. It provides a live operational dashboard for EMS dispatch, incident tracking, ambulance management, and hospital capacity monitoring.

## Tech Stack

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite 5
- **Styling**: Tailwind CSS + shadcn/ui components
- **Routing**: React Router DOM v6
- **State/Data**: TanStack React Query
- **Maps**: Leaflet + React Leaflet
- **Charts**: Recharts
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod

## Project Structure

```
src/
  App.tsx          # Root app with routing
  main.tsx         # Entry point
  pages/           # Route-level page components
  components/      # Reusable UI components
  hooks/           # Custom React hooks
  lib/             # Utility functions
  data/            # Static data / mock data
```

## Development

Run the development server:
```
npm run dev
```

The app runs on port 5000 and is accessible via the Replit webview.

## Deployment

This is a static frontend app. Build with:
```
npm run build
```

Output goes to `dist/`.

## Notes

- Migrated from Lovable to Replit (March 2026)
- `lovable-tagger` was removed from vite.config.ts as it's Lovable-specific
- Vite dev server configured for Replit: port 5000, `allowedHosts: true`, host `0.0.0.0`
