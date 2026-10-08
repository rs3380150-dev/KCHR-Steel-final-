import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import SectionLabel from "@/components/SectionLabel";
import SteelLine from "@/components/SteelLine";
import ShapeGraphic from "@/components/ShapeGraphic";
import { ArrowLink } from "@/components/CtaButton";
import { MaskLines, FadeUp } from "@/components/Reveal";
import { EASE } from "@/components/motionPresets";
import { products } from "@/data/products";

export default function ProductExplorer() {
    const [active, setActive] = useState(0);
    const product = products[active];

    return (
        <section data-testid="product-explorer" className="bg-graphite py-24 text-precision md:py-36">
            <div className="container-kchr">
                <SectionLabel light>02 / PRODUCT SYSTEM</SectionLabel>
                <MaskLines
                    as="h2"
                    lines={["Steel in the forms", "industry demands."]}
                    className="mt-8 max-w-[14ch] font-display text-[clamp(2.4rem,4.6vw,4.6rem)] font-bold leading-[1.04] tracking-[-0.02em]"
                />

                {/* Desktop explorer */}
                <div className="mt-16 hidden gap-10 lg:grid lg:grid-cols-12">
                    <div className="relative col-span-7">
                        <ShapeGraphic motif={product.motif} className="absolute -left-6 -top-6 z-0 h-[62%] w-[62%] text-precision/[0.07]" strokeWidth={1} />
                        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[2px] bg-forge" data-cursor="view" data-testid="product-explorer-stage">
                            <AnimatePresence>
                                <motion.img
                                    key={product.slug}
                                    src={product.image}
                                    alt={`${product.name} — ${product.shortDescription}`}
                                    className="img-treated absolute inset-0 h-full w-full object-cover"
                                    initial={{ opacity: 0, scale: 1.06 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.7, ease: EASE }}
                                />
                            </AnimatePresence>
                            <div className="absolute inset-0 bg-gradient-to-t from-carbon/60 via-transparent to-transparent" />
                            <div className="absolute bottom-5 left-5 flex items-center gap-3">
                                <span className="font-condensed text-4xl font-semibold text-precision">{product.index}</span>
                                <span className="micro-label text-warmsteel/80">/ 0{products.length}</span>
                            </div>
                        </div>
                    </div>

                    <div className="col-span-5">
                        {products.map((p, i) => (
                            <div key={p.slug} className="border-t border-precision/12 last:border-b">
                                <button
                                    type="button"
                                    onMouseEnter={() => setActive(i)}
                                    onFocus={() => setActive(i)}
                                    onClick={() => setActive(i)}
                                    data-testid={`product-explorer-item-${p.slug}`}
                                    aria-pressed={active === i}
                                    className="group flex w-full items-baseline gap-5 py-5 text-left"
                                >
                                    <span className={`micro-label transition-all duration-300 group-hover:translate-x-1 ${active === i ? "text-bronze" : "text-warmsteel/45"}`}>{p.index}</span>
                                    <span className={`font-condensed text-4xl font-semibold uppercase leading-none transition-all duration-300 ${active === i ? "translate-x-1 text-precision" : "text-warmsteel/55 group-hover:text-warmsteel"}`}>
                                        {p.name}
                                    </span>
                                </button>
                                <AnimatePresence initial={false}>
                                    {active === i && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.45, ease: EASE }}
                                            className="overflow-hidden"
                                        >
                                            <div className="pb-7 pl-14 pr-2">
                                                <p className="max-w-[44ch] text-[15px] leading-relaxed text-warmsteel/85">{p.shortDescription}</p>
                                                <div className="mt-4 flex flex-wrap gap-2">
                                                    {p.applications.slice(0, 3).map((a) => (
                                                        <span key={a} className="rounded-[2px] border border-precision/15 px-2.5 py-1 text-[11px] tracking-[0.08em] text-warmsteel/70">
                                                            {a}
                                                        </span>
                                                    ))}
                                                </div>
                                                <ArrowLink to={`/products/${p.slug}`} light className="mt-5" testId={`product-explorer-view-${p.slug}`}>
                                                    View Product
                                                </ArrowLink>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Mobile / tablet stacked blocks */}
                <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:hidden">
                    {products.map((p) => (
                        <FadeUp key={p.slug} className="group">
                            <Link to={`/products/${p.slug}`} data-testid={`product-mobile-${p.slug}`} data-cursor="view" className="block">
                                <div className="relative aspect-[4/3] overflow-hidden rounded-[2px] bg-forge">
                                    <img src={p.image} alt={p.name} loading="lazy" className="img-treated h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                                    <span className="absolute left-4 top-4 micro-label rounded-[2px] bg-carbon/70 px-2 py-1 text-warmsteel">{p.index}</span>
                                </div>
                                <h3 className="mt-4 font-condensed text-3xl font-semibold uppercase">{p.name}</h3>
                                <p className="mt-1.5 text-sm leading-relaxed text-warmsteel/80">{p.shortDescription}</p>
                            </Link>
                            <ArrowLink to={`/products/${p.slug}`} light className="mt-3" testId={`product-mobile-link-${p.slug}`}>
                                View Product
                            </ArrowLink>
                        </FadeUp>
                    ))}
                </div>
            </div>
        </section>
    );
}
