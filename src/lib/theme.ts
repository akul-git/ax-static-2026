// src/lib/theme.ts

/**
 * ------------------------------------------------------------
 * Typography
 * ------------------------------------------------------------
 */

export const titleVariants = {
  brand: "text-brand",
  primary: "text-accent",
  accent: "text-accent",
} as const;

export const linkVariants = {
  brand: "text-brand hover:text-accent",
  accent: "text-accent hover:text-brand",
} as const;

/**
 * ------------------------------------------------------------
 * Buttons
 * ------------------------------------------------------------
 */

export const buttonVariants = {
  primary: "bg-accent text-white hover:bg-brand",

  secondary:
    "border border-brand bg-brand text-white hover:bg-brand/90 hover:text-white",

  outline:
    "border border-accent bg-transparent text-accent hover:bg-accent hover:text-white",
} as const;

export const buttonSizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-3 text-base",
  lg: "px-7 py-4 text-lg",
  xl: "px-9 py-5 text-xl",
} as const;