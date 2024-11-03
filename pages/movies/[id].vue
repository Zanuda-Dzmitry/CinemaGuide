<template>
	<section class="movie container">
		<div class="movie_left">
			<div class="movie_left-top">
				<span class="movie_rating">
					<icon_star />
					{{ rating }}</span
				>
				<span>{{ year }}</span>
				<span v-for="genre in genres" :key="genre">{{ genre }}</span>
				<span>{{ runtime }} min</span>
			</div>
			<div class="movie_left-center">
				<h2>{{ title }}</h2>
				<p>{{ plot }}</p>
			</div>
			<div class="movie_left-bottom">
				<NuxtLink class="movie_trailer" :to="`/movies/${id}`">
					Треилер</NuxtLink
				>
				<button>
					<favorites />
				</button>
			</div>
		</div>
		<div class="movie_right">
			<NuxtImg :src="backdrop" alt="Backdrop" />
		</div>
	</section>
	<section class="movie_about container">
		<div class="movie_info">
			<h2>О фильме</h2>
			<ul>
				<li>
					<span class="movie_info-title"> Язык оригинала </span>
					<span class="movie_info-value">{{ language }}</span>
				</li>
				<li>
					<span class="movie_info-title"> Бюджет </span>
					<span class="movie_info-value">{{ budget }}</span>
				</li>
				<li>
					<span class="movie_info-title"> Выручка </span>
					<span class="movie_info-value">{{ revenue }}</span>
				</li>
				<li>
					<span class="movie_info-title"> Режиссёр </span>
					<span class="movie_info-value">{{ director }}</span>
				</li>
				<li>
					<span class="movie_info-title"> Продакшен </span>
					<span class="movie_info-value">{{ production }}</span>
				</li>
				<li>
					<span class="movie_info-title"> Награды </span>
					<span class="movie_info-value">{{ awardsSummary }}</span>
				</li>
			</ul>
		</div>
	</section>
</template>

<script lang="ts" setup>
import { useMovieId } from '~/storage/movieId'
import icon_star from '../assets/icons/icon_star.svg?component'
import favorites from '../assets/icons/favorites.svg?component'

const route = useRoute()
const id = computed(() => route.params.id as string)

const store = useMovieId()

const { data } = useAsyncData('movieId', async () => {
	await Promise.all([store.fetchMovieId(id.value)])
	return {
		movieTitle: store.movieTitle,
		moviePlot: store.moviePlot,
		movieRating: store.movieRating,
		movieYear: store.movieYear,
		movieGenre: store.movieGenre,
		movieRuntime: store.movieRuntime,
		moviePoster: store.moviePoster,
		movieBackdrop: store.movieBackdrop,
		movieBudget: store.movieBudget,
		movieLanguage: store.movieLanguage,
		movieRevenue: store.movieRevenue,
		movieDirector: store.movieDirector,
		movieProduction: store.movieProduction,
		movieAwardsSummary: store.movieAwardsSummary,
	}
})
const title = computed(() => data.value?.movieTitle)
const plot = computed(() => data.value?.moviePlot)
const rating = computed(() => data.value?.movieRating)
const year = computed(() => data.value?.movieYear)
const genres = computed(() => data.value?.movieGenre)
const runtime = computed(() => data.value?.movieRuntime)
const poster = computed(() => data.value?.moviePoster)
const backdrop = computed(() => data.value?.movieBackdrop)
const budget = computed(() => data.value?.movieBudget)
const language = computed(() => data.value?.movieLanguage)
const revenue = computed(() => data.value?.movieRevenue)
const director = computed(() => data.value?.movieDirector)
const production = computed(() => data.value?.movieProduction)
const awardsSummary = computed(() => data.value?.movieAwardsSummary)

useHead({
	title: () => `${data.value?.movieTitle}`,
})
</script>

<style lang="scss" scoped>
@import '../assets/scss/main.scss';
.movie {
	position: relative;
	padding-bottom: 122px;
	min-height: 624px;
	.movie_left {
		padding-top: 106px;
		width: 600px;

		.movie_left-top {
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

		.movie_left-center {
			padding-bottom: 60px;

			h2 {
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

		.movie_left-bottom {
			display: flex;
			align-items: center;
			column-gap: 16px;

			.movie_trailer {
				background: $brand_color;
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
				background: $grey_background;
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
		height: 680px;
		z-index: -1;
		position: absolute;
		right: 0;
		top: 0;
		width: 900px;

		img {
			position: absolute;
			top: -96px;
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
		&::after {
			background: $gradient_color;
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
.movie_about {
	.movie_info {
		h2 {
			font-size: 40px;
			line-height: 48px;
			font-weight: 700;
			color: $white_color;
			padding-bottom: 64px;
		}

		ul {
			display: flex;
			flex-direction: column;
			row-gap: 24px;
		}
		li {
			display: flex;
			column-gap: 8px;

			color: $grey_color;

			.movie_info-title {
				display: inline-flex;
				column-gap: 8px;
				white-space: nowrap;
				max-width: 320px;
				width: 100%;
				align-items: baseline;

				&::after {
					content: '';
					width: 100%;
					border-bottom: 1px dashed $grey_color;
				}
			}
		}
	}
}
</style>
