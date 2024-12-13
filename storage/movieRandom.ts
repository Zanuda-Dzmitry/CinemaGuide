import axios from 'axios'
import type { MovieType } from '../services/types/types'
import { URL_MOVIE_RANDOM } from '../constants'

export const useMovieRandom = defineStore('movieRandom', {
	state: () => ({
		movieTitle: '',
		moviePlot: '',
		movieRating: 0,
		movieYear: 0,
		movieGenre: [],
		movieRuntime: 0,
		movieBackdrop: '',
		movieId: 0,
		movieTrailerYouTubeId: '',
	}),

	actions: {
		async fetchMovieRandom() {
			try {
				const response = await axios.get<MovieType>(URL_MOVIE_RANDOM)
				this.movieTitle = response.data.title
				this.moviePlot = response.data.plot
				this.movieRating = response.data.tmdbRating
				this.movieYear = response.data.releaseYear
				this.movieGenre = response.data.genres
				this.movieRuntime = response.data.runtime
				this.movieBackdrop = response.data.backdropUrl
				this.movieId = response.data.id
				this.movieTrailerYouTubeId = response.data.trailerYouTubeId
			} catch (error) {
				console.error('Ошибка при получении данных о фильме:', error)
			}
		},
		refreshMovieData() {
			return this.fetchMovieRandom()
		},
	},
})
