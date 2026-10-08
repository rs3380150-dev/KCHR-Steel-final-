import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

const STORY_ID = "flat-bar-scroll-story";
let activeStory = null;
let releaseStory = null;

const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));
const mix = (a, b, amount) => a + (b - a) * amount;
const ease = (value) => {
  const t = clamp(value);
  return t * t * (3 - 2 * t);
};
const transition = (value, start, end) => ease((value - start) / (end - start));

function noise(x, y, scale) {
  const ix = Math.floor(x / scale);
  const iy = Math.floor(y / scale);
  const fx = x / scale - ix;
  const fy = y / scale - iy;
  const sx = fx * fx * (3 - 2 * fx);
  const sy = fy * fy * (3 - 2 * fy);
  const hash = (a, b) => {
    const n = Math.sin(a * 127.1 + b * 311.7) * 43758.5453;
    return n - Math.floor(n);
  };
  const a = mix(hash(ix, iy), hash(ix + 1, iy), sx);
  const b = mix(hash(ix, iy + 1), hash(ix + 1, iy + 1), sx);
  return mix(a, b, sy);
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
      const softReflection = Math.exp(-Math.pow((y - 70 - x * 0.012) / 27, 2)) * 17;
      const tone = clamp(
        150 + (large - 0.5) * 19 + (medium - 0.5) * 13 +
        (fine - 0.5) * 6 - pits * 22 + softReflection,
        108, 187
      );
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
  texture.anisotropy = 8;
  return texture;
}

function createStory() {
  const section = document.createElement("section");
  section.id = STORY_ID;
  section.setAttribute("aria-label", "Flat Bars product story");
  section.innerHTML = `
    <div class="flatbar-story-travel">
    <div class="flatbar-story-viewport">
      <div class="flatbar-story-panel flatbar-panel-specs" aria-hidden="true"></div>
      <div class="flatbar-story-panel flatbar-panel-use" aria-hidden="true"></div>
      <canvas class="flatbar-story-canvas" aria-label="3D flat steel bar moving with page scroll"></canvas>
      <div class="flatbar-story-chapter" aria-hidden="true"><span>01</span> / 03</div>
      <div class="flatbar-story-scrollcue" aria-hidden="true">SCROLL TO EXPLORE <span>↓</span></div>

      <div class="flatbar-story-beat flatbar-beat-hero" data-beat="0">
        <div class="flatbar-story-copy">
          <p class="flatbar-story-eyebrow"><i></i> KCHR / 01 / FLAT BARS</p>
          <h1>FLAT<br><em>BARS.</em></h1>
          <p class="flatbar-story-intro">Versatile flat steel sections suited to fabrication, engineering and structural applications.</p>
        </div>
        <span class="flatbar-story-corner">THE FORM / 01</span>
      </div>

      <div class="flatbar-story-beat flatbar-beat-specs" data-beat="1">
        <div class="flatbar-spec-heading">
          <p class="flatbar-story-eyebrow"><i></i> 01 / THE FORM</p>
          <h2>EVERY<br><em>DIMENSION.</em></h2>
          <p>Flat steel, selected to fit the job. Dimensions shown are illustrative; confirm exact sizes and availability with KCHR.</p>
        </div>
        <svg class="flatbar-dimension-lines" aria-hidden="true"><g data-dimension="width"><line data-line="width" class="flatbar-dimension-span"/><path data-arrow="width-start"/><path data-arrow="width-end"/><path data-leader="width"/></g><g data-dimension="thickness"><line data-line="thickness" class="flatbar-dimension-span"/><line data-line="thickness-start"/><line data-line="thickness-end"/><path data-leader="thickness"/></g></svg>
        <div class="flatbar-measure flatbar-measure-width"><b>WIDTH / 50 MM</b><small>ILLUSTRATIVE SIZE</small></div>
        <div class="flatbar-measure flatbar-measure-thickness"><b>THICKNESS / 10 MM</b><small>ILLUSTRATIVE SIZE</small></div>
        <span class="flatbar-story-corner">RECTANGULAR SECTION / FLAT BAR</span>
      </div>

      <div class="flatbar-story-beat flatbar-beat-use" data-beat="2">
        <div class="flatbar-use-copy">
          <p class="flatbar-story-eyebrow"><i></i> 02 / IN USE</p>
          <h2>BUILT TO<br><em>WORK.</em></h2>
          <p>Cut, bent and welded for the work that needs a dependable steel section.</p>
          <ol>
            <li><span>01</span> FABRICATION</li>
            <li><span>02</span> FRAMES &amp; SUPPORTS</li>
            <li><span>03</span> GENERAL ENGINEERING</li>
            <li><span>04</span> TOOLS &amp; EQUIPMENT</li>
          </ol>
        </div>
        <span class="flatbar-story-corner">ONE FORM / MANY APPLICATIONS</span>
      </div>
    </div>
    </div>
    <section class="flatbar-story-finish" aria-label="Flat Bars supply enquiry">
      <div class="container-kchr flatbar-finish-grid">
        <div class="flatbar-finish-copy">
          <p class="flatbar-story-eyebrow"><i></i> 03 / SUPPLY</p>
          <h2>READY FOR<br><em>YOUR WORK.</em></h2>
          <p>Flat bars held for fabrication and industry. Talk to KCHR about your widths, thicknesses, lengths and quantities.</p>
          <div class="flatbar-finish-actions">
            <a class="flatbar-finish-button" href="/contact?product=flat-bars">DISCUSS YOUR REQUIREMENT <span>↗</span></a>
            <a class="flatbar-finish-link" href="/products">ALL PRODUCTS <span>↗</span></a>
          </div>
        </div>
        <figure class="flatbar-finish-figure">
          <img src="/images/flat-bars-supply.png" alt="Flat steel bars stacked on a truck, ready for supply" loading="lazy" />
          <figcaption>FIG. 01 / FLAT BARS READY FOR SUPPLY</figcaption>
        </figure>
      </div>
    </section>
  `;
  return section;
}

