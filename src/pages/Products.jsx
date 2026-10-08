import { Link } from "react-router-dom";
import PageHero from "@/components/PageHero";
import SteelLine from "@/components/SteelLine";
import { CtaButton } from "@/components/CtaButton";
import { FadeUp } from "@/components/Reveal";
import usePageMeta from "@/hooks/usePageMeta";
import { routeMeta } from "@/data/site";
import { products } from "@/data/products";

export default function Products() {
    usePageMeta(routeMeta["/products"].title, routeMeta["/products"].description);
    return (
        <>
            <PageHero
                meta="PRODUCTS / STEEL IN FORM"
                lines={["One material.", "Many possibilities."]}
                intro="KCHR Steels supplies a focused range of iron and structural steel products for construction, manufacturing, fabrication and general engineering."
            />

            <section className="bg-ivory py-24 text-graphite md:py-32">
                <div className="container-kchr">
                    <SteelLine className="text-graphite" />
                    {products.map((p, i) => (
                        <FadeUp key={p.slug} delay={0.02}>
                            <Link
                                to={`/products/${p.slug}`}
                                data-testid={`products-index-${p.slug}`}
                                data-cursor="view"
                                className="group relative block border-b border-graphite/15 py-8 md:py-10"
                            >
                                <div className="hidden md:block">
                                    <div className="pointer-events-none absolute right-[16%] top-1/2 z-10 w-[300px] -translate-y-1/2 opacity-0 transition-all duration-500 ease-kchr group-hover:opacity-100 group-hover:scale-[1.02]">
                                        <img src={p.image} alt="" loading="lazy" className="img-treated aspect-[4/3] w-full rounded-[2px] object-cover" />
                                    </div>
                                </div>
                                <div className="grid items-baseline gap-3 md:grid-cols-12">
                                    <span className="micro-label text-bronze md:col-span-1">{p.index} /</span>
                                    <h2 className="font-condensed text-5xl font-semibold uppercase leading-[0.95] transition-transform duration-500 ease-kchr group-hover:translate-x-2 md:col-span-4 md:text-6xl">
                                        {p.name}
                                    </h2>
                                    <p className="max-w-[44ch] text-[15px] leading-relaxed text-graphite/70 md:col-span-5">{p.shortDescription}</p>
                                    <div className="flex items-center justify-between md:col-span-2 md:justify-end md:gap-8">
                                        <span className="hidden text-[13px] tracking-[0.08em] text-graphite/50 lg:block">{p.applications[0].toUpperCase()}</span>
                                        <span aria-hidden="true" className="text-2xl text-bronze transition-transform duration-300 group-hover:translate-x-[4px] group-hover:-translate-y-[3px]">&#8599;</span>
                                    </div>
                                </div>
                            </Link>
                        </FadeUp>
                    ))}
                    <div className="mt-16 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
                        <p className="max-w-[46ch] text-[15px] leading-relaxed text-graphite/70">
                            Looking for a specific size or application? Enquire directly — requirements are answered by people who know the stock.
                        </p>
                        <CtaButton to="/contact" testId="products-cta">Discuss Your Requirement</CtaButton>
                    </div>
                </div>
            </section>
        </>
    );
}
