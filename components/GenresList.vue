<template>
	<div class="container">
		<Loading v-if="isLoading" />
		<div class="error_global" v-if="error">
			Произошла ошибка при загрузки жанров: {{ error.message }}
		</div>
		<section class="genre" v-if="data">
			<h2 class="genre_title">Жанры фильмов</h2>
			<div class="genre_wrapper">
				<NuxtLink
					class="genre_link"
					v-for="(genre, index) in propsGenres.genres"
					:key="index"
					:to="`/genres/${genre}`"
				>
					<div class="genre_content">
						<h3 class="genre_content-title">{{ genre }}</h3>
					</div>
					<NuxtImg :src="getPoster(`${genre}`)" />
				</NuxtLink>
			</div>
		</section>
	</div>
</template>

<script setup lang="ts">
import { genrePosters } from '~/constants'
import { useMovieGenre } from '../storage/movieGenre'

const { start, finish } = useLoadingIndicator()

const {
	data: data,
	status,
	error,
} = useAsyncData('movieGenre', async () => {
	start()
	try {
		const store = useMovieGenre()
		await store.fetchMovieGenre()
		return store
	} finally {
		finish()
	}
})

const isLoading = computed(() => status.value === 'pending')
const propsGenres = computed(() => ({ genres: data.value?.movieGenre ?? [] }))
const getPoster = (poster: string | number) => genrePosters[poster] ?? ''
</script>

<style lang="scss" scoped>
@use '../assets/scss/main';
@use '../assets/scss/variables';
@use '../assets/scss/mixin';

.genre {
	padding-top: clamp(1.5rem, 0.136rem + 5.822vw, 5.375rem);
	padding-bottom: clamp(2.5rem, -0.141rem + 11.268vw, 10rem);

	.genre_title {
		@include mixin.title;
		color: variables.$white_color;
		padding-bottom: clamp(2.5rem, 1.972rem + 2.254vw, 4rem);
	}

	.genre_wrapper {
		display: grid;
		justify-content: center;
		grid-template-columns: repeat(auto-fill, 290px);
		gap: clamp(1.5rem, 0.62rem + 3.756vw, 4rem)
			clamp(1.5rem, 1.148rem + 1.502vw, 2.5rem);

		.genre_link {
			position: relative;
			height: 304px;
			box-shadow: 0px 0px 80px 0px rgba(255, 255, 255, 0.33);
			border-radius: 24px;
			background-color: variables.$white_color;

			.genre_content {
				position: absolute;
				bottom: 0;
				left: 0;
				width: 100%;
				height: 84px;
				display: flex;
				align-items: center;
				justify-content: center;
				background: variables.$black_color;
				border-radius: 0 0 24px 24px;

				.genre_content-title {
					font-size: 24px;
					font-weight: 700;
					line-height: 32px;
					color: variables.$white_color;
				}
			}

			img {
				border-radius: 24px;

				height: 100%;
				object-fit: cover;
			}
		}
	}
}

.mobile_small {
	.genre {
		.genre_wrapper {
			grid-template-columns: repeat(auto-fill, 335px);
		}
	}
}
</style>
