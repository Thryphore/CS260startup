# CS 260 Notes

I love web programming!

This file represents what I have learned about web programming.

- [My startup](https://startup.cs260.click)
- [My simon](https://simon.cs260.click)

## Helpful links

- [Course instruction](https://github.com/webprogramming260)
- [Canvas](https://byu.instructure.com)
- [MDN](https://developer.mozilla.org)

## AWS

Interesting things I have learned about AWS

## HTML

Interesting things I have learned about HTML

## React

Interesting things I have learned about React

- Vite + React Router lets the whole startup stay one SPA (`/`, `/fractals`, `/gear`) without full page reloads.
- `useState` drives form fields, login modal, skip list, and gear lookup results. Changing state re-renders only what depends on it.
- `useEffect` is good for mount work: restore a session from `localStorage`, start a live-feed `setInterval`, and clean it up on unmount with a return function.
- Auth can be shared with React Context (`AuthProvider`) so the navbar, login modal, and pages all see the same user without prop drilling everywhere.
- For this deliverable, mock what the backend will do later:
  - `localStorage` for accounts, session, skips, and votes
  - hard-coded Discretize cheat-sheet rows + mocked GW2 item/daily shapes
  - `setInterval` instead of WebSocket peer messages
- Conditional render matters: disable submit/upvote when logged out, show username vs “Not logged in,” and only show gear results after a lookup.
- Item icons on the Gear page were placeholders for this deliverable. The service deliverable loads them from `https://api.guildwars2.com/v2/items`.

## Service

The frontend and the backend are two apps. Frontend packages stay in the root `package.json`. Service packages (`express`, `cookie-parser`, `bcryptjs`, `uuid`) stay in `service/package.json`. Installing the backend packages in the frontend is what causes a 502 after deploy.

- Run the service with `node index.js` from `service` and the UI with `npm run dev` (port 5173). The service port is `PORT`, then a command-line argument, then 4000. `vite.config.js` proxies `/api` to port 4000, so `fetch('/api/skips')` is same-origin and the browser will send the auth cookie. `morgan` logs method, path, and status.
- `express.static('public')` is for production. `deployService.sh` copies the Vite `dist` folder to `public` on the server and restarts the process with pm2. During development Vite serves the React app, and the service only has to answer `/api`.
- Unknown paths return `public/index.html`. That is what keeps a refresh on `/fractals` or `/gear` from 404ing once Express is the host.
- Passwords are stored with `bcrypt.hash(password, 10)` and checked with `bcrypt.compare`. The response only sends `email` and `username`. The navbar username is the part of the email before `@`.
- The session is an httpOnly `token` cookie (`secure`, `sameSite: 'strict'`). Page JavaScript cannot read it. `GET /api/auth/me` is how the navbar gets the username back after a refresh. `localStorage` only keeps the display user; `verifyAuth` trusts the cookie.
- `POST /api/skips` and `POST /api/skips/:id/vote` are restricted. A missing cookie, or a cookie cleared by logout, returns 401. Each user can upvote a skip once; the second vote returns 409. Notes longer than 500 characters are rejected.
- Users, skips, and votes are arrays in memory. Restarting the service drops new accounts and submissions. MongoDB is the next deliverable. Seed tips live only in `service/defaultSkips.js`. The React app loads that list from `GET /api/skips`.
- Third-party calls stay on the service. `service/gw2.js` fetches `https://api.guildwars2.com` for daily fractals and items. Home and Gear call `GET /api/dailies` and `GET /api/items` through `src/services/gw2Api.js`.
- The live feed on Fractal Skips is still `setInterval`. WebSocket comes later.
