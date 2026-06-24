/**
 * Theme constants - Colors, spacing, and design tokens
 */

export const colors = {
  // Brand colors
  primary: "#8257E5",
  primaryLight: "#9466FF",

  // Background colors
  bg: {
    dark: "#111111",
    darker: "#0A0A0A",
    card: "#1A1A1A",
    cardHover: "#252525",
    base: "#151515",
    border: "#1f1f1f",
  },

  // Text colors
  text: {
    primary: "#FFFFFF",
    secondary: "#D1D5DB", // gray-300
    muted: "#9CA3AF", // gray-400
  },
} as const;

export const gradients = {
  primary: `linear-gradient(to right, ${colors.primary}, ${colors.primaryLight})`,
  primaryClass: "bg-gradient-to-r from-[#8257E5] to-[#9466FF]",
} as const;

export const shadows = {
  purpleGlow: "0 0 20px rgba(130, 87, 229, 0.5)",
} as const;

export const spacing = {
  section: "py-16",
  container: "container mx-auto px-4",
} as const;
