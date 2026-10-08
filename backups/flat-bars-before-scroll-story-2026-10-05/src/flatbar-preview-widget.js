import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";

const SECTION_ID = "flat-bar-3d-preview";
let currentSection = null;
let disposeViewer = null;

function noise(x, y, scale) {
  const ix = Math.floor(x / scale);
  const iy = Math.floor(y / scale);
  const fx = x / scale - ix;
  const fy = y / scale - iy;
  const smoothX = fx * fx * (3 - 2 * fx);
  const smoothY = fy * fy * (3 - 2 * fy);
  const hash = (a, b) => {
    const n = Math.sin(a * 127.1 + b * 311.7) * 43758.5453;
    return n - Math.floor(n);
  };
  const a = hash(ix, iy) * (1 - smoothX) + hash(ix + 1, iy) * smoothX;
  const b = hash(ix, iy + 1) * (1 - smoothX) + hash(ix + 1, iy + 1) * smoothX;
  return a * (1 - smoothY) + b * smoothY;
}

function steelTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 256;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  const image = ctx.createImageData(1024, 256);

  for (let y = 0; y < 256; y += 1) {
    for (let x = 0; x < 1024; x += 1) {
      const large = noise(x, y, 82);
      const medium = noise(x, y, 24);
      const fine = noise(x, y, 5);
      const pits = Math.max(0, noise(x + 103, y - 49, 15) - 0.58);
      const tone = Math.max(65, Math.min(165,
        119 + (large - 0.5) * 39 + (medium - 0.5) * 31 +
        (fine - 0.5) * 18 - pits * 52
      ));
      const i = (y * 1024 + x) * 4;
      image.data[i] = tone + 2;
      image.data[i + 1] = tone + 2;
      image.data[i + 2] = tone + 1;
      image.data[i + 3] = 255;
    }
  }

  ctx.putImageData(image, 0, 0);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.anisotropy = 8;
  return texture;
}

function createSection() {
  const section = document.createElement("section");
  section.id = SECTION_ID;
  section.setAttribute("aria-label", "Interactive 3D preview of a flat steel bar");
  section.innerHTML = `
    <div class="container-kchr kchr-flatbar-inner">
      <div class="kchr-flatbar-heading">
        <p class="kchr-flatbar-kicker"><span></span> 3D PREVIEW / 01</p>
        <h2>FLAT <span>BARS.</span></h2>
        <p>Explore the form from every angle.</p>
      </div>
      <div class="kchr-flatbar-stage" data-lenis-prevent>
        <canvas aria-label="Rotatable 3D flat steel bar"></canvas>
        <span class="kchr-flatbar-stage-index">KCHR / FLAT STEEL</span>
        <span class="kchr-flatbar-controls">DRAG TO ROTATE <b>•</b> SCROLL TO ZOOM</span>
        <button class="kchr-flatbar-reset" type="button" aria-label="Reset 3D view">RESET VIEW ↗</button>
      </div>
    </div>
  `;
  return section;
}

