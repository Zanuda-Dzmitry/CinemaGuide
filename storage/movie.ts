import { BASE_URL } from '~/constants'
import axios from 'axios'
import type { Movie } from '~/services/types/types'

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
			const response = await axios.get<Movie[]>(`${BASE_URL}/movie`, {
				params: { count, page, title, genre },
			})
			if (response.data.length > 0) {
				this.movies.push(...response.data)
				this.hasMoreMovies = true // Еще есть фильмы для загрузки
			} else {
				this.hasMoreMovies = false // Нет больше фильмов для загрузки
			}
		},

		clearMovies() {
			this.movies = []
		},
	},

	getters: {
		filteredMovies(state) {
			const lowerCaseQuery = state.searchQuery.toLowerCase()
			// Разбиваем строку поиска на отдельные слова и удаляем пустые
			const queryWords = lowerCaseQuery.split(' ').filter(word => word.trim())
			const uniqueMovieIds = new Set() // Создаём набор для уникальных идентификаторов фильмов
			const result: Movie[] = []

			// Если строка поиска пустая, возвращаем пустой массив
			if (queryWords.length === 0) {
				return result
			}

			// Проходим по каждому фильму
			state.movies.forEach(movie => {
				const movieTitle = movie.title.toLowerCase()

				// Проверяем, начинаются ли названия фильма с начала каждого слова из строки поиска
				const matchesAllWords = queryWords.every(word =>
					movieTitle.includes(word)
				)

				// Если фильм соответствует хотя бы одному слову
				if (matchesAllWords) {
					// Если идентификатор фильма уникален, добавляем его в результат
					if (!uniqueMovieIds.has(movie.id)) {
						uniqueMovieIds.add(movie.id) // Добавляем идентификатор в набор уникальных идентификаторов
						result.push(movie) // Добавляем фильм в результат
					}
				}
			})

			return result.slice(0, 5) // Ограничиваем до 5 лучших совпадений
		},
	},
})
