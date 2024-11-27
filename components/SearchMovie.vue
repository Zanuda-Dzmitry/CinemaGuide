<template>
	<div class="search-movie">
		<div class="">
			<searchSvg />
			<input
				v-model="store.searchQuery"
				@input="onSearch"
				type="text"
				placeholder="Поиск"
			/>
		</div>
		<SearchMovieModal class="search-modal" />
	</div>
</template>
<script setup lang="ts">
import { useMovies } from '~/storage/movie'
import searchSvg from '../assets/icons/search.svg?component'

const route = useRoute()
const store = useMovies()

const onSearch = async () => {
	// Если строка поиска очищена, сбрасываем страницу и очищаем результаты
	if (store.searchQuery === '') {
		store.clearMovies() // Вызываем метод очистки в хранилище
		return
	}
	await store.loadMovies(5, 1, store.searchQuery, '') // Загружаем все фильмы
}

watch(
	() => route.path,
	() => {
		store.clearMovies() // Очищаем результаты
		store.searchQuery = '' // Очищаем строку поиска
	}
)
</script>
<style lang="scss">
@use '../assets/scss/main';
@use '../assets/scss/variables';

.search-movie {
	position: relative;
	column-gap: 16px;
	width: 496px;

	svg {
		position: absolute;
		left: 16px;
		top: 12px;
	}

	input {
		width: 100%;
		height: 48px;
		background: variables.$grey_color_3;
		color: variables.$white_color;
		border: none;
		border-radius: 8px;
		padding: 12px 16px 12px 58px;
		font-size: 18px;
		line-height: 24px;
		font-weight: 400;
	}
}
</style>
