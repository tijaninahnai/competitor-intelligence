# Competitor — Intelligence Platform

Dutch competitor-analysis dashboard, split from one HTML file into a plain HTML/CSS/JS project (no build step).

## Run
Open `index.html`, or serve the folder: `python3 -m http.server` / `npm start`.
Design system preview: `design-system/styleguide.html`.

## Structure
```
index.html                 markup + script/style order
design-system/
  tokens.css               colours, radii, spacing, type, motion, z-index
  base.css                 reset, canvas, nav, buttons, screens
  pages.css                landing + loading
  dashboard.css            sidebar, main area, mobile bottom nav
  components.css           card, badge, table, stats, bars, tabs, select, drawer
  responsive.css           breakpoints
  styleguide.html          living documentation
src/
  data/                    companies.js, reference.js
  core/                    state, utils, charts, router, events
  views/                   landing + one file per dashboard section + report
  drill/drawer.js          deep drill-down drawer
  main.js                  bootstrap
```
Scripts are classic (not ES modules) and share one global scope, so the **order in `index.html` matters** and the site also works from `file://`.

## Design system rules
- Use tokens (`var(--sp-4)`, `var(--ff-mono)`, `var(--c-danger)`…) for all new CSS.
- New UI = existing components first; add a new component to `components.css` and the styleguide together.
- Some older rules and inline styles in `src/views/*` still hold raw values; migrate gradually.

## Git
```
git remote add origin git@github.com:<user>/competitor-intelligence.git
git push -u origin main
```
All data is simulated demo data.
