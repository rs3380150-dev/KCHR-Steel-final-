import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { EASE } from "./motionPresets";

// Clip-path image reveal + subtle inner settle. Optional scroll parallax.
// The unclipped holder carries whileInView; clip + scale animate via variants.
export default function ImageReveal({
    src,
    alt,
    className = "",
    imgClassName = "",
    delay = 0,
    parallax = false,
    cursor = false,
    eager = false,
}) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: parallax ? ["start end", "end start"] : undefined,
    });
    const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

    return (
        <div ref={ref} className={`relative overflow-hidden ${className}`} data-cursor={cursor ? "view" : undefined}>
            <motion.div
                className="absolute inset-0"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
            >
                <motion.div
                    className="absolute inset-0"
                    variants={{
                        hidden: { clipPath: "inset(100% 0% 0% 0%)" },
                        visible: {
                            clipPath: "inset(0% 0% 0% 0%)",
                            transition: { duration: 1.2, ease: EASE, delay },
                        },
                    }}
                >
                    {parallax ? (
                        <motion.img
                            src={src}
                            alt={alt}
                            loading={eager ? "eager" : "lazy"}
                            className={`img-treated absolute inset-0 h-full w-full object-cover ${imgClassName}`}
                            style={{ y, scale: 1.18 }}
                        />
                    ) : (
                        <motion.img
                            src={src}
                            alt={alt}
                            loading={eager ? "eager" : "lazy"}
                            className={`img-treated absolute inset-0 h-full w-full object-cover ${imgClassName}`}
                            variants={{
                                hidden: { scale: 1.14 },
                                visible: {
                                    scale: 1,
                                    transition: { duration: 1.6, ease: EASE, delay },
                                },
                            }}
                        />
                    )}
                </motion.div>
            </motion.div>
        </div>
    );
}
