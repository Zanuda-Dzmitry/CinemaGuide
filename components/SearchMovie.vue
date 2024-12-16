<template>
	<div class="search-movie" :class="{ active: activeClass }">
		<button class="search-button" @click="toggleClassAndFocus" ref="searchBtn">
			<searchSvg class="search-svg" />
		</button>

		<input
			v-model="store.searchQuery"
			@input="onSearch"
			type="text"
			placeholder="Поиск"
			ref="searchInput"
			v-show="isInputVisible"
		/>
		<button class="close-button" @click="store.searchQuery = ''">
			<closeSvg class="close-svg" />
		</button>
		<SearchMovieModal class="search-modal" />
	</div>
</template>
<script setup lang="ts">
import { useMovies } from '~/storage/movie'
import searchSvg from '../assets/icons/search.svg?component'
import closeSvg from '../assets/icons/close.svg?component'

const { $viewport } = useNuxtApp()
const route = useRoute()
const store = useMovies()
const searchBtn = ref<HTMLButtonElement | null>(null)
const searchInput = ref<HTMLInputElement | null>(null)

const isInputVisible = computed(() => {
	return (
		activeClass.value ||
		$viewport.breakpoint.value === 'desktop' ||
		'tablet_landscape'
	)
})

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

const activeClass = ref(false)
const toggleClassAndFocus = () => {
	activeClass.value = !activeClass.value // Переключаем состояние активного класса
	if (activeClass.value) {
		nextTick(() => {
			searchInput.value?.focus() // Фокусируем инпут после его отображения
		})
	}
}

// Обработка кликов вне инпута
const handleClick = (event: MouseEvent) => {
	const inputElement = searchInput.value
	const btnElement = searchBtn.value

	// Проверяем, был ли клик вне инпута и элемента svg
	if (
		inputElement &&
		!inputElement.contains(event.target as Node) &&
		btnElement &&
		!btnElement.contains(event.target as Node)
	) {
		store.searchQuery = '' // Очищаем значение, если клик был вне инпута
		activeClass.value = false // Скрываем инпут
	}
}

// Добавляем обработчик событий при монтировании компонента
onMounted(() => {
	document.addEventListener('click', handleClick)
})

// Удаляем обработчик событий при размонтировании компонента
onBeforeUnmount(() => {
	document.removeEventListener('click', handleClick)
})
</script>
<style lang="scss">
@use '../assets/scss/main';
@use '../assets/scss/variables';
@use '../assets/scss/mixin';

.header {
	.search-movie {
		position: relative;
		flex: 1;
		max-width: 559px;
		column-gap: 12px;
		display: flex;
		align-items: center;
		background: variables.$grey_color_3;
		border-radius: 8px;
		padding: 12px 16px;

		.search-button {
			@include mixin.btn_reset;
			pointer-events: none; // Отключаем взаимодействие на больших экранах
			cursor: default;
		}

		.search-svg {
			fill: variables.$white_color;
			fill-opacity: 0.5;
		}

		input {
			width: 100%;
			background: variables.$grey_color_3;
			color: variables.$white_color;
			border: none;
			border-radius: 8px;
			font-size: 18px;
			line-height: 24px;
			font-weight: 400;
		}

		.close-button {
			@include mixin.btn_reset;
			.close-svg {
				width: 13px;
				height: 13px;
				fill: variables.$white_color;
				fill-opacity: 0.5;
			}
		}

		.search-modal {
			width: 100%;
			position: absolute;
			top: 72px;
			left: 0;
		}
	}
}

.tablet,
.mobile,
.mobile_small {
	.search-movie {
		flex: 0;
		background: transparent;
		padding: 0;
		column-gap: 0;
		.search-button {
			pointer-events: all;
			cursor: pointer;
			.search-svg {
				fill-opacity: 1;
			}
		}
		.close-button {
			display: none;
		}

		.search-modal {
			top: 60px;
		}
	}

	.active {
		position: absolute;
		right: 20px;
		flex: 1;
		width: 335px;
		background: variables.$grey_color_3;
		padding: 12px 16px;
		column-gap: 12px;

		input {
			display: block;
		}
		.close-button {
			display: block;
		}
	}
}
</style>
