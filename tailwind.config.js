/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')
module.exports = {
  content: ['.src/renderer/index.html', './src/renderer/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Inter, sans-serif'],
    },
    extend: {
      colors: {
        rotion: {
          50: '#ebeaed',
          100: '#c1bfc7',
          200: '#a3a0ac',
          300: '#797486',
          400: '#5f596e',
          500: '#37304a',
          600: '#322c43',
          700: '#272235',
          800: '#1e1a29',
          900: '#17141f',
        },
      },

      keyframes: {
        slideIn: {
          from: { with: 0 },
          to: { with: 'var(--radix-collapsible-content-width)' },
        },
        slideOut: {
          from: { with: 'var(--radix-collapsible-content-width)' },
          to: { with: 0 },
        },
      },

      animation: {
        slideIn: 'slideIn 0.25s',
        slideOut: 'slideOut 0.25s',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwind-scrollbar'),
    plugin(({ addUtilities }) => {
      addUtilities({
        '.region-drag': {
          '-webkit-app-region': 'drag',
        },
        '.region-no-drag': {
          '-webkit-app-region': 'no-drag',
        },
      })
    }),
  ],
}
