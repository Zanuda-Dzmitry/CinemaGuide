export const useMovieTop10 = defineStore('movieTop10', () => {
	const movieTop10 = ref([])

	return {
		movieTop10,
		fetchMovieTop10: async () => {
			movieTop10.value = await $fetch('/api/movieTop10')
		},
	}
})
