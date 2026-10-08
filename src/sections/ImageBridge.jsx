import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Marquee from "@/components/Marquee";
import { images, marqueeItems } from "@/data/site";

// Full-bleed steel image transition carrying the editorial marquee.
export default function ImageBridge() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
    const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

    return (
        <section ref={ref} data-testid="image-bridge" className="relative flex h-[62vh] min-h-[420px] items-center overflow-hidden bg-carbon">
            <motion.img
                src={images.bridge}
                alt="Molten steel being poured at a rolling mill"
                loading="lazy"
                className="img-treated absolute inset-0 h-full w-full object-cover"
                style={{ y, scale: 1.22 }}
            />
            <div className="absolute inset-0 bg-carbon/55" />
            <Marquee
                items={marqueeItems}
                className="relative w-full border-y border-precision/15 py-6"
                textClass="font-condensed text-[clamp(3rem,7vw,6.5rem)] font-semibold uppercase leading-none text-stroke-light"
            />
        </section>
    );
}
