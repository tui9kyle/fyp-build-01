module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {

      colors: {


        'background': '#000',
        'foreground': '#fff',

      }
    },
    fontFamily: {
      sans: ['Source Sans Pro', 'sans-serif'],
      serif: ['Source Serif Pro', 'serif'],
      mono: ['Fira Code', 'Source Code Pro', 'monospace']

    },

  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
