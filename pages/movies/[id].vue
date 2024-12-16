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
		:youTubeId="youTubeId || ''"
	/>

	<div class="container">
		<section class="movie_about">
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
	</div>
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
		movieTrailerYouTubeId: store.movieTrailerYouTubeId,
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
const youTubeId = computed(() => data.value?.movieTrailerYouTubeId)

useHead({
	title: () => `${data.value?.movieTitle}`,
})
</script>

<style lang="scss" scoped>
@use '../assets/scss/main';
@use '../assets/scss/variables';
@use '../assets/scss/mixin';

.movie_about {
	padding-top: clamp(2rem, 1.824rem + 0.751vw, 2.5rem);
	padding-bottom: clamp(2rem, 0.063rem + 8.263vw, 7.5rem);
	h2 {
		@include mixin.title_2;
		color: variables.$white_color;
		padding-bottom: clamp(2.5rem, 1.972rem + 2.254vw, 4rem);
	}

	ul {
		display: flex;
		flex-direction: column;
		row-gap: clamp(0.75rem, 0.486rem + 1.127vw, 1.5rem);
	}
	li {
		display: flex;
		column-gap: 8px;
		color: variables.$white_color;

		.movie_info-title {
			@include mixin.span_text;
			display: inline-flex;
			column-gap: 8px;
			white-space: nowrap;
			max-width: 320px;
			width: 100%;
			align-items: baseline;

			&::after {
				content: '';
				width: 100%;
				border-bottom: 1px dashed variables.$grey_color;
			}
		}
	}
}

.mobile_small {
	.movie_about {
		ul {
			li {
				flex-direction: column;
				row-gap: 4px;

				.movie_info-title {
					color: variables.$grey_color;

					&::after {
						content: none;
					}
				}
			}
		}
	}
}
</style>
