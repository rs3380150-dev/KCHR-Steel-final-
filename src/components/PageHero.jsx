import { motion } from "framer-motion";
import SteelLine from "./SteelLine";
import ImageReveal from "./ImageReveal";
import { MaskLines, FadeUp } from "./Reveal";

// Consistent internal-page opener — technical metadata + masked headline.
export default function PageHero({ meta, lines, intro, image, imageAlt, children }) {
    return (
        <section data-testid="page-hero" className="relative overflow-hidden bg-graphite pb-20 pt-[76px] text-precision md:pb-28 md:pt-[100px]">
            {image && (
                <div className="absolute inset-y-0 right-0 hidden w-[42%] lg:block">
                    <ImageReveal src={image} alt={imageAlt || ""} className="h-full w-full" eager />
                    <div className="absolute inset-0 bg-gradient-to-r from-graphite via-graphite/40 to-transparent" />
                </div>
            )}
            <div className="container-kchr relative">
                <motion.p className="micro-label text-bronze" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}>
                    KCHR / {meta}
                </motion.p>
                <SteelLine className="mt-6 max-w-[520px] text-precision" delay={0.2} />
                <MaskLines
                    lines={lines}
                    className="mt-8 max-w-[18ch] font-display text-[clamp(2.6rem,5.4vw,5.6rem)] font-bold leading-[1.02] tracking-[-0.02em]"
                    delay={0.35}
                />
                {intro && (
                    <FadeUp delay={0.65}>
                        <p className="mt-8 max-w-[54ch] text-[15px] leading-relaxed text-warmsteel/80 md:text-base">{intro}</p>
                    </FadeUp>
                )}
                {children}
            </div>
        </section>
    );
}
