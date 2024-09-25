/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        basic: {
          900: "#2B2E34",
          950: "#131517",
        },
        primary: {
          50: "#E5F6F3",
          100: "#CCEDE7",
          200: "#99DBD0",
          300: "#66C9B8",
          400: "#33B7A1",
          500: "#00A589",
          600: "#00846E",
          700: "#006352",
          800: "#004237",
          900: "#00211B",
        },
        secondary: {
          50: "#FFF9E5",
          100: "#FFF3CC",
          200: "#FFE799",
          300: "#FFDB66",
          400: "#FFCF33",
          500: "#FFC300",
          600: "#CC9C00",
          700: "#997500",
          800: "#664E00",
          900: "#332700",
        },
        gray: {
          50: "#F7F7F8",
          100: "#EFEFEF",
          200: "#DFDFDF",
          300: "#CFCFCF",
        },
        alert: {
          success: "#5BD9B5",
          warning: "#FFB74D",
          error: "#FF5050",
          info: "#3ABFF8",
          successLight: "#D5F5EC",
          warningLight: "#FFE8CC",
          errorLight: "#FFE5E5",
          infoLight: "#E5F4FB",
        },
      },
    },
  },
  plugins: [],
};
