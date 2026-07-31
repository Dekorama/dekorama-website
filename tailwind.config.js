/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        whatsapp: '#25D366',
        'gray-bg': '#F5F5F5',
        hairline: '#D1D5DB',
        charcoal: '#1A1A1A',
        accent: {
          DEFAULT: '#6B5344',
          light: '#8B7355',
        },
      },
      letterSpacing: {
        nav: '0.2em',
        discover: '0.22em',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        heading: ['var(--font-heading)', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
