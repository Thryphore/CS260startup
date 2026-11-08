In the newest version, I've added a basic mostly placeholder website.

# GW2 fractal and sigil help

[My Notes](notes.md)

A website for Guild Wars 2 that shows common skips for fractals

### Elevator pitch

I am making a website that will show crowd-sourced skips for fractals to improve the everyday experience and speed of gameplay

### Design

![Design image](20260909_205810.jpg)





### Key features

- Shows skips for fractals
- Logging in for crowd sourcing
- Updates for new fractals

### Technologies

I am going to use the required technologies in the following ways.

- **HTML** - Uses structural HTML to build the application. Includes an authentication page, a main dashboard for browsing skips, a submission form, and a live practice board.
- **CSS** - Styles the application for responsive design across different screen sizes. Implements a dark theme with consistent whitespace and color contrast to match the game's aesthetic.
- **React** - Handles the frontend UI components, including the dynamic submission form, the interactive skip gallery, state management for user sessions, and view routing.
- **Service** - An Express backend providing RESTful API endpoints to handle user authentication, fetch skip data, process new submissions, and pull current Daily Fractals from the official Guild Wars 2 API.
- **DB/Login** - Securely stores user credentials, skip details, and community votes in a database. Ensures only authenticated users can submit new content or vote.
- **WebSocket** - Broadcasts real-time updates across the platform so that new skip submissions and posts to the live practice LFG board appear instantly for all connected users without refreshing the page.

## 🚀 Specification Deliverable

> [!NOTE]
> Fill in this sections as the submission artifact for this deliverable. You can refer to this [example](https://github.com/webprogramming260/startup-example/blob/main/README.md) for inspiration.

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] I completed the prerequisites for this deliverable (Git commit requirement)
- [x] Proper use of Markdown
- [x] A concise and compelling elevator pitch
- [x] Description of key features
- [x] Description of how you will use each technology including your 3rd party API and use of WebSocket
- [x] One or more rough sketches of your application. Images must be embedded in this file using Markdown image references.

