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
  },
  {
    "id": "male-cartoon-character",
    "title": "Male Cartoon Character",
    "tag": "CHARACTER",
    "category": "CHARACTER",
    "description": "A brave and determined young adventurer with a strong, confident appearance. Designed in a stylized low-poly fantasy art style, this game-ready 3D character is ideal for animations, games, and cinematic projects.",
    "image": "images/male-cartoon-character-1.jpg",
    "images": [
      "images/male-cartoon-character-1.jpg",
      "images/male-cartoon-character-2.jpg",
      "images/male-cartoon-character-3.jpg"
    ],
    "cinematic": false
  },
  {
    "id": "female-cartoon-character",
    "title": "Female Cartoon Character",
    "tag": "CHARACTER",
    "category": "CHARACTER",
    "description": "A brave and intelligent young heroine with a confident spirit and a charming stylized appearance. Designed in a cartoon low-poly fantasy style, this game-ready 3D character is perfect for games, animations, and cinematic projects.",
    "image": "images/female-cartoon-character-1.jpg",
    "images": [
      "images/female-cartoon-character-1.jpg",
      "images/female-cartoon-character-2.jpg",
      "images/female-cartoon-character-3.jpg"
    ],
    "cinematic": false
  },
  {
    "id": "warrior-male-character",
    "title": "Warrior Male Character",
    "tag": "CHARACTER",
    "category": "CHARACTER",
    "description": "A fearless fantasy warrior forged for epic adventures, featuring a detailed stylized design with high-quality PBR materials. Fully game-ready, rigged, and optimized for real-time engines, making it perfect for games, animations, cinematics, and fantasy projects. Built with up to 10,000 vertices for a fully detailed result.",
    "image": "images/warrior-male-character-1.jpg",
    "images": [
      "images/warrior-male-character-1.jpg",
      "images/warrior-male-character-2.jpg",
      "images/warrior-male-character-3.jpg",
      "images/warrior-male-character-4.jpg"
    ],
    "cinematic": false
  },
  {
    "id": "time-weaver",
    "title": "Time Weaver",
    "tag": "SCI-FI",
    "category": "SCI-FI",
    "description": "A high-quality sci-fi Time Weaver created in Blender, showcasing precision hard-surface modeling, polished metallic materials, and realistic glass rendering.",
    "image": "images/time-weaver-1.jpg",
    "images": [
      "images/time-weaver-1.jpg",
      "images/time-weaver-2.jpg"
    ],
    "cinematic": false
  },
  {
    "id": "roblox-fantasy-campsite-forge",
    "title": "Roblox Fantasy Campsite & Forge",
    "tag": "ENVIRONMENT",
    "category": "ENVIRONMENT",
    "description": "A duo of vibrant, low-poly 3D environment renders created in a classic Roblox art style. This showcase highlights complete game-ready scene assembly, combining custom character rigging, modular fantasy terrain, and detailed prop sets ranging from outdoor adventurer campsites to a stone-forged medieval blacksmith workshop.",
    "image": "images/roblox-environment-campsite-1.jpg",
    "images": [
      "images/roblox-environment-campsite-1.jpg",
      "images/roblox-environment-campsite-2.jpg"
    ],
    "cinematic": true
  },
  {
    "id": "roblox-modern-estate-world",
    "title": "Roblox Modern Estate World",
    "tag": "ENVIRONMENT",
    "category": "ENVIRONMENT",
    "description": "A stylized Roblox world render combining modern architectural builds, poolside estate props, and tiered blocky terrain built for game-ready environments.",
    "image": "images/roblox-environment-modern-estate.jpg",
    "cinematic": true
  }
];

const MAX_MODELS = 12;
const MAX_CINEMATIC = 2;
const TINTS = ['201,134,47', '233,185,104', '216,96,40', '180,70,40', '200,150,90', '235,196,60'];
const VALID_TYPES = ['3d', '2d', 'timelapse', 'animation'];

const grid = document.getElementById('bentoGrid');
const emptyMsg = document.getElementById('workEmpty');
const tabsBar = document.getElementById('workTabs');

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

function normalizeType(project) {
  const raw = (project.type || '3d').toString().trim().toLowerCase();
  return VALID_TYPES.includes(raw) ? raw : '3d';
}

