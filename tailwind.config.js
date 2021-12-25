module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ['Fira Code', 'Source Code Pro', 'monospace']
      },
      colors: {


        'background': '#000',
        'foreground': '#fff',

      }
    },
    fontFamily: {
      sans: ['Source Sans Pro', 'sans-serif'],
      serif: ['Source Serif Pro', 'serif'],

    },

  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
