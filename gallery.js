// ==========================================================================
// BLUBIRD STUDIO — live 3D gallery
// Reads data/projects.json and renders each project as a real, draggable
// 360° viewer (three.js). No project file is ever linked directly, and the
// canvas has no native "save" affordance — see README for the honest limits
// of that protection.
// ==========================================================================
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const MAX_MODELS = 10;
const MAX_CINEMATIC = 2;
const TINTS = ['47,111,255', '255,140,66', '120,86,255', '255,90,120', '66,220,196', '235,196,60'];

const grid = document.getElementById('bentoGrid');

async function loadProjects() {
  try {
    const res = await fetch('data/projects.json', { cache: 'no-store' });
    if (!res.ok) throw new Error('projects.json not found');
    return await res.json();
  } catch (err) {
    console.warn('Blubird gallery: could not load data/projects.json', err);
    return [];
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

function buildTile(project, index) {
  const tint = TINTS[index % TINTS.length];
  const article = document.createElement('article');
  article.className = `tile ${layoutClass(index)}`.trim();
  article.style.setProperty('--tint', tint);

  article.innerHTML = `
    <div class="tile-media">
      <div class="tile-fallback"></div>
      <canvas class="tile-canvas" aria-label="${escapeHtml(project.title)} — 360 degree viewer"></canvas>
      <div class="tile-corners" aria-hidden="true"><i></i><i></i><i></i><i></i></div>
    </div>
    <span class="tile-status">LOADING</span>
    <div class="tile-info">
      <span class="tile-tag">${escapeHtml(project.tag || project.category || '')}</span>
      <h3>${escapeHtml(project.title || 'Untitled')}</h3>
      ${project.description ? `<p class="tile-desc">${escapeHtml(project.description)}</p>` : ''}
      <span class="tile-hint">DRAG TO ROTATE · 360°</span>
    </div>
  `;
  grid.appendChild(article);
  initViewer(article, project);
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str ?? '';
  return div.innerHTML;
}

function initViewer(article, project) {
  const canvas = article.querySelector('.tile-canvas');
  const statusEl = article.querySelector('.tile-status');
  const mediaEl = article.querySelector('.tile-media');

  // No right-click / drag-save affordance on the canvas.
  canvas.addEventListener('contextmenu', e => e.preventDefault());
  canvas.addEventListener('dragstart', e => e.preventDefault());

  let renderer, scene, camera, controls, model;
  let active = false;
  let raf = null;
  let initialized = false;
  let failed = false;

  function setupScene() {
    renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'low-power' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
    camera.position.set(0, 0.6, 3.2);

    const hemi = new THREE.HemisphereLight(0xbfd4ff, 0x0a0c12, 1.1);
    scene.add(hemi);
    const key = new THREE.DirectionalLight(0xffffff, 1.4);
    key.position.set(3, 4, 5);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0x7aa8ff, 0.9);
    rim.position.set(-4, 2, -3);
    scene.add(rim);

    controls = new OrbitControls(camera, canvas);
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 2.2;
    controls.minPolarAngle = Math.PI * 0.18;
    controls.maxPolarAngle = Math.PI * 0.82;

    resize();

    const loader = new GLTFLoader();
    loader.load(
      project.modelFile,
      (gltf) => {
        model = gltf.scene;
        frameModel(model);
        scene.add(model);
        mediaEl.classList.add('is-loaded');
        statusEl.textContent = 'READY · 360°';
        statusEl.classList.add('is-ready');
      },
      undefined,
      () => {
        failed = true;
        statusEl.textContent = 'AWAITING UPLOAD';
      }
    );
  }

  function frameModel(obj) {
    const box = new THREE.Box3().setFromObject(obj);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const maxAxis = Math.max(size.x, size.y, size.z) || 1;
    const scale = 1.6 / maxAxis;
    obj.scale.setScalar(scale);
    obj.position.sub(center.multiplyScalar(scale));
  }

  function resize() {
    const rect = mediaEl.getBoundingClientRect();
    if (!renderer || rect.width === 0 || rect.height === 0) return;
    renderer.setSize(rect.width, rect.height, false);
    camera.aspect = rect.width / rect.height;
    camera.updateProjectionMatrix();
  }

  function tick() {
    if (!active) return;
    controls.update();
    renderer.render(scene, camera);
    raf = requestAnimationFrame(tick);
  }

  const resizeObserver = new ResizeObserver(() => resize());
  resizeObserver.observe(mediaEl);

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (!initialized) { initialized = true; setupScene(); }
        active = true;
        if (!raf && renderer) raf = requestAnimationFrame(tick);
      } else {
        active = false;
        if (raf) { cancelAnimationFrame(raf); raf = null; }
      }
    });
  }, { threshold: 0.05, rootMargin: '150px 0px' });
  io.observe(article);
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
