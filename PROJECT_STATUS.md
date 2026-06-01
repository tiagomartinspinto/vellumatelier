# Project Status

## Completed changes

- split `src/main.mjs` responsibilities into smaller modules:
  - `src/app/dom.mjs`
  - `src/app/export-utils.mjs`
  - `src/app/review-checks.mjs`
  - `src/app/service-worker-client.mjs`
  - `src/app/ui.mjs`
- added ESLint plus a basic automated test suite
- added a user-facing service-worker update banner instead of forced reloads
- improved keyboard accessibility for tabs, menus, and the command palette
- removed dead CSS selectors and reduced duplicate review/export logic
- made GitHub helper commits safer by staging only paths that exist
- made autosave more honest:
  - persistence now reports failures clearly
  - temporary search results are no longer written into long-term project storage
  - transient source caches reset on import, reset, and GitHub pull
- verified JSON import/export and storage round-trips with automated tests

## Files changed

- `index.html`
- `README.md`
- `PROJECT_STATUS.md`
- `package.json`
- `package-lock.json`
- `eslint.config.mjs`
- `service-worker.js`
- `server/sync-server.cjs`
- `src/main.mjs`
- `src/lib/storage.mjs`
- `src/app/dom.mjs`
- `src/app/export-utils.mjs`
- `src/app/review-checks.mjs`
- `src/app/service-worker-client.mjs`
- `src/app/ui.mjs`
- `styles/app.css`
- `tests/export-utils.test.mjs`
- `tests/review-checks.test.mjs`
- `tests/storage.test.mjs`

## Remaining tasks

- split `src/main.mjs` further if the editor logic keeps growing
- replace `document.execCommand` with a more durable editor command layer
- add true `.docx` export
- add broader browser-level integration tests if the app gets a build step later

## Known issues

- after code changes, use the versioned app URL or accept the update banner once so the latest service worker and module graph are active together
- service-worker update dismissal is per session; the banner will return when the next waiting worker is detected
- GitHub browser sync still requires a token each session by design

## Manual tests next

1. Open `http://127.0.0.1:4180/index.html?v=20260601-1` in Chrome, Safari, and Firefox.
2. Confirm typing autosaves locally, survives refresh, and updates the save status honestly.
3. Export JSON, import it back, and confirm metadata, literature matrix rows, and supervisor notes survive the round trip.
4. Open the app in two tabs, trigger a service-worker update, and confirm the update banner appears without forcing a reload.
5. Use only the keyboard to switch assistant tabs, open and close the command palette, and access menu actions.
6. Link a valid GitHub repository and confirm save, push, and pull flows still behave correctly.
