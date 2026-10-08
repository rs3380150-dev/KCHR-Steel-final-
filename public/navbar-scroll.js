/* Keep the page opener's current header treatment; hide only during continued
   downward scrolling after the opener, and restore it on pause or upward scroll. */
(() => {
  const IDLE_DELAY = 800;
  const DIRECTION_THRESHOLD = 2;
  let header;
  let opener;
  let lastY = window.scrollY;
  let idleTimer;
  let frame = 0;
  let wasBeyondOpener = false;

  const visible = () => header?.classList.remove('kchr-nav-hidden');
  const hidden = () => header?.classList.add('kchr-nav-hidden');
  const menuOpen = () => header?.querySelector('[data-testid="mobile-menu-open"][aria-expanded="true"]');
  const keyboardFocusInHeader = () => header?.contains(document.activeElement) && document.activeElement.matches(':focus-visible');

  function locate() {
    const nextHeader = document.querySelector('[data-testid="site-header"]');
    const nextOpener = document.querySelector('[data-testid="page-main"] > section:first-of-type');
    if (nextHeader === header && nextOpener === opener) return;
    header = nextHeader;
    opener = nextOpener;
    lastY = window.scrollY;
    wasBeyondOpener = false;
    clearTimeout(idleTimer);
    visible();
  }

  function update() {
    frame = 0;
    locate();
    if (!header || !opener) return;

    const y = window.scrollY;
    const delta = y - lastY;
    const beyondOpener = opener.getBoundingClientRect().bottom <= 0;

    if (!beyondOpener || menuOpen() || keyboardFocusInHeader()) {
      clearTimeout(idleTimer);
      visible();
    } else {
      if (delta > DIRECTION_THRESHOLD || (!wasBeyondOpener && beyondOpener && delta > 0)) hidden();
      else if (delta < -DIRECTION_THRESHOLD) visible();

      if (Math.abs(delta) > .5) {
        clearTimeout(idleTimer);
        idleTimer = setTimeout(visible, IDLE_DELAY);
      }
    }

    lastY = y;
    wasBeyondOpener = beyondOpener;
  }

  function schedule() {
    if (!frame) frame = requestAnimationFrame(update);
  }

  let mutationFrame = 0;
  new MutationObserver(() => {
    if (mutationFrame) return;
    mutationFrame = requestAnimationFrame(() => { mutationFrame = 0; locate(); schedule(); });
  }).observe(document.documentElement, { childList: true, subtree: true });

  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule, { passive: true });
  document.addEventListener('focusin', () => { if (header?.contains(document.activeElement)) visible(); });
  document.addEventListener('DOMContentLoaded', schedule, { once: true });
  schedule();
})();
