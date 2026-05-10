/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#252C37',
          hover:   '#1a2130',
          light:   '#3a4455',
        },
        accent: {
          DEFAULT: '#F8C61E',
          hover:   '#e0b015',
          light:   '#fff8dc',
        },
        surface: {
          DEFAULT: '#F2F4F7',
          card:    '#FFFFFF',
        },
        muted: '#6B7280',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        card:    '0 2px 16px rgba(0,0,0,0.05)',
        'card-hover': '0 12px 36px rgba(0,0,0,0.1)',
        primary: '0 4px 20px rgba(37,44,55,0.25)',
        accent:  '0 4px 20px rgba(248,198,30,0.4)',
      },
      animation: {
        'fade-up':   'fadeUp 0.4s ease both',
        'float':     'float 5s ease-in-out infinite',
        'spin-slow': 'spin 0.9s linear infinite',
        'pulse-dot': 'pulse 2s infinite',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%':     { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}
