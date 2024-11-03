import type { MovieType } from '../services/types'
import { URL_MOVIE } from '~/constants'
import axios from 'axios'

export const useMovieId = defineStore('movie', () => {
	const movieTitle = ref('')
	const moviePlot = ref('')
	const movieRating = ref(0)
	const movieYear = ref(0)
	const movieGenre = ref([])
	const movieRuntime = ref(0)
	const moviePoster = ref('')
	const movieBackdrop = ref('')
	const movieBudget = ref('')
	const movieLanguage = ref('')
	const movieRevenue = ref('')
	const movieDirector = ref('')
	const movieProduction = ref('')
	const movieAwardsSummary = ref('')

	return {
		movieTitle,
		moviePlot,
		movieRating,
		movieYear,
		movieGenre,
		movieRuntime,
		moviePoster,
		movieBackdrop,
		movieBudget,
		movieLanguage,
		movieRevenue,
		movieDirector,
		movieProduction,
		movieAwardsSummary,

		fetchMovieId: async (genreId: string) => {
			const response = await axios.get<MovieType>(`${URL_MOVIE}/${genreId}`)
			movieTitle.value = response.data.title
			moviePlot.value = response.data.plot
			movieRating.value = response.data.tmdbRating
			movieYear.value = response.data.releaseYear
			movieGenre.value = response.data.genres
			movieRuntime.value = response.data.runtime
			moviePoster.value = response.data.posterUrl
			movieBackdrop.value = response.data.backdropUrl
			movieBudget.value = response.data.budget
			movieLanguage.value = response.data.language
			movieRevenue.value = response.data.revenue
			movieDirector.value = response.data.director
			movieProduction.value = response.data.production
			movieAwardsSummary.value = response.data.awardsSummary
		},
	}
})
