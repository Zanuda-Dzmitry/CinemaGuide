<template>
	<div>
		<Movie
			:movieProps="movieProps"
			:isLoading="isLoading"
			:error="error"
			:refreshMovie="refresh"
		/>
	</div>

	<div class="container" v-if="movieData">
		<section class="movie_about">
			<div class="movie_info">
				<h2>О фильме</h2>
				<ul>
					<li>
						<span class="movie_info-title"> Язык оригинала </span>
						<span class="movie_info-value">{{ movieProps?.language }}</span>
					</li>
					<li>
						<span class="movie_info-title"> Бюджет </span>
						<span class="movie_info-value">{{ movieProps?.budget }}</span>
					</li>
					<li>
						<span class="movie_info-title"> Выручка </span>
						<span class="movie_info-value">{{ movieProps?.revenue }}</span>
					</li>
					<li>
						<span class="movie_info-title"> Режиссёр </span>
						<span class="movie_info-value">{{ movieProps?.director }}</span>
					</li>
					<li>
						<span class="movie_info-title"> Продакшен </span>
						<span class="movie_info-value">{{ movieProps?.production }}</span>
					</li>
					<li>
						<span class="movie_info-title"> Награды </span>
						<span class="movie_info-value">{{
							movieProps?.awardsSummary
						}}</span>
					</li>
				</ul>
			</div>
		</section>
	</div>
</template>

<script lang="ts" setup>
import Movie from '~/components/Movie.vue'
import { useMovieId } from '~/storage/movieId'

const { start, finish } = useLoadingIndicator()
const route = useRoute()
const movieId = computed(() => route.params.id as string)

const {
	data: movieData,
	status,
	error,
	refresh,
} = await useAsyncData('movieId', async () => {
	start()
	try {
		const store = useMovieId()
		await store.fetchMovieId(movieId.value)
		return store.movie
	} finally {
		finish()
	}
})

const isLoading = computed(() => status.value === 'pending')
const movieProps = computed(() => movieData.value)

useHead({
	title: () => `${movieProps.value?.title}`,
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
