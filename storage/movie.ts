import { BASE_URL } from '~/constants'
import axios from 'axios'

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
				const response = await axios.get<Movie[]>(`${BASE_URL}/movie`, {
					params: { count, page, title, genre },
				})

				if (response.status === 200) {
					// Добавляем только уникальные фильмы
					response.data.forEach(movie => {
						if (
							!this.movies.some(existingMovie => existingMovie.id === movie.id)
						) {
							this.movies.push(movie)
						}
					})
				} else {
					this.error = 'Ошибка при загрузке фильмов'
				}
			} catch (err) {
				this.error = (err as Error).message || 'Ошибка при загрузке фильмов'
			}
		},
		getMoviesByGenre(targetGenre: string): Movie[] {
			return this.movies.filter(movie => movie.genres.includes(targetGenre))
		},
		hasMoreMovies(currentPage: number, pageSize: number): boolean {
			return this.movies.length > currentPage * pageSize
		},
	},
})
