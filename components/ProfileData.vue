<template>
	<Profile>
		<template v-slot:favorites>
			<!-- Используем Swiper для мобильной версии -->
			<ClientOnly v-if="containerClass">
				<swiper-container
					class="movie_list"
					ref="containerRef"
					:loop="true"
					:slides-per-view="'auto'"
					:space-between="40"
					:slides-offset-before="20"
				>
					<swiper-slide
						class="movie_item"
						v-for="movie in movies"
						:key="movie.id"
						style="width: 224px"
					>
						<NuxtLink class="movie_link" :to="`/movies/${movie.id}`">
							<img :src="movie.poster" alt="Movie Poster" />
						</NuxtLink>
					</swiper-slide>
				</swiper-container>
			</ClientOnly>
			<!-- Используем обычный список для десктопной версии -->
			<ul v-else class="movie_list">
				<li class="movie_item" v-for="movie in movies" :key="movie.id">
					<NuxtLink class="movie_link" :to="`/movies/${movie.id}`">
						<img :src="movie.poster" alt="Movie Poster" />
					</NuxtLink>
					<button class="movie_remove" @click="handleRemoveFavorite(movie.id)">
						<closeSvg />
					</button>
				</li>
			</ul>
			<!-- <p v-else>Нет избранных фильмов.</p> -->
		</template>
		<template v-slot:settings>
			<div class="wrapper">
				<ul class="user_info">
					<li class="user_info-item">
						<span class="user_info-icon">
							{{
								`${user?.name[0].charAt(0).toUpperCase()}${user?.surname[0]
									.charAt(0)
									.toUpperCase()}`
							}}
						</span>
						<span class="user_info-title">Имя Фамилия</span>
						<span class="user_info-value"
							>{{ user?.name }} {{ user?.surname }}</span
						>
					</li>
					<li class="user_info-item">
						<span class="user_info-icon">
							<icon_mail />
						</span>
						<span class="user_info-title">Электронная почта</span>
						<span class="user_info-value">{{ user?.email }}</span>
					</li>
				</ul>
				<button class="logout-button" @click="handleLogout">
					Выйти из аккаунта
				</button>
			</div>
		</template>
	</Profile>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/storage/auth'
import { useMovieId } from '~/storage/movieId'
import icon_mail from '../assets/icons/icon_mail.svg?component'
import closeSvg from '../assets/icons/close.svg?component'

const authStore = useAuthStore()
const movieIdStore = useMovieId()
const router = useRouter()
const user = computed(() => authStore.user)

const containerRef = ref(null)
const { $viewport } = useNuxtApp()

const containerClass = computed(() => {
	return $viewport.matches('mobile_small')
})

onMounted(async () => {
	try {
		await authStore.profile()
	} catch (error) {
		console.error('Ошибка загрузки профиля:', error)
	}

	await fetchMovies()
})
const favorites = computed(() => user.value?.favorites || [])
const movies = ref<{ id: string; poster: string }[]>([])

// Функция для получения информации о фильмах
const fetchMovies = async () => {
	const fetchPromises = favorites.value.map(async id => {
		await movieIdStore.fetchMovieId(id)
		return {
			id,
			poster: movieIdStore.moviePoster,
		}
	})

	movies.value = await Promise.all(fetchPromises)
}

const handleRemoveFavorite = async (movieId: string) => {
	await authStore.removeFavorites(movieId)
	await fetchMovies()
}

const handleLogout = async () => {
	await authStore.logout()
	router.push('/')
}
</script>

<style lang="scss" scoped>
@use '../assets/scss/main';
@use '../assets/scss/variables';
@use '../assets/scss/mixin';

.movie_list {
	display: grid;
	justify-content: center;
	grid-template-columns: repeat(auto-fill, 224px);
	gap: 32px 40px;

	.movie_item {
		position: relative;
		border-radius: 24px;

		.movie_link {
			display: block;
			height: 336px;
			border: 1px solid variables.$grey_color_4;
			box-shadow: 0px 0px 80px 0px variables.$grey_color_5;
			border-radius: 24px;

			img {
				height: 100%;
				object-fit: cover;
				border-radius: 24px;
			}

			&:hover {
				@include mixin.card_hoverFocus;

				~ .movie_remove {
					opacity: 1;
					transition: opacity 0.3s ease-in-out;
				}
			}

			&:focus {
				@include mixin.card_hoverFocus;

				~ .movie_remove {
					opacity: 1;
					transition: opacity 0.3s ease-in-out;
				}
			}
		}

		.movie_remove {
			position: absolute;
			opacity: 0;
			top: -20px;
			right: -20px;
			width: 40px;
			height: 40px;
			background-color: variables.$white_color;
			border-radius: 50%;

			svg {
				width: 13px;
				height: 13px;
				fill: variables.$black_color;
			}

			&:hover {
				opacity: 1;
				background-color: variables.$brand_color_2;
				transition: background-color 0.3s ease-in-out;
			}

			&:focus {
				opacity: 1;
				background-color: variables.$brand_color_2;
				transition: background-color 0.3s ease-in-out;
			}

			&:active {
				opacity: 1;
				background-color: variables.$brand_color;
				transition: background-color 0.3s ease-in-out;
			}
		}
	}
}

p {
	color: variables.$white_color;
}

.user_info {
	display: flex;
	flex-direction: column;
	row-gap: 40px;
	padding-bottom: 64px;

	.user_info-item {
		position: relative;
		color: variables.$white_color;
		display: flex;
		flex-direction: column;
		padding-left: 76px;

		.user_info-icon {
			position: absolute;
			left: 0;
			display: flex;
			align-items: center;
			justify-content: center;
			width: clamp(3rem, 2.736rem + 1.127vw, 3.75rem);
			height: clamp(3rem, 2.736rem + 1.127vw, 3.75rem);
			background: variables.$grey_color_2;
			border-radius: 50%;
			font-size: 24px;
			line-height: 32px;
			font-weight: 700;

			svg {
				fill: variables.$white_color;
			}
		}

		.user_info-title {
			font-weight: 400;
			font-size: clamp(0.875rem, 0.787rem + 0.376vw, 1.125rem);
			line-height: clamp(1.25rem, 1.162rem + 0.376vw, 1.5rem);
		}

		.user_info-value {
			font-weight: 700;
			font-size: clamp(1.125rem, 0.993rem + 0.563vw, 1.5rem);
			line-height: clamp(1.5rem, 1.324rem + 0.751vw, 2rem);
			display: flex;
			flex-wrap: wrap;
		}
	}
}

.logout-button {
	font-size: 18px;
	line-height: 24px;
	font-weight: 700;
	padding: 16px 48px;
	color: variables.$white_color;
	background: variables.$brand_color;
	border: none;
	border-radius: 28px;
	@include mixin.btn_hoverFocus_1;
}

.mobile_small {
	.profile_content {
		.movie_list {
			display: flex;

			.movie_item {
				a {
					display: flex;
					width: 100%;
				}
			}
		}
	}

	.wrapper {
		.user_info {
			.user_info-item {
				.user_info-title {
					color: variables.$grey_color_2;
				}
			}
		}
		.logout-button {
			width: 100%;
		}
	}
}
</style>
