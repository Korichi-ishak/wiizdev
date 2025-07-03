/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      fontFamily: {
        'inter': ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', '"Noto Sans"', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#42306F',
          50: '#F3F1F7',
          100: '#E6E2EF',
          200: '#CEC5DF',
          300: '#B5A8CF',
          400: '#9D8BBF',
          500: '#42306F',
          600: '#3B2B63',
          700: '#342657',
          800: '#2D214B',
          900: '#1A1330',
        },
        secondary: {
          DEFAULT: '#1A1330',
          50: '#EFEBF7',
          100: '#DFD7EF',
          200: '#BFB0DF',
          300: '#9F88CF',
          400: '#7F60BF',
          500: '#594786',
          600: '#42306F',
          700: '#2D214B',
          800: '#1A1330',
          900: '#0D0A18',
        },
        accent: {
          DEFAULT: '#814186',
          50: '#F7F1F7',
          100: '#EFE2EF',
          200: '#DFC5DF',
          300: '#CFA8CF',
          400: '#BF8BBF',
          500: '#814186',
          600: '#743B79',
          700: '#67346C',
          800: '#5A2D5F',
          900: '#4D2652',
        },
        neutral: {
          DEFAULT: '#E2E4E4',
          50: '#F9F9F9',
          100: '#F3F4F4',
          200: '#E2E4E4',
          300: '#D1D4D4',
          400: '#C0C4C4',
          500: '#AFB4B4',
          600: '#9EA4A4',
          700: '#8D9494',
          800: '#7C8484',
          900: '#6B7474',
        }
      }
    },
  },
  plugins: [],
}

