import type { Movie } from '../services/types/types'
import { URL_MOVIE } from '~/constants'
import axios from 'axios'

export const useMovieId = defineStore('movie', {
	state: () => ({
		movie: {} as Movie,
	}),

	actions: {
		async fetchMovieId(genreId: string) {
			const response = await axios.get(`${URL_MOVIE}/${genreId}`)
			this.movie = response.data
		},
	},
})
