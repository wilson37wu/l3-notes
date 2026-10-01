# L3 Exam Focus Notes — Home Screen app

Installable web app for iPhone and iPad (no App Store, no Mac). The notes inside `index.html` are encrypted (AES-256); the page shows a passphrase screen until unlocked, so the files can sit on public GitHub Pages without exposing the content. Curriculum PDFs are never uploaded; each device links them from Files.

## Files
| File | Purpose |
|---|---|
| `index.html` | The app (encrypted notes + reader + curriculum PDF pane) |
| `sw.js` | Offline cache: after the first online launch the app, fonts and PDF viewer work without internet |
| `manifest.webmanifest`, `icon-*.png` | Home Screen name ("L3 Notes") and icon |
| `.gitignore` | Blocks `*.pdf` / `*.epub` if you ever use git locally |

## Publish (once, from the PC, in a browser)
1. github.com → **New repository** → name `l3-notes` → Public → Create. (GitHub Pages on a free account needs a public repo; the notes are encrypted.)
2. On the empty repo page choose **uploading an existing file** → drag in every file from this folder → **Commit changes**. Never drag in PDFs.
3. **Settings → Pages** → Source: *Deploy from a branch* → Branch `main`, folder `/ (root)` → Save. After about a minute the site is at `https://<your-username>.github.io/l3-notes/`.

## Install on each iPhone / iPad
1. Open the site address in **Safari** → Share → **Add to Home Screen** → Add.
2. Open **L3 Notes** from the Home Screen (not Safari; the Home Screen app keeps its own storage).
3. Enter the passphrase once. Let iCloud Keychain save it.
4. **Aa → Link PDFs from Files** → select the six curriculum PDFs (original names, e.g. `cfa-program2027L3V1.pdf`).
5. Tap any blue page tag to open the printed page beside the notes.

## Update after a rebuild
Upload the new `index.html` and `sw.js` to the repo (Add file → Upload files → Commit). The app picks up the new version the second time you open it. Linked PDFs, reviewed ticks and reading positions stay on the device.
