// Industry / application content — frontend data only.
const u = (id, w = 1600) =>
    `https://images.unsplash.com/${id}?q=80&w=${w}&auto=format&fit=crop`;

export const industries = [
    {
        slug: "construction",
        index: "01",
        name: "Construction",
        image: u("photo-1785227988608-b47fb703256f", 2000),
        description:
            "Reinforcement and structural steel for builders and contractors — material that arrives when the schedule needs it.",
        relevant: ["TMT Bars", "Angles", "Channels", "MS Pipes", "Flat Bars"],
    },
    {
        slug: "general-engineering",
        index: "02",
        name: "General Engineering",
        image: u("photo-1740209475472-aa7d280f7452", 2000),
        description:
            "Bar steel and sections for machine builders and precision workshops, supplied to the sizes the job demands.",
        relevant: ["Round Bars", "Flat Bars", "Angles", "MS Pipes"],
    },
    {
        slug: "sports-gym-equipment",
        index: "03",
        name: "Sports & Gym Equipment",
        image: u("photo-1521805103424-d8f8430e8933", 2000),
        description:
            "Steel sections and bars supporting equipment manufacturers across Jalandhar's industrial ecosystem.",
        relevant: ["Round Bars", "MS Pipes", "Flat Bars"],
    },
    {
        slug: "hand-tools",
        index: "04",
        name: "Hand Tools",
        image: u("photo-1633419946251-6d8b5dd33170", 2000),
        description:
            "Bar steel and sections for the makers of hand tools and hardware — supplied grade after grade, order after order.",
        relevant: ["Round Bars", "Flat Bars", "Angles"],
    },
    {
        slug: "agriculture",
        index: "05",
        name: "Agriculture",
        image: u("photo-1602446692855-6d096499f69b", 2000),
        description:
            "Steel inputs for agricultural equipment and field fabrication, priced and packed for the trade.",
        relevant: ["Flat Bars", "Angles", "MS Pipes", "Round Bars"],
    },
    {
        slug: "fabrication",
        index: "06",
        name: "Fabrication",
        image: u("photo-1598302936625-6075fbd98dd7", 2000),
        description:
            "Everyday steel forms for fabrication workshops of every scale — the stock behind the workshop bench.",
        relevant: ["Angles", "Flat Bars", "Channels", "MS Pipes", "Round Bars"],
    },
];