## 🚀 AWS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Rented EC2 server** - I rented an EC2 Micro
- [x] **Leased domain name** - My domain name is jacobwittig.com
- [x] **Server accessible** from my domain: [https://jacobwittig.com](https://jacobwittig.com) - I did not complete this part of the deliverable.

## 🚀 HTML deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] I completed the prerequisites for this deliverable (Simon deployed, GitHub link, Git commits)
- [x] **HTML pages** - Created `index.html` (home + login), `fractals.html` (skips, submit form, live updates), and `gear.html` (gear lookup + API).
- [x] **Proper HTML element usage** - Used `header`, `nav`, `main`, `footer`, forms, tables, labels, and lists consistently across pages.
- [x] **Links** - Shared navigation between all pages, plus in-content links from home to Fractal Skips and Gear.
- [x] **Text** - Application copy describing fractal skips, gear recommendations, and how login, database, API, and WebSocket features will work.
- [x] **3rd party API placeholder** - Gear page includes a Guild Wars 2 API section with `https://api.guildwars2.com` and labeled response placeholders.
- [x] **Images** - Hero images on each page (`welcome.png`, `fractals.png`, `gear.png`), plus `gear-icon.png` and `favicon.svg`.
- [x] **Login placeholder** - Login/create form on home, with username display placeholder in the header on every page.
- [x] **DB data placeholder** - Placeholder tables for stored skips on Fractals and recommended gear on Gear, with clearly labeled example rows.
- [x] **WebSocket placeholder** - Live updates section on Fractals showing where realtime skip submissions and votes will appear.

## 🚀 CSS deliverable

For this deliverable I properly styled the application into its final appearance. Shared styles live in `styles.css` and are used by `index.html`, `fractals.html`, and `gear.html`.

- [x] I completed the prerequisites for this deliverable (Simon deployed at [simon.cs260.click](https://simon.cs260.click), GitHub link in the site footer, Git commits for this work)
- [x] **Visually appealing colors and layout. No overflowing elements.** - Dark Fractal Mists theme with navy backgrounds, crystal teal accents, and sparse gold highlights defined as CSS variables in `styles.css`. Open spacing, constrained image/table widths, and consistent panels so nothing overflows on desktop or mobile.
- [x] **Use of a CSS framework** - Bootstrap 5 (CDN) for the navbar, collapse menu, cards, forms, tables, buttons, and login modal. Custom theme overrides in `styles.css` keep the Bootstrap components matching the mists look.
- [x] **All visual elements styled using CSS** - Header/brand, navigation, hero images, feature cards, forms, tables, live-update list, gear API panel, login modal, and footer are all styled through Bootstrap classes plus `styles.css` (no unstyled default browser look).
- [x] **Responsive to window resizing using flexbox and/or grid display** - `body` is a flex column so the footer stays at the bottom. Navbar brand, user chip, and footer use flexbox. Home feature cards and the gear `.api-item` panel use CSS grid. Bootstrap `navbar-expand-lg` collapses the nav on small screens; hero images scale with `max-width: 100%`.
- [x] **Use of a imported font** - Google Fonts: Cormorant Garamond for headings/brand and Outfit for body text, linked in every HTML page head.
- [x] **Use of different types of selectors including element, class, ID, and pseudo selectors** - Element selectors for `body`, headings, links, and tables; class selectors for layout (`.site-header`, `.feature-card`, `.api-picture-box`, `.api-item`, `.btn-mist`, etc.); the ID selector `#login-title` for the unique sign-in dialog heading; pseudo selectors `:hover`, `:focus-visible`, `:disabled`, and `::placeholder` for interactive states.

## 🚀 React part 1: Routing deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [X] I completed the prerequisites for this deliverable (Simon deployed, GitHub link, Git commits)
- [x] **Bundled using Vite** - The site is a Vite single-page app. `npm run dev` serves it, and `npm run build` writes the production bundle to `dist`. Deployment uses `deployReact.sh`.
- [x] **Components** - The router lives in `src/app.jsx`. Header, page outlet, and footer are `src/components/AppLayout.jsx`, and the navbar is `src/components/SiteNav.jsx`. The sign-in dialog is `src/login/LoginModal.jsx`. Page content is in `src/home/Home.jsx`, `src/fractals/Fractals.jsx`, `src/gear/Gear.jsx`, and `src/notfound/NotFound.jsx`. The navbar and sign-in controls use React Bootstrap.
- [x] **Router** - React Router swaps Home (`/`), Fractal Skips (`/fractals`), and Gear (`/gear`) without a full page load. Unknown paths show a not-found view.

## 🚀 React part 2: Reactivity deliverable

For this deliverable I used JavaScript and React so that the application completely works for a single user. Backend pieces are mocked until later deliverables.

- [x] I completed the prerequisites for this deliverable (Simon deployed, GitHub link, Git commits)
- [x] **All functionality implemented or mocked out** - Login/create account and session restore via `localStorage` (`src/services/authService.js`, `src/auth/AuthContext.jsx`). Skip list, submissions, and votes persist in `localStorage` (`src/services/skipService.js`) with seed tips that later moved to `service/defaultSkips.js`. Gear recommendations are hard-coded from the [Discretize cheat sheet](https://archive.discretize.eu/guides/cheat-sheet/) in `src/data/gearRecommendations.js`. Guild Wars 2 API item/daily responses are mocked in `src/services/gw2Api.js`. Live peer activity on Fractal Skips uses `setInterval` in `src/fractals/Fractals.jsx` to stand in for WebSocket messages.
- [x] **Hooks** - `useState` / `useEffect` drive auth session restore, skip loading, the live feed interval, gear lookup results, and mocked daily fractals on Home and Gear. Auth is shared with `useContext` (`AuthProvider`). Components render based on login state (submit/upvote enabled only when signed in; nav shows username or “Not logged in”).

## 🚀 Service deliverable

For this deliverable I moved login, skip submissions, and votes off `localStorage` and onto an Express service. Gear recommendations stay hard-coded. Daily fractals and item icons are loaded in the browser from the Guild Wars 2 API. The live activity feed is still a `setInterval` stand-in until the WebSocket deliverable.

- [x] I completed the prerequisites for this deliverable (Simon deployed at [simon.cs260.click](https://simon.cs260.click), GitHub link in the site footer, Git commits)
- [x] **Node.js/Express HTTP service** - `service/index.js` is an Express app with its own `service/package.json` (`express`, `cookie-parser`, `bcryptjs`, `uuid`, `morgan`). The service is ESM (`"type": "module"`). It listens on `process.env.PORT`, then a command-line port, then 4000. `morgan('dev')` logs each request. `vite.config.js` proxies `/api` to `http://localhost:4000`, so `npm run dev` and `node service/index.js` run together and `fetch('/api/...')` stays same-origin.
- [x] **Static middleware for frontend** - `app.use(express.static('public'))` serves the built frontend, and unknown paths fall back to `public/index.html` so a refresh on `/fractals` or `/gear` still loads the React app. `deployService.sh` builds the Vite bundle, copies `dist` into `public`, copies the service beside it, and restarts it with pm2: `./deployService.sh -k <pem> -h <host> -s startup`.
- [x] **Calls to third party endpoints** - The service is the only caller of the Guild Wars 2 API (`service/gw2.js`). Home and Gear ask the service for today's fractal dailies (`GET /api/dailies`) and item details (`GET /api/items`). The service then calls `https://api.guildwars2.com/v2/achievements` and `/v2/items`. `src/services/gw2Api.js` only talks to those service routes.
- [x] **Backend service endpoints** - Users, skips, and votes are kept in memory and reset when the service restarts. `POST /api/auth/create`, `POST /api/auth/login`, `DELETE /api/auth/logout`, and `GET /api/auth/me` handle accounts. `GET /api/skips` returns the list (seed tips live only in `service/defaultSkips.js`). `POST /api/skips` adds a tip and rejects notes longer than 500 characters. `POST /api/skips/:id/vote` records one vote per user. `GET /api/dailies` and `GET /api/items` proxy the Guild Wars 2 API.
- [x] **Frontend calls service endpoints** - `src/services/authService.js` calls the auth routes with `fetch`. `src/services/skipService.js` loads, submits, and upvotes skips. `AuthContext` restores the session with `GET /api/auth/me` on load. The Fractal Skips page renders that list and only enables submit and upvote while signed in. `localStorage` only remembers the display name; the httpOnly cookie is the session.
- [x] **Supports registration, login, logout, and restricted endpoint** - Create stores the user and sets an httpOnly `token` cookie. Login checks the password and issues a new token. Logout deletes the token and clears the cookie. `POST /api/skips` and `POST /api/skips/:id/vote` use `verifyAuth` and return 401 when the cookie is missing or no longer valid, including after logout. A second vote on the same skip returns 409.
- [x] **Uses BCrypt to hash passwords** - `createUser` stores `bcrypt.hash(password, 10)`. Login uses `bcrypt.compare`. The hash is never sent to the browser; the client only receives the email and username. The username shown in the navbar is the part of the email before `@`.

## 🚀 DB deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] I completed the prerequisites for this deliverable (Simon deployed, GitHub link, Git commits)
- [ ] **Stores data in MongoDB** - I did not complete this part of the deliverable.
- [ ] **Stores credentials in MongoDB** - I did not complete this part of the deliverable.

## 🚀 WebSocket deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] I completed the prerequisites for this deliverable (Simon deployed, GitHub link, Git commits)
- [ ] **Backend listens for WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Frontend makes WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Data sent over WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **WebSocket data displayed** - I did not complete this part of the deliverable.
- [ ] **Application is fully functional** - I did not complete this part of the deliverable.
