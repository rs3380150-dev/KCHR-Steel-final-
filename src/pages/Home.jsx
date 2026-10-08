import HeroSection from "@/sections/HeroSection";
import IntroSection from "@/sections/IntroSection";
import LegacyNumber from "@/sections/LegacyNumber";
import ProductExplorer from "@/sections/ProductExplorer";
import IndustriesSection from "@/sections/IndustriesSection";
import WhyKchr from "@/sections/WhyKchr";
import SupplyJourney from "@/sections/SupplyJourney";
import LegacyTeaser from "@/sections/LegacyTeaser";
import ContactCTA from "@/sections/ContactCTA";
import usePageMeta from "@/hooks/usePageMeta";
import { routeMeta } from "@/data/site";

export default function Home() {
    usePageMeta(routeMeta["/"].title, routeMeta["/"].description);
    return (
        <>
            <HeroSection />
            <IntroSection />
            <LegacyNumber />
            <ProductExplorer />
            <IndustriesSection />
            <WhyKchr />
            <SupplyJourney />
            <LegacyTeaser />
            <ContactCTA />
        </>
    );
}
