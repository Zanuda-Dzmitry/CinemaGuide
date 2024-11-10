<template>
	<section class="genre">
		<div class="genre_nav">
			<NuxtLink class="genre_nav-link" :to="`/genres`">
				<back />
			</NuxtLink>
			<h2 class="genre_title">{{ selectedGenre }}</h2>
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
			<button :disabled="isLoading" class="genre_more" @click="loadMoreMovies">
				{{ isLoading ? 'Загрузка...' : 'Показать еще' }}
			</button>
		</div>
	</section>
</template>

<script setup lang="ts">
import { useMovies } from '~/storage/movie'
import back from '../assets/icons/back.svg?component'

// Используем store фильмов
const store = useMovies()
const route = useRoute()
const selectedGenre = computed(() => route.params.id as string)

const movies = computed(() => store.movies)
const PAGE_SIZE = 10
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
@import '../assets/scss/main.scss';
.genre {
	padding-top: 64px;

	.genre_nav {
		display: flex;
		align-items: center;
		column-gap: 18px;
		padding-bottom: 64px;

		.genre_nav-link {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 40px;
			height: 40px;
		}
		.genre_title {
			font-size: 48px;
			line-height: 56px;
			font-weight: 700;
			color: $white_color;
		}
	}

	.genre_wrapper {
		display: grid;
		grid-template-columns: repeat(auto-fill, 224px);
		gap: 64px 40px;
		padding-bottom: 64px;

		.genre_link {
			border: 1px solid rgba(255, 255, 255, 0.25);
			box-shadow: 0px 0px 80px 0px rgba(255, 255, 255, 0.33);
			height: 336px;
			border-radius: 24px;
			background-color: $white_color;
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
			color: $white_color;
			background: $brand_color;
			border-radius: 28px;
			padding: 16px 48px;
			font-size: 18px;
			font-weight: 700;
			line-height: 24px;
			border: none;
		}
	}
}
</style>
