import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { EASE } from "@/components/motionPresets";
import { CtaButton } from "@/components/CtaButton";
import { images, site } from "@/data/site";

// The production hero uses this content and motion with one full-viewport photo.
// public/hero-fullscreen.css places the existing hero image behind the copy.
function HeadlineLine({ children, index }) {
    return (
        <span className="block overflow-hidden pb-[0.05em] -mb-[0.05em]">
            <motion.span
                className="block will-change-transform"
                initial={{ y: "112%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.1, ease: EASE, delay: 0.9 + index * 0.13 }}
            >
                {children}
            </motion.span>
        </span>
    );
}

export default function HeroSection() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
    const imgScale = useTransform(scrollYProgress, [0, 1], [1.06, 1.0]);
    const plateY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
    const ghostX = useTransform(scrollYProgress, [0, 1], [0, -140]);
    const contentFade = useTransform(scrollYProgress, [0, 0.75], [1, 0.3]);

    return (
        <section
            ref={ref}
            data-testid="hero-section"
            className="relative min-h-[100svh] overflow-hidden bg-carbon text-precision lg:h-[100svh]"
        >
            {/* Background layer — ghost founding year, drifting on scroll */}
            <motion.p
                aria-hidden="true"
                style={{ x: ghostX }}
                className="text-stroke-hero pointer-events-none absolute -top-[2%] left-[4vw] hidden select-none font-condensed text-[23vw] font-semibold leading-none opacity-[0.09] lg:block"
            >
                1963
            </motion.p>

            {/* Coordinates — engineering annotation, top right */}
            <motion.p
                className="micro-label absolute right-[var(--gutter)] top-[92px] z-20 hidden text-warmsteel/60 lg:block"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.6 }}
            >
                {site.coordinates}
            </motion.p>


            {/* Existing hero image; hero-fullscreen.css expands it to cover the viewport. */}
            <motion.div
                className="relative z-10 mx-[var(--gutter)] mt-8 aspect-[16/10] lg:absolute lg:bottom-[15vh] lg:left-[40%] lg:right-[4vw] lg:top-[13vh] lg:mx-0 lg:mt-0 lg:aspect-auto"
                style={{ y: plateY }}
                data-testid="hero-plate"
            >
                <motion.div
                    className="relative h-full w-full overflow-hidden rounded-[2px] border border-precision/20"
                    initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
                    animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
                    transition={{ duration: 1.25, ease: EASE, delay: 0.55 }}
                >
                    <motion.img
                        src={images.hero}
                        alt="Molten steel poured at a rolling mill — the source of KCHR's supply"
                        className="img-treated h-full w-full object-cover"
                        style={{ scale: imgScale }}
                        initial={{ scale: 1.18 }}
                        animate={{ scale: 1.06 }}
                        transition={{ duration: 1.9, ease: EASE, delay: 0.55 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-carbon/55 via-transparent to-carbon/30" />
                    <div
                        aria-hidden="true"
                        className="plate-sweep absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-precision/20 to-transparent"
                    />
                    {/* corner ticks */}
                    <span aria-hidden="true" className="absolute left-0 top-0 h-3 w-px bg-precision/70" />
                    <span aria-hidden="true" className="absolute left-0 top-0 h-px w-3 bg-precision/70" />
                    <span aria-hidden="true" className="absolute right-0 top-0 h-3 w-px bg-precision/70" />
                    <span aria-hidden="true" className="absolute right-0 top-0 h-px w-3 bg-precision/70" />
                    <span aria-hidden="true" className="absolute bottom-0 left-0 h-3 w-px bg-precision/70" />
                    <span aria-hidden="true" className="absolute bottom-0 left-0 h-px w-3 bg-precision/70" />
                    <span aria-hidden="true" className="absolute bottom-0 right-0 h-3 w-px bg-precision/70" />
                    <span aria-hidden="true" className="absolute bottom-0 right-0 h-px w-3 bg-precision/70" />
                    <p className="micro-label absolute bottom-4 right-5 text-precision/70">FIG. 00 — MOLTEN / MILL</p>
                </motion.div>
            </motion.div>

            {/* Front layer — headline sandwiching across the plate */}
            <motion.h1
                style={{ opacity: contentFade }}
                className="relative z-20 px-[var(--gutter)] pt-10 font-condensed text-[clamp(3.6rem,9vw,10rem)] font-semibold uppercase leading-[0.87] lg:absolute lg:bottom-[20vh] lg:left-0 lg:px-0 lg:pl-[var(--gutter)] lg:pt-0"
                data-testid="hero-headline"
                aria-label="Supplying Strength Since 1963"
            >
                <HeadlineLine index={0}>
                    <span className="text-metal">SUPPLYING</span>
                </HeadlineLine>
                <HeadlineLine index={1}>
                    <span className="text-stroke-hero">STRENGTH</span>
                </HeadlineLine>
                <HeadlineLine index={2}>
                    <span className="text-bronze">SINCE 1963</span>
                </HeadlineLine>
            </motion.h1>

            {/* Support + CTAs */}
            <div className="relative z-20 flex flex-col gap-7 px-[var(--gutter)] py-10 lg:absolute lg:bottom-[6vh] lg:left-0 lg:right-0 lg:flex-row lg:items-end lg:justify-between lg:px-0 lg:pl-[var(--gutter)] lg:pr-[var(--gutter)] lg:py-0">
                <motion.p
                    className="max-w-[42ch] border-l-2 border-bronze/70 pl-4 text-[15px] leading-relaxed text-warmsteel md:text-base"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, ease: EASE, delay: 1.3 }}
                >
                    Iron and structural steel supplied for construction, engineering and manufacturing — from Jalandhar's trusted yard since 1963.
                </motion.p>
                <motion.div
                    className="flex flex-wrap items-center gap-6"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, ease: EASE, delay: 1.42 }}
                >
                    <CtaButton to="/products" dark testId="hero-cta-products">
                        Explore Products
                    </CtaButton>
                </motion.div>
            </div>

            {/* Bottom metadata */}
            <motion.div
                className="absolute bottom-6 left-[var(--gutter)] z-20 hidden items-center gap-3 lg:flex"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.7 }}
            >
                <span className="relative block h-10 w-px overflow-hidden bg-precision/20">
                    <motion.span
                        className="absolute inset-x-0 top-0 block h-4 bg-bronze"
                        animate={{ y: [-16, 40] }}
                        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                    />
                </span>
                <span className="micro-label text-warmsteel/60">Scroll to explore</span>
            </motion.div>
        </section>
    );
}
