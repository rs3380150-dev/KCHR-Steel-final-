import { Link } from "react-router-dom";

// Custom interaction — rectangular, bronze wipe from bottom, arrow drift. No pills.
export function CtaButton({
    to,
    href,
    onClick,
    children,
    dark = false,
    type,
    className = "",
    testId,
}) {
    const cls = `group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-[3px] border px-8 py-4 transition-colors duration-300 ${
        dark
            ? "border-precision/30 text-precision hover:border-bronze"
            : "border-graphite/30 text-graphite hover:border-bronze"
    } ${className}`;
    const inner = (
        <>
            <span
                aria-hidden="true"
                className="absolute inset-0 translate-y-full bg-bronze transition-transform duration-[350ms] ease-kchr group-hover:translate-y-0"
            />
            <span className="relative z-10 font-display text-[13px] font-semibold uppercase tracking-[0.16em] transition-transform duration-300 group-hover:translate-x-[3px]">
                {children}
            </span>
            <span
                aria-hidden="true"
                className="relative z-10 text-bronze transition-all duration-300 group-hover:translate-x-[3px] group-hover:-translate-y-[2px] group-hover:text-precision"
            >
                &#8599;
            </span>
        </>
    );
    if (to)
        return (
            <Link to={to} className={cls} data-testid={testId}>
                {inner}
            </Link>
        );
    if (href)
        return (
            <a href={href} className={cls} data-testid={testId}>
                {inner}
            </a>
        );
    return (
        <button type={type || "button"} onClick={onClick} className={cls} data-testid={testId}>
            {inner}
        </button>
    );
}

// Secondary text link with animated underline + diagonal arrow.
export function ArrowLink({ to, href, children, light = false, className = "", testId }) {
    const cls = `group relative inline-flex items-center gap-2 font-display text-[13px] font-semibold uppercase tracking-[0.16em] ${
        light ? "text-precision" : "text-graphite"
    } ${className}`;
    const inner = (
        <>
            <span className="relative">
                {children}
                <span
                    aria-hidden="true"
                    className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-[0.35] bg-bronze transition-transform duration-300 ease-kchr group-hover:scale-x-100"
                />
            </span>
            <span
                aria-hidden="true"
                className="text-bronze transition-transform duration-300 ease-kchr group-hover:translate-x-[3px] group-hover:-translate-y-[2px]"
            >
                &#8599;
            </span>
        </>
    );
    if (to)
        return (
            <Link to={to} className={cls} data-testid={testId}>
                {inner}
            </Link>
        );
    return (
        <a href={href} className={cls} data-testid={testId}>
            {inner}
        </a>
    );
}
