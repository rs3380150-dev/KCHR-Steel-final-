(() => {
  const sources = [
    '/assets/steel-yard-home-hero.mp4',
    '/assets/molten-steel-home-hero.mp4',
    '/assets/dark-warehouse-home-hero.mp4',
  ];
  const whatsappHref = 'https://wa.me/?text=Hello%20KCHR%20Steels%2C%20I%20would%20like%20to%20enquire%20about%20steel%20products.';
  const crossfadeMs = 1150;
  const moltenCrossfadeMs = 1500;
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
    const whatsappLink = document.createElement('a');
    whatsappLink.className = 'home-hero-whatsapp';
    whatsappLink.href = whatsappHref;
    whatsappLink.target = '_blank';
    whatsappLink.rel = 'noopener noreferrer';
    whatsappLink.setAttribute('aria-label', 'Open WhatsApp to share an enquiry');
    whatsappLink.innerHTML = '<img src="/assets/whatsapp.svg" alt="" aria-hidden="true">';
    layer.append(...videos, shade);
    mountedLayer = layer;
    hero.prepend(layer, whatsappLink);

    let activeIndex = 0;
    let crossfading = false;
    let fadeTimer = 0;
    const playNext = () => {
      if (crossfading) return;
      crossfading = true;
      const previous = videos[activeIndex];
      const nextIndex = (activeIndex + 1) % videos.length;
      const next = videos[nextIndex];
      const fadeDuration = activeIndex === 1 ? moltenCrossfadeMs : crossfadeMs;
      next.currentTime = 0;
      next.playbackRate = 1;
      previous.style.transitionDuration = `${fadeDuration}ms`;
      next.style.transitionDuration = `${fadeDuration}ms`;
      next.play().then(() => {
        if (!layer.isConnected) return;
        next.classList.add('is-active');
        previous.classList.remove('is-active');
        fadeTimer = window.setTimeout(() => {
          previous.pause();
          previous.currentTime = 0;
          previous.playbackRate = 1;
          activeIndex = nextIndex;
          crossfading = false;
        }, fadeDuration);
      }).catch(() => { crossfading = false; });
    };

    videos.forEach((video, index) => {
      video.addEventListener('timeupdate', () => {
        if (video !== videos[activeIndex] || crossfading || !Number.isFinite(video.duration)) return;
        if (index === 1) {
          // Keep the molten pour at its original pace. Let the roller and final
          // steel shots breathe, then show the final shot before fading out.
          const pace = video.currentTime >= 8.35 ? 0.64 : video.currentTime >= 2.45 ? 0.76 : 1;
          if (video.playbackRate !== pace) video.playbackRate = pace;
        }
        const leadTime = index === 1 ? 0.3 : 1.5;
        if (video.currentTime >= video.duration - leadTime) playNext();
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
      whatsappLink.remove();
      mountedLayer = null;
      dispose = () => {};
    };
  };

  new MutationObserver(mount).observe(document.body, { childList: true, subtree: true });
  mount();
})();
