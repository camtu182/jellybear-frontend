/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
          primary: "#FF5733",  // Thêm màu tùy chỉnh
          secondary: "#33FF57",
          success: "#28a745",
          error: "#dc3545",
          warning: "#ffc107",
          info: "#17a2b8"
        },
    },
  },
  plugins: [],
  
};
