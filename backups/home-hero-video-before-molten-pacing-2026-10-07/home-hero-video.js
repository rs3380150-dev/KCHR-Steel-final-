(() => {
  const sources = [
    '/assets/steel-yard-home-hero.mp4',
    '/assets/molten-steel-home-hero.mp4',
    '/assets/dark-warehouse-home-hero.mp4',
  ];
  const crossfadeMs = 1150;
  let mountedLayer = null;
  let dispose = () => {};

  const mount = () => {
    const hero = document.querySelector('[data-testid="hero-section"]');
    if (hero && mountedLayer?.parentElement === hero) return;
    dispose();
    if (!hero) return;

    const layer = document.createElement('div');
    layer.className = 'home-hero-video';
    layer.setAttribute('aria-hidden', 'true');

    const videos = sources.map((src, index) => {
      const video = document.createElement('video');
      video.className = `home-hero-video-clip${index === 0 ? ' is-active' : ''}`;
      video.autoplay = index === 0;
      video.muted = true;
      video.defaultMuted = true;
      video.playsInline = true;
      video.preload = 'auto';
      video.src = src;
      return video;
    });

    const shade = document.createElement('div');
    shade.className = 'home-hero-video-shade';
    layer.append(...videos, shade);
    mountedLayer = layer;
    hero.prepend(layer);

    let activeIndex = 0;
    let crossfading = false;
    let fadeTimer = 0;
    const playNext = () => {
      if (crossfading) return;
      crossfading = true;
      const previous = videos[activeIndex];
      const nextIndex = (activeIndex + 1) % videos.length;
      const next = videos[nextIndex];
      next.currentTime = 0;
      next.play().then(() => {
        if (!layer.isConnected) return;
        next.classList.add('is-active');
        previous.classList.remove('is-active');
        fadeTimer = window.setTimeout(() => {
          previous.pause();
          previous.currentTime = 0;
          activeIndex = nextIndex;
          crossfading = false;
        }, crossfadeMs);
      }).catch(() => { crossfading = false; });
    };

    videos.forEach(video => {
      video.addEventListener('timeupdate', () => {
        if (video !== videos[activeIndex] || crossfading || !Number.isFinite(video.duration)) return;
        if (video.currentTime >= video.duration - 1.5) playNext();
      });
      video.addEventListener('ended', () => {
        if (video === videos[activeIndex]) playNext();
      });
    });
    videos[0].play().catch(() => {});
    dispose = () => {
      window.clearTimeout(fadeTimer);
      videos.forEach(video => video.pause());
      layer.remove();
      mountedLayer = null;
      dispose = () => {};
    };
  };

  new MutationObserver(mount).observe(document.body, { childList: true, subtree: true });
  mount();
})();
