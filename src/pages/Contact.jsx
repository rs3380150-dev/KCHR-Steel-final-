import PageHero from "@/components/PageHero";
import EnquiryForm from "@/components/EnquiryForm";
import SectionLabel from "@/components/SectionLabel";
import SteelLine from "@/components/SteelLine";
import { MaskLines, FadeUp } from "@/components/Reveal";
import usePageMeta from "@/hooks/usePageMeta";
import { routeMeta, site } from "@/data/site";

// Static map placeholder — technical-drawing style, no external API. Replace
// with an embedded map later if desired.
function MapPlaceholder() {
    return (
        <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-[2px] border border-graphite/20 bg-paper text-graphite/25" data-testid="contact-map-placeholder">
            <div className="tech-grid absolute inset-0 text-graphite/20" />
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                    <span className="relative block h-4 w-4 rotate-45 border-2 border-bronze" />
                    <span className="h-px w-24 bg-bronze/60" />
                </div>
            </div>
            <span className="micro-label absolute left-4 top-3 text-graphite/50">TANDA ROAD / OPP. KMV COLLEGE</span>
            <span className="micro-label absolute bottom-3 right-4 text-graphite/50">{site.coordinates}</span>
        </div>
    );
}

export default function Contact() {
    usePageMeta(routeMeta["/contact"].title, routeMeta["/contact"].description);
    return (
        <>
            <PageHero
                meta="CONTACT / ENQUIRY"
                lines={["What do", "you need?"]}
                intro="Tell us the steel product and requirement. Our team can take the conversation forward."
            />

            <section data-testid="contact-section" className="bg-ivory text-graphite">
                <div className="container-kchr grid gap-16 py-24 md:py-32 lg:grid-cols-12">
                    <div className="lg:col-span-5">
                        <SectionLabel>DIRECT</SectionLabel>
                        <MaskLines
                            as="h2"
                            lines={["Speak to", "the yard."]}
                            className="mt-8 font-display text-[clamp(2rem,3.4vw,3.2rem)] font-bold leading-[1.06] tracking-[-0.02em]"
                        />
                        <FadeUp delay={0.1}>
                            <address className="mt-10 space-y-1 not-italic">
                                {site.addressLines.map((l) => (
                                    <p key={l} className="text-[15px] leading-relaxed text-graphite/80">{l}</p>
                                ))}
                            </address>
                            <SteelLine className="mt-8 max-w-[280px]" />
                            <div className="mt-8 space-y-2">
                                {/* Placeholder contacts — replace with live details when provided. */}
                                <p>
                                    <a href={site.phoneHref} data-testid="contact-phone" className="font-display text-lg font-semibold transition-colors duration-300 hover:text-bronze">{site.phoneDisplay}</a>
                                </p>
                                <p>
                                    <a href={site.emailHref} data-testid="contact-email" className="text-[15px] text-graphite/75 transition-colors duration-300 hover:text-bronze">{site.emailDisplay}</a>
                                </p>
                            </div>
                            <MapPlaceholder />
                        </FadeUp>
                    </div>

                    <div className="lg:col-span-6 lg:col-start-7">
                        <FadeUp delay={0.15}>
                            <div className="flex items-center justify-between">
                                <p className="micro-label text-bronze">ENQUIRY FORM</p>
                                <p className="micro-label text-graphite/40">FRONTEND DEMO</p>
                            </div>
                            <SteelLine className="mb-10 mt-5" />
                            <EnquiryForm />
                        </FadeUp>
                    </div>
                </div>
            </section>
        </>
    );
}
