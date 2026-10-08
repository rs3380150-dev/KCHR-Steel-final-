(() => {
  if (!matchMedia('(pointer: fine)').matches || matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const canvas = document.createElement('canvas');
  canvas.className = 'footer-impact-sparks';
  canvas.setAttribute('aria-hidden', 'true');
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d', { alpha: true });
  if (!ctx) return;

  let dpr = 1;
  let image = null;
  let pixels = null;
  let particles = [];
  let flashes = [];
  let frame = 0;
  let previousContact = null;
  let lastBurst = -Infinity;

  function resize() {
    dpr = Math.min(devicePixelRatio || 1, 2);
    canvas.width = Math.round(innerWidth * dpr);
    canvas.height = Math.round(innerHeight * dpr);
    canvas.style.width = `${innerWidth}px`;
    canvas.style.height = `${innerHeight}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function getImage() {
    const current = document.querySelector('[data-testid="footer-wordmark-image"]');
    if (!current || !current.complete || !current.naturalWidth) return null;
    if (current !== image) {
      const mask = document.createElement('canvas');
      mask.width = current.naturalWidth;
      mask.height = current.naturalHeight;
      const maskContext = mask.getContext('2d', { willReadFrequently: true });
      maskContext.drawImage(current, 0, 0);
      pixels = maskContext.getImageData(0, 0, mask.width, mask.height).data;
      image = current;
    }
    return current;
  }

  function touchesSteel(x, y) {
    const current = getImage();
    if (!current || !pixels) return false;
    const rect = current.getBoundingClientRect();
    const px = Math.floor((x - rect.left) * current.naturalWidth / rect.width);
    const py = Math.floor((y - rect.top) * current.naturalHeight / rect.height);
    if (px < 0 || py < 0 || px >= current.naturalWidth || py >= current.naturalHeight) return false;
    return pixels[(py * current.naturalWidth + px) * 4 + 3] > 110;
  }

  function burst(x, y, direction, energy, now) {
    flashes.push({ x, y, born: now });
    const count = 10 + Math.floor(Math.random() * 4) + Math.round((energy - .8) * 5);
    for (let i = 0; i < count; i++) {
      const upward = i < 2;
      const side = Math.random() < (direction > 0 ? .6 : .4) ? 1 : -1;
      const speed = (upward ? 120 + Math.random() * 85 : 115 + Math.random() * 150) * energy;
      const angle = upward ? .62 + Math.random() * .42 : .06 + Math.random() * .38;
      particles.push({
        x, y,
        vx: side * Math.cos(angle) * speed,
        vy: -Math.sin(angle) * speed,
        floor: y + 2 + Math.random() * 3,
        born: now,
        life: 230 + Math.random() * 220,
        radius: .45 + Math.random() * .6,
        bounces: 0,
        ember: i >= count - 2,
      });
    }
    if (!frame) frame = requestAnimationFrame(render);
  }

  function render(now) {
    frame = 0;
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    ctx.globalCompositeOperation = 'lighter';

    flashes = flashes.filter(flash => now - flash.born < 75);
    for (const flash of flashes) {
      const progress = (now - flash.born) / 75;
      const radius = 5 + progress * 4;
      const glow = ctx.createRadialGradient(flash.x, flash.y, 0, flash.x, flash.y, radius);
      glow.addColorStop(0, `rgba(255,255,240,${.95 * (1 - progress)})`);
      glow.addColorStop(.28, `rgba(255,234,150,${.65 * (1 - progress)})`);
      glow.addColorStop(1, 'rgba(255,122,36,0)');
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(flash.x, flash.y, radius, 0, Math.PI * 2);
      ctx.fill();
    }

    particles = particles.filter(particle => now - particle.born < particle.life);
    for (const particle of particles) {
      const age = now - particle.born;
      const progress = age / particle.life;
      const step = Math.min(32, Math.max(0, now - (particle.lastFrame || now))) / 1000;
      particle.lastFrame = now;
      particle.x += particle.vx * step;
      particle.y += particle.vy * step;
      particle.vx *= Math.exp(-1.5 * step);
      particle.vy += 740 * step;

      if (particle.y > particle.floor && particle.vy > 0) {
        if (particle.ember && particle.bounces < 2) {
          particle.y = particle.floor;
          particle.vy = -particle.vy * (particle.bounces ? .22 : .32);
          particle.vx *= .58;
          particle.bounces++;
        } else {
          particle.life = Math.min(particle.life, age + 45);
        }
      }

      const opacity = Math.pow(1 - progress, 1.25) * (particle.bounces ? .8 : 1);
      const hot = age < 70;
      const green = Math.round(242 - 138 * progress);
      const blue = Math.round(193 - 170 * progress);
      const tailX = particle.x - particle.vx * .035;
      const tailY = particle.y - particle.vy * .035;
      const trail = ctx.createLinearGradient(tailX, tailY, particle.x, particle.y);
      trail.addColorStop(0, 'rgba(224,85,24,0)');
      trail.addColorStop(.58, `rgba(255,147,49,${opacity * .55})`);
      trail.addColorStop(1, `rgba(255,${green},${blue},${opacity})`);
      ctx.lineCap = 'round';
      ctx.lineWidth = particle.radius * (hot ? 1.5 : 1.05);
      ctx.shadowColor = hot ? 'rgba(255,230,150,.7)' : 'rgba(255,115,35,.4)';
      ctx.shadowBlur = hot ? 3.5 : 1.5;
      ctx.strokeStyle = trail;
      ctx.beginPath();
      ctx.moveTo(tailX, tailY);
      ctx.lineTo(particle.x, particle.y);
      ctx.stroke();
      ctx.fillStyle = `rgba(255,${green},${blue},${opacity})`;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    ctx.globalCompositeOperation = 'source-over';
    if (flashes.length || particles.length) frame = requestAnimationFrame(render);
  }

  document.addEventListener('pointermove', event => {
    const mark = event.target.closest?.('[data-testid="footer-wordmark"]');
    if (!mark || event.pointerType !== 'mouse') {
      previousContact = null;
      return;
    }
    const { clientX: x, clientY: y } = event;
    if (!touchesSteel(x, y)) {
      previousContact = null;
      return;
    }
    const now = performance.now();
    const distance = previousContact ? Math.hypot(x - previousContact.x, y - previousContact.y) : Infinity;
    const direction = previousContact ? Math.sign(x - previousContact.x) : 1;
    if (now - lastBurst > 105 && distance > 11) {
      const speed = previousContact ? distance / Math.max(16, now - previousContact.time) : .7;
      const energy = Math.min(1.4, Math.max(.8, .7 + speed * .27));
      burst(x, y, direction, energy, now);
      lastBurst = now;
      previousContact = { x, y, time: now };
    }
  }, { passive: true });

  window.addEventListener('resize', resize, { passive: true });
  resize();
})();
