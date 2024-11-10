import { BASE_URL } from '~/constants'
import axios from 'axios'
import { boolean } from 'yup'

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
		hasMoreMovies: false,
		error: null as string | null,
		searchQuery: '',
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
					if (response.data.length > 0) {
						this.movies.push(...response.data)
						this.hasMoreMovies = true // Еще есть фильмы для загрузки
					} else {
						this.hasMoreMovies = false // Нет больше фильмов для загрузки
					}
				} else {
					this.error = 'Ошибка при загрузке фильмов'
				}
			} catch (err) {
				this.error = (err as Error).message || 'Ошибка при загрузке фильмов'
			}
		},
	},
})
