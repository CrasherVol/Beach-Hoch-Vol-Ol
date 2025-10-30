/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        sand: '#f4e7c6',
        sunset: '#fb923c',
        coral: '#fb7185',
        sea: '#60a5fa',
        gold: '#fbbf24',
        ink: '#0f172a'
      },
      boxShadow: {
        soft: '0 8px 30px rgba(0,0,0,.12)',
        glow: '0 0 30px rgba(251,146,60,.45)'
      },
      keyframes: {
        sunPulse: {
          '0%,100%': { transform: 'rotate(0deg) scale(1)', filter: 'drop-shadow(0 0 0 rgba(251,191,36,0.0))' },
          '50%': { transform: 'rotate(8deg) scale(1.06)', filter: 'drop-shadow(0 0 32px rgba(251,191,36,0.85))' }
        },
        logoGlow: {
          '0%,100%': { filter: 'drop-shadow(0 0 0 rgba(251,191,36,0))' },
          '50%': { filter: 'drop-shadow(0 0 22px rgba(251,146,60,.75))' }
        }
      },
      animation: {
        sunPulse: 'sunPulse 4s ease-in-out infinite',
        logoGlow: 'logoGlow 3.2s ease-in-out infinite'
      },
      borderRadius: {
        xl2: '1rem',
        xl3: '1.25rem'
      }
    },
  },
  plugins: [],
}
