# Vellum Atelier

Vellum Atelier is a local-first academic writing web app for long-form research work. It is built for thesis chapters, journal articles, literature reviews, proposals, and source-driven drafting that needs citation support without locking the writer into one operating system or one storage vendor.

![Vellum Atelier interface preview](docs/images/interface-preview.svg)

## Who it is for

- postgraduate researchers
- academic writers
- students working on essays, dissertations, or journal submissions
- anyone who wants a browser-based writing tool with source suggestions, bibliography support, and GitHub-backed project storage

## What it does

- write in a document-style editor with formatting controls
- manage multiple drafts and folders
- autosave locally in the browser
- export a Word-compatible `.doc` file
- export and import full project backups as `.json`
- suggest citations and reading based on the current draft
- generate and maintain a bibliography section automatically
- search OpenAlex and Zotero for relevant sources
- keep project snapshots in a GitHub repository

## Run locally

Vellum Atelier is a static web app. Serve the repository over HTTP for the best experience:

```bash
python3 -m http.server 4180
```

Then open:

```text
http://127.0.0.1:4180
```

The optional GitHub sync helper can run alongside the app:

```bash
node server/sync-server.cjs
```

## Basic use

1. Open the app in a browser.
2. Write in the editor and organize drafts in folders.
3. Use the right-side panels for focus detection, source suggestions, review checks, and revision help.
4. Export a JSON backup before large changes or device moves.
5. Connect GitHub if you want repository-backed snapshots.

## Privacy and Security

Vellum Atelier is local-first.

- Drafts are autosaved in your browser using `localStorage`.
- Browser `localStorage` is not encrypted.
- GitHub tokens and private Zotero API keys are kept only for the current browser session and are not stored permanently in `localStorage`.
- Do not use saved project data or temporary tokens on shared or public computers.
- GitHub sync sends project data to the repository you choose.
- Zotero search contacts Zotero's API when you search your library.
- OpenAlex search contacts OpenAlex when you run academic metadata searches.
- Exported JSON files, Word-compatible exports, and GitHub snapshot files may contain sensitive draft content, notes, references, and project structure.

### Where data is stored

- project autosave: browser `localStorage`
- temporary GitHub and Zotero secrets: browser `sessionStorage`
- optional repository snapshot: `github-export/project-state.json` in the linked GitHub repository
- manual backups: exported `.json` and `.doc` files downloaded by the browser

## GitHub sync

There are two sync modes:

1. **Browser sync**
   - add a fine-grained GitHub token with `Contents` access
   - useful for cross-device pull/push from the browser
   - token stays only for the current session

2. **Local helper**
   - run `node server/sync-server.cjs`
   - useful when you want local Git to commit and push snapshots from this machine
   - the helper can write files, commit changes, and push them to the configured repository

## Zotero

Zotero support can search either a user library or a group library.

- public libraries: library ID only
- private libraries: library ID plus API key
- private API keys remain session-only

## Browser compatibility

Best tested targets for the current prototype:

- latest Chrome
- latest Edge
- latest Safari
- latest Firefox

The app relies on modern browser features such as modules, `contenteditable`, `fetch`, `localStorage`, `sessionStorage`, and service workers. If those features are disabled, some parts of the app will degrade or stop working.

## Keyboard shortcuts

- `Cmd/Ctrl + K` — open quick actions
- `Escape` — close menus, palette, or context menu

## Project structure

```text
assets/            Static assets
docs/              Project docs and screenshots
server/            Optional local sync helper
src/               App code and data modules
styles/            App stylesheet
github-export/     Snapshot output used by GitHub sync
index.html         App shell
service-worker.js  Offline cache layer
manifest.webmanifest
```

## Known limitations

- the current Word export is a Word-compatible `.doc`, not a true `.docx`
- citation formatting is practical rather than fully CSL-complete
- similarity checks are writing aids, not formal plagiarism reports
- GitHub sync does not do collaborative merge resolution inside the app yet

## Development notes

- keep privacy-sensitive changes mirrored in `README.md` and `PROJECT_STATUS.md`
- prefer updating storage and sync code together when changing persistence behavior
- keep backup/import/export formats versioned for future migration work
