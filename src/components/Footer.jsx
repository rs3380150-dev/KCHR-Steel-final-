import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { navLinks, site, annotations } from "@/data/site";
import { products } from "@/data/products";

export default function Footer() {
    const ref = useRef(null);
    const mx = useMotionValue(0);
    const sx = useSpring(mx, { stiffness: 60, damping: 20 });
    const shift = useTransform(sx, [-1, 1], [-14, 14]);

    const onMove = (e) => {
        if (!ref.current) return;
        const r = ref.current.getBoundingClientRect();
        mx.set(((e.clientX - r.left) / r.width) * 2 - 1);
    };

    return (
        <footer ref={ref} onMouseMove={onMove} data-testid="site-footer" className="relative bg-carbon text-precision">
            <div className="container-kchr">
                <div className="flex items-end justify-between pb-6">
                    <p className="micro-label text-warmsteel/50">KCHR STEELS</p>
                    <p className="micro-label text-warmsteel/50">TANDA ROAD / JALANDHAR</p>
                </div>

                <div className="overflow-hidden">
                    <motion.h2
                        style={{ x: shift }}
                        className="footer-logo-crop"
                        initial={{ y: "40%", opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        data-testid="footer-wordmark"
                    >
                        <img src="/assets/kchr-steels-metal-wordmark.png" alt="KCHR STEELS" data-testid="footer-wordmark-image" />
                    </motion.h2>
                </div>

                <div className="footer-links-grid grid gap-12 border-t border-precision/10 pt-12 md:grid-cols-2 lg:grid-cols-4">
                    <div>
                        <p className="micro-label text-bronze">Navigate</p>
                        <ul className="mt-5 space-y-2.5">
                            {navLinks.map((l) => (
                                <li key={l.to}>
                                    <Link
                                        to={l.to}
                                        data-testid={`footer-nav-${l.label.toLowerCase().replace(/\s+/g, "-")}`}
                                        className="text-[15px] text-warmsteel/80 transition-colors duration-300 hover:text-precision"
                                    >
                                        {l.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <p className="micro-label text-bronze">Products</p>
                        <ul className="mt-5 space-y-2.5">
                            {products.map((p) => (
                                <li key={p.slug}>
                                    <Link
                                        to={`/products/${p.slug}`}
                                        data-testid={`footer-product-${p.slug}`}
                                        className="text-[15px] text-warmsteel/80 transition-colors duration-300 hover:text-precision"
                                    >
                                        {p.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <p className="micro-label text-bronze">Contact</p>
                        <address className="mt-5 space-y-2.5 not-italic text-[15px] text-warmsteel/80">
                            {site.addressLines.map((l) => (
                                <p key={l}>{l}</p>
                            ))}
                            {/* Placeholder contacts — replace with live details when provided. */}
                            <p className="pt-2">
                                <a href={site.phoneHref} className="transition-colors duration-300 hover:text-precision" data-testid="footer-phone">
                                    {site.phoneDisplay}
                                </a>
                            </p>
                            <p>
                                <a href={site.emailHref} className="transition-colors duration-300 hover:text-precision" data-testid="footer-email">
                                    {site.emailDisplay}
                                </a>
                            </p>
                        </address>
                    </div>

                    <div className="flex flex-col justify-between gap-8">
                        <p className="max-w-[220px] font-display text-lg font-semibold leading-snug text-precision/90">
                            Built on Steel. Strengthened by Trust.
                        </p>
                        <ul className="space-y-1.5">
                            {annotations.map((a) => (
                                <li key={a} className="micro-label text-warmsteel/40">
                                    {a}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="mt-16 flex flex-wrap items-center justify-between gap-3 border-t border-precision/10 py-7">
                    <span className="micro-label text-warmsteel/45">&copy; KCHR STEELS</span>
                    <span className="micro-label hidden text-warmsteel/45 sm:block">KHAN CHAND HANS RAJ</span>
                    <span className="micro-label text-warmsteel/45">EST. {site.established}</span>
                    <span className="micro-label text-warmsteel/45">JALANDHAR / INDIA</span>
                </div>
            </div>
        </footer>
    );
}
