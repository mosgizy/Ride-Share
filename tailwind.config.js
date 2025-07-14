/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
	presets: [require('nativewind/preset')],
	theme: {
		extend: {
			colors: {
				primary: {
					DEFAULT: '#08B783',
					100: '#414141',
					200: '#008955',
					300: '#E2F5ED',
					400: '#121212',
				},
				secondary: {
					100: '#B7083C',
					200: '#FB8A00',
					300: '#F44336',
					400: '#B8B8B8',
					500: '#43A048',
					600: '#262626',
					700: '#4CAF51',
					800: '#F57F17',
				},
				tertiary: {
					100: '#5A5A5A',
					200: '#2A2A2A',
					300: '#D0D0D0',
					400: '#A0A0A0',
					500: '#A6A6A6',
					600: '#B9E5D1',
					700: '#8AD4B5',
					800: '#898989',
					900: '#DDDDDD',
					1000: '#717171',
				},
			},
		},
	},
	plugins: [],
};
