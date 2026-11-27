# Little Mathematician

An educational web app for practising simple arithmetic. Built with React and
TypeScript to learn the library and to keep a small, fully tested codebase.

## Live link

[Little Mathematician Web App](https://greladesign.co/little-mathematician/)

## Features

- **Four operations** — addition, subtraction, multiplication and division, each
  as its own game (`/game/addition`, `/game/subtraction`,
  `/game/multiplication`, `/game/division`).
- **Configurable difficulty** — number of questions (10, 25, 50 or 100) and the
  number range the questions are generated from, set on `/config`.
- **Instant feedback** — the answer is marked correct or wrong immediately and
  the correct result is shown before the next question.
- **Score per operation** — separate totals for addition, subtraction,
  multiplication and division.
- **History** — the last 10 closed games (finished or abandoned) with operation,
  score, answered questions, question count, finish time and status.
- **Progress is saved** — the score totals and the game history live in
  `localStorage` under `little-mathematician:state`, so they survive a reload.
- **Keyboard play** — `1`–`4` select an answer, `Enter` advances to the next
  question once feedback is visible. Focus moves to the next control
  automatically, so the game can be played without a mouse.

## Tech stack

| Area | Choice |
| --- | --- |
| UI | React 19, TypeScript |
| Build | Vite 8 |
| State | Redux 5 with `react-redux` |
| Routing | React Router 8 |
| Styles | Sass (`src/sass/_variables.scss` for shared tokens) |
| Tests | Vitest 5, Testing Library, jsdom |
| Lint | ESLint 10 (flat config, `react-hooks`, `react-refresh`) |

## Getting started

Requires Node.js 22 LTS or newer and npm.

```bash
npm install
npm run dev      # start the dev server
```

The app is served under the `/little-mathematician/` base path, so the dev
server prints the full URL — open that one, not the bare host.

## Scripts

| Script | What it does |
| --- | --- |
| `npm run dev` | Vite dev server with HMR |
| `npm run build` | Type-check (`tsc -b`) and build to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run test` | Vitest run (single pass, 4 workers) |
| `npm run test:watch` | Vitest in watch mode |
| `npm run test:coverage` | Coverage report via `@vitest/coverage-v8` |
| `npm run lint` | ESLint over the repository |

## Routes

| Path | Page |
| --- | --- |
| `/` | Menu — pick an operation |
| `/game/:type` | A running game |
| `/game/:type/game-over` | Summary of the finished game |
| `/config` | Question count and number range |
| `/history` | Table of the last closed games |
| `/about` | About the app and the source link |

Unknown paths fall through to a "not found" page.

## Data and persistence

The store keeps three slices: `config` (question count and range), `game`
(current game plus the history of closed games) and `score` (per-operation
totals).

Only the durable part is written to `localStorage` — the score totals and the
history. Every stored payload carries a `version`; the history entries are
validated field by field on read, so an outdated or hand-edited value is
discarded instead of breaking the first render. Only a closed game's summary is
kept (no questions), which keeps the payload small.

## Responsive layout

- The layout switches between a wide and a narrow variant at
  `MIN_DEVICE_WIDTH` (441 px): the wide one shows the menu bar, the narrow one
  collapses it into a dropdown that is fully keyboard operable.
- On screens up to 560 px the history table turns into a stack of cards: the
  header row is hidden visually (but stays in the accessibility tree) and each
  cell shows its column name through `data-label`, so the values keep their
  meaning without horizontal scrolling.
- The footer is a flex item of a full-height column: it sits on the bottom edge
  of a short page and is pushed below the content when the page is longer.

## Project structure

```
src/
  actions/        Redux action creators
  components/     Equation, Feedback, GameAnswers, GameHud, GameOver, Footer
  gamelogic/      question generation and distractor picking
  icons/          inline SVG icon components
  pages/          Menu, MathGame, GameOverPage, Config, About, History, NoMatch
  reducers/       config, game and score reducers
  store/          store setup and localStorage persistence
  utils/          maths helpers, history helpers, class names, basename
  sass/           shared SCSS variables
```

`src/App.tsx` holds the layout, the routing table and the narrow-layout menu
(`DropDown.scss`). Each component and page keeps its styles in a sibling `.scss`
file.

## Testing

```bash
npm run test
npm run lint
```

The suite covers the reducers, the question generator, the persistence layer and
the components and pages (Testing Library, jsdom), including keyboard play and
focus handling. Component snapshots live next to the tests in `__snapshots__/`;
update them with `npm run test -- -u` after an intentional markup change.

## Deployment

The production build is hosted at
`https://greladesign.co/little-mathematician/`, which is why `vite.config.ts`
sets `base` to `/little-mathematician/`. `public/.htaccess` handles the
trailing-slash redirect and serves `index.html` for client-side routes; the dev
and preview servers get the same redirect from a small Vite plugin.

```bash
npm run build    # output in dist/
```

## Browser support

Modern evergreen browsers: Chrome, Edge, Firefox and Safari (desktop and iOS).
Internet Explorer is not supported — the stack (React 19, Vite 8) does not
target it.

## Roadmap

- Game identity: a game is either in progress (can be continued) or finished
  (played to the end, can be reviewed).
- Review mode for a finished game: `/game/:type/review/:gameId/:question`.
- Optional account storage for player data (anonymous players keep everything in
  the browser).

## License

Apache License 2.0 — see [LICENSE](LICENSE). 
Copyright 2018 Łukasz 'Severiaan' Grela, GrelaDesign.
