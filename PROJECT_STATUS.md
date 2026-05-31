# Project Status

## Completed changes

- replaced absolute local paths in this status file with repo-relative paths
- clarified README language that Vellum Atelier is not an official university service, including at Aalto University, unless separately deployed or approved
- added a short privacy reminder to check institutional rules before syncing unpublished drafts to GitHub
- reframed the product for doctoral-level research writing in university contexts
- expanded starter templates to:
  - dissertation chapter
  - journal article
  - conference paper
  - literature review
  - research plan
  - funding application outline
  - supervisor meeting notes
  - revision response plan
- added local-first project metadata fields:
  - working title
  - researcher name
  - programme or field
  - supervisor(s)
  - article or chapter status
  - target venue
  - deadline
  - keywords
- added supervisor workflow fields and a supervisor-copy export
- expanded the literature review matrix to cover citation, argument, method, theory/framework, evidence, relevance, gap, and reading status
- strengthened writing checks for doctoral use:
  - research question
  - contribution
  - methodology
  - unsupported claims
  - missing citations
  - terminology drift
  - long paragraphs
  - weak signposting
- improved Word-compatible export so it includes metadata, abstract structure, body content, bibliography, and a note that `.doc` is not true `.docx`
- updated README for doctoral researchers, privacy, institutional use, and PhD workflows

## Files changed

- `index.html`
- `src/main.mjs`
- `src/lib/storage.mjs`
- `styles/app.css`
- `README.md`
- `PROJECT_STATUS.md`
- `service-worker.js`

## Remaining tasks

- add true `.docx` export
- split `src/main.mjs` into smaller modules
- add linting and basic tests
- add a visible update-available banner for service-worker refreshes
- improve keyboard support for some menus and disclosures

## Known issues

- the editor still relies on `document.execCommand`
- GitHub browser sync still requires a token each session
- citation formatting is useful but not yet a full CSL word-processor integration
- review checks are heuristics, not formal academic validation

## Manual tests next

1. Open `http://127.0.0.1:4180/index.html?v=20260531-2` and confirm the new doctoral wording appears in the sidebar and plan panel.
2. Fill in project metadata, refresh, and confirm it restores from browser storage.
3. Add literature matrix rows and confirm status plus text fields persist.
4. Add supervisor notes and export both the main Word-compatible draft and the supervisor copy.
5. Run JSON export/import and confirm the metadata, matrix, and supervisor fields survive the round trip.
6. Check the Review panel with a sparse draft and then a cited draft to confirm the new warnings change accordingly.
