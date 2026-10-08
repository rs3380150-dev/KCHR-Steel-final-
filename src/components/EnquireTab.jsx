import { Link, useLocation } from "react-router-dom";

// Restrained sticky utility — becomes a WhatsApp link when a real number is supplied.
export default function EnquireTab() {
    const { pathname } = useLocation();
    if (pathname === "/contact") return null;
    return (
        <Link
            to="/contact"
            data-testid="sticky-enquire-tab"
            className="group fixed bottom-6 right-0 z-[60] hidden rounded-l-[3px] border border-r-0 border-bronze/60 bg-carbon/85 px-3 py-4 backdrop-blur-sm transition-colors duration-300 hover:bg-bronze md:block"
            aria-label="Enquire"
        >
            <span className="micro-label text-precision [writing-mode:vertical-rl]">Enquire &#8599;</span>
        </Link>
    );
}
