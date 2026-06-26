/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./templates/**/*.html",
    "./partials/**/*.html",
    "./**/*.html"
  ],
  darkMode: 'class',
  safelist: [
    'bg-cyan-500/10',
    'border-cyan-500/30',
    'text-cyan-500',
    'text-cyan-400',
    'text-cyan-400/70',
    'bg-green-500',
    'bg-red-500',
    'text-white'

  ],
  theme: {
    extend: {
      
      container: {
        center: true,
        padding: {
          DEFAULT: '20px',
          md: '32px'
        }
      },
    },
  },
  plugins: [],
}

