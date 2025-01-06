export default defineNuxtConfig({
	devtools: { enabled: true },

	css: ['@/assets/scss/main.scss', 'swiper/swiper-bundle.css'],

	modules: [
		'nuxt-svgo-loader',
		'@pinia/nuxt',
		'@nuxt/image',
		'@vee-validate/nuxt',
		'nuxt-viewport',
		'nuxt-swiper',
	],

	viewport: {
		breakpoints: {
			mobile_small: 375,
			mobile: 576,
			tablet: 768,
			tablet_landscape: 1024,
			desktop: 1200,
			// добавьте другие брейкпоинты по желанию
		},
	},

	app: {
		head: {
			link: [
				{
					href: 'https://fonts.googleapis.com/css2?family=Play:wght@400;700&display=swap',
					rel: 'stylesheet',
				},
				{ rel: 'icon', type: 'image/x-icon', href: '/CinemaGuide/favicon.ico' },
			],
		},
		baseURL: '/CinemaGuide/',
	},

	nitro: {
		output: {
			dir: './dist/CinemaGuide',
		},
	},

	compatibilityDate: '2024-11-18',
})
