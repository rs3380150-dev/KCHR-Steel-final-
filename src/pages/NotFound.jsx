import ShapeGraphic from "@/components/ShapeGraphic";
import SteelLine from "@/components/SteelLine";
import { CtaButton } from "@/components/CtaButton";
import { MaskLines, FadeUp } from "@/components/Reveal";
import usePageMeta from "@/hooks/usePageMeta";
import { images } from "@/data/site";

export default function NotFound() {
    usePageMeta("404 — Out of Section | KCHR Steels", "The page you're looking for isn't in our current structure.");
    return (
        <section data-testid="not-found" className="relative flex min-h-[100svh] items-center overflow-hidden bg-carbon text-precision">
            <img src={images.notFound} alt="" aria-hidden="true" className="img-treated absolute inset-0 h-full w-full object-cover opacity-[0.18]" />
            <ShapeGraphic motif="angle" className="pointer-events-none absolute -right-24 bottom-0 w-[50vw] text-precision/[0.07]" strokeWidth={0.5} />
            <div className="container-kchr relative py-32">
                <p className="micro-label text-bronze">ERROR / 404</p>
                <SteelLine className="mt-6 max-w-[420px] text-precision" />
                <MaskLines
                    as="h1"
                    lines={["404", "OUT OF SECTION."]}
                    className="mt-8 font-condensed text-[clamp(4.5rem,14vw,14rem)] font-semibold uppercase leading-[0.86]"
                    delay={0.3}
                />
                <FadeUp delay={0.6}>
                    <p className="mt-8 max-w-[44ch] text-[15px] leading-relaxed text-warmsteel/80">
                        The page you're looking for isn't in our current structure.
                    </p>
                    <div className="mt-10">
                        <CtaButton to="/" dark testId="notfound-return">Return Home</CtaButton>
                    </div>
                </FadeUp>
            </div>
        </section>
    );
}
