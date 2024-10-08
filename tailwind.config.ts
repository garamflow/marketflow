import type { Config } from "tailwindcss";

const config: Config = {
	darkMode: "selector",
	content: ["./pages/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
	theme: {},
	plugins: [require("@tailwindcss/forms"), require("daisyui")],
};
export default config;
