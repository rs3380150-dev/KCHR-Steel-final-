(() => {
  const mount = () => {
    const hero = document.querySelector('[data-testid="hero-section"]');
    if (!hero || hero.querySelector('.home-hero-video')) return;

    const layer = document.createElement('div');
    layer.className = 'home-hero-video';
    layer.setAttribute('aria-hidden', 'true');

    const video = document.createElement('video');
    video.autoplay = true;
    video.loop = true;
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.preload = 'auto';
    video.src = '/assets/steel-yard-home-hero.mp4';

    const shade = document.createElement('div');
    shade.className = 'home-hero-video-shade';
    layer.append(video, shade);
    hero.prepend(layer);
    video.play().catch(() => {});
  };

  new MutationObserver(mount).observe(document.body, { childList: true, subtree: true });
  mount();
})();
