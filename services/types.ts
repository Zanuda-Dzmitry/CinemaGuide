export type MovieType = {
	awardsSummary: string
	production: string
	director: string
	revenue: string
	budget: string
	id: number
	title: string
	originalTitle: string
	language: string
	releaseYear: number
	genres: []
	plot: string
	runtime: number
	posterUrl: string
	backdropUrl: string
	trailerUrl: string
	tmdbRating: number
}

export type User = {
	email: string
	name: string
	surname: string
	favorites: string[]
}

export type Genre = {
	id: number
	name: string
}
