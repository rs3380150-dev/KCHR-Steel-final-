import { Link } from "react-router-dom";
import PageHero from "@/components/PageHero";
import SectionLabel from "@/components/SectionLabel";
import SteelLine from "@/components/SteelLine";
import ImageReveal from "@/components/ImageReveal";
import { CtaButton, ArrowLink } from "@/components/CtaButton";
import { MaskLines, FadeUp } from "@/components/Reveal";
import usePageMeta from "@/hooks/usePageMeta";
import { routeMeta, images } from "@/data/site";
import { products } from "@/data/products";

const values = [
    { title: "Reliability", copy: "Dependable commercial relationships." },
    { title: "Range", copy: "Multiple forms of steel for varied applications." },
    { title: "Experience", copy: "Decades of familiarity with industrial buying requirements." },
    { title: "Responsiveness", copy: "Practical, direct service for enquiries and supply needs." },
];

export default function About() {
    usePageMeta(routeMeta["/about"].title, routeMeta["/about"].description);
    return (
        <>
            <PageHero
                meta="ABOUT / 1963—PRESENT"
                lines={["Built through decades", "of steel and trust."]}
                image={images.aboutHero}
                imageAlt="Racks of steel bar stock in the KCHR yard"
            />

            <section className="bg-ivory py-24 text-graphite md:py-32">
                <div className="container-kchr grid gap-14 lg:grid-cols-12">
                    <div className="lg:col-span-5">
                        <SectionLabel>THE BUSINESS</SectionLabel>
                        <MaskLines
                            as="h2"
                            lines={["A straightforward", "principle, kept", "since 1963."]}
                            className="mt-8 font-display text-[clamp(2rem,3.6vw,3.4rem)] font-bold leading-[1.06] tracking-[-0.02em]"
                        />
                    </div>
                    <div className="lg:col-span-6 lg:col-start-7">
                        <FadeUp>
                            <p className="text-lg leading-relaxed text-graphite/85 md:text-xl">
                                Khan Chand Hans Raj, known as KCHR Steels, has been associated with the steel trade in Jalandhar since 1963. Over the decades, the business has evolved around a straightforward principle: understand what industry requires and supply dependable steel accordingly.
                            </p>
                            <p className="mt-6 max-w-[62ch] text-[15px] leading-relaxed text-graphite/70 md:text-base">
                                Today, KCHR serves requirements across structural steel, bars and pipes for customers involved in construction, fabrication, engineering, sports equipment, hand tools and agriculture.
                            </p>
                        </FadeUp>
                    </div>
                </div>
            </section>

            <section className="bg-graphite py-24 text-precision md:py-32">
                <div className="container-kchr grid items-center gap-14 lg:grid-cols-12">
                    <FadeUp className="lg:col-span-6">
                        <ImageReveal src={images.aboutRole} alt="Steel stock handled for supply" className="aspect-[4/3] w-full rounded-[2px]" cursor />
                    </FadeUp>
                    <div className="lg:col-span-5 lg:col-start-8">
                        <SectionLabel light>ROLE IN THE SUPPLY CHAIN</SectionLabel>
                        <MaskLines
                            as="h2"
                            lines={["Between mill", "and maker."]}
                            className="mt-8 font-display text-[clamp(2rem,3.6vw,3.4rem)] font-bold leading-[1.06] tracking-[-0.02em]"
                        />
                        <FadeUp delay={0.15}>
                            <p className="mt-6 max-w-[52ch] text-[15px] leading-relaxed text-warmsteel/80 md:text-base">
                                KCHR sits at a practical point in the supply chain — between the rolling mills that produce steel and the fabricators, contractors and manufacturers who use it. Stock is held, enquiries are answered, material is supplied. Dependably, and on speaking terms.
                            </p>
                            <ArrowLink to="/industries" light className="mt-8" testId="about-industries-link">
                                See who we supply
                            </ArrowLink>
                        </FadeUp>
                    </div>
                </div>
            </section>

            <section className="bg-ivory py-24 text-graphite md:py-32">
                <div className="container-kchr">
                    <SectionLabel>VALUES</SectionLabel>
                    <div className="mt-12 grid gap-0 md:grid-cols-2">
                        {values.map((v, i) => (
                            <FadeUp key={v.title} delay={i * 0.07}>
                                <div className="group border-t border-graphite/15 py-8 pr-8 md:py-10" data-testid={`about-value-${i + 1}`}>
                                    <div className="flex items-baseline gap-5">
                                        <span className="micro-label text-bronze">0{i + 1}</span>
                                        <h3 className="font-display text-2xl font-bold tracking-[-0.01em] transition-transform duration-300 group-hover:translate-x-1">{v.title}</h3>
                                    </div>
                                    <p className="mt-3 max-w-[44ch] pl-12 text-[15px] leading-relaxed text-graphite/70">{v.copy}</p>
                                </div>
                            </FadeUp>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-paper py-24 text-graphite md:py-32">
                <div className="container-kchr">
                    <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
                        <div>
                            <SectionLabel>PRODUCT RANGE</SectionLabel>
                            <h2 className="mt-6 max-w-[16ch] font-display text-[clamp(2rem,3.6vw,3.4rem)] font-bold leading-[1.06] tracking-[-0.02em]">
                                One material. Many possibilities.
                            </h2>
                        </div>
                        <ArrowLink to="/products" testId="about-products-link">View all products</ArrowLink>
                    </div>
                    <SteelLine className="mt-12 text-graphite" />
                    <div className="mt-0 grid sm:grid-cols-2 lg:grid-cols-3">
                        {products.map((p, i) => (
                            <Link
                                key={p.slug}
                                to={`/products/${p.slug}`}
                                data-testid={`about-teaser-${p.slug}`}
                                className="group flex items-baseline justify-between border-b border-graphite/15 py-6 pr-6 transition-colors"
                            >
                                <span className="flex items-baseline gap-4">
                                    <span className="micro-label text-bronze">{p.index}</span>
                                    <span className="font-condensed text-2xl font-semibold uppercase transition-transform duration-300 group-hover:translate-x-1">{p.name}</span>
                                </span>
                                <span aria-hidden="true" className="text-bronze transition-transform duration-300 group-hover:translate-x-[3px] group-hover:-translate-y-[2px]">&#8599;</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-carbon py-24 text-precision md:py-32">
                <div className="container-kchr flex flex-col items-start justify-between gap-10 md:flex-row md:items-end">
                    <div>
                        <SectionLabel light>ENQUIRY</SectionLabel>
                        <MaskLines as="h2" lines={["Let's talk steel."]} className="mt-6 font-condensed text-[clamp(3rem,7vw,6.5rem)] font-semibold uppercase leading-[0.92]" />
                    </div>
                    <CtaButton to="/contact" dark testId="about-cta">Send an Enquiry</CtaButton>
                </div>
            </section>
        </>
    );
}
