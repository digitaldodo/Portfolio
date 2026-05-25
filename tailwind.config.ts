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
        pitch: {
          black: "#0A0A0A",
          charcoal: "#111111",
          smoke: "#1A1A1A"
        },
        rcb: {
          gold: "#D4AF37",
          crimson: "#DC2626"
        }
      },
      fontFamily: {
        heading: ["var(--font-space-grotesk)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"]
      },
      boxShadow: {
        "rcb-glow": "0 0 30px rgba(212, 175, 55, 0.32), 0 0 54px rgba(220, 38, 38, 0.22)"
      }
    }
  },
  plugins: []
} satisfies Config;

export default config;
