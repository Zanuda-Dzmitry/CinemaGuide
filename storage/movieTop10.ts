import axios from 'axios'
import { URL_MOVIE_TOP10 } from '~/constants'
export const useMovieTop10 = defineStore('movieTop10', () => {
	const movieTop10 = ref([])

	return {
		movieTop10,
		fetchMovieTop10: async () => {
			const response = await axios.get(URL_MOVIE_TOP10)
			movieTop10.value = response.data
		},
	}
})
