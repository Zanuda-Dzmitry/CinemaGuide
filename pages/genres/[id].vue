<template>
	<div class="container">
		<section class="genre">
			<div class="genre_nav">
				<NuxtLink class="genre_nav-link" :to="`/genres`">
					<back />
				</NuxtLink>
				<h2 class="genre_title">{{ capitalizeFirstLetter(selectedGenre) }}</h2>
			</div>
			<div class="genre_wrapper">
				<NuxtLink
					class="genre_link"
					v-for="movie in movies"
					:key="movie.id"
					:to="`/movies/${movie.id}`"
				>
					<NuxtImg :src="movie.posterUrl" />
				</NuxtLink>
			</div>
			<div v-if="hasMoreMovies" class="genre_more-wrapper">
				<button
					:disabled="isLoading"
					class="genre_more"
					@click="loadMoreMovies"
				>
					{{ isLoading ? 'Загрузка...' : 'Показать еще' }}
				</button>
			</div>
		</section>
	</div>
</template>

<script setup lang="ts">
import { useMovies } from '~/storage/movie'
import back from '../assets/icons/back.svg?component'

// Используем store фильмов
const store = useMovies()
const route = useRoute()
const selectedGenre = computed(() => route.params.id as string)

const movies = computed(() => store.movies)
const PAGE_SIZE = 15
const page = ref(1)
const hasMoreMovies = ref(true)
const isLoading = ref(false)

// Установка заголовка страницы
useHead({
	title: () => `Жанр: ${selectedGenre.value}`,
})

onMounted(async () => {
	await store.loadMovies(PAGE_SIZE, page.value, '', selectedGenre.value) // Загружаем фильмы
})

// Приводим заголовок в верхний регистр
function capitalizeFirstLetter(str: string) {
	if (!str) return str // Проверка на пустую строку
	return str.charAt(0).toUpperCase() + str.slice(1)
}

// Функция загрузки дополнительных фильмов
const loadMoreMovies = async () => {
	if (!hasMoreMovies.value) return // Если фильмов больше нет, не продолжаем
	isLoading.value = true // Устанавливаем состояние загрузки
	page.value++ // Увеличиваем номер страницы
	await store.loadMovies(PAGE_SIZE, page.value, '', selectedGenre.value)
	isLoading.value = false // Отключаем состояние загрузки
}

// Очистка данных при выходе со страницы
onBeforeUnmount(() => {
	store.movies = [] // Очищаем массив фильмов
	page.value = 1 // Сбрасываем номер страницы
})
</script>

<style lang="scss" scoped>
@use '../assets/scss/main';
@use '../assets/scss/variables';
@use '../assets/scss/mixin';

.genre {
	padding-top: clamp(1.5rem, 0.136rem + 5.822vw, 5.375rem);
	padding-bottom: clamp(2.5rem, -0.141rem + 11.268vw, 10rem);

	.genre_nav {
		display: flex;
		align-items: center;
		column-gap: 18px;
		padding-bottom: 64px;

		.genre_nav-link {
			display: flex;
			align-items: center;
			justify-content: center;
			width: clamp(2rem, 1.824rem + 0.751vw, 2.5rem);
			height: clamp(2rem, 1.824rem + 0.751vw, 2.5rem);

			svg {
				width: clamp(0.625rem, 0.559rem + 0.282vw, 0.813rem);
				height: clamp(1.063rem, 0.974rem + 0.376vw, 1.313rem);
			}
		}
		.genre_title {
			@include mixin.title;
			color: variables.$white_color;
		}
	}

	.genre_wrapper {
		display: grid;
		justify-content: center;
		grid-template-columns: repeat(auto-fill, 224px);
		gap: clamp(1.5rem, 0.62rem + 3.756vw, 4rem)
			clamp(1.5rem, 1.148rem + 1.502vw, 2.5rem);
		padding-bottom: clamp(2.5rem, 1.972rem + 2.254vw, 4rem);

		.genre_link {
			box-shadow: 0px 0px 80px 0px rgba(255, 255, 255, 0.33);
			height: 336px;
			border-radius: 24px;
			background-color: variables.$white_color;
			img {
				border-radius: 24px;
				object-fit: cover;
			}
		}
	}

	.genre_more-wrapper {
		display: flex;
		justify-content: center;
		.genre_more {
			color: variables.$white_color;
			background: variables.$brand_color;
			border-radius: 28px;
			padding: 16px 48px;
			font-size: 18px;
			font-weight: 700;
			line-height: 24px;
			border: none;
		}
	}
}

.mobile_small {
	.genre {
		.genre_wrapper {
			grid-template-columns: repeat(auto-fill, 335px);

			.genre_link {
				height: 502px;
			}
		}
		.genre_more-wrapper {
			.genre_more {
				width: 100%;
			}
		}
	}
}
</style>
