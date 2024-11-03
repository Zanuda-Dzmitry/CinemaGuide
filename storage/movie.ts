import { BASE_URL } from '~/constants'

interface Movie {
	posterUrl: string | undefined
	id: number
	title: string
	director: string
	genres: string[]
}

export const useMovies = defineStore('movies', {
	state: () => ({
		movies: [] as Movie[],
		error: null as string | null,
	}),
	actions: {
		async loadMovies(
			count: number | undefined,
			page: number | undefined,
			title: string | undefined,
			genre: string | undefined
		) {
			try {
				const { data, error } = await useFetch<Movie[]>(`${BASE_URL}/movie`, {
					method: 'GET',
					params: { count, page, title, genre },
				})

				if (error.value) {
					this.error = 'Ошибка при загрузке фильмов'
				} else {
					this.movies = data.value || []
				}
			} catch {
				this.error = 'Ошибка при загрузке фильмов'
			}
		},
		getMoviesByGenre(targetGenre: string): Movie[] {
			return this.movies.filter(movie => movie.genres.includes(targetGenre))
		},
	},
})
