import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { navLinks } from "@/data/site";
import MobileMenu from "./MobileMenu";

export function LogoMark({ className = "h-5 w-5" }) {
    return (
        <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
            <rect x="16" y="15" width="32" height="8" fill="#A9643A" />
            <rect x="28.5" y="23" width="7" height="18" fill="#A9643A" />
            <rect x="16" y="41" width="32" height="8" fill="#A9643A" />
        </svg>
    );
}

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);
    const { pathname } = useLocation();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 70);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => setOpen(false), [pathname]);

    return (
        <>
            <header
                data-testid="site-header"
                className={`fixed inset-x-0 top-0 z-[80] transition-all duration-500 ${
                    scrolled
                        ? "border-b border-precision/10 bg-[rgba(16,19,21,0.88)] backdrop-blur-md"
                        : "border-b border-transparent bg-transparent"
                }`}
            >
                <div className="container-kchr flex h-[76px] items-center justify-between">
                    <Link
                        to="/"
                        data-testid="header-logo-link"
                        className="group flex items-baseline gap-2.5"
                        aria-label="KCHR Steels — home"
                    >
                        <LogoMark className="h-[22px] w-[22px] self-center transition-transform duration-500 group-hover:rotate-90" />
                        <span className="font-display text-[17px] font-extrabold tracking-[0.04em] text-precision">
                            KCHR
                        </span>
                        <span className="font-display text-[11px] font-light tracking-[0.34em] text-warmsteel">
                            STEELS
                        </span>
                    </Link>

                    <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
                        {navLinks.map((l) => (
                            <NavLink
                                key={l.to}
                                to={l.to}
                                end={l.to === "/"}
                                data-testid={`nav-link-${l.label.toLowerCase().replace(/\s+/g, "-")}`}
                                className={({ isActive }) =>
                                    `nav-link micro-label ${isActive ? "text-precision" : "text-warmsteel/75 hover:text-precision"}`
                                }
                            >
                                {({ isActive }) => (
                                    <>
                                        {isActive && (
                                            <span aria-hidden="true" className="mr-2 inline-block h-1 w-1 bg-bronze align-middle" />
                                        )}
                                        {l.label}
                                    </>
                                )}
                            </NavLink>
                        ))}
                    </nav>

                    <div className="flex items-center gap-6">
                        <span className="micro-label hidden text-warmsteel/50 xl:block">JALANDHAR / PB</span>
                        <Link
                            to="/contact"
                            data-testid="header-enquire-link"
                            className="group hidden items-center gap-2 rounded-[3px] border border-precision/25 px-5 py-2.5 font-display text-[12px] font-semibold uppercase tracking-[0.16em] text-precision transition-colors duration-300 hover:border-bronze hover:bg-bronze/10 sm:inline-flex"
                        >
                            Enquire
                            <span aria-hidden="true" className="text-bronze transition-transform duration-300 group-hover:translate-x-[2px] group-hover:-translate-y-[2px]">
                                &#8599;
                            </span>
                        </Link>
                        <button
                            type="button"
                            onClick={() => setOpen(true)}
                            data-testid="mobile-menu-open"
                            aria-label="Open menu"
                            aria-expanded={open}
                            className="flex h-10 w-10 flex-col items-end justify-center gap-[7px] lg:hidden"
                        >
                            <span className="block h-px w-7 bg-precision" />
                            <span className="block h-px w-5 bg-bronze" />
                        </button>
                    </div>
                </div>
            </header>
            <AnimatePresence>{open && <MobileMenu onClose={() => setOpen(false)} />}</AnimatePresence>
        </>
    );
}
