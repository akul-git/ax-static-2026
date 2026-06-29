// export const cardData = {
//   className: "",
//   cards: [
//     {
//       eyebrow: "Category",
//       title: "Card title",
//       description: "Replace this card description with final copy.",
//       href: "/",
//       linkLabel: "Learn more",
//       className: "",
//     },
//     {
//       eyebrow: "Category",
//       title: "Second card",
//       description: "Use additional cards as needed.",
//       href: "/",
//       linkLabel: "Explore",
//       className: "",
//     },
//   ],
// } as const;

export const cards = [
  {
    eyebrow: "Data, Structure, and Usage",

    title: [
      {
        text: "CMMS Program",
        variant: "brand",
      },
      {
        text: "Optimization",
        variant: "accent",
      },
    ],

    description:
      "We evaluate data quality, process gaps, and governance so your CMMS drives measurable reliability gains.",

    href: "/solutions/cmms-data-optimization",
    //  button:{
    //     href:"/solutions/cmms-data-optimization",
    //     label:"Learn More",
    //     variant:"primary",
    //     size:"sm",
    // },
  },

  {
    eyebrow: "Training",

    title: [
      {
        text: "Reliability",
        variant: "brand",
      },
      {
        text: "Academy",
        variant: "accent",
      },
    ],

    description:
      "Practical workshops and coaching for maintenance professionals.",

    href: "/training",
  },

  {
    eyebrow: "Consulting",

    title: [
      {
        text: "Asset",
        variant: "brand",
      },
      {
        text: "Reliability",
        variant: "accent",
      },
    ],

    description:
      "Develop maintenance strategies that improve equipment reliability.",

    href: "/consulting",
  },

  {
    eyebrow: "Assessment",

    title: [
      {
        text: "Performance",
        variant: "brand",
      },
      {
        text: "Assessment",
        variant: "accent",
      },
    ],

    description:
      "Evaluate maintenance maturity and identify opportunities for improvement.",

    href: "/assessment",
  },
];

export const standaloneCard = {
  eyebrow: "Custom Card Slot",
  title: [
    {
      text: "Precision EAM",
      variant: "brand",
    },
    {
      text: "Assessments",
      variant: "accent",
    },
  ],
  description:
    "Slot content still works for fully custom card markup where needed.",
  href: "/solutions/precision-eam-assessments",
  linkLabel: "Learn more",
} as const;

export const wmo = {
  eyebrow: "CIMPROVE THE VELOCITY OF WORKFLOW",
  title: [
    {
      text: "Work Management",
      variant: "brand",
    },
    {
      text: "Optimization",
      variant: "accent",
    },
  ],
  description:
    "Our process identifies and analyzes the velocity of workflow and manageable items that limit your effectiveness and efficiency with results that lower the overall costs of your maintenance & reliability efforts.",
  linkLabel: "Learn more",
} as const;


