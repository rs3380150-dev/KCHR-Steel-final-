import SectionLabel from "@/components/SectionLabel";
import ImageReveal from "@/components/ImageReveal";
import { ArrowLink } from "@/components/CtaButton";
import { MaskLines, FadeUp } from "@/components/Reveal";
import { images } from "@/data/site";

export default function LegacyTeaser() {
    return (
        <section data-testid="legacy-teaser" className="bg-paper py-24 text-graphite md:py-36">
            <div className="container-kchr grid items-center gap-14 lg:grid-cols-12">
                <div className="lg:col-span-7">
                    <SectionLabel>SINCE 1963</SectionLabel>
                    <MaskLines
                        as="h2"
                        lines={["More than a date.", "A way of doing business."]}
                        className="mt-8 max-w-[16ch] font-display text-[clamp(2.4rem,4.6vw,4.6rem)] font-bold leading-[1.04] tracking-[-0.02em]"
                    />
                    <FadeUp delay={0.15}>
                        <p className="mt-8 max-w-[58ch] text-[15px] leading-relaxed text-graphite/75 md:text-base">
                            Businesses in the steel trade are built one delivery at a time. Since 1963, KCHR has grown the same way — through kept promises, straightforward dealing and steel that shows up as described.
                        </p>
                        <ArrowLink to="/legacy" className="mt-9" testId="legacy-teaser-link">
                            Explore the Legacy
                        </ArrowLink>
                    </FadeUp>
                </div>
                <FadeUp delay={0.2} className="lg:col-span-4 lg:col-start-9">
                    <div className="border border-graphite/15 p-3" data-testid="legacy-texture-frame">
                        <ImageReveal
                            src={images.legacyTexture}
                            alt="Oxidised steel surface — patina built over decades"
                            className="aspect-[4/5] w-full rounded-[2px]"
                            cursor
                        />
                        <p className="micro-label mt-3 flex justify-between text-graphite/45">
                            <span>FIG. 01</span>
                            <span>OXIDISED SURFACE</span>
                        </p>
                    </div>
                </FadeUp>
            </div>
        </section>
    );
}
