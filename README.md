# Ghumakkad - Travel Planner

A travel planning web application built with **React 18** and **Vite**, featuring itinerary building, packing lists, travel suggestions, budget estimation, and weather forecasts.

## Tech Stack

- **Framework**: React 18 + Vite
- **Routing**: React Router v6
- **Styling**: Tailwind CSS + design tokens
- **Charts**: Chart.js + react-chartjs-2
- **Animations**: Framer Motion
- **HTTP**: Axios

## Key Features

- **Itinerary Builder** – Add activities with dates; pick from popular itineraries
- **Packing List** – Generate packing lists from predefined trip types; add custom items
- **Travel Suggestions** – Browse and search destinations
- **Budget Estimator** – Track expenses with pie charts
- **Weather Forecast** – Real-time weather via WeatherAPI

## Getting Started

### Install Dependencies

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build

```bash
npm run build
```

Output is in `dist/`.

### Preview

```bash
npm run preview
```

## Project Structure

```
src/
├── components/         # Shared UI components
│   └── ui/
├── features/
│   ├── home/
│   ├── itinerary/
│   ├── packing/
│   ├── suggestions/
│   ├── budget/
│   ├── weather/
│   └── layout/
├── lib/
├── theme/
├── App.tsx
├── main.tsx
└── styles.css
```

## Scripts

| Command          | Description          |
| ---------------- | -------------------- |
| `npm run dev`    | Start dev server     |
| `npm run build`  | Build for production |
| `npm run preview`| Preview production build |
