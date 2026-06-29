import winnersTrophy from "../../assets/images/winners-trophy.jpg";
import goldAward from "../../assets/images/asset-analytix_Gold-Award-1.jpg";
import solutionAward from "../../assets/images/solution-awards-winner-gold.jpg";

export const sliderData = {
  className: "",
  autoPlay: true,
  interval: 5000,
  showDots: true,
  showArrows: true,
  altFallback: "Slide image",
  slides: [
    {
    src: winnersTrophy.src,
    alt: "Award style reference",
    caption: "Asset Analytix recognition",
  },
  {
    src: goldAward.src,
    alt: "Brand mark",
    caption: "Brand moment",
  },
  {
    src: solutionAward.src,
    alt: "Icon sample",
    caption: "Compact icon sample",
  },
  ],
} as const;

