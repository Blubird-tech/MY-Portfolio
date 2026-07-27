// ==========================================================================
// DUSK STUDIO — portfolio gallery
// Reads data/projects.json and renders each project as a static image tile
// with its title, tag and description. Content is managed through the
// studio panel (project-controler.html) — no live 3D viewport is used here.
//
// FALLBACK_PROJECTS below is a built-in copy of data/projects.json. It is
// only used if data/projects.json can't be fetched — most commonly because
// the page was opened directly as a local file (double-clicked) instead of
// through a real web server, which makes browsers block fetch() of local
// files for security reasons. Once this site is uploaded to a real host,
// data/projects.json loads normally and always reflects your latest edits
// from the studio panel; this constant is just a safety net.
// ==========================================================================

const FALLBACK_PROJECTS = [
  {
    "id": "crystal-sword",
    "title": "Crystal Sword",
    "tag": "WEAPON",
    "category": "WEAPON",
    "description": "An ethereal fantasy broadsword with a glowing blue crystal blade and ancient rune inscriptions. Features high-emission energy effects ideal for heroic or RPG weaponry.",
    "image": "images/crystal-sword.jpg",
    "cinematic": false
  },
  {
    "id": "street-light",
    "title": "Street Light",
    "tag": "PROP",
    "category": "PROP",
    "description": "A modern dual-globe street light featuring intricate mesh caged fixtures mounted on a sleek dark post. Designed as an optimized urban environment prop for game scenes.",
    "image": "images/street-light.jpg",
    "cinematic": false
  },
  {
    "id": "wooden-statue",
    "title": "Wooden Statue",
    "tag": "PROP",
    "category": "PROP",
    "description": "A stylized organic wooden bust sculpted with expressive faceting and rich wood grain textures. Serves as a versatile decorative environmental asset or ancient artifact.",
    "image": "images/wooden-statue.jpg",
    "cinematic": false
  },
  {
    "id": "modern-skyscraper",
    "title": "Modern Skyscraper",
    "tag": "ENVIRONMENT",
    "category": "ENVIRONMENT",
    "description": "A towering glass-facade modern skyscraper complete with a detailed ground-level plaza and landscaping. Optimized for arch-viz and futuristic city environment design.",
    "image": "images/modern-skyscraper.jpg",
    "cinematic": false
  },
  {
    "id": "scifi-loot-crate",
    "title": "Sci-Fi Loot Crate",
    "tag": "PROP",
    "category": "PROP",
    "description": "A high-tech metallic loot crate with glowing orange energy accents and heavy mechanical latches. Perfect for sci-fi games, reward systems, and container props.",
    "image": "images/scifi-loot-crate.jpg",
    "cinematic": false
  },
  {
    "id": "shanghai-tower-bottle",
    "title": "Shanghai Tower Glass Bottle",
    "tag": "PROP",
    "category": "PROP",
    "description": "A sleek decorative glass bottle inspired by modern architectural skyscraper design and twisting geometry. Features realistic glass refraction and metallic accent trim.",
    "image": "images/shanghai-tower-bottle.jpg",
    "cinematic": false
  },
  {
    "id": "wooden-chair",
    "title": "Wooden Chair",
    "tag": "FURNITURE",
    "category": "FURNITURE",
    "description": "A high-quality game-ready wooden chair crafted with clean topology and rich, realistic wood grain. Built with optimized geometry suitable for real-time interior environments.",
    "image": "images/wooden-chair.jpg",
    "cinematic": false
  },
  {
    "id": "classic-sports-car",
    "title": "Classic Sports Car",
    "tag": "VEHICLE",
    "category": "VEHICLE",
    "description": "A vintage sports car rendered with metallic British racing green paint and detailed chrome wire wheels. Designed with clean topology and game-ready PBR materials.",
    "image": "images/classic-sports-car.jpg",
    "cinematic": false
  }
];

const MAX_MODELS = 10;
const MAX_CINEMATIC = 2;
const TINTS = ['201,134,47', '233,185,104', '216,96,40', '180,70,40', '200,150,90', '235,196,60'];

const grid = document.getElementById('bentoGrid');

async function loadProjects() {
  try {
    const res = await fetch('data/projects.json', { cache: 'no-store' });
    if (!res.ok) throw new Error('projects.json not found (HTTP ' + res.status + ')');
    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) throw new Error('projects.json was empty');
    return data;
  } catch (err) {
    console.warn('Dusk gallery: could not load data/projects.json, using built-in fallback data.', err);
    return FALLBACK_PROJECTS;
  }
}

function selectProjects(all) {
  const models = all.filter(p => !p.cinematic).slice(0, MAX_MODELS);
  const cinematic = all.filter(p => p.cinematic).slice(0, MAX_CINEMATIC);
  return [...models, ...cinematic];
}

function layoutClass(index) {
  const pattern = index % 6;
  if (pattern === 0) return 'tile-lg';
  if (pattern === 3) return 'tile-wide';
  return '';
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str ?? '';
  return div.innerHTML;
}

function buildTile(project, index) {
  const tint = TINTS[index % TINTS.length];
  const article = document.createElement('article');
  article.className = `tile ${layoutClass(index)}`.trim();
  article.style.setProperty('--tint', tint);

  const imagePath = project.image || project.imageFile || '';
  const statusLabel = project.cinematic ? 'CINEMATIC' : 'PORTFOLIO PIECE';

  article.innerHTML = `
    <div class="tile-media">
      <div class="tile-fallback"></div>
      ${imagePath ? `<img class="tile-image" src="${escapeHtml(imagePath)}" alt="${escapeHtml(project.title || 'Untitled')}" loading="lazy" draggable="false">` : ''}
      <div class="tile-corners" aria-hidden="true"><i></i><i></i><i></i><i></i></div>
    </div>
    <span class="tile-status">${escapeHtml(statusLabel)}</span>
    <div class="tile-info">
      <span class="tile-tag">${escapeHtml(project.tag || project.category || '')}</span>
      <h3>${escapeHtml(project.title || 'Untitled')}</h3>
      ${project.description ? `<p class="tile-desc">${escapeHtml(project.description)}</p>` : ''}
    </div>
  `;

  if (imagePath) {
    const img = article.querySelector('.tile-image');
    img.addEventListener('contextmenu', e => e.preventDefault());
    img.addEventListener('dragstart', e => e.preventDefault());
    img.addEventListener('load', () => article.querySelector('.tile-media').classList.add('is-loaded'));
    img.addEventListener('error', () => {
      article.querySelector('.tile-status').textContent = 'IMAGE MISSING';
    });
  }

  grid.appendChild(article);
}

(async function start() {
  const all = await loadProjects();
  const selected = selectProjects(all);

  if (selected.length === 0) {
    grid.innerHTML = `
      <div style="grid-column:1/-1; padding:3rem; text-align:center; color:var(--text-dim); font-family:var(--font-mono); font-size:.8rem; letter-spacing:.05em;">
        No projects published yet.
      </div>`;
    return;
  }

  selected.forEach((project, i) => buildTile(project, i));
})();
