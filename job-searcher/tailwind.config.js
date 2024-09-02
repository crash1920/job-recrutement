/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    extend: {
      backgroundImage: {
        'banner': " url('/public/assets/backgrounds/banner.jpg')",
        'dreamJobBanner': " url('/public/assets/backgrounds/dream-jobs-banner.jpg')",
        'candidateBanner': "url('/public/assets/backgrounds/candidate-banner.jpg')",
        'jobDetailBanner': "url('/public/assets/backgrounds/job-detail-banner.jpg')",

      },
      colors: {
        red: {
          10: '#ff4848',
          20: '#e67272',
          dark: '#ff2d2d',
          google: '#DD4A39',
        },
        blue: {
          darkBlue: '#2c3038',
          skyBlue: '#3498db',
          facebook: '#3b5998',
          twitter: '#1da1f2',
          linkedin: '#0077b5',
          lightBlue: '#00BCD4'

        },

        dirtyWhite: '#f8f9fa',
        transparent: 'transparent',
        black: {
          standard: '#000',
          lightBlack: '#55555558',
          10: '#131313',
        },
        white: {
          standard: '#fff',
          10: '#f8f9fa',
          20: '#e3e3e3',
          30: '#ddd',
          40: '#eee'
        },
        gray: {
          dark: '#555a64',
          light: '#999',
          mid: '#888',
        },
        brown: {
          standard: '#333'
        }
      },
      keyframes: {
        'bounce-once': {
          '0%, 100%': { transform: 'translateY(-25%)', animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)' },
          '50%': { transform: 'translateY(0%)', animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)' },
        },
        'pulse-once': {
          '0%, 100%': { opacity: '0.5', animationTimingFunction: 'cubic-bezier(0.4, 0, 0.6, 1)' },
          '50%': { opacity: '1', animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)' },
        },
      },
      animation: {
        'bounce-once': 'bounce-once 2s',
        'pulse-once': 'pulse-once 2s',
      },
    },
  },
  plugins: [],
};