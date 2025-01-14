<template>
	<div class="container">
		<Loading v-if="isLoading" />
		<div class="error_global" v-if="error">
			Произошла ошибка при загрузке топ 10 фильмов: {{ error.message }}
		</div>
		<div class="wrapper" v-if="movieData">
			<h2>Топ 10 фильмов</h2>
			<!-- Используем Swiper для мобильной версии -->
			<client-only>
				<swiper-container
					v-if="containerClass"
					class="grid"
					ref="containerRef"
					:loop="true"
					:slides-per-view="'auto'"
					:space-between="40"
					:slides-offset-before="20"
				>
					<swiper-slide
						v-for="(movie, index) in movieList"
						:key="movie.id"
						class="movie_slide"
						style="width: 224px"
					>
						<NuxtLink class="card" :to="`/movies/${movie.id}`">
							<span class="slide_index">{{ index + 1 }}</span>
							<img class="movie_poster" :src="movie.posterUrl" alt="Poster" />
						</NuxtLink>
					</swiper-slide>
				</swiper-container>
				<!-- Используем обычный список для десктопной версии -->
				<div v-else class="grid">
					<NuxtLink
						class="card"
						:to="`/movies/${movie.id}`"
						v-for="(movie, index) in movieList"
						:key="movie.id"
					>
						<span>{{ index + 1 }}</span>
						<img class="movie_poster" :src="movie.posterUrl" alt="Poster" />
					</NuxtLink>
				</div>
			</client-only>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useMovieTop10 } from '~/storage/movieTop10'

const containerRef = ref(null)
const { $viewport } = useNuxtApp()

const containerClass = computed(() => {
	return $viewport.matches('mobile_small')
})

const { start, finish } = useLoadingIndicator()

const {
	data: movieData,
	status,
	error,
} = useAsyncData('movieTop10', async () => {
	start()
	try {
		const store = useMovieTop10()
		await store.fetchMovieTop10()
		return store.movieTop10
	} finally {
		finish()
	}
})

const isLoading = computed(() => status.value === 'pending')
const movieList = computed(() => movieData.value)
</script>

<style lang="scss" scoped>
@use '../assets/scss/main';
@use '../assets/scss/variables';
@use '../assets/scss/mixin';

.wrapper {
	padding-top: clamp(2rem, 1.824rem + 0.751vw, 2.5rem);
	padding-bottom: clamp(2rem, 0.063rem + 8.263vw, 7.5rem);

	h2 {
		color: variables.$white_color;
		@include mixin.title_2;
	}

	.grid {
		padding-top: clamp(2.5rem, 1.972rem + 2.254vw, 4rem);
		display: grid;
		justify-content: center;
		grid-template-columns: repeat(auto-fill, 224px);
		row-gap: 62px;
		column-gap: 40px;

		.card {
			position: relative;
			height: 336px;
			outline: none;

			&:focus .movie_poster {
				outline: 2px solid variables.$white_color;
			}

			span {
				position: absolute;
				top: -10px;
				left: -14px;
				display: block;
				color: variables.$brand-color;
				font-size: 24px;
				background-color: variables.$white_color;
				padding: 8px 22px 8px 22px;
				border-radius: 50px;
			}

			.movie_poster {
				width: 100%;
				height: 100%;
				border-radius: 20px;
			}
		}
	}
}

.mobile_small {
	.container {
		padding: 0 !important;

		.wrapper {
			h2 {
				padding-left: 20px;
			}
			.grid {
				display: flex;

				.movie_slide {
					.card {
						display: flex;
						width: 100%;

						span {
							top: 10px;
							left: 5px;
						}
					}
				}
			}
		}
	}
}
</style>
