import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/layouts/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'selector',
  theme: {
    extend: {
      colors: {
        defaultText: '#434343',
        primary: '#00a8e8',
        // primary: '#64bdfd',
        light: '#FFF',
        dark: '#111111',
        secondary: '#e9e9e9',
        iconColor: '#5f5f5f'
      },
    },
    screens: {
      xs: '480px',
      ss: '620px',
      sm: '768px',
      md: '1060px',
      lg: '1200px',
      xl: '1700px',
    }
  },
  plugins: [],
};
export default config;