import { Link } from "react-router-dom";
import SectionLabel from "@/components/SectionLabel";
import { MaskLines, FadeUp } from "@/components/Reveal";
import { industries } from "@/data/industries";

// Hover-expand rows on desktop; static image-led stack on mobile.
export default function IndustriesSection() {
    return (
        <section data-testid="industries-section" className="bg-carbon py-24 text-precision md:py-36">
            <div className="container-kchr">
                <SectionLabel light>03 / INDUSTRIES</SectionLabel>
                <div className="mt-8 flex flex-col justify-between gap-6 md:flex-row md:items-end">
                    <MaskLines
                        as="h2"
                        lines={["Built into the", "industries around us."]}
                        className="max-w-[14ch] font-display text-[clamp(2.4rem,4.6vw,4.6rem)] font-bold leading-[1.04] tracking-[-0.02em]"
                    />
                    <FadeUp delay={0.15}>
                        <p className="max-w-[40ch] text-[15px] leading-relaxed text-warmsteel/75">
                            From construction sites to workshop benches — steel supplied for the work that has to hold.
                        </p>
                    </FadeUp>
                </div>

                <div className="ind-rows mt-16 hidden lg:block" data-testid="industry-rows">
                    {industries.map((ind) => (
                        <Link
                            key={ind.slug}
                            to={`/industries#${ind.slug}`}
                            data-testid={`industry-row-${ind.slug}`}
                            data-cursor="view"
                            className="ind-row group relative block overflow-hidden border-t border-precision/12 last:border-b"
                        >
                            <div className="absolute inset-y-0 right-0 w-[46%] opacity-0 transition-opacity duration-700 ease-kchr group-hover:opacity-100">
                                <img src={ind.image} alt="" loading="lazy" className="img-treated h-full w-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-r from-carbon via-carbon/35 to-transparent" />
                            </div>
                            <div className="relative z-10 flex items-center justify-between gap-6 py-9 transition-all duration-500 ease-kchr group-hover:px-5">
                                <div className="flex items-baseline gap-6">
                                    <span className="micro-label text-bronze">{ind.index}</span>
                                    <h3 className="font-condensed text-[2.6rem] font-semibold uppercase leading-none transition-transform duration-500 ease-kchr group-hover:translate-x-3">
                                        {ind.name}
                                    </h3>
                                </div>
                                <div className="flex items-center gap-8">
                                    <p className="max-w-[36ch] text-right text-sm leading-relaxed text-warmsteel/0 transition-colors duration-500 group-hover:text-warmsteel/80">
                                        {ind.description}
                                    </p>
                                    <span aria-hidden="true" className="text-bronze opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100 -translate-x-3 text-xl">
                                        &#8599;
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:hidden" data-testid="industry-cards-mobile">
                    {industries.map((ind) => (
                        <FadeUp key={ind.slug} className="group">
                            <Link to={`/industries#${ind.slug}`} data-testid={`industry-card-mobile-${ind.slug}`} className="block">
                                <div className="relative aspect-[16/10] overflow-hidden rounded-[2px]">
                                    <img src={ind.image} alt={ind.name} loading="lazy" className="img-treated h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-carbon/80 to-transparent" />
                                    <h3 className="absolute bottom-4 left-4 font-condensed text-3xl font-semibold uppercase">{ind.name}</h3>
                                </div>
                                <p className="mt-3 text-sm leading-relaxed text-warmsteel/75">{ind.description}</p>
                            </Link>
                        </FadeUp>
                    ))}
                </div>
            </div>
        </section>
    );
}
