import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import SectionLabel from "@/components/SectionLabel";
import SteelLine from "@/components/SteelLine";
import { FadeUp } from "@/components/Reveal";

// The 1963 identity device — oversized, overlapping the grid, parallax on scroll.
export default function LegacyNumber() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
    const x = useTransform(scrollYProgress, [0, 1], [60, -60]);
    const xLabel = useTransform(scrollYProgress, [0, 1], [-30, 30]);

    return (
        <section ref={ref} data-testid="legacy-number-section" className="relative overflow-hidden bg-paper py-24 text-graphite md:py-36">
            <div className="container-kchr relative">
                <SteelLine className="text-graphite" />
                <div className="relative py-10 md:py-16">
                    <motion.p style={{ x: xLabel }} className="micro-label absolute left-1/2 top-6 -translate-x-1/2 text-graphite/50 md:top-10" data-testid="legacy-established-label">
                        ESTABLISHED
                    </motion.p>
                    <motion.p
                        style={{ x }}
                        aria-label="Established 1963"
                        className="select-none whitespace-nowrap text-center font-condensed font-semibold leading-[0.8] tracking-[0.01em] text-graphite text-[clamp(9rem,27vw,30rem)]"
                        data-testid="legacy-number-1963"
                    >
                        19<span className="text-bronze">6</span>3
                    </motion.p>
                    <FadeUp delay={0.15} className="mx-auto mt-10 flex max-w-[62ch] flex-col items-center gap-6 text-center">
                        <SteelLine bronze className="w-16" />
                        <p className="text-[15px] leading-relaxed text-graphite/70 md:text-base">
                            One number carries the business. Six decades of steel supplied from Jalandhar — through changing markets, changing machinery and three generations of buyers.
                        </p>
                    </FadeUp>
                </div>
                <SteelLine className="text-graphite" />
            </div>
        </section>
    );
}
