/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        codechef: {
          50: '#fff8f1',
          100: '#feeedc',
          200: '#fcd9b7',
          300: '#f9bd86',
          400: '#f59651',
          500: '#f17429',
          600: '#d9531e',
          700: '#b43b1c',
          800: '#90301d',
          900: '#5B2C1A',
        },
        brand: {
          dark: '#0B0F19',
          card: '#121827',
          cardHover: '#1B2337',
          border: '#1F293D',
          accent: '#FF7A00',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 10px rgba(241, 116, 41, 0.2)' },
          '100%': { boxShadow: '0 0 25px rgba(241, 116, 41, 0.6)' },
        },
      },
    },
  },
  plugins: [],
}
