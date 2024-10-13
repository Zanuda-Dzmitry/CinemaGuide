import { URL_MOVIE_TOP10 } from '~/constants'
export default defineEventHandler(async event => {
	const response = await $fetch(URL_MOVIE_TOP10)

	return response
})
