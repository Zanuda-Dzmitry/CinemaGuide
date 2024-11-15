<template>
	<section class="movie container">
		<div class="movie_left">
			<div class="movie_left-top">
				<span class="movie_rating">
					<icon_star />
					{{ rating.toFixed(1) }}</span
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
				<NuxtLink class="movie_trailer"> Треилер</NuxtLink>
				<NuxtLink v-if="isHomePage" :to="`/movies/${id}`"> О фильме</NuxtLink>
				<button @click="toggleFavorites(id.toString())">
					<favoritesSvg
						class="favorite"
						:class="{ favoriteFill: isFavorite }"
					/>
				</button>
				<button v-if="isHomePage" class="update" @click="refreshMovie">
					<updateSvg />
				</button>
			</div>
		</div>
		<div class="movie_right">
			<NuxtImg :src="backdrop" alt="Backdrop" />
		</div>
	</section>
</template>
<script lang="ts" setup>
import icon_star from '../assets/icons/icon_star.svg?component'
import favoritesSvg from '../assets/icons/icon_favorite.svg?component'
import updateSvg from '../assets/icons/update.svg?component'
import { useAuthStore } from '~/storage/auth'
import modalState from '~/utils/modalStore'
import { useMovieRandom } from '~/storage/movieRandom'

const randomStore = useMovieRandom()
const route = useRoute()
const authStore = useAuthStore()

const props = defineProps<{
	id: number
	title: string
	plot: string
	rating: number
	year: number
	genres: string[]
	runtime: number
	backdrop: string
}>()

const isHomePage = computed(() => {
	return route.path === '/'
})

const user = computed(() => authStore.user)
const isFavorite = computed(() =>
	user.value?.favorites.includes(props.id.toString())
)

const toggleFavorites = async (movieId: string) => {
	if (user.value) {
		if (!isFavorite.value) {
			await authStore.addFavorites(movieId)
		} else {
			await authStore.removeFavorites(movieId)
		}
	} else {
		modalState.toggleModal()
	}
}

// Метод для обновления данных о фильме
const refreshMovie = async () => {
	await randomStore.refreshMovieData()
}
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

				svg {
					width: 16px;
					height: 16px;
				}
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

				.favorite {
					fill: transparent;
					stroke: $white_color;
				}
				.favoriteFill {
					fill: $brand_color_2;
					stroke: $brand_color_2;
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
</style>
