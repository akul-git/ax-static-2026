export const testimonials = [
  {
    title: "Advanced Skill Development!",
    quote:
      "My team who have never been trained in FMEA or RCM were actually doing it in our second session and they didn’t even know it.",
    rating: 5,
    role: "Manager of Reliability",
    author: "Petro Chem",
  },
  {
    title: "Connecting the Dots",
    quote:
      "The measures framework is the most intuitive process that tied EVERYTHING together. For the first time we can see the relationships in all we do.",
    rating: 5,
    role: "Dir. of Maintenance Excellence",
    author: "Pharmaceuticals",
  },
  {
    title: "Reporting – Super Charged!",
    quote:
      "Your team provided all the missing pieces in our reporting and analytics project, helping our IT team and accelerating our results.",
    rating: 5,
    role: "Asset Manager",
    author: "Water Reclamation",
  },
] as const;

export type Testimonial = (typeof testimonials)[number];