import { motion } from "framer-motion";
import { EASE, fadeUp } from "./motionPresets";

// Masked line-by-line headline reveal.
// The outer span carries whileInView (it stays unclipped, so IntersectionObserver
// can see it); the inner span animates via variant propagation.
export function MaskLines({ lines, className = "", lineClassName = "", delay = 0, as: Tag = "h1" }) {
    return (
        <Tag className={className}>
            {lines.map((line, i) => (
                <motion.span
                    key={i}
                    className="block overflow-hidden pb-[0.06em] -mb-[0.06em]"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.25 }}
                >
                    <motion.span
                        className={`block will-change-transform ${lineClassName}`}
                        variants={{
                            hidden: { y: "112%" },
                            visible: {
                                y: 0,
                                transition: { duration: 1.05, ease: EASE, delay: delay + i * 0.11 },
                            },
                        }}
                    >
                        {line}
                    </motion.span>
                </motion.span>
            ))}
        </Tag>
    );
}

// Standard scroll-reveal wrapper.
export function FadeUp({ children, delay = 0, className = "", as = "div", ...rest }) {
    const Comp = motion[as] || motion.div;
    return (
        <Comp className={className} {...fadeUp(delay)} {...rest}>
            {children}
        </Comp>
    );
}
