<template>
	<div class="container">
		<div class="wrapper">
			<h2>Топ 10 фильмов</h2>
			<!-- Используем Swiper для мобильной версии -->
			<ClientOnly v-if="containerClass">
				<swiper-container
					class="grid"
					ref="containerRef"
					:loop="true"
					:slides-per-view="slidesPerView"
				>
					<swiper-slide
						v-for="(movie, index) in movies"
						:key="index"
						class="movie_slide"
					>
						<NuxtLink class="card" :to="`/movies/${movie.id}`">
							<span class="slide_index">{{ index + 1 }}</span>
							<img class="movie_poster" :src="movie.posterUrl" alt="Poster" />
						</NuxtLink>
					</swiper-slide>
				</swiper-container>
			</ClientOnly>
			<!-- Используем обычный список для десктопной версии -->
			<div v-else class="grid">
				<NuxtLink
					class="card"
					:to="`/movies/${movie.id}`"
					v-for="(movie, index) in movies"
					:key="index"
				>
					<span>{{ index + 1 }}</span>
					<img class="movie_poster" :src="movie.posterUrl" alt="Poster" />
				</NuxtLink>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useMovieTop10 } from '~/storage/movieTop10'
import { useWindowSize } from '@vueuse/core'

const containerRef = ref(null)
// const containerClass = ref(false)
const { $viewport } = useNuxtApp()
const { width } = useWindowSize()

const containerClass = computed(() => {
	return $viewport.matches('mobile_small')
})

// Количество отображаемых слайдов на экране, включая десятичные значения
const slidesPerView = ref(0)

// Функция для обновления slidesPerView
const updateSlidesPerView = () => {
	const slideWidth = 224
	console.log(width.value)
	slidesPerView.value = width.value / slideWidth
}

onMounted(() => {
	updateSlidesPerView()

	window.addEventListener('resize', updateSlidesPerView)
})

onBeforeUnmount(() => {
	window.removeEventListener('resize', updateSlidesPerView)
})

interface Movie {
	id: number
	posterUrl: string
}

const store = useMovieTop10()
const { data } = useAsyncData<Movie[]>('movieTop10', async () => {
	await Promise.all([store.fetchMovieTop10()])
	return store.movieTop10
})

const movies = computed(() => data.value)
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
					width: 224px;
					.card {
						display: flex;
						width: 100%;
						padding: 20px; // отступ внутри карточки

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
