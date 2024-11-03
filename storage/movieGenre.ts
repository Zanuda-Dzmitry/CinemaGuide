import axios from 'axios'
import { URL_MOVIE_GENRES } from '~/constants'

export const useMovieGenre = defineStore('movieGenre', () => {
	const movieGenre = ref([])

	return {
		movieGenre,
		fetchMovieGenre: async () => {
			const response = await axios.get(URL_MOVIE_GENRES)
			movieGenre.value = response.data
		},
	}
})
