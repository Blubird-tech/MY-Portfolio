# Blubird Studio — setup guide

## What's in this folder
```
index.html                      → the public site
gallery.js                      → loads data/projects.json and renders the 360° viewers
data/projects.json              → your project list (edit via the panel, or by hand)
models/                         → put your .glb files here
assets/                         → your logo, already sized for web
project-controler.html          → the hidden admin panel
```

Upload the whole folder to your host, keeping the same file/folder names.

## 1. Admin panel access — already set up
The admin file has already been renamed to `project-controler.html`, and its password has already been set for you. This is the only file whose name/password matters for security — no other file needs changing.

Bookmark the file's URL somewhere private (not on the site, not shared publicly, not in a public note): `https://yourdomain.com/project-controler.html`. That URL is the only way in — there's no link to it anywhere on the public pages, and it's marked `noindex` so search engines won't list it either.

⚠️ **One thing you should still do yourself:** the password is currently set to the one you asked me to use in this chat. Since it now exists in this conversation, treat it as semi-exposed — I'd recommend changing it again yourself once the site is live, using the steps below, so you have a password nobody else has ever seen:
```js
crypto.subtle.digest('SHA-256', new TextEncoder().encode('yournewpassword'))
  .then(b => console.log([...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,'0')).join('')))
```
Run that in the browser console (F12 → Console) on the panel page, copy the printed hash, and paste it in place of `ADMIN_PASSWORD_HASH` near the top of the `<script>` tag in `project-controler.html`.

**Being honest about what this does and doesn't protect against:** this is password-plus-obscurity, which is normal and reasonable for a personal portfolio's private page. It stops casual visitors completely. It will not stop someone who is deliberately trying to break into a static website with no server behind it — that level of protection needs a real backend with server-side authentication. For a portfolio site, this is the appropriate amount of security for the actual risk (someone editing your project list), not overkill or underkill.

## 2. Adding a project
1. In Blender: **File → Export → glTF 2.0**, format = **glTF Binary (.glb)**.
2. Upload that `.glb` into the `models/` folder on your host (FTP or your host's file manager).
3. Open your admin panel, fill in the title/tag/description, and set **Model file path** to `models/yourfile.glb`.
4. Click **Export projects.json** — this downloads the updated file to your computer.
5. Upload that downloaded `projects.json`, replacing the one in your site's `data/` folder.

Step 5 is the one that makes a change visible to visitors. The panel edits a draft in your browser only — this is a plain static site with no database, so there's no "save" button that publishes by itself. If your host is ever upgraded to something with a backend (Node app, WordPress, etc.), this step can be automated; happy to help with that later if you want it.

There's room for **10 models + 2 cinematic scenes** (12 total). The panel enforces this and warns you when a category is full.

## 3. About the "no download" 3D viewer
Models render with real-time 3D (three.js), draggable for a full 360° look, auto-rotating when idle. There's no download button, no right-click "save," and no direct link to the `.glb` file anywhere in the page. That stops the overwhelming majority of visitors from getting your source file.

One honest limit: to *show* a 3D model in a browser at all, the browser has to receive that file — so someone who deliberately opens their browser's developer tools and inspects network traffic could still find and save it. No website (a game's, a shop's, anyone's) can fully prevent this for content it displays; it's a fundamental property of how browsers work, not a gap specific to this build. What we've done is remove every easy, casual way to grab it.

## 4. If you outgrow the static setup
Right now everything lives in flat files, which is simple, free-to-host almost anywhere, and fine for one person maintaining a portfolio. If down the line you want the panel to publish instantly (no manual re-upload step) or want stronger, server-verified login, that means adding a small backend (e.g., a lightweight Node server or a service like Firebase) — a bigger but very doable next step.