function interpolatePose(progress, poses) {
  for (let i = 0; i < poses.length - 1; i += 1) {
    const from = poses[i];
    const to = poses[i + 1];
    if (progress > to.at && i < poses.length - 2) continue;
    const duration = to.at - from.at;
    const t = clamp((progress - from.at) / duration);
    const previous = poses[Math.max(0, i - 1)];
    const next = poses[Math.min(poses.length - 1, i + 2)];
    const result = {};
    for (const key of ["x", "y", "scale", "rx", "ry", "rz"]) {
      if (from[key] === to[key]) {
        result[key] = from[key];
        continue;
      }
      const startSlope = previous[key] === from[key] ? 0 :
        ((to[key] - previous[key]) / (to.at - previous.at)) * duration;
      const endSlope = next[key] === to[key] ? 0 :
        ((next[key] - from[key]) / (next.at - from.at)) * duration;
      const t2 = t * t;
      const t3 = t2 * t;
      result[key] = (2 * t3 - 3 * t2 + 1) * from[key] +
        (t3 - 2 * t2 + t) * startSlope +
        (-2 * t3 + 3 * t2) * to[key] +
        (t3 - t2) * endSlope;
    }
    return result;
  }
  return poses[poses.length - 1];
}

function mountStory(section) {
  const travel = section.querySelector(".flatbar-story-travel");
  const canvas = section.querySelector(".flatbar-story-canvas");
  const viewport = section.querySelector(".flatbar-story-viewport");
  const beats = [...section.querySelectorAll(".flatbar-story-beat")];
  const specsPanel = section.querySelector(".flatbar-panel-specs");
  const usePanel = section.querySelector(".flatbar-panel-use");
  const measures = [...section.querySelectorAll(".flatbar-measure")];
  const dimensionLines = section.querySelector(".flatbar-dimension-lines");
  const chapter = section.querySelector(".flatbar-story-chapter span");
  const cue = section.querySelector(".flatbar-story-scrollcue");
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: "high-performance" });
  } catch {
    section.classList.add("flatbar-story-no-webgl");
    travel.style.height = "100vh";
    beats[0].style.opacity = "1";
    beats[0].style.pointerEvents = "auto";
    beats[0].setAttribute("aria-hidden", "false");
    return () => {};
  }

  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.28;
  const scene = new THREE.Scene();
  const room = new RoomEnvironment();
  const pmrem = new THREE.PMREMGenerator(renderer);
  const reflection = pmrem.fromScene(room);
  scene.environment = reflection.texture;
  room.dispose();
  const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 50);
  camera.position.z = 10;
  scene.add(new THREE.HemisphereLight(0xf7f9fb, 0x444b50, 3.1));
  const key = new THREE.DirectionalLight(0xffffff, 3);
  key.position.set(-3, 6, 7);
  scene.add(key);
  const rim = new THREE.DirectionalLight(0xa8bccb, 1.35);
  rim.position.set(4, 1, -5);
  scene.add(rim);

  const texture = steelTexture();
  const geometry = new RoundedBoxGeometry(5.7, 0.14, 0.52, 4, 0.012);
  const material = new THREE.MeshPhysicalMaterial({
    map: texture, bumpMap: texture, bumpScale: 0.0018,
    metalness: 0.86, roughness: 0.14, color: 0xdce0e2,
    envMapIntensity: 1.4, clearcoat: 0.58, clearcoatRoughness: 0.09,
    transparent: true,
  });
  const bar = new THREE.Mesh(geometry, material);
  scene.add(bar);

  let frame = 0;
  let visible = false;
  let lastWidth = 0;
  let lastHeight = 0;

  function update() {
    frame = 0;
    if (!section.isConnected) return;
    const width = viewport.clientWidth;
    const height = viewport.clientHeight;
    if (!width || !height) return;
    if (width !== lastWidth || height !== lastHeight) {
      lastWidth = width;
      lastHeight = height;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    }

    const progress = clamp(-travel.getBoundingClientRect().top / height, 0, 10.5);
    const compact = width < 768;
    const visibleWidth = 2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.position.z * camera.aspect;
    const side = compact ? 0 : visibleWidth * 0.225;
    // Follow the reference film's travel with one mesh. The film briefly duplicates
    // its bar; these intermediate poses bridge that cut as one continuous movement.
    const poses = compact ? [
      { at: 0, x: 0, y: -1.25, scale: 0.45, rx: -1.12, ry: -0.56, rz: 0.5 },
      { at: 1.85, x: 0, y: -1.2, scale: 0.47, rx: -1.12, ry: -0.52, rz: 0.48 },
      { at: 2.55, x: visibleWidth * 0.07, y: -0.58, scale: 0.48, rx: -1.1, ry: -0.2, rz: -0.04 },
      { at: 3.25, x: visibleWidth * 0.06, y: 0.35, scale: 0.52, rx: -1.08, ry: 0.05, rz: -0.55 },
      { at: 3.95, x: 0, y: 0.15, scale: 0.63, rx: -1.1, ry: -0.08, rz: -0.9 },
      { at: 4.7, x: 0, y: -0.55, scale: 0.83, rx: -1.12, ry: -0.45, rz: -1.1 },
      { at: 6.7, x: 0, y: -0.55, scale: 0.83, rx: -1.12, ry: -0.45, rz: -1.1 },
      { at: 7.4, x: -visibleWidth * 0.06, y: 0.05, scale: 0.7, rx: -1.1, ry: -0.35, rz: -0.86 },
      { at: 8.15, x: -visibleWidth * 0.12, y: 0.75, scale: 0.59, rx: -1.08, ry: -0.18, rz: -0.58 },
      { at: 8.75, x: -visibleWidth * 0.05, y: 0.1, scale: 0.51, rx: -1.1, ry: -0.35, rz: -0.33 },
      { at: 9.3, x: 0, y: -1.1, scale: 0.48, rx: -1.12, ry: -0.48, rz: -0.15 },
      { at: 10.5, x: 0, y: -1.1, scale: 0.48, rx: -1.12, ry: -0.48, rz: -0.15 },
    ] : [
      { at: 0, x: side, y: -0.05, scale: 1.06, rx: -1.12, ry: -0.56, rz: 0.62 },
      { at: 1.85, x: side * 0.98, y: -0.02, scale: 1.08, rx: -1.08, ry: -0.54, rz: 0.6 },
      { at: 2.55, x: side * 0.78, y: 0.48, scale: 1.04, rx: -1.08, ry: -0.2, rz: -0.08 },
      { at: 3.25, x: side * 0.65, y: 1.04, scale: 1.03, rx: -1.1, ry: 0.1, rz: -0.7 },
      { at: 3.95, x: side * 0.4, y: 0.77, scale: 1.2, rx: -1.1, ry: 0.1, rz: -0.75 },
      { at: 4.7, x: 1.0, y: 0.4, scale: 1.4, rx: -1.12, ry: 0.1, rz: -0.8 },
      { at: 6.7, x: 1.0, y: 0.4, scale: 1.4, rx: -1.12, ry: 0.1, rz: -0.8 },
      { at: 7.4, x: 0.55, y: 0.65, scale: 1.25, rx: -1.1, ry: -0.05, rz: -0.7 },
      { at: 8.15, x: -0.3, y: 0.6, scale: 1.1, rx: -1.08, ry: -0.23, rz: -0.47 },
      { at: 8.75, x: -side * 0.56, y: 0.12, scale: 1.0, rx: -1.1, ry: -0.38, rz: -0.3 },
      { at: 9.3, x: -side * 0.9, y: -0.15, scale: 0.92, rx: -1.12, ry: -0.48, rz: -0.18 },
      { at: 10.5, x: -side * 0.9, y: -0.15, scale: 0.92, rx: -1.12, ry: -0.48, rz: -0.18 },
    ];
    const pose = interpolatePose(progress, poses);
    bar.position.set(pose.x, pose.y, 0);
    bar.scale.setScalar(pose.scale);
    bar.rotation.set(pose.rx, pose.ry, pose.rz);
    const specsEnter = transition(progress, 2.05, 4.7);
    const useEnter = transition(progress, 6.7, 9.3);
    const specsY = 100 * (1 - specsEnter) - 100 * useEnter;
    const useY = 100 * (1 - useEnter);
    specsPanel.style.transform = `translate3d(0, ${specsY}%, 0)`;
    usePanel.style.transform = `translate3d(0, ${useY}%, 0)`;
    beats[0].style.transform = `translate3d(0, ${-100 * specsEnter}%, 0)`;
    beats[1].style.transform = `translate3d(0, ${specsY}%, 0)`;
    beats[2].style.transform = `translate3d(0, ${useY}%, 0)`;
    beats.forEach((beat, index) => {
      const active = index === 0 ? progress < 4.7 : index === 1 ? progress >= 2.05 && progress < 9.3 : progress >= 6.7;
      beat.style.pointerEvents = active ? "auto" : "none";
      beat.setAttribute("aria-hidden", active ? "false" : "true");
    });
    measures.forEach((measure, index) => {
      const reveal = transition(progress, 4.86 + index * 0.34, 5.22 + index * 0.34) * (1 - transition(progress, 6.66, 7.02));
      measure.style.opacity = reveal.toFixed(3);
      measure.style.transform = `translateY(${Math.round((1 - reveal) * 14)}px)`;
      measure.style.setProperty("--measure-reveal", reveal.toFixed(3));
    });
    const labelReveal = Math.max(0, ...measures.map(measure => Number(measure.style.opacity)));
    dimensionLines.style.opacity = String(labelReveal);
    dimensionLines.querySelector('[data-dimension="width"]').style.opacity = measures[0].style.opacity;
    dimensionLines.querySelector('[data-dimension="thickness"]').style.opacity = measures[1].style.opacity;
    // Project the actual broad face and slim edge, so dimensions follow the mesh.
    scene.updateMatrixWorld(true);
    const point = (x, y, z) => {
      const p = new THREE.Vector3(x, y, z).applyMatrix4(bar.matrixWorld).project(camera);
      return { x: (p.x + 1) * width / 2, y: (1 - p.y) * height / 2 };
    };
    const setLine = (name, x1, y1, x2, y2) => {
      const line = dimensionLines.querySelector(`[data-line="${name}"]`);
      line.setAttribute("x1", x1); line.setAttribute("y1", y1);
      line.setAttribute("x2", x2); line.setAttribute("y2", y2);
    };
    const setArrow = (name, tip, inward) => {
      const length = Math.hypot(inward.x, inward.y) || 1;
      const along = { x: inward.x / length * 8, y: inward.y / length * 8 };
      const across = { x: -inward.y / length * 3.3, y: inward.x / length * 3.3 };
      dimensionLines.querySelector(`[data-arrow="${name}"]`).setAttribute("d",
        `M ${tip.x + along.x + across.x} ${tip.y + along.y + across.y} L ${tip.x} ${tip.y} L ${tip.x + along.x - across.x} ${tip.y + along.y - across.y}`);
    };
    const setLeader = (name, points) => {
      dimensionLines.querySelector(`[data-leader="${name}"]`).setAttribute("d", `M ${points.map(p => `${p.x} ${p.y}`).join(" L ")}`);
    };
    dimensionLines.setAttribute("viewBox", `0 0 ${width} ${height}`);
    const widthTop = point(compact ? -0.65 : -0.55, 0.07, 0.248);
    const widthBottom = point(compact ? -0.65 : -0.55, 0.07, -0.248);
    const faceDirection = { x: widthBottom.x - widthTop.x, y: widthBottom.y - widthTop.y };
    setLine("width", widthTop.x, widthTop.y, widthBottom.x, widthBottom.y);
    setArrow("width-start", widthTop, faceDirection);
    setArrow("width-end", widthBottom, { x: -faceDirection.x, y: -faceDirection.y });
    const edgeStart = point(compact ? 1.65 : 1.9, -0.058, 0.248);
    const edgeEnd = point(compact ? 1.65 : 1.9, 0.058, 0.248);
    const edgeMid = { x: (edgeStart.x + edgeEnd.x) / 2, y: (edgeStart.y + edgeEnd.y) / 2 };
    const edgeDirection = { x: edgeEnd.x - edgeStart.x, y: edgeEnd.y - edgeStart.y };
    const edgeLength = Math.hypot(edgeDirection.x, edgeDirection.y) || 1;
    const edgeTick = { x: -edgeDirection.y / edgeLength * 5, y: edgeDirection.x / edgeLength * 5 };
    setLine("thickness", edgeStart.x, edgeStart.y, edgeEnd.x, edgeEnd.y);
    setLine("thickness-start", edgeStart.x - edgeTick.x, edgeStart.y - edgeTick.y, edgeStart.x + edgeTick.x, edgeStart.y + edgeTick.y);
    setLine("thickness-end", edgeEnd.x - edgeTick.x, edgeEnd.y - edgeTick.y, edgeEnd.x + edgeTick.x, edgeEnd.y + edgeTick.y);
    const widthLabelX = compact ? 22 : clamp(widthBottom.x - 100, 24, width - measures[0].offsetWidth - 24);
    const widthLabelY = compact ? height - 166 : clamp(widthBottom.y + 55, 24, height - 62);
    const thicknessLabelX = compact ? width * 0.52 : clamp(edgeMid.x + 28, 24, width - measures[1].offsetWidth - 24);
    const thicknessLabelY = compact ? height - 166 : clamp(edgeMid.y - 92, 24, height - 62);
    measures[0].style.left = `${widthLabelX}px`;
    measures[0].style.top = `${widthLabelY}px`;
    measures[1].style.left = `${thicknessLabelX}px`;
    measures[1].style.top = `${thicknessLabelY}px`;
    setLeader("width", [widthBottom, { x: widthBottom.x - 18, y: widthBottom.y + 24 }, { x: widthLabelX + 4, y: widthLabelY - 8 }]);
    setLeader("thickness", [edgeMid, { x: edgeMid.x + 22, y: edgeMid.y - 25 }, { x: thicknessLabelX + 4, y: thicknessLabelY + measures[1].offsetHeight + 8 }]);
    chapter.textContent = progress < 4.4 ? "01" : progress < 9 ? "02" : "03";
    chapter.parentElement.style.color = progress > 4.35 && progress < 9 ? "#3a4246" : "#aeb6ba";
    cue.style.opacity = String(1 - transition(progress, 10.08, 10.4));
    cue.style.color = progress > 4.35 && progress < 9 ? "#3a4246" : "#aeb6ba";
    if (visible) renderer.render(scene, camera);
  }

  const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
  const intersection = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) schedule();
  }, { rootMargin: "150px" });
  intersection.observe(travel);
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule, { passive: true });
  update();

  return () => {
    cancelAnimationFrame(frame);
    intersection.disconnect();
    window.removeEventListener("scroll", schedule);
    window.removeEventListener("resize", schedule);
    geometry.dispose();
    material.dispose();
    texture.dispose();
    reflection.dispose();
    pmrem.dispose();
    renderer.dispose();
  };
}

function syncStory() {
  const main = document.querySelector('[data-testid="page-main"]');
  const hero = main?.querySelector('[data-testid="product-hero"]');
  const isFlatBar = window.location.pathname.replace(/\/$/, "") === "/products/flat-bars";

  if (!isFlatBar || !hero) {
    if (activeStory) {
      releaseStory?.();
      activeStory.remove();
      activeStory = null;
      releaseStory = null;
    }
    main?.classList.remove("kchr-flatbar-story-active");
    return;
  }

  if (activeStory?.isConnected && activeStory.nextElementSibling === hero) return;
  if (activeStory) {
    releaseStory?.();
    activeStory.remove();
  }
  activeStory = createStory();
  hero.before(activeStory);
  main.classList.add("kchr-flatbar-story-active");
  releaseStory = mountStory(activeStory);
}

let queued = false;
new MutationObserver(() => {
  if (queued) return;
  queued = true;
  requestAnimationFrame(() => {
    queued = false;
    syncStory();
  });
}).observe(document.documentElement, { childList: true, subtree: true });
window.addEventListener("popstate", syncStory);
syncStory();

