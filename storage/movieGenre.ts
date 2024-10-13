export const useMovieGenre = defineStore('movieGenre', () => {
	const movieGenre = ref([])

	return {
		movieGenre,
		fetchMovieGenre: async () => {
			movieGenre.value = await $fetch('/api/movieGenres')
		},
	}
})
