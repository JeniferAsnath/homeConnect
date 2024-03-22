/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}", "./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'radial-gradient': 'radial-gradient(169.40% 89.55% at 94.76% 6.29%, rgba(0, 0, 0, 0.40) 0%, rgba(255, 255, 255, 0.00) 100%)',
      },
      colors: {
        'regal-blue': '#326383',
        'base-color': '#F4511E',
        'gris': '#f5f8fa'
      },
    },
  },
  plugins: [],
}

