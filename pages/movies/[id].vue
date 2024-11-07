<template>
	<Movie
		:id="id"
		:title="title"
		:plot="plot"
		:rating="rating"
		:year="year"
		:genres="genres"
		:runtime="runtime"
		:backdrop="backdrop"
	/>
	<section class="movie_about container">
		<div class="movie_info">
			<h2>О фильме</h2>
			<ul>
				<li>
					<span class="movie_info-title"> Язык оригинала </span>
					<span class="movie_info-value">{{ language }}</span>
				</li>
				<li>
					<span class="movie_info-title"> Бюджет </span>
					<span class="movie_info-value">{{ budget }}</span>
				</li>
				<li>
					<span class="movie_info-title"> Выручка </span>
					<span class="movie_info-value">{{ revenue }}</span>
				</li>
				<li>
					<span class="movie_info-title"> Режиссёр </span>
					<span class="movie_info-value">{{ director }}</span>
				</li>
				<li>
					<span class="movie_info-title"> Продакшен </span>
					<span class="movie_info-value">{{ production }}</span>
				</li>
				<li>
					<span class="movie_info-title"> Награды </span>
					<span class="movie_info-value">{{ awardsSummary }}</span>
				</li>
			</ul>
		</div>
	</section>
</template>

<script lang="ts" setup>
import Movie from '~/components/Movie.vue'
import { useMovieId } from '~/storage/movieId'

const route = useRoute()
const movieId = computed(() => route.params.id as string)
const store = useMovieId()

const { data } = useAsyncData('movieId', async () => {
	await Promise.all([store.fetchMovieId(movieId.value)])
	return {
		movieId: store.movieId,
		movieTitle: store.movieTitle,
		moviePlot: store.moviePlot,
		movieRating: store.movieRating,
		movieYear: store.movieYear,
		movieGenre: store.movieGenre,
		movieRuntime: store.movieRuntime,
		moviePoster: store.moviePoster,
		movieBackdrop: store.movieBackdrop,
		movieBudget: store.movieBudget,
		movieLanguage: store.movieLanguage,
		movieRevenue: store.movieRevenue,
		movieDirector: store.movieDirector,
		movieProduction: store.movieProduction,
		movieAwardsSummary: store.movieAwardsSummary,
	}
})

const id = computed(() => data.value?.movieId ?? 0)
const title = computed(() => data.value?.movieTitle || '')
const plot = computed(() => data.value?.moviePlot || '')
const rating = computed(() => data.value?.movieRating || 0)
const year = computed(() => data.value?.movieYear || 0)
const genres = computed(() => data.value?.movieGenre || [])
const runtime = computed(() => data.value?.movieRuntime || 0)
const poster = computed(() => data.value?.moviePoster || '')
const backdrop = computed(() => data.value?.movieBackdrop || '')
const budget = computed(() => data.value?.movieBudget)
const language = computed(() => data.value?.movieLanguage)
const revenue = computed(() => data.value?.movieRevenue)
const director = computed(() => data.value?.movieDirector)
const production = computed(() => data.value?.movieProduction)
const awardsSummary = computed(() => data.value?.movieAwardsSummary)

useHead({
	title: () => `${data.value?.movieTitle}`,
})
</script>

<style lang="scss" scoped>
@import '../assets/scss/main.scss';

.movie_about {
	.movie_info {
		h2 {
			font-size: 40px;
			line-height: 48px;
			font-weight: 700;
			color: $white_color;
			padding-bottom: 64px;
		}

		ul {
			display: flex;
			flex-direction: column;
			row-gap: 24px;
		}
		li {
			display: flex;
			column-gap: 8px;

			color: $grey_color;

			.movie_info-title {
				display: inline-flex;
				column-gap: 8px;
				white-space: nowrap;
				max-width: 320px;
				width: 100%;
				align-items: baseline;

				&::after {
					content: '';
					width: 100%;
					border-bottom: 1px dashed $grey_color;
				}
			}
		}
	}
}
</style>
