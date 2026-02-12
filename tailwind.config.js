/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        whatsapp: {
          bg: '#0b141a',
          dark: '#111b21',
          panel: '#202c33',
          hover: '#2a3942',
          green: '#00a884',
          'green-dark': '#008069',
          'green-light': '#25d366',
          teal: '#008069',
          blue: '#53bdeb',
          'msg-sent': '#005c4b',
          'msg-received': '#202c33',
        }
      },
      animation: {
        'typing': 'typing 1.4s infinite',
        'slide-up': 'slideUp 0.3s ease-out',
        'fade-in': 'fadeIn 0.2s ease-in',
      },
      keyframes: {
        typing: {
          '0%, 100%': { opacity: '0.2' },
          '50%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
