/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      gridTemplateColumns: {
        'main': 'repeat(auto-fit, minmax(18rem, 1fr))',
        'main-small': 'repeat(auto-fit, minmax(14rem, 1fr))',
        'strat-overview-table': '4rem repeat(2, 1fr)'
      },
      width: {
        'default': 'min(95vw, 72rem)',
        'drawer': 'min(95vw, 40rem)'
      }
    },
  },
  plugins: [],
}

