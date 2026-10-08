// Shared motion presets — one consistent motion system across the site.
export const EASE = [0.16, 1, 0.3, 1];

export const fadeUp = (delay = 0, y = 28) => ({
    initial: { opacity: 0, y },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.15 },
    transition: { duration: 0.9, ease: EASE, delay },
});

export const lineReveal = (delay = 0) => ({
    initial: { scaleX: 0 },
    whileInView: { scaleX: 1 },
    viewport: { once: true, amount: 0.4 },
    transition: { duration: 1.1, ease: EASE, delay },
});

export const maskReveal = (delay = 0) => ({
    initial: { y: "112%" },
    whileInView: { y: 0 },
    viewport: { once: true, amount: 0.25 },
    transition: { duration: 1, ease: EASE, delay },
});
