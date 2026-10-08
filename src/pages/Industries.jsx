import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import PageHero from "@/components/PageHero";
import SectionLabel from "@/components/SectionLabel";
import SteelLine from "@/components/SteelLine";
import ImageReveal from "@/components/ImageReveal";
import { CtaButton, ArrowLink } from "@/components/CtaButton";
import { MaskLines, FadeUp } from "@/components/Reveal";
import usePageMeta from "@/hooks/usePageMeta";
import { routeMeta } from "@/data/site";
import { industries } from "@/data/industries";
import { products } from "@/data/products";

const productByName = Object.fromEntries(products.map((p) => [p.name, p]));

export default function Industries() {
    usePageMeta(routeMeta["/industries"].title, routeMeta["/industries"].description);
    const { hash } = useLocation();

    useEffect(() => {
        if (!hash) return;
        const el = document.getElementById(hash.slice(1));
        if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 700);
    }, [hash]);

    return (
        <>
            <PageHero
                meta="INDUSTRIES / APPLICATION"
                lines={["Steel goes further", "when it serves purpose."]}
                intro="Steel only matters in use. KCHR supply supports the builders, makers and manufacturers working across the region."
            />

            <section className="bg-ivory py-24 text-graphite md:py-32">
                <div className="container-kchr">
                    <SteelLine className="text-graphite" />
                    {industries.map((ind, i) => (
                        <div key={ind.slug} id={ind.slug} data-testid={`industry-section-${ind.slug}`} className="grid gap-10 py-16 md:py-20 lg:grid-cols-12">
                            <div className="lg:col-span-4">
                                <div className="lg:sticky lg:top-32">
                                    <FadeUp>
                                        <span className="micro-label text-bronze">{ind.index} / INDUSTRY</span>
                                        <h2 className="mt-5 font-condensed text-[clamp(2.6rem,4.6vw,4.4rem)] font-semibold uppercase leading-[0.94]">{ind.name}</h2>
                                        <SteelLine className="mt-6 max-w-[200px]" />
                                    </FadeUp>
                                </div>
                            </div>
                            <FadeUp delay={0.1} className={i % 2 ? "lg:col-span-6 lg:col-start-7" : "lg:col-span-6 lg:col-start-6"}>
                                <ImageReveal src={ind.image} alt={`${ind.name} — steel in application`} className="aspect-[16/10] w-full rounded-[2px]" cursor />
                                <p className="mt-6 max-w-[54ch] text-[15px] leading-relaxed text-graphite/75 md:text-base">{ind.description}</p>
                                <div className="mt-6 flex flex-wrap items-center gap-2.5">
                                    <span className="micro-label mr-2 text-graphite/45">RELEVANT STEEL</span>
                                    {ind.relevant.map((r) => {
                                        const p = productByName[r];
                                        return p ? (
                                            <Link key={r} to={`/products/${p.slug}`} data-testid={`industry-product-${p.slug}`} className="rounded-[2px] border border-graphite/20 px-3 py-1.5 text-[12px] tracking-[0.08em] text-graphite/75 transition-colors duration-300 hover:border-bronze hover:text-bronze">
                                                {r}
                                            </Link>
                                        ) : null;
                                    })}
                                </div>
                            </FadeUp>
                        </div>
                    ))}
                </div>
            </section>

            <section className="bg-carbon py-24 text-precision md:py-32">
                <div className="container-kchr flex flex-col items-start justify-between gap-10 md:flex-row md:items-end">
                    <div>
                        <SectionLabel light>ENQUIRY</SectionLabel>
                        <MaskLines as="h2" lines={["Tell us what", "you're building."]} className="mt-6 font-condensed text-[clamp(2.8rem,6.5vw,6rem)] font-semibold uppercase leading-[0.92]" />
                    </div>
                    <CtaButton to="/contact" dark testId="industries-cta">Send an Enquiry</CtaButton>
                </div>
            </section>
        </>
    );
}
