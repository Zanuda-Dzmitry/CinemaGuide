export default defineNuxtConfig({
	devtools: { enabled: true },
	ssr: true,

	css: ['./assets/scss/main.scss'],

	modules: [
		'nuxt-svgo-loader',
		'@pinia/nuxt',
		'@nuxt/image',
		'@vee-validate/nuxt',
	],

	app: {
		head: {
			link: [
				{
					href: 'https://fonts.googleapis.com/css2?family=Play:wght@400;700&display=swap',
					rel: 'stylesheet',
				},
			],
		},
	},
})
