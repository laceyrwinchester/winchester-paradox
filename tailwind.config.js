/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        cinzel: ['Cinzel', 'serif'],
        mono: ['Space Mono', 'monospace'],
      },
      colors: {
        void: '#050505',
        cyan: {
          400: '#00d4ff',
          500: '#00b8e6',
        },
        purple: {
          400: '#c77dff',
          500: '#9d4edd',
        },
        gold: {
          400: '#ffd700',
          500: '#e6c200',
        }
      },
      animation: {
        'drift': 'drift 20s ease-in-out infinite',
        'twinkle': 'twinkle 4s ease-in-out infinite',
        'breathe': 'breathe 4s ease-in-out infinite',
      },
      keyframes: {
        drift: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '25%': { transform: 'translate(30px, -30px) scale(1.1)' },
          '50%': { transform: 'translate(-20px, 20px) scale(0.95)' },
          '75%': { transform: 'translate(20px, 30px) scale(1.05)' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.8' },
          '50%': { opacity: '1' },
        },
        breathe: {
          '0%, 100%': { opacity: '0.7', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.02)' },
        },
      },
    },
  },
  plugins: [],
}
