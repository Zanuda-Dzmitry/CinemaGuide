import axios from 'axios'
import { URL_MOVIE_RANDOM } from '../constants'
import type { Movie } from '~/services/types/types'

export const useMovieRandom = defineStore('movieRandom', {
	state: () => ({
		movieRandom: {} as Movie,
	}),

	actions: {
		async fetchMovieRandom() {
			const response = await axios.get(URL_MOVIE_RANDOM)
			this.movieRandom = response.data
		},
		refreshMovieData() {
			return this.fetchMovieRandom()
		},
	},
})
