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
				<h2>{{ title }}</h2>
				<p>{{ plot }}</p>
			</div>
			<div class="movie_bottom">
				<button>треилер</button>
				<button>добавить в избранное</button>
			</div>
		</div>
		<div class="movie_right">
			<img class="movie_poster" :src="poster" alt="Poster" />
		</div>
		<div class="content">
			<h2>О фильме</h2>
			<ul class="grid">
				<li class="card"><span> Язык оригинала </span> {{ language }}</li>
				<li class="card"><span>Бюджет</span> {{ budget }}</li>
				<li class="card"><span> Выручка </span> {{ revenue }}</li>
				<li class="card"><span> Режиссёр </span> {{ director }}</li>
				<li class="card"><span> Продакшен </span> {{ production }}</li>
				<li class="card"><span> Награды </span> {{ awardsSummary }}</li>
			</ul>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { useMovieId } from '~/storage/movieId'

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
h2 {
	color: $white_color;
}
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
.content {
	.grid {
		.card {
			color: $white_color;

			span {
				color: $white_color;
			}
		}
	}
}
</style>
