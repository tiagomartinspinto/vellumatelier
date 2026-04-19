<<<<<<< HEAD
# Vellum Atelier

A local-first research writing studio for thesis chapters, academic articles, and literature work.

## What works now

- Browser-based editor that opens directly from `index.html`
- Local autosave with offline persistence through `localStorage`
- Multiple drafts
- Folder organization in the left sidebar
- Drag documents into folders
- Delete documents and folders
- Collapsible folders and document status labels
- Project mode selector for thesis, article, proposal, and literature review workflows
- Research question tracker and project planning panel
- Literature review matrix exported with GitHub snapshots
- Word, character, and citation counts
- APA and Harvard-style in-text citation insertion
- Topic-aware reference suggestions from a curated art education starter corpus
- Five detected focus options with confidence percentages
- Highlighted trigger words in the editor so you can see why a focus was detected
- Online OpenAlex search from the References panel when the browser has network access
- Live source cross-checks while writing
- Citation suggestions for the active paragraph
- Suggested articles to read next, with short previews
- Possible plagiarism / close-paraphrase risk flags based on conceptual overlap with known and live academic metadata
- Basic typo, long-sentence, generic phrasing, and citation-needed checks
- Rewrite modes for clarity, academic tone, concision, and reflective voice
- `.doc` export that can be opened by Word, Pages, or imported into Google Docs
- One-button Google Docs link storage per draft
- GitHub repository link for Overleaf-style versioned saving
- Local sync helper that snapshots, commits, and pushes every 110 seconds

## Run it

Open `index.html` in a browser.

For GitHub push support, also run:

```bash
node sync-server.js
```

Then use **Link GitHub repository** in the app. The helper writes exports into `github-export/`, commits them, and pushes to the linked remote every 110 seconds while the app is open.

If HTTPS push asks for a username, use an SSH remote such as:

```text
git@github.com:you/thesis-writing.git
```

Or authenticate HTTPS with GitHub Desktop, Git Credential Manager, or a personal access token.

## Next build steps

1. Wrap this as a real Mac app with Tauri.
2. Replace browser `localStorage` with SQLite.
3. Turn the GitHub helper into a native Tauri sidecar.
4. Add Zotero import/sync.
5. Add a real CSL citation processor for thousands of styles.
6. Add DOCX/PDF export with thesis and journal templates.
7. Add a richer art education reference corpus and literature review matrix.

## Notes

Google Scholar does not provide an official public API. This prototype avoids Scholar scraping and uses reliable academic metadata paths instead: OpenAlex now, with Crossref, Semantic Scholar, and Zotero planned next.

The plagiarism feature is currently a live similarity and citation-risk aid. A production plagiarism report would need licensed full-text indexes or institutional plagiarism APIs.

Shared Google Docs edit links are supported only as linked document metadata. Automatic write-back to Google Docs was removed from this prototype because it requires OAuth/API permissions and is not a good simple save model.

The recommended next save model is Git/GitHub-backed versioning: local files, snapshots, commit history, and optional GitHub remote backup.
=======
# vellumatelier
>>>>>>> 2a0f533596b9aa135f6c41b7a1a8172721c25f39
