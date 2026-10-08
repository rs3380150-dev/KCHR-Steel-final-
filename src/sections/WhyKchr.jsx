import SectionLabel from "@/components/SectionLabel";
import SteelLine from "@/components/SteelLine";
import { MaskLines, FadeUp } from "@/components/Reveal";

const points = [
    {
        title: "Six-Decade Legacy",
        copy: "Established in 1963 with longstanding involvement in the steel trade.",
    },
    {
        title: "Diverse Product Range",
        copy: "Multiple steel forms serving fabrication, construction and engineering applications.",
    },
    {
        title: "Industry-Oriented Supply",
        copy: "Supporting varied industrial and commercial requirements.",
    },
    {
        title: "Relationships That Last",
        copy: "Service built on reliability, responsiveness and long-term business relationships.",
    },
];

export default function WhyKchr() {
    return (
        <section data-testid="why-kchr-section" className="bg-ivory py-24 text-graphite md:py-36">
            <div className="container-kchr">
                <SectionLabel>04 / WHY KCHR</SectionLabel>
                <div className="mt-10 grid gap-14 lg:grid-cols-12">
                    <div className="lg:col-span-5">
                        <MaskLines
                            as="h2"
                            lines={["WHY", "KCHR"]}
                            className="font-display text-[clamp(3.4rem,7vw,7.5rem)] font-extrabold leading-[0.94] tracking-[-0.02em]"
                        />
                        <SteelLine className="mt-10 max-w-[280px]" />
                    </div>
                    <div className="lg:col-span-6 lg:col-start-7">
                        {points.map((p, i) => (
                            <FadeUp key={p.title} delay={i * 0.08}>
                                <div className="group border-t border-graphite/15 py-7 first:border-t-0 first:pt-0 md:first:pt-2" data-testid={`why-point-${i + 1}`}>
                                    <div className="flex items-baseline gap-6">
                                        <span className="micro-label text-bronze">0{i + 1}</span>
                                        <div>
                                            <h3 className="font-display text-xl font-bold tracking-[-0.01em] md:text-2xl">{p.title}</h3>
                                            <p className="mt-2 max-w-[52ch] text-[15px] leading-relaxed text-graphite/70">{p.copy}</p>
                                        </div>
                                    </div>
                                </div>
                            </FadeUp>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
