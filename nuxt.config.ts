export default defineNuxtConfig({
	devtools: { enabled: true },
	ssr: true,

	css: ['./assets/scss/main.scss'],

	modules: ['nuxt-svgo-loader', '@pinia/nuxt', '@nuxt/image'],
})
