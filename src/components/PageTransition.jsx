import { useEffect } from "react";
import { motion } from "framer-motion";
import { EASE } from "./motionPresets";

// Route transition — a graphite panel sweeps across; no fake loading percentage.
export default function PageTransition({ children }) {
    useEffect(() => {
        window.__lenis?.scrollTo(0, { immediate: true, force: true });
        window.scrollTo(0, 0);
    }, []);

    return (
        <motion.main
            data-testid="page-main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.5, ease: EASE, delay: 0.4 } }}
            exit={{ opacity: 0, transition: { duration: 0.28, ease: "easeIn" } }}
        >
            {children}
            <motion.div
                aria-hidden="true"
                data-testid="page-transition-panel"
                className="pointer-events-none fixed inset-0 z-[95] bg-carbon"
                initial={{ x: "0%" }}
                animate={{ x: "100%", transition: { duration: 0.8, ease: EASE, delay: 0.1 } }}
                exit={{ x: "-100%", transition: { duration: 0.45, ease: [0.76, 0, 0.24, 1] } }}
            />
        </motion.main>
    );
}
