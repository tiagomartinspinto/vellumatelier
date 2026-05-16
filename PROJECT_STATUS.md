# Project Status

## Completed in this pass

- renamed the browser autosave key to `vellum-atelier-state-v1`
- added migration from legacy storage keys and removed old keys after successful migration
- stopped persisting GitHub tokens and private Zotero API keys in `localStorage`
- kept session-only secrets in `sessionStorage`
- added visible browser reset and session-token clear actions
- sanitized GitHub snapshot payloads so private Zotero API keys are not exported to repository snapshots
- renamed the sync helper config file to `.vellum-atelier-sync.json`
- hardened helper CORS to only allow the local app origins
- replaced domain-specific starter content and reference seeds with more neutral academic templates
- updated privacy and security documentation
- expanded `.gitignore` for local secrets, logs, builds, and generated snapshot content

## Files changed

- `src/lib/storage.mjs`
- `src/data/reference-data.mjs`
- `src/main.mjs`
- `server/sync-server.cjs`
- `index.html`
- `styles/app.css`
- `service-worker.js`
- `.gitignore`
- `README.md`
- `PROJECT_STATUS.md`
- `github-export/README.md`
- removed `.phd-writer-sync.json`

## Remaining tasks

- add linting, formatting, and automated tests
- split `src/main.mjs` further into smaller UI modules
- improve service worker UX with a visible “update available” banner instead of silent refresh behavior
- upgrade Word export from Word-compatible HTML `.doc` to real `.docx`
- improve keyboard support for menus and context actions
- add safer conflict handling for GitHub pull/push

## Known issues

- the editor still relies on `document.execCommand`, which is aging browser API surface
- browser sync requires a GitHub token each session
- the helper only accepts the local app origins on port `4180`
- service worker updates are versioned, but the refresh UX is still basic

## Manual tests to run next

1. Open the app, write text, refresh, and confirm the draft restores from `vellum-atelier-state-v1`.
2. Enter a GitHub token, reload the page, and confirm the token is gone while the repo URL remains.
3. Enter a Zotero API key, reload the page, and confirm the key is gone while the library ID remains.
4. Click `Reset browser data` and confirm drafts, session secrets, and sync state are cleared.
5. Export JSON, import it back, and confirm the project restores without crashing.
6. Start `node server/sync-server.cjs` and confirm requests from `http://127.0.0.1:4180` work.
7. Try the helper from a non-allowed origin and confirm it is rejected.
