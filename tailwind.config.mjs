export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  safelist: [
    // ProjectCard: grid column count driven by PROJECT_CARD_COLUMNS constant
    "md:grid-cols-4",
    // ProjectCard: text position 1-4
    "md:order-1",
    "md:order-2",
    "md:order-3",
    "md:order-4",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#F5F4F0",
        surface: "#ECEAE4",
        muted: "#B0ADA6",
        body: "#4A4845",
        heading: "#2C2A27",
        accent: "#6B6863",
      },
    },
  },
  plugins: [],
};
