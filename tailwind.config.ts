import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        cyber: {
          dark: "#020617",
          void: "#0f172a",
          emerald: "#10b981",
          cyan: "#06b6d4",
          violet: "#8b5cf6",
        },
      },
      fontFamily: {
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "monospace"],
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "glow-flow": "glow 6s ease-in-out infinite alternate",
      },
      keyframes: {
        glow: {
          "0%": { filter: "drop-shadow(0 0 15px rgba(6, 182, 212, 0.4))" },
          "100%": { filter: "drop-shadow(0 0 35px rgba(16, 185, 129, 0.6))" },
        },
      },
    },
  },
  plugins: [],
};
export default config;

