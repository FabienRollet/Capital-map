/** @type {import('tailwindcss').Config} */
// import plugin from "tailwindcss/plugin";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    // plugin(({ addComponents }) => {
    //   const components = {
    //     '.btn': {
    //       '@apply': 'bg-white rounded-xl',
    //       'background-image': 'radial-gradient(circle at bottom center, #FFC837 15px, #FF8008)',
    //       'box-shadow': '0 10px 10px -5px rgba(0, 0, 0, 0.2)',
    //     },  
    //   };
    //   addComponents(components);
    // }),
  ],
};

