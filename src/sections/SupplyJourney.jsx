import { motion } from "framer-motion";
import SectionLabel from "@/components/SectionLabel";
import SteelLine from "@/components/SteelLine";
import { MaskLines, FadeUp } from "@/components/Reveal";
import { EASE } from "@/components/motionPresets";

const steps = [
    { n: "01", title: "Rolling Mills", copy: "Steel sourced from established rolling mills." },
    { n: "02", title: "KCHR Stock & Supply", copy: "Held in stock at Jalandhar, ready when requirement calls." },
    { n: "03", title: "Fabricators / Contractors / Industry", copy: "Supplied to the people who build, make and manufacture." },
];

export default function SupplyJourney() {
    return (
        <section data-testid="supply-journey" className="bg-graphite py-24 text-precision md:py-36">
            <div className="container-kchr">
                <SectionLabel light>05 / SUPPLY</SectionLabel>
                <MaskLines
                    as="h2"
                    lines={["From mill to site,", "one dependable chain."]}
                    className="mt-8 max-w-[16ch] font-display text-[clamp(2.4rem,4.6vw,4.6rem)] font-bold leading-[1.04] tracking-[-0.02em]"
                />

                <div className="relative mt-20">
                    {/* The chain line — draws across on scroll */}
                    <div className="absolute left-0 right-0 top-[7px] hidden h-px bg-precision/15 md:block">
                        <motion.div className="h-px bg-bronze" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 1.6, ease: EASE }} style={{ transformOrigin: "left" }} />
                    </div>
                    <div className="absolute bottom-0 left-[7px] top-0 w-px bg-precision/15 md:hidden">
                        <motion.div className="w-px bg-bronze" initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 1.6, ease: EASE }} style={{ transformOrigin: "top", height: "100%" }} />
                    </div>

                    <div className="grid gap-14 md:grid-cols-3 md:gap-10">
                        {steps.map((s, i) => (
                            <div key={s.n} className="relative pl-10 md:pl-0" data-testid={`supply-step-${i + 1}`}>
                                <motion.span className="absolute left-0 top-0 block h-[15px] w-[15px] rotate-45 border border-bronze bg-graphite md:relative md:mb-10" initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.5, ease: EASE, delay: 0.3 + i * 0.35 }} />
                                <FadeUp delay={0.45 + i * 0.35}>
                                    <span className="micro-label text-bronze">{s.n}</span>
                                    <h3 className="mt-3 font-condensed text-3xl font-semibold uppercase leading-none md:text-4xl">{s.title}</h3>
                                    <p className="mt-3 max-w-[36ch] text-[15px] leading-relaxed text-warmsteel/75">{s.copy}</p>
                                </FadeUp>
                            </div>
                        ))}
                    </div>
                </div>
                <SteelLine className="mt-20 text-precision" />
            </div>
        </section>
    );
}
