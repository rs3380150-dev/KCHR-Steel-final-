import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import PageHero from "@/components/PageHero";
import SectionLabel from "@/components/SectionLabel";
import SteelLine from "@/components/SteelLine";
import { CtaButton } from "@/components/CtaButton";
import { MaskLines, FadeUp } from "@/components/Reveal";
import usePageMeta from "@/hooks/usePageMeta";
import { routeMeta, images } from "@/data/site";

// Eras — no fabricated dates. 1963 remains the only fixed historical fact.
const eras = [
    { n: "01", title: "Foundation", copy: "1963. A business begins on Tanda Road, Jalandhar — built on the conviction that a fair deal, honestly kept, outlasts any contract." },
    { n: "02", title: "Relationships", copy: "The steel trade runs on trust built over years of consistent supply. Many of the relationships that shaped KCHR were formed decades ago — and continue today." },
    { n: "03", title: "Product Range", copy: "From a focused beginning, the range grew to cover the forms industry asks for — flats, rounds, TMT, angles, channels and pipes." },
    { n: "04", title: "Industry", copy: "As Jalandhar's workshops and construction grew, KCHR supply followed — into fabrication units, equipment makers and building sites across the region." },
    { n: "05", title: "Today", copy: "KCHR continues as a family-run supplier — holding stock, answering enquiries directly and supplying steel for the work that has to hold." },
];

export default function Legacy() {
    usePageMeta(routeMeta["/legacy"].title, routeMeta["/legacy"].description);
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start center", "end center"] });
    const progress = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });

    return (
        <>
            <PageHero
                meta="LEGACY / 1963 → TODAY"
                lines={["Six decades.", "One material.", "Countless relationships."]}
                intro="A story told without embellishment — because the material speaks plainly."
            />

            <section ref={ref} data-testid="legacy-eras" className="relative bg-paper py-24 text-graphite md:py-32">
                {/* progressing steel line */}
                <div className="absolute left-0 right-0 top-0 h-[2px] bg-graphite/10">
                    <motion.div className="h-[2px] origin-left bg-bronze" style={{ scaleX: progress }} data-testid="legacy-progress-line" />
                </div>
                <div className="container-kchr">
                    <div className="grid gap-16 lg:grid-cols-12">
                        <div className="lg:col-span-4">
                            <div className="lg:sticky lg:top-32">
                                <SectionLabel>SINCE 1963</SectionLabel>
                                <p aria-hidden="true" className="mt-8 select-none font-condensed text-[clamp(6rem,13vw,13rem)] font-semibold leading-[0.8] text-graphite/10">
                                    63
                                </p>
                                <p className="mt-6 max-w-[36ch] text-[15px] leading-relaxed text-graphite/70">
                                    Structured around eras, not invented milestones — only what six decades of supply can honestly claim.
                                </p>
                            </div>
                        </div>
                        <div className="lg:col-span-7 lg:col-start-6">
                            {eras.map((era, i) => (
                                <FadeUp key={era.n} delay={0.02}>
                                    <div className="border-t border-graphite/15 py-10 first:border-t-0 first:pt-0 md:py-12" data-testid={`legacy-era-${era.n}`}>
                                        <div className="flex items-baseline gap-6">
                                            <span className="micro-label text-bronze">{era.n}</span>
                                            <h2 className="font-condensed text-4xl font-semibold uppercase md:text-5xl">{era.title}</h2>
                                        </div>
                                        <p className="mt-5 max-w-[58ch] pl-12 text-[15px] leading-relaxed text-graphite/75 md:text-base">{era.copy}</p>
                                    </div>
                                </FadeUp>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-graphite py-24 text-precision md:py-32">
                <div className="container-kchr grid items-center gap-14 lg:grid-cols-12">
                    <div className="lg:col-span-6">
                        <SectionLabel light>THE MATERIAL REMEMBERS</SectionLabel>
                        <MaskLines
                            as="h2"
                            lines={["Steel keeps", "its history", "on the surface."]}
                            className="mt-8 font-display text-[clamp(2rem,3.6vw,3.4rem)] font-bold leading-[1.06] tracking-[-0.02em]"
                        />
                        <FadeUp delay={0.15}>
                            <p className="mt-6 max-w-[52ch] text-[15px] leading-relaxed text-warmsteel/80 md:text-base">
                                Every bar that leaves the yard carries the same standard expected since 1963 — honest material, fairly supplied. The rest is continuity.
                            </p>
                        </FadeUp>
                    </div>
                    <FadeUp delay={0.2} className="lg:col-span-5 lg:col-start-8">
                        <div className="border border-precision/15 p-3">
                            <img src={images.legacyTexture} alt="Oxidised steel surface" loading="lazy" className="img-treated aspect-[4/3] w-full rounded-[2px] object-cover" />
                            <p className="micro-label mt-3 flex justify-between text-warmsteel/45">
                                <span>FIG. 02</span>
                                <span>MILL SURFACE</span>
                            </p>
                        </div>
                    </FadeUp>
                </div>
            </section>

            <section className="bg-carbon py-24 text-precision md:py-32">
                <div className="container-kchr flex flex-col items-start justify-between gap-10 md:flex-row md:items-end">
                    <div>
                        <SectionLabel light>NEXT</SectionLabel>
                        <MaskLines as="h2" lines={["Continue the story", "with an enquiry."]} className="mt-6 font-condensed text-[clamp(2.6rem,6vw,5.6rem)] font-semibold uppercase leading-[0.92]" />
                    </div>
                    <CtaButton to="/contact" dark testId="legacy-cta">Send an Enquiry</CtaButton>
                </div>
            </section>
        </>
    );
}
