<template>
	<div class="container">
		<Loading v-if="isLoading" />
		<div class="error_global" v-if="error">
			Произошла ошибка при загрузке фильма: {{ error.message }}
		</div>
		<section class="movie" v-if="safeMovie">
			<div class="movie_backdrop">
				<NuxtImg :src="safeMovie.backdropUrl" alt="Backdrop" />
			</div>
			<div class="movie_content">
				<div class="movie_content-top">
					<ColorChanger
						v-if="safeMovie"
						class="movie_rating"
						:rating="safeMovie.tmdbRating"
						customClass="star_svg"
					/>
					<span>{{ safeMovie.releaseYear }}</span>
					<span v-for="genre in safeMovie.genres" :key="genre">{{
						genre
					}}</span>
					<span>{{ convertMinutesToHoursAndMinutes(safeMovie.runtime) }}</span>
				</div>
				<div class="movie_content-center">
					<h2>{{ safeMovie.title }}</h2>
					<p>{{ safeMovie.plot }}</p>
				</div>
				<div
					class="movie_content-bottom"
					:class="{ 'page-movie': !isHomePage, 'page-cover': isHomePage }"
				>
					<button @click="openVideoPlayer" class="movie_trailer">
						Треилер
					</button>
					<div class="movie_line">
						<NuxtLink v-if="isHomePage" :to="`/movies/${safeMovie.id}`">
							О фильме</NuxtLink
						>
						<button class="favorite_btn" @click="toggleFavorites(safeMovie.id)">
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
			</div>
		</section>
	</div>
	<VideoPlayer
		v-if="safeMovie"
		:videoId="videoId"
		:title="safeMovie.title"
		:close="close"
	/>
</template>
<script lang="ts" setup>
import favoritesSvg from '../assets/icons/icon_favorite.svg?component'
import updateSvg from '../assets/icons/update.svg?component'
import { useAuthStore } from '~/storage/auth'
import { useModalStore } from '@/storage/modal'
import type { Movie } from '../services/types/types'

const modalStore = useModalStore()
const route = useRoute()
const authStore = useAuthStore()
const videoId = ref('')

const props = defineProps<{
	movieProps: Movie | null
	isLoading: boolean
	error: { message: string } | null
	refreshMovie: () => void
}>()

const safeMovie = computed(() => props.movieProps || null)
const isHomePage = computed(() => {
	return route.path === '/'
})

const {
	data: userFavorites,
	refresh,
	error,
} = useAsyncData('userFavorites', async () => {
	if (authStore.user) {
		await authStore.profile()
		const user = authStore.user
		return user?.favorites || []
	}
})

// Проверяем, является ли фильм избранным
const isFavorite = computed(
	() =>
		userFavorites.value?.includes(safeMovie.value?.id.toString() || '') || false
)
// Переключение избранного
const toggleFavorites = async (movieId: string) => {
	if (authStore.user) {
		try {
			if (!isFavorite.value) {
				await authStore.addFavorites(movieId)
			} else {
				await authStore.removeFavorites(movieId)
			}
			// Обновим список избранных после добавления/удаления
			await refresh()
		} catch (error) {
			console.error('Ошибка при добавления/удаления в избранное', error)
		}
	} else {
		modalStore.open()
	}
}

const openVideoPlayer = () => {
	if (safeMovie.value) {
		videoId.value = safeMovie.value?.trailerYouTubeId || ''
	}
}

const close = () => {
	videoId.value = ''
}
</script>
<style lang="scss">
@use '../assets/scss/main';
@use '../assets/scss/variables';
@use '../assets/scss/mixin';

.movie {
	position: relative;
	padding-top: clamp(1.5rem, -0.305rem + 7.7vw, 6.625rem);
	padding-bottom: clamp(1.5rem, -0.657rem + 9.202vw, 7.625rem);
	.movie_content {
		max-width: 600px;

		.movie_content-top {
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			column-gap: 16px;
			padding-bottom: clamp(0.8rem, 0.73rem + 0.3vw, 1rem);
			span {
				@include mixin.span_text;
				color: variables.$grey_color;
			}
			.movie_rating {
				display: flex;
				align-items: center;
				column-gap: 4px;
				padding: 4px 12px;
				border-radius: 16px;

				.star_svg {
					width: 16px;
					height: 16px;
					position: none;
				}
			}
		}

		.movie_content-center {
			padding-bottom: clamp(2rem, 1.384rem + 2.629vw, 3.75rem);

			h2 {
				color: variables.$white_color;
				padding-bottom: clamp(0.8rem, 0.73rem + 0.3vw, 1rem);
				@include mixin.title;
			}

			p {
				color: variables.$grey_color;
				@include mixin.text;
			}
		}

		.movie_content-bottom {
			align-items: center;
			gap: 16px;
			display: flex;
			flex-wrap: wrap;

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

			.movie_line {
				display: flex;
				column-gap: 16px;
				a {
					background: variables.$grey_background;
					border-radius: 28px;
					border: 0;
					padding: 16px clamp(2rem, 1.648rem + 1.502vw, 3rem);
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
					padding: 15px clamp(1.125rem, 1.037rem + 0.376vw, 1.375rem);

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
	}

	.movie_backdrop {
		position: absolute;
		top: -96px;
		right: -80px;
		width: 100%;
		height: 100%;
		z-index: -1;

		img {
			position: absolute;
			object-fit: cover;
			height: 100%;
		}
		&::after {
			background: variables.$gradient_color;
			content: '';
			width: 100%;
			height: 100%;
			pointer-events: none;
			position: absolute;
		}
	}
}

.tablet_landscape,
.tablet,
.mobile {
	.movie {
		.movie_backdrop {
			right: -20px;
		}
	}
}

.tablet,
.mobile,
.mobile_small {
	.movie {
		.movie_backdrop {
			top: 0;
			right: 20px;

			&::after {
				background: variables.$gradient_color_2;
			}
		}
	}
}

.mobile_small {
	.movie {
		padding-top: 0;
		.movie_backdrop {
			position: relative;

			img {
				position: sticky;
			}
			&::after {
				left: 0;
			}
		}
		.movie_content {
			padding-top: 24px;

			.page-movie {
				.movie_trailer {
					flex: 1;
				}
			}

			.page-cover {
				.movie_trailer {
					width: 100%;
				}
				.movie_line {
					justify-content: space-between;
					width: 100%;
				}
			}
		}
	}
}
</style>
