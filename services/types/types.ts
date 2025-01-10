// export type MovieType = {
// 	trailerYouTubeId?: string
// 	awardsSummary?: string
// 	production?: string
// 	director?: string
// 	revenue?: string
// 	budget?: string
// 	id: number
// 	title: string
// 	originalTitle?: string
// 	language?: string
// 	releaseYear?: number
// 	genres: never[]
// 	plot: string
// 	runtime: number
// 	posterUrl?: string
// 	movieBackdropUrl?: string
// 	backdropUrl?: string
// 	trailerUrl?: string
// 	tmdbRating?: number
// 	rating: number
// 	youTubeId: string
// 	backdrop: string
// 	year: number
// }

export type Movie = {
	title: string
	plot: string
	tmdbRating: number
	releaseYear: number
	genres: string[]
	runtime: number
	backdropUrl: string
	id: string
	trailerYouTubeId: string
	language?: string
	budget?: string
	revenue?: string
	director?: string
	production?: string
	awardsSummary?: string
	posterUrl?: string
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
