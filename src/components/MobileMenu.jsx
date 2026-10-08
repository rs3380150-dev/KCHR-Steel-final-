import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { EASE } from "./motionPresets";
import { navLinks, site } from "@/data/site";
import { LogoMark } from "./Header";

export default function MobileMenu({ onClose }) {
    useEffect(() => {
        document.body.style.overflow = "hidden";
        window.__lenis?.stop();
        return () => {
            document.body.style.overflow = "";
            window.__lenis?.start();
        };
    }, []);

    return (
        <motion.div
            data-testid="mobile-menu"
            className="fixed inset-0 z-[90] flex flex-col bg-carbon"
            initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
            transition={{ duration: 0.6, ease: EASE }}
            role="dialog"
            aria-modal="true"
        >
            <div className="container-kchr flex h-[76px] items-center justify-between">
                <span className="flex items-baseline gap-2.5">
                    <LogoMark className="h-[22px] w-[22px]" />
                    <span className="font-display text-[17px] font-extrabold tracking-[0.04em] text-precision">KCHR</span>
                    <span className="font-display text-[11px] font-light tracking-[0.34em] text-warmsteel">STEELS</span>
                </span>
                <button
                    type="button"
                    onClick={onClose}
                    data-testid="mobile-menu-close"
                    aria-label="Close menu"
                    className="relative flex h-10 w-10 items-center justify-center"
                >
                    <span className="absolute h-px w-7 rotate-45 bg-precision" />
                    <span className="absolute h-px w-7 -rotate-45 bg-precision" />
                </button>
            </div>

            <nav className="container-kchr flex flex-1 flex-col justify-center gap-1" aria-label="Mobile">
                {navLinks.map((l, i) => (
                    <span key={l.to} className="block overflow-hidden">
                        <motion.span
                            className="block"
                            initial={{ y: "110%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "110%", transition: { duration: 0.3 } }}
                            transition={{ duration: 0.7, ease: EASE, delay: 0.15 + i * 0.06 }}
                        >
                            <Link
                                to={l.to}
                                onClick={onClose}
                                data-testid={`mobile-nav-${l.label.toLowerCase().replace(/\s+/g, "-")}`}
                                className="group flex items-baseline gap-4 py-2"
                            >
                                <span className="micro-label text-bronze">0{i + 1}</span>
                                <span className="font-condensed text-[13vw] font-semibold uppercase leading-[1.02] text-precision transition-colors duration-300 group-hover:text-bronze sm:text-6xl">
                                    {l.label}
                                </span>
                            </Link>
                        </motion.span>
                    </span>
                ))}
            </nav>

            <motion.div
                className="container-kchr border-t border-precision/10 py-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.2 } }}
                transition={{ delay: 0.5, duration: 0.6 }}
            >
                <div className="flex flex-wrap items-end justify-between gap-4">
                    <div>
                        <p className="micro-label text-warmsteel/50">Tanda Road, Opp. KMV College</p>
                        <p className="micro-label mt-1 text-warmsteel/50">Jalandhar, Punjab — {site.phoneDisplay}</p>
                    </div>
                    <p className="micro-label text-bronze">EST. {site.established}</p>
                </div>
            </motion.div>
        </motion.div>
    );
}
