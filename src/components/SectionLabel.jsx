import { motion } from "framer-motion";
import { EASE, fadeUp } from "./motionPresets";

// Technical eyebrow label — line grows, then text enters.
export default function SectionLabel({ children, light = false, className = "" }) {
    return (
        <div className={`flex items-center gap-3 ${className}`} data-testid="section-label">
            <motion.span
                aria-hidden="true"
                className="block h-px w-10 bg-bronze"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.8, ease: EASE }}
                style={{ transformOrigin: "left" }}
            />
            <motion.span
                className={`micro-label ${light ? "text-warmsteel/80" : "text-graphite/60"}`}
                {...fadeUp(0.1, 8)}
            >
                {children}
            </motion.span>
        </div>
    );
}
