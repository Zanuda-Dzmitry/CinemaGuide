import axios from 'axios'
import { URL_MOVIE_GENRES } from '~/constants'

export const useMovieGenre = defineStore('movieGenre', {
	state: () => ({
		movieGenre: [],
	}),
	actions: {
		async fetchMovieGenre() {
			const response = await axios.get(URL_MOVIE_GENRES)
			this.movieGenre = response.data
		},
	},
})
