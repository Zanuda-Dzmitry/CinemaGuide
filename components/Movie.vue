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
				<button @click="openVideoPlayer" class="movie_trailer">Треилер</button>
				<NuxtLink v-if="isHomePage" :to="`/movies/${id}`"> О фильме</NuxtLink>
				<button class="favorite_btn" @click="toggleFavorites(id.toString())">
					<favoritesSvg
						class="favorite"
						:class="{ favoriteFill: isFavorite }"
					/>
				</button>
				<button v-if="isHomePage" class="update_btn" @click="refreshMovie">
					<updateSvg class="update_svg" />
				</button>
			</div>
		</div>
		<div class="movie_right">
			<NuxtImg :src="backdrop" alt="Backdrop" />
		</div>
	</section>
	<VideoPlayer :videoId="videoId" :close="close" />
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
const videoId = ref('')

const props = defineProps<{
	id: number
	title: string
	plot: string
	rating: number
	year: number
	genres: string[]
	runtime: number
	backdrop: string
	youTubeId: string
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

const openVideoPlayer = () => {
	videoId.value = props.youTubeId
}

const close = () => {
	videoId.value = ''
}
</script>
<style lang="scss" scoped>
@use '../assets/scss/main';
@use '../assets/scss/variables';
@use '../assets/scss/mixin';

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
				color: variables.$grey_color;
			}
			.movie_rating {
				display: flex;
				align-items: center;
				column-gap: 4px;
				background: variables.$green_color;
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
				color: variables.$white_color;
				padding-bottom: 16px;
				font-size: 48px;
				line-height: 56px;
				font-weight: 700;
			}

			p {
				color: variables.$grey_color;
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
				background: variables.$brand_color;
				border-radius: 28px;
				border: 0;
				padding: 16px 48px;
				font-size: 18px;
				font-weight: 700;
				line-height: 24px;
				color: variables.$white_color;

				@include mixin.btn_hoverFocus_1;
			}
			a {
				background: #333333;
				border-radius: 28px;
				border: 0;
				padding: 16px 48px;
				font-size: 18px;
				font-weight: 700;
				line-height: 24px;
				color: variables.$white_color;

				&:hover {
					background: variables.$grey_color_hover;
					color: variables.$grey_color_2;
					transition: background 0.3s ease-in-out, color 0.3s ease-in-out;
				}
				&:focus {
					background: variables.$white_color;
					color: variables.$black_color;
					transition: background 0.3s ease-in-out, color 0.3s ease-in-out;
				}
			}

			.update_btn,
			.favorite_btn {
				background: variables.$grey_background;
				border-radius: 28px;
				border: 0;
				padding: 15px 24px;

				svg {
					width: 24px;
					height: 24px;
				}

				.favorite {
					fill: transparent;
					stroke: variables.$white_color;
				}
				.favoriteFill {
					fill: variables.$brand_color_2;
					stroke: variables.$brand_color_2;
				}
				.update_svg {
					fill: variables.$white_color;
				}
			}

			.favorite_btn {
				&:hover {
					background: variables.$grey_color_hover;
					transition: background 0.3s ease-in-out, stroke 0.3s ease-in-out;

					.favorite {
						stroke: variables.$grey_color_2;
					}
				}
				&:focus {
					background: variables.$white_color;
					transition: background 0.3s ease-in-out, stroke 0.3s ease-in-out;

					.favorite {
						stroke: variables.$black_color;
					}
				}
			}
			.update_btn {
				&:hover {
					background: variables.$grey_color_hover;
					transition: background 0.3s ease-in-out, fill 0.3s ease-in-out;

					.update_svg {
						fill: variables.$grey_color_2;
					}
				}
				&:focus {
					background: variables.$white_color;
					transition: background 0.3s ease-in-out, fill 0.3s ease-in-out;

					.update_svg {
						fill: variables.$black_color;
					}
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
			background: variables.$gradient_color;
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
