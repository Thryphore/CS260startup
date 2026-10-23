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
- Item icons on the Gear page are API placeholders until we call `https://api.guildwars2.com/v2/items` in the service deliverable.
