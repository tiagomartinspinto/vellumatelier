# Project Status

## Completed

- kept Vellum Atelier naming as the visible product identity
- preserved migration from legacy browser storage keys to `vellum-atelier-state-v1`
- kept GitHub and Zotero secrets out of persistent browser storage
- kept session-only token copy visible in the UI
- kept a visible `Clear local data` action
- made starter documents generic:
  - thesis chapter
  - journal article
  - literature review
  - research proposal
- reduced interface noise by:
  - giving the editor more room
  - tucking project utilities behind `Project tools`
  - tucking OpenAlex and Zotero search into calmer disclosures
  - softening sidebar and assistant chrome
- refreshed README structure and manual test checklist
- added `.idea/` to `.gitignore`

## Files Changed

- `index.html`
- `styles/app.css`
- `src/lib/storage.mjs`
- `README.md`
- `PROJECT_STATUS.md`
- `service-worker.js`
- `.gitignore`

## Remaining Tasks

- split `src/main.mjs` into smaller UI modules
- add linting, formatting checks, and basic tests
- improve update UX for the service worker with a visible reload banner
- upgrade export from Word-compatible `.doc` to real `.docx`
- tighten keyboard support for menus, disclosures, and editor actions

## Known Issues

- the editor still relies on `document.execCommand`
- GitHub browser sync still requires a token each session
- citation formatting is useful but not a full CSL word-processor implementation

## Manual Tests Next

1. Load the app and confirm the default view feels quieter and more writing-first.
2. Open `Project tools` and confirm export, import, GitHub, and session-token actions still work.
3. Refresh and confirm autosaved drafts restore.
4. Enter a GitHub token, reload, and confirm the token does not persist.
5. Enter a Zotero API key, reload, and confirm the key does not persist.
6. Click `Clear local data` and confirm the reset requires confirmation.
