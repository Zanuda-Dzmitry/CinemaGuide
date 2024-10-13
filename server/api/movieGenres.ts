import { URL_MOVIE_GENRES } from '~/constants'
export default defineEventHandler(async event => {
	const response = await $fetch(URL_MOVIE_GENRES)

	return response
})