function mountViewer(section) {
  const canvas = section.querySelector("canvas");
  const stage = section.querySelector(".kchr-flatbar-stage");
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: "high-performance" });
  } catch {
    stage.classList.add("kchr-flatbar-no-webgl");
    stage.insertAdjacentHTML("beforeend", '<p class="kchr-flatbar-fallback">3D preview is unavailable on this device.</p>');
    return () => {};
  }

  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.28;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(37, 1, 0.1, 50);
  camera.position.set(4.7, 4.15, 6.35);
  const controls = new OrbitControls(camera, canvas);
  controls.target.set(0, 0.02, 0);
  controls.enableDamping = true;
  controls.dampingFactor = 0.07;
  controls.enablePan = false;
  controls.enableZoom = true;
  controls.minDistance = 5.8;
  controls.maxDistance = 14;
  controls.minPolarAngle = 0.28;
  controls.maxPolarAngle = Math.PI * 0.78;
  controls.autoRotate = false;
  controls.update();
  controls.saveState();

  scene.add(new THREE.HemisphereLight(0xf7f9fb, 0x41464a, 3.1));
  const key = new THREE.DirectionalLight(0xffffff, 3.0);
  key.position.set(-3, 7, 6);
  key.castShadow = true;
  key.shadow.mapSize.set(1024, 1024);
  key.shadow.camera.left = -7;
  key.shadow.camera.right = 7;
  key.shadow.camera.top = 5;
  key.shadow.camera.bottom = -5;
  key.shadow.bias = -0.0003;
  scene.add(key);
  const edge = new THREE.DirectionalLight(0xa7bdce, 1.45);
  edge.position.set(3, 2, -5);
  scene.add(edge);

  const texture = steelTexture();
  const barGeometry = new RoundedBoxGeometry(5.15, 0.34, 0.67, 4, 0.025);
  const barMaterial = new THREE.MeshStandardMaterial({
    map: texture,
    bumpMap: texture,
    bumpScale: 0.018,
    metalness: 0.36,
    roughness: 0.85,
    color: 0xc3c6c6,
  });
  const bar = new THREE.Mesh(barGeometry, barMaterial);
  bar.castShadow = true;
  bar.receiveShadow = true;
  bar.rotation.y = -0.1;
  scene.add(bar);

  const floorGeometry = new THREE.PlaneGeometry(30, 30);
  const floorMaterial = new THREE.ShadowMaterial({ color: 0x000000, opacity: 0.22 });
  const floor = new THREE.Mesh(floorGeometry, floorMaterial);
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -0.18;
  floor.receiveShadow = true;
  scene.add(floor);

  let visible = false;
  let frame = 0;
  const render = () => {
    if (!visible) return;
    controls.update();
    renderer.render(scene, camera);
    frame = requestAnimationFrame(render);
  };
  const intersection = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible && !frame) render();
    if (!visible && frame) {
      cancelAnimationFrame(frame);
      frame = 0;
    }
  }, { rootMargin: "160px" });
  intersection.observe(stage);

  const resize = new ResizeObserver(() => {
    const width = stage.clientWidth;
    const height = stage.clientHeight;
    if (!width || !height) return;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);
    if (!visible) renderer.render(scene, camera);
  });
  resize.observe(stage);

  const reset = section.querySelector(".kchr-flatbar-reset");
  reset.addEventListener("click", () => {
    controls.reset();
  });

  return () => {
    visible = false;
    cancelAnimationFrame(frame);
    intersection.disconnect();
    resize.disconnect();
    controls.dispose();
    barGeometry.dispose();
    barMaterial.dispose();
    texture.dispose();
    floorGeometry.dispose();
    floorMaterial.dispose();
    renderer.dispose();
  };
}

function syncSection() {
  const onFlatBarPage = window.location.pathname.replace(/\/$/, "") === "/products/flat-bars";
  const hero = document.querySelector('[data-testid="product-hero"]');
  const overview = hero?.nextElementSibling;
  const shouldShow = onFlatBarPage && overview && overview.tagName === "SECTION";

  if (!shouldShow) {
    if (currentSection) {
      disposeViewer?.();
      currentSection.remove();
      currentSection = null;
      disposeViewer = null;
    }
    return;
  }

  if (currentSection?.isConnected && currentSection.previousElementSibling === overview) return;
  if (currentSection) {
    disposeViewer?.();
    currentSection.remove();
  }
  currentSection = createSection();
  overview.after(currentSection);
  disposeViewer = mountViewer(currentSection);
}

let queued = false;
const observer = new MutationObserver(() => {
  if (queued) return;
  queued = true;
  requestAnimationFrame(() => {
    queued = false;
    syncSection();
  });
});
observer.observe(document.documentElement, { childList: true, subtree: true });
window.addEventListener("popstate", syncSection);
syncSection();
