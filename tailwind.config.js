/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Playful Learning Core Theme Palette
        playful: {
          cream: '#FFF9F0',       // Warm cream (Main page background)
          cobalt: '#315CEB',      // Cobalt blue (Primary actions, links, active states)
          'cobalt-hover': '#2649C2',
          'cobalt-light': '#EBF0FD',
          coral: '#FF8066',       // Coral (Highlights, friendly illustrations, selected accents)
          'coral-light': '#FFF0ED',
          'coral-dark': '#E0654C',
          yellow: '#F5C94B',      // Sunny yellow (Learning highlights, badges, discoveries)
          'yellow-light': '#FEF9EB',
          'yellow-dark': '#D9A927',
          mint: '#A8E6CF',        // Mint (Positive feedback, learning progress, supportive accents)
          'mint-light': '#F0FAF6',
          'mint-dark': '#247D5C',
          white: '#FFFFFF',       // White (Cards, panels, formula surfaces)
          'dark-ink': '#26324B',  // Dark ink (Primary text)
          'muted-ink': '#667085', // Muted ink (Secondary text and descriptions)
          'soft-border': '#E8E5DE', // Soft border (Card outlines and separators)
          'soft-border-hover': '#D8D4CA',
        },
        // Mapped brand aliases for backward-compatible component classes
        brand: {
          50: '#EBF0FD',
          100: '#D6E2FC',
          200: '#ADC4F9',
          300: '#7FA2F5',
          400: '#537FF0',
          500: '#315CEB', // Cobalt blue
          600: '#2649C2',
          700: '#1D389E',
          800: '#162A77',
          900: '#101D53',
          950: '#0B1336',
        },
        navy: {
          800: '#1E293B',
          850: '#172033',
          900: '#0F172A',
          950: '#26324B', // Dark ink
        },
      },
      boxShadow: {
        'playful-sm': '0 2px 8px -1px rgba(38, 50, 75, 0.05), 0 1px 3px -1px rgba(38, 50, 75, 0.03)',
        'playful': '0 8px 24px -4px rgba(38, 50, 75, 0.06), 0 2px 6px -1px rgba(38, 50, 75, 0.03)',
        'playful-lg': '0 16px 32px -6px rgba(38, 50, 75, 0.08), 0 4px 12px -2px rgba(38, 50, 75, 0.04)',
        'playful-cobalt': '0 8px 20px -4px rgba(49, 92, 235, 0.35)',
        'playful-coral': '0 8px 20px -4px rgba(255, 128, 102, 0.35)',
        'playful-yellow': '0 8px 20px -4px rgba(245, 201, 75, 0.35)',
        'playful-mint': '0 8px 20px -4px rgba(168, 230, 207, 0.35)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['Fira Code', 'JetBrains Mono', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      }
    },
  },
  plugins: [],
}
