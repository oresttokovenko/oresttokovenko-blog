/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				// setting default black to be a very dark slate gray
				black: '#1E293B',
			},
			spacing: {
				'128': '32rem', // 512px
				'144': '36rem', // 576px
				'160': '40rem', // 640px
			}
		},
	},
}
