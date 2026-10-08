import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

// Desktop-only cursor: 8px bronze dot; expands to a VIEW ring over [data-cursor="view"] targets.
export default function Cursor() {
    const [enabled, setEnabled] = useState(false);
    const [view, setView] = useState(false);
    const x = useMotionValue(-100);
    const y = useMotionValue(-100);
    const sx = useSpring(x, { stiffness: 550, damping: 45, mass: 0.6 });
    const sy = useSpring(y, { stiffness: 550, damping: 45, mass: 0.6 });

    useEffect(() => {
        const fine = window.matchMedia("(pointer: fine)").matches;
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (!fine || reduce) return;
        setEnabled(true);
        document.documentElement.classList.add("custom-cursor");
        const move = (e) => {
            x.set(e.clientX);
            y.set(e.clientY);
        };
        const over = (e) => setView(!!e.target.closest?.('[data-cursor="view"]'));
        window.addEventListener("mousemove", move, { passive: true });
        window.addEventListener("mouseover", over, { passive: true });
        return () => {
            document.documentElement.classList.remove("custom-cursor");
            window.removeEventListener("mousemove", move);
            window.removeEventListener("mouseover", over);
        };
    }, [x, y]);

    if (!enabled) return null;

    return (
        <>
            {!view && (
                <motion.div
                    aria-hidden="true"
                    className="pointer-events-none fixed left-0 top-0 z-[100]"
                    style={{ x: sx, y: sy }}
                    data-testid="cursor-dot"
                >
                    <span className="block h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-bronze" />
                </motion.div>
            )}
            <motion.div
                aria-hidden="true"
                className="pointer-events-none fixed left-0 top-0 z-[99]"
                style={{ x: sx, y: sy }}
                data-testid="cursor-view"
            >
                <motion.span
                    className={`-translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full ${
                        view ? "bg-precision" : ""
                    }`}
                    animate={{
                        width: view ? 64 : 0,
                        height: view ? 64 : 0,
                        opacity: view ? 1 : 0,
                    }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                    <span className="micro-label font-semibold text-bronze">VIEW</span>
                </motion.span>
            </motion.div>
        </>
    );
}
