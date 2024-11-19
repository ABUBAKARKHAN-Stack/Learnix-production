/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"], 
      },
      screens: {
        'ss': '450px',
        'xxl': '1150px',
        '3xl': '1600px',  
      },
    },
  },
  plugins: [],
};

