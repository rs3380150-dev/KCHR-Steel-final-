// Abstract line silhouettes for each steel section — used large, at 10-20% opacity.
const shapes = {
    flat: (
        <path d="M18 42 H82 V58 H18 Z" />
    ),
    round: <circle cx="50" cy="50" r="27" />,
    tmt: (
        <g>
            <circle cx="50" cy="50" r="22" />
            {Array.from({ length: 16 }).map((_, i) => {
                const a = (i * Math.PI * 2) / 16;
                const x1 = 50 + Math.cos(a) * 27;
                const y1 = 50 + Math.sin(a) * 27;
                const x2 = 50 + Math.cos(a) * 33;
                const y2 = 50 + Math.sin(a) * 33;
                return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
            })}
        </g>
    ),
    angle: <path d="M28 20 H40 V74 H76 V86 H28 Z" />,
    channel: <path d="M32 20 H74 V33 H45 V67 H74 V80 H32 Z" />,
    pipe: (
        <g>
            <circle cx="50" cy="50" r="29" />
            <circle cx="50" cy="50" r="15" />
        </g>
    ),
};

export default function ShapeGraphic({ motif, className = "", strokeWidth = 1.5 }) {
    return (
        <svg
            viewBox="0 0 100 100"
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            className={className}
            aria-hidden="true"
        >
            {shapes[motif] || shapes.flat}
        </svg>
    );
}
