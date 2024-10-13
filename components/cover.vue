<template>
	<div class="movie container">
		<div class="movie_left">
			<div class="movie_top">
				<span>{{ rating }}</span>
				<span>{{ year }}</span>
				<span v-for="genre in genres" :key="genre">{{ genre }}</span>
				<span>{{ runtime }} min</span>
			</div>
			<div class="movie_center">
				<h1>{{ title }}</h1>
				<p>{{ plot }}</p>
			</div>
			<div class="movie_bottom">
				<button>треилер</button>
				<button>о фильме</button>
				<button>добавить в избранное</button>
				<button>обновить</button>
			</div>
		</div>
		<div class="movie_right">
			<img v-if="data" class="movie_poster" :src="poster" alt="Poster" />
		</div>
	</div>
</template>

<script lang="ts" setup>
import { useMovieRandom } from '../storage/movieRandom'

const store = useMovieRandom()

const { data } = useAsyncData('movieRandom', async () => {
	await Promise.all([store.fetchMovieRandom()])
	return {
		movieTitle: store.movieTitle,
		moviePlot: store.moviePlot,
		movieRating: store.movieRating,
		movieYear: store.movieYear,
		movieGenre: store.movieGenre,
		movieRuntime: store.movieRuntime,
		moviePoster: store.moviePoster,
	}
})

const title = computed(() => data.value?.movieTitle)
const plot = computed(() => data.value?.moviePlot)
const rating = computed(() => data.value?.movieRating)
const year = computed(() => data.value?.movieYear)
const genres = computed(() => data.value?.movieGenre)
const runtime = computed(() => data.value?.movieRuntime)
const poster = computed(() => data.value?.moviePoster)
</script>

<style lang="scss" scoped>
@import '../assets/scss/main.scss';
.movie {
	position: relative;
	height: 680px;
	display: flex;

	.movie_left {
		width: 100%;
		height: 100%;

		.movie_top {
			color: $white_color;
		}

		.movie_center {
			h1 {
				color: $white_color;
			}

			p {
				color: $white_color;
			}
		}
	}

	.movie_right {
		position: absolute;
		right: 0;
		top: 0;
		width: 900px;
		height: 100%;

		.movie_poster {
			position: absolute;
			// top: -96px;
			z-index: -1;
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
	}
}
</style>
