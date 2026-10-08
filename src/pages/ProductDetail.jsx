import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import SectionLabel from "@/components/SectionLabel";
import SteelLine from "@/components/SteelLine";
import ShapeGraphic from "@/components/ShapeGraphic";
import ImageReveal from "@/components/ImageReveal";
import { CtaButton, ArrowLink } from "@/components/CtaButton";
import { MaskLines, FadeUp } from "@/components/Reveal";
import usePageMeta from "@/hooks/usePageMeta";
import { EASE } from "@/components/motionPresets";
import { getProduct, products } from "@/data/products";
import NotFound from "./NotFound";

export default function ProductDetail() {
    const { slug } = useParams();
    const product = getProduct(slug);
    usePageMeta(
        product ? `${product.name} | KCHR Steels` : "Product | KCHR Steels",
        product ? `${product.name} — ${product.shortDescription} Supplied by KCHR Steels, Jalandhar.` : ""
    );
    if (!product) return <NotFound />;

    const idx = products.findIndex((p) => p.slug === product.slug);
    const next = products[(idx + 1) % products.length];

    return (
        <>
            {/* Hero split */}
            <section data-testid="product-hero" className="relative overflow-hidden bg-graphite pb-20 pt-[76px] text-precision md:pb-28 md:pt-[100px]">
                <ShapeGraphic motif={product.motif} className="pointer-events-none absolute -left-24 top-1/2 hidden w-[46vw] -translate-y-1/2 text-precision/[0.06] lg:block" strokeWidth={0.6} />
                <div className="container-kchr relative grid items-center gap-12 lg:grid-cols-12">
                    <div className="lg:col-span-6">
                        <motion.p className="micro-label text-bronze" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE, delay: 0.35 }}>
                            KCHR / {product.index} / {product.name.toUpperCase()}
                        </motion.p>
                        <SteelLine className="mt-6 max-w-[420px] text-precision" delay={0.2} />
                        <MaskLines
                            lines={product.name.split(" ")}
                            className="mt-8 font-condensed text-[clamp(3.6rem,8vw,8.5rem)] font-semibold uppercase leading-[0.88]"
                            delay={0.35}
                        />
                        <FadeUp delay={0.65}>
                            <p className="mt-8 max-w-[46ch] text-[15px] leading-relaxed text-warmsteel/80 md:text-base">{product.shortDescription}</p>
                        </FadeUp>
                    </div>
                    <div className="lg:col-span-6">
                        <ImageReveal src={product.image} alt={`${product.name} supplied by KCHR Steels`} className="aspect-[4/3] w-full rounded-[2px]" delay={0.3} cursor eager />
                    </div>
                </div>
            </section>

            {/* Overview */}
            <section className="bg-ivory py-24 text-graphite md:py-32">
                <div className="container-kchr grid gap-12 lg:grid-cols-12">
                    <div className="lg:col-span-4">
                        <SectionLabel>OVERVIEW</SectionLabel>
                        <MaskLines as="h2" lines={["The section", "that shows up."]} className="mt-8 font-display text-[clamp(1.9rem,3.2vw,3rem)] font-bold leading-[1.06] tracking-[-0.02em]" />
                    </div>
                    <FadeUp className="lg:col-span-6 lg:col-start-6" delay={0.1}>
                        <p className="text-lg leading-relaxed text-graphite/85 md:text-xl">{product.overview}</p>
                    </FadeUp>
                </div>
            </section>

            {/* Applications + industries */}
            <section className="bg-graphite py-24 text-precision md:py-32">
                <div className="container-kchr grid gap-16 lg:grid-cols-12">
                    <div className="lg:col-span-6">
                        <SectionLabel light>COMMON APPLICATIONS</SectionLabel>
                        <ul className="mt-10">
                            {product.applications.map((a, i) => (
                                <FadeUp key={a} delay={i * 0.06} as="li">
                                    <span className="flex items-baseline gap-5 border-t border-precision/12 py-5 last:border-b" data-testid={`application-${i + 1}`}>
                                        <span aria-hidden="true" className="mt-1 inline-block h-1.5 w-1.5 shrink-0 rotate-45 bg-bronze" />
                                        <span className="font-condensed text-2xl font-semibold uppercase md:text-3xl">{a}</span>
                                    </span>
                                </FadeUp>
                            ))}
                        </ul>
                    </div>
                    <div className="lg:col-span-5 lg:col-start-8">
                        <SectionLabel light>INDUSTRIES</SectionLabel>
                        <div className="mt-10 flex flex-wrap gap-3">
                            {product.industries.map((ind, i) => (
                                <FadeUp key={ind} delay={i * 0.06}>
                                    <Link
                                        to="/industries"
                                        data-testid={`industry-tag-${ind.toLowerCase().replace(/[^a-z]+/g, "-")}`}
                                        className="inline-block rounded-[2px] border border-precision/20 px-4 py-2.5 font-display text-[12px] font-semibold uppercase tracking-[0.14em] text-warmsteel transition-colors duration-300 hover:border-bronze hover:text-precision"
                                    >
                                        {ind}
                                    </Link>
                                </FadeUp>
                            ))}
                        </div>
                        <FadeUp delay={0.3}>
                            <div className="mt-12 border-l-2 border-bronze pl-6">
                                <p className="micro-label text-warmsteel/60">NEXT FORM</p>
                                <Link to={`/products/${next.slug}`} data-testid="product-next-link" className="group mt-2 inline-flex items-baseline gap-4">
                                    <span className="font-condensed text-4xl font-semibold uppercase transition-colors duration-300 group-hover:text-bronze">{next.name}</span>
                                    <span aria-hidden="true" className="text-bronze transition-transform duration-300 group-hover:translate-x-[3px] group-hover:-translate-y-[2px]">&#8599;</span>
                                </Link>
                            </div>
                        </FadeUp>
                    </div>
                </div>
            </section>

            {/* Product visual */}
            <section className="bg-carbon">
                <div className="container-kchr py-24 md:py-32" data-testid="product-visual">
                    <FadeUp>
                        <div className="flex items-center justify-between pb-6">
                            <p className="micro-label text-warmsteel/50">PRODUCT VISUAL</p>
                            <p className="micro-label text-warmsteel/50">FIG. {product.index}</p>
                        </div>
                        <ImageReveal src={product.visual} alt={`${product.name} in application`} className="aspect-[21/9] w-full rounded-[2px]" parallax cursor />
                    </FadeUp>
                </div>
            </section>

            {/* Requirement CTA */}
            <section className="bg-ivory py-24 text-graphite md:py-32">
                <div className="container-kchr flex flex-col items-start justify-between gap-10 md:flex-row md:items-end">
                    <div>
                        <SectionLabel>REQUIREMENT</SectionLabel>
                        <MaskLines as="h2" lines={["Looking for", "this product?"]} className="mt-6 font-display text-[clamp(2.2rem,4vw,4rem)] font-bold leading-[1.03] tracking-[-0.02em]" />
                        <p className="mt-5 max-w-[46ch] text-[15px] leading-relaxed text-graphite/70">
                            Discuss sizes, quantities and availability directly with the KCHR team.
                        </p>
                    </div>
                    <div className="flex flex-col items-start gap-5">
                        <CtaButton to={`/contact?product=${product.slug}`} testId="product-detail-cta">Discuss Your Requirement</CtaButton>
                        <ArrowLink to="/products" testId="product-back-link">All products</ArrowLink>
                    </div>
                </div>
            </section>
        </>
    );
}
