import { sliderData } from "./ui/slider";

export const slides = sliderData.slides;

export const sliderConfig = {
  autoPlay: sliderData.autoPlay,
  interval: sliderData.interval,
  showDots: sliderData.showDots,
  showArrows: sliderData.showArrows,
  altFallback: sliderData.altFallback,
} as const;
