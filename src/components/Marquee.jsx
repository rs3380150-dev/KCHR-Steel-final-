// Slow editorial marquee — content rendered once, track duplicated (aria-hidden) for seamless loop.
export default function Marquee({ items = [], className = "", textClass = "" }) {
    const Row = ({ hidden }) => (
        <div className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
            {items.map((item, i) => (
                <span key={i} className="flex items-center">
                    <span className={`whitespace-nowrap px-8 ${textClass}`}>{item}</span>
                    <span aria-hidden="true" className="h-[10px] w-[10px] rotate-45 bg-bronze/80" />
                </span>
            ))}
        </div>
    );
    return (
        <div className={`overflow-hidden ${className}`} data-testid="marquee">
            <div className="animate-marquee flex w-max">
                <Row />
                <Row hidden />
            </div>
        </div>
    );
}
