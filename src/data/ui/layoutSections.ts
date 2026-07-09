export const layoutSections = {
  default: {
    title: "Default Section",
    description: "Standard white section with no clipping shape.",
    variant: "default",
    shape: "none",
    padding: "py-8",
  },

  surface: {
    title: "Surface Section",
    description: "Soft surface background for secondary content blocks.",
    variant: "surface",
    shape: "none",
    padding: "py-8",
  },

  image: {
    title: "Image Section",
    description: "Background image section for visual emphasis.",
    variant: "image",
    shape: "none",
    padding: "py-8",
  },

  dark: {
    title: "Dark Section",
    description: "High-contrast dark section for bold content bands.",
    variant: "dark",
    shape: "none",
    padding: "py-8",
  },

  clipTop: {
    title: "Clip Top",
    description: "Top edge clipped to create an angled entry.",
    variant: "default",
    shape: "clip-top",
    padding: "py-8",
  },

  clipBottom: {
    title: "Clip Bottom",
    description: "Bottom edge clipped to create an angled exit.",
    variant: "default",
    shape: "clip-bottom",
    padding: "py-8",
  },

  rightTopBottomClipped: {
    title: "Right Top-Bottom Clipped",
    description: "Top-right and bottom-right edges clipped for directional flow.",
    variant: "default",
    shape: "right-top-bottom-clipped",
    padding: "py-8",
  },

  leftTopBottomClipped: {
    title: "Left Top-Bottom Clipped",
    description: "Top-left and bottom-left edges clipped for mirrored directional flow.",
    variant: "default",
    shape: "left-top-bottom-clipped",
    padding: "py-8",
  },

  diagonal: {
    title: "Diagonal",
    description: "Legacy alias of left top-bottom clipped profile.",
    variant: "default",
    shape: "diagonal",
    padding: "py-8",
  },

  diagonalReverse: {
    title: "Diagonal Reverse (Flip X)",
    description: "Legacy alias of right top-bottom clipped profile.",
    variant: "default",
    shape: "diagonal-reverse",
    padding: "py-8",
  },
} as const;