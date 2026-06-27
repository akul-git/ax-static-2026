export const sliderData = {
  className: "",
  autoPlay: true,
  interval: 5000,
  showDots: true,
  showArrows: true,
  altFallback: "Slide image",
  slides: [
    {
      src: "/images/slide-1.jpg",
      alt: "Slide 1",
      caption: "Replace with slide caption",
    },
    {
      src: "/images/slide-2.jpg",
      alt: "Slide 2",
      caption: "Second slide caption",
    },
  ],
} as const;
