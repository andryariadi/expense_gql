import flattenColorPalette from "tailwindcss/lib/util/flattenColorPalette.js";
import svgToDataUri from "mini-svg-data-uri";
import type { Config } from "tailwindcss";
import type { PluginAPI } from "tailwindcss/types/config";

/** Konfigurasi Tailwind CSS dalam format TypeScript */
const config: Config = {
  content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}", "./src/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        dark: {
          background: "#DB2777", // Warna hitam untuk mode gelap
        },
      },
    },
  },
  plugins: [
    addVariablesForColors,
    function ({ matchUtilities, theme }: PluginAPI) {
      matchUtilities(
        {
          "bg-grid": (value: string) => ({
            backgroundImage: `url("${svgToDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`)}")`,
          }),
          "bg-grid-small": (value: string) => ({
            backgroundImage: `url("${svgToDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="8" height="8" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`)}")`,
          }),
          "bg-dot": (value: string) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="none"><circle fill="${value}" id="pattern-circle" cx="10" cy="10" r="1.6257413380501518"></circle></svg>`
            )}")`,
          }),
        },
        { values: flattenColorPalette(theme("backgroundColor")), type: "color" }
      );
    },
  ],
};

/**
 * Plugin untuk menambahkan setiap warna Tailwind sebagai variabel CSS global.
 * Contoh: var(--gray-200)
 */
function addVariablesForColors({ addBase, theme }: { addBase: (styles: Record<string, Record<string, string>>) => void; theme: (path: string) => Record<string, string> }): void {
  // Extract and flatten the color palette
  const allColors = flattenColorPalette(theme("colors"));

  // Create CSS variables from the flattened colors
  const newVars = Object.fromEntries(Object.entries(allColors).map(([key, val]) => [`--${key}`, val]));

  // Add the CSS variables to the base styles
  addBase({
    ":root": newVars,
  });
}

export default config;
