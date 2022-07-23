/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        doctor: '#f9f9f9',
        whiteSmoke: '#f5f5f5',
        silverSnippet: '#8D9091',
        dhusarGrey: '#ABAAAB',
        rhineCastle: '#5F5F5F'
      },
      fontFamily: {
        'archivo': ['Archivo', 'sans-serif'],
        'chillax': ['Chillax', 'sans-serif'],
        'clashg': ['ClashGrotesk', 'sans-serif']
      },
      fontWeight: {
        'title': 650
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
