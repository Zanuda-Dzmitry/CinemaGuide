import type { Movie } from '../server/types'

export const useMovieId = defineStore('movie', () => {
	const movieTitle = ref('')
	const moviePlot = ref('')
	const movieRating = ref(0)
	const movieYear = ref(0)
	const movieGenre = ref([])
	const movieRuntime = ref(0)
	const moviePoster = ref('')
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
		movieBudget,
		movieLanguage,
		movieRevenue,
		movieDirector,
		movieProduction,
		movieAwardsSummary,

		fetchMovieId: async (genreId: string) => {
			const response = await $fetch<Movie>(`/api/movie/${genreId}`)

			movieTitle.value = response.title
			moviePlot.value = response.plot
			movieRating.value = response.tmdbRating
			movieYear.value = response.releaseYear
			movieGenre.value = response.genres
			movieRuntime.value = response.runtime
			moviePoster.value = response.posterUrl
			movieBudget.value = response.budget
			movieLanguage.value = response.language
			movieRevenue.value = response.revenue
			movieDirector.value = response.director
			movieProduction.value = response.production
			movieAwardsSummary.value = response.awardsSummary
		},
	}
})
