<template>
	<div>
		<div v-if="isLoading">Загрузка...</div>
		<div class="movie-list-container" v-if="store.filteredMovies.length !== 0">
			<div class="movie-list">
				<NuxtLink
					class="movie-item"
					v-for="movie in store.filteredMovies"
					:key="movie.id"
					:to="`/movies/${movie.id}`"
				>
					<NuxtImg :src="movie.posterUrl" alt="Backdrop" />
					<div class="movie-content">
						<ColorChanger
							class="rating"
							:rating="movie.tmdbRating"
							customClass="star_svg"
						/>
						<span>{{ movie.releaseYear }}</span>
						<span v-for="genre in movie.genres" :key="genre">{{ genre }}</span>
						<span>{{ convertMinutesToHoursAndMinutes(movie.runtime) }} </span>
					</div>
					<h3>{{ movie.title }}</h3>
				</NuxtLink>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { useMovies } from '~/storage/movie'

const store = useMovies()
const isLoading = ref(false)
</script>

<style lang="scss" scoped>
@use '../assets/scss/main';
@use '../assets/scss/variables';

.movie-list-container {
	width: 100%;
	padding: 16px 16px 16px 16px;
	background-color: variables.$grey_color_3;
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
			color: variables.$white_color;
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
					padding: 2px 8px 2px 22px;
					border-radius: 16px;

					.star_svg {
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
