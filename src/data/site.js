// Site-wide constants. Phone / email are clearly-marked editable placeholders —
// replace with KCHR's live contact details when provided.
export const site = {
    name: "KCHR STEELS",
    formalName: "Khan Chand Hans Raj",
    established: "1963",
    addressLines: ["KCHR Steels", "Tanda Road", "Opp. KMV College", "Jalandhar, Punjab"],
    // TODO: replace placeholders with the company's actual phone number and email.
    phoneDisplay: "+91 XXXXX XXXXX",
    phoneHref: "tel:+910000000000",
    emailDisplay: "enquiries@kchrsteels.in",
    emailHref: "mailto:enquiries@kchrsteels.in",
    tagline: "Built on Steel. Strengthened by Trust.",
    coordinates: "31.3260° N / 75.5762° E",
};

export const navLinks = [
    { label: "Home", to: "/" },
    { label: "About", to: "/about" },
    { label: "Products", to: "/products" },
    { label: "Industries", to: "/industries" },
    { label: "Legacy", to: "/legacy" },
    { label: "Contact", to: "/contact" },
];

export const marqueeItems = [
    "Iron",
    "Structural",
    "Industrial",
    "Est. 1963",
    "Jalandhar",
    "Punjab",
];

export const annotations = [
    "MATERIAL / STEEL",
    "FORM / STRUCTURAL",
    "SUPPLY / INDUSTRIAL",
    "LOCATION / JALANDHAR",
];

export const images = {
    hero: "https://images.unsplash.com/photo-1697281679321-a9ce55ce0a8f?q=80&w=2200&auto=format&fit=crop",
    intro: "https://images.unsplash.com/photo-1763926025477-423847028860?q=80&w=1400&auto=format&fit=crop",
    bridge: "https://images.unsplash.com/photo-1493476523860-a6de6ce1b0c3?q=80&w=2200&auto=format&fit=crop",
    aboutHero: "https://images.unsplash.com/photo-1763926025678-95d196d0ab28?q=80&w=2200&auto=format&fit=crop",
    aboutRole: "https://images.unsplash.com/photo-1620388640785-892616248ec8?q=80&w=1600&auto=format&fit=crop",
    legacyTexture: "https://images.unsplash.com/photo-1612529517647-ae42d841fdb1?q=80&w=1600&auto=format&fit=crop",
    ctaBg: "https://images.unsplash.com/photo-1557592494-37448a3f4b11?q=80&w=2000&auto=format&fit=crop",
    notFound: "https://images.unsplash.com/photo-1695987196855-3770e1f1a100?q=80&w=2000&auto=format&fit=crop",
};

// Route meta configuration — static frontend SEO.
export const routeMeta = {
    "/": {
        title: "KCHR Steels | Iron & Structural Steel Supplier in Jalandhar",
        description:
            "KCHR Steels (Khan Chand Hans Raj) supplies iron and structural steel — flats, rounds, TMT, angles, channels and pipes — from Jalandhar, Punjab. Established 1963.",
    },
    "/about": {
        title: "About KCHR Steels | Since 1963",
        description:
            "Khan Chand Hans Raj, known as KCHR Steels, has been associated with the steel trade in Jalandhar since 1963 — a supplier built on six decades of relationships.",
    },
    "/products": {
        title: "Steel Products | KCHR Steels",
        description:
            "Flat bars, round bars, TMT bars, angles, channels and MS pipes — a focused range of iron and structural steel supplied from Jalandhar, Punjab.",
    },
    "/industries": {
        title: "Industries Served | KCHR Steels",
        description:
            "Construction, general engineering, sports & gym equipment, hand tools, agriculture and fabrication — industries KCHR Steels supplies from Jalandhar.",
    },
    "/legacy": {
        title: "Legacy | KCHR Steels Est. 1963",
        description:
            "Six decades of steel supply from Jalandhar. The KCHR Steels story — foundation, relationships, range and the way of doing business since 1963.",
    },
    "/contact": {
        title: "Contact & Enquiry | KCHR Steels",
        description:
            "Discuss product requirements, availability and supply enquiries with KCHR Steels — Tanda Road, Opp. KMV College, Jalandhar, Punjab.",
    },
};
