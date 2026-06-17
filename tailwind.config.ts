import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand palette ported from the original style.css :root tokens.
        primary: {
          green: '#1a7a43',
          dark: '#0d3b20',
          deep: '#125930',
          hover: '#146135',
        },
        light: {
          green: '#e9f5ed',
        },
        ink: {
          dark: '#1f2937',
          gray: '#4b5563',
        },
        page: '#fafafa',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        brand: '16px',
      },
      maxWidth: {
        container: '1200px',
      },
      keyframes: {
        scrollLogos: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        scrollLogos: 'scrollLogos 20s linear infinite',
        fadeInUp: 'fadeInUp 0.6s ease-out both',
      },
    },
  },
  plugins: [],
};

export default config;
