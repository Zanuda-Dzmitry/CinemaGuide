import { URL_MOVIE_RANDOM } from '~/constants'
export default defineEventHandler(async () => {
	const response = await $fetch(URL_MOVIE_RANDOM)

	return response
})
