import SectionLabel from "@/components/SectionLabel";
import SteelLine from "@/components/SteelLine";
import ImageReveal from "@/components/ImageReveal";
import { ArrowLink } from "@/components/CtaButton";
import { MaskLines, FadeUp } from "@/components/Reveal";
import { images } from "@/data/site";

export default function IntroSection() {
    return (
        <section data-testid="intro-section" className="bg-ivory py-24 text-graphite md:py-36 lg:py-44">
            <div className="container-kchr">
                <SteelLine className="mb-12 text-graphite" />
                <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
                    <div className="lg:col-span-6">
                        <SectionLabel>01 / KCHR STEELS</SectionLabel>
                        <MaskLines
                            as="h2"
                            lines={["Steel supply built", "on six decades", "of relationships."]}
                            className="mt-8 max-w-[12ch] font-display text-[clamp(2.4rem,4.6vw,4.6rem)] font-bold leading-[1.04] tracking-[-0.02em]"
                        />
                    </div>
                    <div className="flex flex-col justify-end lg:col-span-3">
                        <FadeUp delay={0.1}>
                            <p className="max-w-[52ch] text-[15px] leading-relaxed text-graphite/75 md:text-base">
                                Established in 1963, KCHR Steels supplies iron and structural steel from Jalandhar, Punjab — flats, rounds, TMT, angles, channels and pipes held in stock for industry.
                            </p>
                            <p className="mt-5 max-w-[52ch] text-[15px] leading-relaxed text-graphite/75 md:text-base">
                                Six decades on, the business remains what it has always been: a dependable point of supply for fabricators, contractors and manufacturers who need steel they can build on.
                            </p>
                            <ArrowLink to="/about" className="mt-8" testId="intro-discover-link">
                                Discover our story
                            </ArrowLink>
                        </FadeUp>
                    </div>
                    <FadeUp delay={0.2} className="hidden lg:col-span-3 lg:block">
                        <ImageReveal
                            src={images.intro}
                            alt="Steel bar racks held in stock"
                            className="aspect-[4/5] w-full rounded-[2px]"
                            cursor
                        />
                        <p className="micro-label mt-3 text-graphite/45">STOCK / TANDA ROAD YARD</p>
                    </FadeUp>
                </div>
            </div>
        </section>
    );
}
