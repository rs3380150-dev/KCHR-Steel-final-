(() => {
  let loaded = false;
  const loadOnFlatBars = () => {
    if (loaded || window.location.pathname.replace(/\/$/, "") !== "/products/flat-bars") return;
    if (!document.querySelector('[data-testid="product-hero"]')) return;
    loaded = true;
    observer.disconnect();
    const script = document.createElement("script");
    script.src = "/flatbar-preview-widget.js";
    script.defer = true;
    document.body.append(script);
  };
  const observer = new MutationObserver(loadOnFlatBars);
  observer.observe(document.documentElement, { childList: true, subtree: true });
  window.addEventListener("popstate", loadOnFlatBars);
  loadOnFlatBars();
})();
