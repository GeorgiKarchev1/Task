# Trip Card Explorer

A compact React app that shows a curated set of trip destination cards — responsive, accessible, and pleasant to use.

## Key features

* Responsive grid, lazy images, smooth UI
* Live search + sort by rating
* Click “More Info” for an accessible modal (ESC/click outside to close)
* Loading / error / empty states handled gracefully

## Quick start

```bash
cd trip-card-explorer
npm install
npm run dev        # open http://localhost:5173
npm run build      # production build
npm run preview    # preview prod build
```

## Structure (short)

```
src/
├─ components/  # TripCard, Modal, SearchBar, Icons
├─ hooks/       # useFetchTrips.js
├─ styles/      # _variables.scss
App.jsx, main.jsx
public/data.json
```

## Notes

* Built with Vite, React + hooks, and SASS.
* Priorities: clean code, good UX, accessibility.
* Deferred: TypeScript, tests, advanced filters — easy to add.

Contributions welcome — open a PR or issue. ✈️
