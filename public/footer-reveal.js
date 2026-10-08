(() => {
  const root = document.getElementById('root');
  if (!root) return;

  let footer = null;
  let resizeObserver = null;
  let scrollFrame = 0;

  function updateOffset() {
    scrollFrame = 0;
    if (!footer) return;
    const overflow = Math.max(0, footer.getBoundingClientRect().height - window.innerHeight);
    const main = root.querySelector('[data-testid="page-main"]');
    const passedViewport = main ? Math.max(0, -main.getBoundingClientRect().bottom) : 0;
    root.style.setProperty('--footer-reveal-offset', `${-Math.min(overflow, passedViewport)}px`);
  }

  function scheduleOffset() {
    if (!scrollFrame) scrollFrame = requestAnimationFrame(updateOffset);
  }

  function update() {
    if (!footer) return;
    const height = footer.getBoundingClientRect().height;
    root.style.setProperty('--footer-reveal-height', `${Math.ceil(height)}px`);
    root.classList.toggle('footer-reveal-active', height > 0);
    root.classList.toggle('footer-reveal-tall', height > window.innerHeight);
    scheduleOffset();
  }

  function locate() {
    const current = root.querySelector('[data-testid="site-footer"]');
    if (!current || current === footer) return;
    resizeObserver?.disconnect();
    footer = current;
    resizeObserver = new ResizeObserver(update);
    resizeObserver.observe(footer);
    update();
  }

  new MutationObserver(() => { locate(); scheduleOffset(); }).observe(root, { childList: true, subtree: true });
  window.addEventListener('resize', update, { passive: true });
  window.addEventListener('scroll', updateOffset, { passive: true });
  document.fonts?.ready.then(update);
  locate();
})();
