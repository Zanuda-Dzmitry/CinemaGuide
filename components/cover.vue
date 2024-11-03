<template>
	<div class="movie container">
		<div class="movie_left">
			<div class="movie_top">
				<span class="movie_rating">
					<icon_star />
					{{ rating }}
				</span>
				<span>{{ year }}</span>
				<span v-for="genre in genres" :key="genre">{{ genre }}</span>
				<span>{{ runtime }} min</span>
			</div>
			<div class="movie_center">
				<h1>{{ title }}</h1>
				<p>{{ plot }}</p>
			</div>
			<div class="movie_bottom">
				<NuxtLink class="movie_trailer" :to="`/movies/${id}`">
					Треилер</NuxtLink
				>
				<NuxtLink :to="`/movies/${id}`"> О фильме</NuxtLink>
				<button>
					<favorites />
				</button>
				<button><update /></button>
			</div>
		</div>
		<div class="movie_right">
			<img v-if="data" class="movie_poster" :src="poster" alt="Poster" />
		</div>
	</div>
</template>

<script lang="ts" setup>
import { useMovieRandom } from '../storage/movieRandom'
import favorites from '../assets/icons/favorites.svg?component'
import update from '../assets/icons/update.svg?component'
import icon_star from '../assets/icons/icon_star.svg?component'

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
		movieId: store.movieId,
	}
})
const title = computed(() => data.value?.movieTitle)
const plot = computed(() => data.value?.moviePlot)
const rating = computed(() => data.value?.movieRating)
const year = computed(() => data.value?.movieYear)
const genres = computed(() => data.value?.movieGenre)
const runtime = computed(() => data.value?.movieRuntime)
const poster = computed(() => data.value?.moviePoster)
const id = computed(() => data.value?.movieId)
</script>

<style lang="scss" scoped>
@import '../assets/scss/main.scss';
.movie {
	position: relative;
	display: flex;
	padding-bottom: 122px;

	.movie_left {
		padding-top: 106px;
		width: 600px;
		height: 100%;

		.movie_top {
			display: flex;
			align-items: center;
			column-gap: 16px;
			padding-bottom: 16px;
			span {
				font-size: 18px;
				line-height: 24px;
				font-weight: 700;
				color: $grey_color;
			}
			.movie_rating {
				display: flex;
				align-items: center;
				column-gap: 4px;
				background: $green_color;
				padding: 4px 12px;
				border-radius: 16px;
			}
		}

		.movie_center {
			padding-bottom: 60px;

			h1 {
				color: $white_color;
				padding-bottom: 16px;
				font-size: 48px;
				line-height: 56px;
				font-weight: 700;
			}

			p {
				color: $grey_color;
				font-size: 24px;
				line-height: 32px;
				font-weight: 400;
			}
		}

		.movie_bottom {
			display: flex;
			align-items: center;
			column-gap: 16px;

			.movie_trailer {
				background: $brand-color;
			}
			a {
				background: #333333;
				border-radius: 28px;
				border: 0;
				padding: 16px 48px;
				font-size: 18px;
				font-weight: 700;
				line-height: 24px;
				color: $white_color;
			}
			button {
				background: #333333;
				border-radius: 28px;
				border: 0;
				padding: 15px 24px;
				svg {
					width: 24px;
					height: 24px;
				}
			}
		}
	}

	.movie_right {
		z-index: -1;
		position: absolute;
		right: 0;
		top: 0;
		width: 900px;
		height: 100%;

		.movie_poster {
			position: absolute;
			top: -96px;
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
		&::after {
			background: linear-gradient(
				90deg,
				#000,
				rgba(0, 0, 0, 0.5) 20.41%,
				transparent
			);
			content: '';
			height: 100%;
			left: 0;
			pointer-events: none;
			position: absolute;
			top: 0;
			width: 100%;
		}
	}
}
</style>
