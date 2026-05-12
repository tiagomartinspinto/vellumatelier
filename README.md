# Vellum Atelier

Vellum Atelier is a local-first academic writing web app for thesis chapters, journal articles, proposals, and literature reviews. It is designed to stay OS-agnostic: open it in a browser, use it on whatever machine you have, and sync the project through GitHub when you want cross-device continuity.

## What it does now

- Calm academic writing surface with document title, status, project mode, dark mode, and responsive layout
- Word-processor controls for block formatting, font family, font size, line spacing, bold, italic, underline, lists, and zoom
- Multiple drafts, folders, drag-and-drop organization, folder collapse, and deletion controls
- Local autosave through `localStorage`
- APA and Harvard citation modes
- Right-click citation actions inside the editor
- Citation tokens that stay style-aware when you switch citation mode
- Automatic bibliography page generation at the end of the document
- Topic detection with five ranked focus options and visible trigger highlights in the editor
- Source suggestions, article previews, citation-needed checks, and close-paraphrase warnings
- Research question tracker and literature review matrix
- Zotero library search with the official Zotero Web API
- Google Doc linking
- `.doc` export
- GitHub-backed project syncing:
  - browser sync with a fine-grained GitHub token
  - optional local sync helper through `sync-server.js`
- Web app scaffolding with a manifest and service worker when served over HTTP or HTTPS

## Run it

You can open [`index.html`](./index.html) directly in a browser for the core experience.

For full web-app behavior such as service workers and installability, serve the folder over HTTP:

```bash
python3 -m http.server 4180
```

Then open:

```text
http://127.0.0.1:4180
```

## GitHub sync

In the app:

1. Link your GitHub repository
2. Choose a branch if needed
3. Either:
   - add a fine-grained GitHub token with `Contents` access for browser sync across devices
   - or leave the token blank and run the optional local sync helper

Optional helper:

```bash
node sync-server.js
```

The browser sync mode writes the project snapshot to `github-export/project-state.json` in your repository. The optional helper also writes readable exports into `github-export/`.

## Zotero setup

In the Sources tab:

1. Choose `User library` or `Group library`
2. Add the Zotero library ID
3. Add an API key if the library is private
4. Search your library by keyword, title, or selected text from the editor

## Notes

- Zotero integration uses the official Zotero Web API.
- The citation engine is much stronger now, but it is still not a full CSL word-processor stack yet.
- Similarity checking is an academic writing aid, not a formal institutional plagiarism report.
- When opened as `file://`, the app still works, but service worker features do not.

## Good next steps

1. Move storage from `localStorage` to a hosted or user-controlled database layer
2. Add richer CSL style support beyond APA and Harvard defaults
3. Add Zotero browsing by collection and recent items
4. Add DOCX and PDF export with thesis and journal templates
5. Add collaborative sharing flows for supervisors and co-authors
