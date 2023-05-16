/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      gridTemplateColumns: {
        'main': 'repeat(auto-fit, minmax(18rem, 1fr))'
      },
      width: {
        'default': 'min(100vw, 72rem)'
      }
    },
  },
  plugins: [],
}

