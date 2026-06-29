export type TitleLine = {
  text: string;
  variant?: "brand" | "accent";
};

export type ButtonData = {
  href: string;
  label: string;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg" | "xl";
};

export type CardData = {
  eyebrow?: string;
  title: TitleLine[];
  description?: string;
  button?: ButtonData;
};