/* A second Product System chapter. The original 02 explorer stays intact. */
(() => {
  const products = [
    { index: '01', name: 'Flat Bars', slug: 'flat-bars', category: 'FLAT STEEL', image: '/assets/photo-1763926025680-7966e45e48f5-1600.avif', description: 'Versatile flat steel sections suited to fabrication, engineering and structural applications.' },
    { index: '02', name: 'Round Bars', slug: 'round-bars', category: 'SOLID STEEL', image: '/assets/photo-1666634157070-6fd830fb5672-1600.avif', description: 'Solid circular steel sections for machining, tools, equipment and general engineering.' },
    { index: '03', name: 'TMT Bars', slug: 'tmt-bars', category: 'REINFORCEMENT', image: '/assets/photo-1623428454598-1bfe414bac03-1600.avif', description: 'Reinforcement steel for concrete structures and construction applications.' },
    { index: '04', name: 'Angles', slug: 'angles', category: 'STRUCTURAL STEEL', image: '/assets/photo-1651890318280-c5e35ef92f85-1600.avif', description: 'Structural L-sections used across frames, supports and fabrication.' },
    { index: '05', name: 'Channels', slug: 'channels', category: 'STRUCTURAL STEEL', image: '/assets/photo-1702388247780-fedec1db0b5d-1600.avif', description: 'Structural channel sections for frameworks, supports and engineering applications.' },
    { index: '06', name: 'MS Pipes', slug: 'ms-pipes', category: 'MILD STEEL', image: '/assets/photo-1605600659873-d808a13e4d2a-1600.avif', description: 'Mild-steel tubular sections for fabrication, structures and industrial use.' },
  ];

  const escapeHtml = (value) => value.replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);
  const total = String(products.length + 1).padStart(2, '0');
  let chapter;
  let frame = 0;

  function render() {
    return `<div class="kchr-story-sticky">
      <div class="kchr-story-track">
        <section class="kchr-story-panel kchr-story-intro" aria-label="Product collection introduction">
          <div class="kchr-story-intro-top"><span>02B</span><span>PRODUCT SYSTEM / SCROLL EDITION</span></div>
          <h2>Steel in every form.<br><span>Built for every purpose.</span></h2>
          <div class="kchr-story-intro-bottom"><span>SCROLL / EXPLORE</span><p>Explore the steel behind construction, fabrication and industry. Six essential product families, supplied by KCHR.</p><span>01 — ${total}</span></div>
        </section>
        ${products.map((product, i) => `<a class="kchr-story-panel kchr-story-product" href="/products/${product.slug}" aria-label="View ${escapeHtml(product.name)}" data-story-index="${i + 1}">
          <img src="${product.image}" alt="${escapeHtml(product.name)}" loading="lazy" decoding="async">
          <span class="kchr-story-shade" aria-hidden="true"></span>
          <span class="kchr-story-category">${product.category}</span>
          <span class="kchr-story-counter">${String(i + 2).padStart(2, '0')} — ${total}</span>
          <span class="kchr-story-content"><span class="kchr-story-kicker">${product.index} / KCHR STEELS</span><strong>${escapeHtml(product.name)}</strong><span class="kchr-story-description">${escapeHtml(product.description)}</span><span class="kchr-story-link">VIEW PRODUCT <span aria-hidden="true">↗</span></span></span>
        </a>`).join('')}
      </div>
    </div>`;
  }

  function update() {
    frame = 0;
    if (!chapter || !chapter.isConnected) return;
    const viewport = chapter.querySelector('.kchr-story-sticky').clientHeight;
    const travel = Math.max(1, chapter.offsetHeight - viewport);
    const top = chapter.getBoundingClientRect().top;
    const progress = Math.max(0, Math.min(1, -top / travel));
    const position = progress * products.length;
    chapter.querySelector('.kchr-story-track').style.transform = `translate3d(${-progress * products.length * chapter.clientWidth}px, 0, 0)`;
    chapter.querySelectorAll('.kchr-story-product').forEach((panel, i) => {
      const proximity = Math.max(0, 1 - Math.abs(position - (i + 1)));
      const content = panel.querySelector('.kchr-story-content');
      const img = panel.querySelector('img');
      content.style.opacity = String(Math.min(1, proximity * 1.6));
      content.style.transform = `translate3d(0, ${Math.round((1 - proximity) * 54)}px, 0)`;
      img.style.transform = `scale(${(1.08 - proximity * 0.08).toFixed(3)})`;
    });
  }

  function scheduleUpdate() {
    if (!frame) frame = requestAnimationFrame(update);
  }

  function mount() {
    const original = document.querySelector('[data-testid="product-explorer"]');
    if (!original) {
      if (chapter) { chapter.remove(); chapter = null; }
      return;
    }
    if (chapter?.isConnected && chapter.previousElementSibling === original) return;
    chapter?.remove();
    chapter = document.createElement('section');
    chapter.className = 'kchr-product-story';
    chapter.dataset.testid = 'product-system-scroll';
    chapter.setAttribute('aria-label', 'Product System scroll edition');
    chapter.style.setProperty('--story-count', products.length + 1);
    chapter.innerHTML = render();
    original.insertAdjacentElement('afterend', chapter);
    scheduleUpdate();
  }

  let pendingMount = false;
  const observer = new MutationObserver(() => {
    if (pendingMount) return;
    pendingMount = true;
    requestAnimationFrame(() => { pendingMount = false; mount(); });
  });
  observer.observe(document.documentElement, { childList: true, subtree: true });
  document.addEventListener('DOMContentLoaded', mount, { once: true });
  window.addEventListener('scroll', scheduleUpdate, { passive: true });
  window.addEventListener('resize', scheduleUpdate, { passive: true });
  mount();
})();
