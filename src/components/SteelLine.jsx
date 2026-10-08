import { motion } from "framer-motion";
import { lineReveal } from "./motionPresets";

// "The Steel Line" — 1px metallic signature that draws itself into view.
export default function SteelLine({
    vertical = false,
    bronze = false,
    strong = false,
    className = "",
    delay = 0,
}) {
    const color = bronze ? "#A9643A" : "currentColor";
    return (
        <motion.div
            aria-hidden="true"
            className={className}
            style={{
                width: vertical ? (strong ? 2 : 1) : "100%",
                height: vertical ? "100%" : strong ? 2 : 1,
                background: color,
                opacity: bronze ? 1 : 0.22,
                transformOrigin: vertical ? "top" : "left",
            }}
            {...lineReveal(delay)}
        />
    );
}
