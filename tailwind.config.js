/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {colors: {
      state: {
        100: '#f0f4f8',  // Custom color for bg-state-100
      },
    },},
  },
  plugins: [],
}

