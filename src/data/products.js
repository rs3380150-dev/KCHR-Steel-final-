// KCHR product content — frontend data only. No backend, no inventory claims.
const u = (id, w = 1600) =>
    `https://images.unsplash.com/${id}?q=80&w=${w}&auto=format&fit=crop`;

export const products = [
    {
        slug: "flat-bars",
        index: "01",
        name: "Flat Bars",
        motif: "flat",
        image: u("photo-1763926025680-7966e45e48f5"),
        visual: u("photo-1763926062529-1edf8664c366", 2000),
        shortDescription:
            "Versatile flat steel sections suited to fabrication, engineering and structural applications.",
        overview:
            "Flat bars are the workhorse of the fabrication yard — a simple rectangular section that cuts, bends and welds without fuss. KCHR holds flat bars in a working range of widths and thicknesses for everyday industrial use.",
        applications: [
            "Fabrication",
            "Frames & supports",
            "General engineering",
            "Tools & equipment components",
        ],
        industries: ["Fabrication", "General Engineering", "Hand Tools", "Agriculture"],
    },
    {
        slug: "round-bars",
        index: "02",
        name: "Round Bars",
        motif: "round",
        image: u("photo-1666634157070-6fd830fb5672"),
        visual: u("photo-1740209475472-aa7d280f7452", 2000),
        shortDescription:
            "Solid circular steel sections for machining, tools, equipment and general engineering.",
        overview:
            "Solid circular sections valued for their strength in machining and component work. From shafts to fasteners, round bars from KCHR supply feed workshops across the region.",
        applications: [
            "Machining",
            "Shafts & components",
            "Equipment manufacturing",
            "Tools & fabrication",
        ],
        industries: ["General Engineering", "Sports & Gym Equipment", "Hand Tools", "Fabrication"],
    },
    {
        slug: "tmt-bars",
        index: "03",
        name: "TMT Bars",
        motif: "tmt",
        image: u("photo-1623428454598-1bfe414bac03"),
        visual:
            "https://images.pexels.com/photos/46167/iron-rods-reinforcing-bars-rods-steel-bars-46167.jpeg?auto=compress&cs=tinysrgb&w=1600",
        shortDescription:
            "Reinforcement steel for concrete structures and construction applications.",
        overview:
            "Ribbed reinforcement steel that bonds with concrete to carry structural load. A core category for construction supply, held in consistent stock for builders and contractors.",
        applications: ["RCC reinforcement", "Structural construction", "Concrete applications"],
        industries: ["Construction", "Fabrication"],
    },
    {
        slug: "angles",
        index: "04",
        name: "Angles",
        motif: "angle",
        image: u("photo-1651890318280-c5e35ef92f85"),
        visual: u("photo-1598302936625-6075fbd98dd7", 2000),
        shortDescription: "Structural L-sections used across frames, supports and fabrication.",
        overview:
            "The L-shaped section that does quiet structural work everywhere — frames, bracing, supports and edging. Supplied for fabrication and construction requirements of every scale.",
        applications: ["Frames", "Supports", "Fabrication", "Structural applications"],
        industries: ["Construction", "Fabrication", "General Engineering", "Agriculture"],
    },
    {
        slug: "channels",
        index: "05",
        name: "Channels",
        motif: "channel",
        image: u("photo-1702388247780-fedec1db0b5d"),
        visual: u("photo-1593012672078-abaa5ef8acc0", 2000),
        shortDescription:
            "Structural channel sections for frameworks, supports and engineering applications.",
        overview:
            "C-shaped sections that carry load efficiently in frames and structures. Channels from KCHR supply serve framework, support and general engineering needs.",
        applications: ["Frameworks", "Supports", "Industrial structures", "Construction"],
        industries: ["Construction", "General Engineering", "Fabrication"],
    },
    {
        slug: "ms-pipes",
        index: "06",
        name: "MS Pipes",
        motif: "pipe",
        image: u("photo-1605600659873-d808a13e4d2a"),
        visual: u("photo-1721622045835-51a5447f281c", 2000),
        shortDescription:
            "Mild-steel tubular sections for fabrication, structures and industrial use.",
        overview:
            "Tubular mild-steel sections for structures, frames and general industrial use. Held in bundled stock and supplied for fabrication and construction requirements.",
        applications: ["Structures", "Fabrication", "Frames", "General industrial use"],
        industries: ["Construction", "General Engineering", "Sports & Gym Equipment", "Agriculture"],
    },
];

export const getProduct = (slug) => products.find((p) => p.slug === slug);
