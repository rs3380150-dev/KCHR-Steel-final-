/** @type {import('tailwindcss').Config} */
module.exports = {
    blocklist: ["overline"],
    darkMode: ["class"],
    content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
    theme: {
        extend: {
            colors: {
                graphite: "#101315",
                carbon: "#080A0B",
                forge: "#1B2023",
                warmsteel: "#AEB3B5",
                ivory: "#EEEAE2",
                paper: "#F6F3ED",
                precision: "#F5F6F4",
                bronze: { DEFAULT: "#A9643A", deep: "#714128" },
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                primary: { DEFAULT: "hsl(var(--primary))", foreground: "hsl(var(--primary-foreground))" },
                secondary: { DEFAULT: "hsl(var(--secondary))", foreground: "hsl(var(--secondary-foreground))" },
                muted: { DEFAULT: "hsl(var(--muted))", foreground: "hsl(var(--muted-foreground))" },
                accent: { DEFAULT: "hsl(var(--accent))", foreground: "hsl(var(--accent-foreground))" },
                destructive: { DEFAULT: "hsl(var(--destructive))", foreground: "hsl(var(--destructive-foreground))" },
                card: { DEFAULT: "hsl(var(--card))", foreground: "hsl(var(--card-foreground))" },
                popover: { DEFAULT: "hsl(var(--popover))", foreground: "hsl(var(--popover-foreground))" },
            },
            fontFamily: {
                display: ["Everett", "sans-serif"],
                condensed: ["Everett", "sans-serif"],
                body: ["Everett", "sans-serif"],
            },
            transitionTimingFunction: {
                kchr: "cubic-bezier(0.16, 1, 0.3, 1)",
            },
        },
    },
    plugins: [],
};
