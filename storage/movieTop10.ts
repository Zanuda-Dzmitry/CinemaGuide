import axios from 'axios'
import { URL_MOVIE_TOP10 } from '~/constants'

interface Movie {
	id: number
	posterUrl: string
}

export const useMovieTop10 = defineStore('movieTop10', {
	state: () => ({
		movieTop10: [] as Movie[],
	}),
	actions: {
		async fetchMovieTop10() {
			const response = await axios.get(URL_MOVIE_TOP10)
			this.movieTop10 = response.data
		},
	},
})
