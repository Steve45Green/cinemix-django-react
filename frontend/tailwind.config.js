/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-dark': '#14181C',    // Fundo principal (quase preto)
        'brand-light': '#2C3440',   // Fundo secundário (cinza escuro)
        'brand-accent': '#00B020',  // Verde Letterboxd para realces
        'brand-text': '#9AB',       // Texto secundário (cinza claro)
      }
    },
  },
  plugins: [],
}
