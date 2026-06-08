import type { Config } from "tailwindcss";

const config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        surface: {
          black: "#0A0A0A",
          charcoal: "#111111",
          smoke: "#1A1A1A"
        },
        brand: {
          gold: "#D4AF37",
          crimson: "#DC2626"
        }
      },
      fontFamily: {
        heading: ["var(--font-space-grotesk)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"]
      },
      boxShadow: {
        "premium-glow": "0 18px 56px rgba(0, 0, 0, 0.32)"
      }
    }
  },
  plugins: []
} satisfies Config;

export default config;
