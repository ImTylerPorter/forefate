export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				primary: {
					50: '#eef3ff',
					100: '#e0e9ff',
					200: '#c7d7ff',
					300: '#9eb5ff',
					400: '#7689ff',
					500: '#4855ff',  // Electric blue - passes contrast
					600: '#3137db',  // Darker electric blue
					700: '#2428b8',
					800: '#1b1d94',
					900: '#151871',
					950: '#0c0d33',
				},
				accent: {
					50: '#fff1f1',
					100: '#ffe1e1',
					200: '#ffc7c7',
					300: '#ffa3a3',
					400: '#ff7070',
					500: '#ff3333',  // Intense red
					600: '#db2020',
					700: '#b81414',
					800: '#941010',
					900: '#711111',
					950: '#330808',
				},
				warning: {
					50: '#fff7ed',
					100: '#ffedd5',
					200: '#ffd7aa',
					300: '#ffb77a',
					400: '#ff9344',
					500: '#ff6b10',  // Deep orange
					600: '#db4a00',
					700: '#b83a00',
					800: '#942d00',
					900: '#712400',
					950: '#331000',
				},
				success: {
					50: '#ecfdf5',
					100: '#d1fae5',
					200: '#a7f3d0',
					300: '#6ee7b7',
					400: '#34d399',
					500: '#059669',
					600: '#047857',
					700: '#065f46',
					800: '#064e3b',
					900: '#022c22',
					950: '#011911',
				},
				neutral: {
					50: '#f9fafb',
					100: '#f3f4f6',
					200: '#e5e7eb',
					300: '#d1d5db',
					400: '#9ca3af',
					500: '#6b7280',
					600: '#4b5563',
					700: '#374151',
					800: '#1f2937',
					900: '#111827',
					950: '#030712',
				},
			},
			fontFamily: {
				sans: ['Inter var', 'sans-serif'],
			},
		},
	},
	plugins: [
		import('@tailwindcss/forms'),
	],
}