function buildTile(project, index) {
  const tint = TINTS[index % TINTS.length];
  const article = document.createElement('article');
  article.className = `tile ${layoutClass(index)}`.trim();
  article.style.setProperty('--tint', tint);
  article.dataset.type = normalizeType(project);

  // Support a single `image` string (legacy) or an `images` array (multiple
  // photos of the same model). Every photo for a model stays inside that
  // model's own tile as a small in-tile slideshow — it never creates a
  // separate tile per photo.
  const imagePath = project.image || project.imageFile || '';
  const images = Array.isArray(project.images) && project.images.length
    ? project.images
    : (imagePath ? [imagePath] : []);
  const hasMultiple = images.length > 1;
  const statusLabel = project.cinematic ? 'CINEMATIC' : 'PORTFOLIO PIECE';

  const imagesHtml = images.map((src, i) => `<img class="tile-image${i === 0 ? ' is-active' : ''}" data-idx="${i}" src="${escapeHtml(src)}" alt="${escapeHtml(project.title || 'Untitled')}${images.length > 1 ? ' — photo ' + (i + 1) : ''}" loading="lazy" draggable="false">`).join('');

  const navHtml = hasMultiple ? `
      <button type="button" class="tile-nav prev" aria-label="Previous photo">
        <svg viewBox="0 0 16 16" fill="none"><path d="M10 3 5 8l5 5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </button>
      <button type="button" class="tile-nav next" aria-label="Next photo">
        <svg viewBox="0 0 16 16" fill="none"><path d="M6 3l5 5-5 5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </button>` : '';

  const dotsHtml = hasMultiple
    ? `<div class="tile-dots">${images.map((_, i) => `<span class="tile-dot${i === 0 ? ' is-active' : ''}" data-idx="${i}"></span>`).join('')}</div>`
    : '';

  article.innerHTML = `
    <div class="tile-media">
      <div class="tile-fallback"></div>
      ${imagesHtml}
      ${navHtml}
      <div class="tile-corners" aria-hidden="true"><i></i><i></i><i></i><i></i></div>
    </div>
    <span class="tile-status">${escapeHtml(statusLabel)}</span>
    <div class="tile-info">
      <span class="tile-tag">${escapeHtml(project.tag || project.category || '')}</span>
      <h3>${escapeHtml(project.title || 'Untitled')}</h3>
      ${project.description ? `<p class="tile-desc">${escapeHtml(project.description)}</p>` : ''}
      ${dotsHtml}
    </div>
  `;

  const imgEls = Array.from(article.querySelectorAll('.tile-image'));
  const dotEls = Array.from(article.querySelectorAll('.tile-dot'));
  let current = 0;

  function goTo(nextIdx) {
    if (!imgEls.length) return;
    current = (nextIdx + imgEls.length) % imgEls.length;
    imgEls.forEach((el, i) => el.classList.toggle('is-active', i === current));
    dotEls.forEach((el, i) => el.classList.toggle('is-active', i === current));
  }

  imgEls.forEach(img => {
    img.addEventListener('contextmenu', e => e.preventDefault());
    img.addEventListener('dragstart', e => e.preventDefault());
    img.addEventListener('load', () => article.querySelector('.tile-media').classList.add('is-loaded'), { once: true });
    img.addEventListener('error', () => {
      img.style.display = 'none';
      if (imgEls.every(el => el.style.display === 'none')) {
        article.querySelector('.tile-status').textContent = 'IMAGE MISSING';
      }
    });
  });

  if (hasMultiple) {
    const prevBtn = article.querySelector('.tile-nav.prev');
    const nextBtn = article.querySelector('.tile-nav.next');
    prevBtn.addEventListener('click', e => { e.preventDefault(); e.stopPropagation(); goTo(current - 1); });
    nextBtn.addEventListener('click', e => { e.preventDefault(); e.stopPropagation(); goTo(current + 1); });
    dotEls.forEach(dot => {
      dot.addEventListener('click', e => {
        e.preventDefault();
        e.stopPropagation();
        goTo(parseInt(dot.dataset.idx, 10) || 0);
      });
    });
  }

  grid.appendChild(article);
}

function applyFilter(filter) {
  const tiles = Array.from(grid.querySelectorAll('.tile'));
  let visibleCount = 0;
  tiles.forEach(tile => {
    const matches = filter === 'all' || tile.dataset.type === filter;
    tile.classList.toggle('is-tab-hidden', !matches);
    if (matches) visibleCount++;
  });
  if (emptyMsg) emptyMsg.classList.toggle('is-visible', visibleCount === 0);
}

function initTabs() {
  if (!tabsBar) return;
  const tabs = Array.from(tabsBar.querySelectorAll('.work-tab'));
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('is-active'));
      tab.classList.add('is-active');
      applyFilter(tab.dataset.filter);
    });
  });
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
  initTabs();
  applyFilter('all');
})();
