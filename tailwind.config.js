/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    screens: {
      'sm': '600px',
      'md': '900px',
      'lg': '1100px',
      'xl': '1250px',
      '2xl': '1500px'
    },
    extend: {
      gridTemplateColumns: {
        'main': 'repeat(auto-fit, minmax(18rem, 1fr))',
        'main-small': 'repeat(auto-fit, minmax(14rem, 1fr))',
        'strat-overview-table': '4rem repeat(4, 1fr)'
      },
      width: {
        'default': 'min(95vw, 72rem)',
        'drawer': 'min(95vw, 40rem)',
        'default-form': 'min(94vw, 40rem)'
      }
    },
  },
  plugins: [],
}

