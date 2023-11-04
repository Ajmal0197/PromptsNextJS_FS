//This configuration file is essential for tailoring Tailwind CSS to match the design requirements of your web application.
//It's often used to define custom colors, fonts, spacing, and other styling parameters, ensuring that your application's styles are consistent and optimized for performance.
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        satoshi: ["Satoshi", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        "primary-orange": "#FF5722", //changing default primary color to this
      },
    },
  },
  plugins: [],
};
