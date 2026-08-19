# Dusk Studio — setup guide

## What's new in this version
- A short **preloader** with a live % counter on first load.
- A **Toolbox** section listing the software you use (Blender, Maya, ZBrush, Substance Painter, Unreal, Unity, Photoshop) — edit these directly in `index.html` under `<section class="toolbox">` if your kit differs.
- **Filter tabs** above the gallery (All / 3D Artworks / 2D Artworks / Timelapses / Animations) — set per-project in the admin panel.
- A real **contact form** (Name/Email/Message + spam honeypot) that opens the visitor's email app pre-filled with their message — no backend required. WhatsApp/phone/email stay available right below it.


## What's in this folder
```
index.html                      → the public site
gallery.js                      → loads data/projects.json and renders the portfolio tiles
data/projects.json              → your project list (edit via the panel, or by hand)
images/                         → put your model photos/renders here
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
The gallery now shows plain photos/renders of your models — there is no live 3D viewer on the site anymore.

1. Save a picture of your model (a render or screenshot) as `.jpg` or `.png`.
2. Upload that image into the `images/` folder on your host (FTP or your host's file manager).
3. Open your admin panel, fill in the title/tag/description, and set **Image file path** to `images/yourfile.jpg`.
4. Click **Export projects.json** — this downloads the updated file to your computer.
5. Upload that downloaded `projects.json`, replacing the one in your site's `data/` folder.

Step 5 is the one that makes a change visible to visitors. The panel edits a draft in your browser only — this is a plain static site with no database, so there's no "save" button that publishes by itself. If your host is ever upgraded to something with a backend (Node app, WordPress, etc.), this step can be automated; happy to help with that later if you want it.

There's room for **12 portfolio pieces + 2 cinematic scenes** (14 total). The panel enforces this and warns you when a category is full.

Each project also has a **Content type** (3D Artwork / 2D Artwork / Timelapse / Animation) — this controls which tab it shows up under in the gallery filter on the public site. Everything defaults to 3D Artwork.

### Adding a model with more than one photo
Some models (like the character models) look best shown with several photos in the same tile instead of just one. To do this:
1. Upload all of that model's photos into `images/`.
2. In the admin panel, put the first/main photo in **Image file path** as usual.
3. Put the rest — one file path per line — in the **Additional photos** box that appears right below it.
4. Export and upload `projects.json` as usual.

All of that model's photos then show together on its one tile, with small arrows and dots so visitors can click through them — it never creates a separate tile per photo.

## 3. Founder photo
Your profile photo and its background badge are already set up in `assets/founder-photo.jpg` and `assets/founder-avatar-bg.jpg`, and wired into the "FOUNDER" panel in the About section — your photo sits in the circular frame with the badge glowing softly behind it. To swap either one later, just replace those two files with new images of the same names (a square-ish, centered photo works best for `founder-photo.jpg` since the frame is circular).

## 4. Buy/portfolio links
The Work section now includes two cards linking out to:
- Your **RenderHub** profile (with a note that all your 3D models can be bought there)
- Your **Fiverr** portfolio

If either URL ever changes, update the two `<a href="...">` links inside the `.work-links` block in `index.html`.

## 5. If you outgrow the static setup
Right now everything lives in flat files, which is simple, free-to-host almost anywhere, and fine for one person maintaining a portfolio. If down the line you want the panel to publish instantly (no manual re-upload step) or want stronger, server-verified login, that means adding a small backend (e.g., a lightweight Node server or a service like Firebase) — a bigger but very doable next step.
