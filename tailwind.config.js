/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#0842b8',
          blueHero: '#084cdb',
          blueDark: '#063391',
          red: '#e51919',
          redDark: '#c41414',
          gold: '#f59e0b',
          goldLight: '#fbbf24',
          charcoal: '#f4f7fb',
          card: '#ffffff',
          cardHover: '#f8fafc',
          pageBg: '#f4f7fb',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'system-ui', '-apple-system', 'sans-serif'],
        brand: ['Cinzel', 'serif'],
      },
      animation: {
        marquee: 'marquee 32s linear infinite',
        'pulse-glow': 'pulseGlow 2s infinite',
        'green-pulse': 'greenPulse 2s infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(239, 68, 68, 0.7)' },
          '50%': { boxShadow: '0 0 0 10px rgba(239, 68, 68, 0)' },
        },
        greenPulse: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(16, 185, 129, 0.7)' },
          '50%': { boxShadow: '0 0 0 8px rgba(16, 185, 129, 0)' },
        },
      },
    },
  },
  plugins: [],
};
