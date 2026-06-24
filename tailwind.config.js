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
      keyframes: {
        'slide-left': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-100%)' },
        },
        typing: {
          "0%": {
            width: "0%",
            visibility: "hidden"
          },
          "100%": {
            width: "100%"
          }
        },
        blink: {
          "50%": {
            borderColor: "transparent"
          },
          "100%": {
            borderColor: "white"
          }
        }
      },
      animation: {
        'slide-left-infinite': 'slide-left 6s linear infinite',
        typing: "typing 2.5s steps(20) infinite alternate, blink .7s infinite"
      },
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

