/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      gridTemplateColumns: {
        'main': 'repeat(auto-fit, minmax(18rem, 1fr))'
      },
      width: {
        'default': 'min(95vw, 72rem)'
      }
    },
  },
  plugins: [],
}

