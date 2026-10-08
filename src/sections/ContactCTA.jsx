import SectionLabel from "@/components/SectionLabel";
import { CtaButton, ArrowLink } from "@/components/CtaButton";
import { MaskLines, FadeUp } from "@/components/Reveal";
import SteelLine from "@/components/SteelLine";
import { site } from "@/data/site";

export default function ContactCTA() {
    return (
        <section data-testid="contact-cta" className="relative overflow-hidden bg-carbon py-28 text-precision md:py-40">
            <div className="container-kchr relative">
                <SectionLabel light>ENQUIRY</SectionLabel>
                <MaskLines
                    as="h2"
                    lines={["LET'S TALK", <>STEEL<span className="text-bronze">.</span></>]}
                    className="mt-8 font-condensed text-[clamp(3.6rem,11vw,11rem)] font-semibold uppercase leading-[0.9]"
                />
                <FadeUp delay={0.2}>
                    <p className="mt-8 max-w-[48ch] text-[15px] leading-relaxed text-warmsteel/80 md:text-base">
                        Discuss product requirements, availability and supply enquiries with KCHR Steels.
                    </p>
                    <div className="mt-10 flex flex-wrap items-center gap-6">
                        <CtaButton to="/contact" dark testId="contact-cta-enquiry">
                            Send an Enquiry
                        </CtaButton>
                        {/* TODO: replace placeholder number with the company's live phone number. */}
                        <a
                            href={site.phoneHref}
                            data-testid="contact-cta-call"
                            className="group inline-flex items-center gap-2 font-display text-[13px] font-semibold uppercase tracking-[0.16em] text-precision"
                        >
                            <span className="relative">
                                Call KCHR
                                <span aria-hidden="true" className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-[0.35] bg-bronze transition-transform duration-300 ease-kchr group-hover:scale-x-100" />
                            </span>
                            <span aria-hidden="true" className="text-bronze transition-transform duration-300 group-hover:translate-x-[3px] group-hover:-translate-y-[2px]">&#8599;</span>
                        </a>
                    </div>
                    <SteelLine className="mt-14 max-w-[560px] text-precision" />
                    <p className="micro-label mt-6 text-warmsteel/50">
                        TANDA ROAD, OPP. KMV COLLEGE &bull; JALANDHAR, PUNJAB &bull; {site.coordinates}
                    </p>
                </FadeUp>
            </div>
        </section>
    );
}
