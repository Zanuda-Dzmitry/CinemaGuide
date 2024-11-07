import type { MovieType } from '../services/types'
import { URL_MOVIE } from '~/constants'
import axios from 'axios'

export const useMovieId = defineStore('movie', {
	state: () => ({
		movieId: 0,
		movieTitle: '',
		moviePlot: '',
		movieRating: 0,
		movieYear: 0,
		movieGenre: [],
		movieRuntime: 0,
		moviePoster: '',
		movieBackdrop: '',
		movieBudget: '',
		movieLanguage: '',
		movieRevenue: '',
		movieDirector: '',
		movieProduction: '',
		movieAwardsSummary: '',
	}),

	actions: {
		async fetchMovieId(genreId: string) {
			const response = await axios.get<MovieType>(`${URL_MOVIE}/${genreId}`)
			this.movieId = response.data.id
			this.movieTitle = response.data.title
			this.moviePlot = response.data.plot
			this.movieRating = response.data.tmdbRating
			this.movieYear = response.data.releaseYear
			this.movieGenre = response.data.genres
			this.movieRuntime = response.data.runtime
			this.moviePoster = response.data.posterUrl
			this.movieBackdrop = response.data.backdropUrl
			this.movieBudget = response.data.budget
			this.movieLanguage = response.data.language
			this.movieRevenue = response.data.revenue
			this.movieDirector = response.data.director
			this.movieProduction = response.data.production
			this.movieAwardsSummary = response.data.awardsSummary
		},
	},
})
