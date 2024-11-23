/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      screens: {
        ss: "450px",
        ssm: "500px",
        xxl: "1150px",
        "3xl": "1600px",
      },
      animation: {
        bar1: "barAnimation 0.5s ease-out forwards",
        bar2: "barAnimation 0.55s ease-out forwards",
        bar3: "barAnimation 0.6s ease-out forwards",
        bar4: "barAnimation 0.65s ease-out forwards",
        bar5: "barAnimation 0.7s ease-out forwards",
        bar6: "barAnimation 0.75s ease-out forwards",
        bar7: "barAnimation 0.8s ease-out forwards",
        bar8: "barAnimation 0.85s ease-out forwards",
        bar9: "barAnimation 0.9s ease-out forwards",
        bar10: "barAnimation 0.95s ease-out forwards",
        bar11: "barAnimation 1s ease-out forwards",
        bar12: "barAnimation 1.05s ease-out forwards",
        bar13: "barAnimation 1.1s ease-out forwards",
        bar14: "barAnimation 1.15s ease-out forwards",
        bar15: "barAnimation 1.2s ease-out forwards",
        text1: "textAnimation 1s ease-out forwards 1.5s",
        text2: "textAnimation 1s ease-out forwards 1.75s",
        text3: "textAnimation 1s ease-out forwards 2s",
      },
      keyframes: {
        barAnimation: {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" },
        },
        textAnimation: {
          "0%": { opacity: "0", transform: "scale(1.2) rotate(10deg)" },
          "50%": { opacity: "1", transform: "scale(1)" },
          "100%": { opacity: "1", transform: "scale(1) rotate(0deg)" },
        },
      },
    },
  },
  plugins: [],
};
