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

		<div>
			<div v-if="isLoading">Загрузка...</div>
			<div
				class="movie-list-container"
				v-if="store.filteredMovies.length !== 0"
			>
				<div class="movie-list">
					<NuxtLink
						class="movie-item"
						v-for="movie in store.filteredMovies"
						:key="movie.id"
						:to="`/movies/${movie.id}`"
					>
						<NuxtImg :src="movie.posterUrl" alt="Backdrop" />
						<div class="movie-content">
							<span class="rating">
								<icon_starSvg />
								{{ movie.tmdbRating.toFixed(1) }}</span
							>
							<span>{{ movie.releaseYear }}</span>
							<span v-for="genre in movie.genres" :key="genre">{{
								genre
							}}</span>
							<span>{{ movie.runtime }} min</span>
						</div>
						<h3>{{ movie.title }}</h3>
					</NuxtLink>
				</div>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
import { useMovies } from '~/storage/movie'
import searchSvg from '../assets/icons/search.svg?component'
import icon_starSvg from '../assets/icons/icon_star.svg?component'

const route = useRoute()
const store = useMovies()
const isLoading = ref(false)

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
<style lang="scss" scoped>
@import '../assets/scss/main.scss';

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
		background: $grey_color_3;
		color: $white_color;
		border: none;
		border-radius: 8px;
		padding: 12px 16px 12px 58px;
		font-size: 18px;
		line-height: 24px;
		font-weight: 400;
	}
}

.movie-list-container {
	position: absolute;
	top: 72px;
	padding: 16px 16px 16px 16px;
	width: 100%;
	background-color: $grey_color_3;
	border-bottom-left-radius: 8px;
	border-bottom-right-radius: 8px;

	.movie-list {
		display: flex;
		flex-direction: column;
		gap: 32px;

		.movie-item {
			position: relative;
			display: flex;
			flex-direction: column;
			row-gap: 8px;
			color: $white_color;
			padding-left: 56px;

			img {
				position: absolute;
				left: 0;
				width: 40px;
				height: 52px;
			}
			.movie-content {
				display: flex;
				gap: 8px;
				font-size: 14px;
				line-height: 20px;
				font-weight: 400;

				.rating {
					position: relative;
					display: flex;
					align-items: center;
					column-gap: 4px;
					background: $green_color;
					padding: 2px 8px 2px 22px;
					border-radius: 16px;

					svg {
						width: 9.51px;
						height: 9.05px;
						position: absolute;
						left: 8px;
						top: 8px;
					}
				}
			}
			h3 {
				font-size: 18px;
				line-height: 24px;
				font-weight: 700;
			}
		}
	}
}
</style>
