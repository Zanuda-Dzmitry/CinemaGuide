<template>
	<div>
		<Profile>
			<template v-slot:favorites>
				<ul class="movie_list" v-if="movies.length > 0">
					<li v-for="movie in movies" :key="movie.id">
						<NuxtLink class="movie_link" :to="`/movies/${movie.id}`">
							<img :src="movie.poster" alt="Movie Poster" />
						</NuxtLink>
					</li>
				</ul>
				<p v-else>Нет избранных фильмов.</p>
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
	</div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/storage/auth'
import { useMovieId } from '~/storage/movieId'
import icon_mail from '../assets/icons/icon_mail.svg?component'

const authStore = useAuthStore()
const movieIdStore = useMovieId()
const router = useRouter()
const user = computed(() => authStore.user)

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

const handleLogout = async () => {
	await authStore.logout()
	router.push('/')
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/main.scss';

.movie_list {
	display: grid;
	grid-template-columns: repeat(auto-fill, 224px);
	row-gap: 32px;
	column-gap: 24px;

	.movie_link {
		display: block;
		height: 336px;
		border: 1px solid rgba(255, 255, 255, 0.25);
		box-shadow: 0px 0px 80px 0px rgba(255, 255, 255, 0.33);
		border-radius: 24px;

		img {
			height: 100%;
			object-fit: cover;
			border-radius: 24px;
		}
	}
}

p {
	color: $white_color;
}

.user_info {
	display: flex;
	flex-direction: column;
	row-gap: 40px;
	padding-bottom: 64px;

	.user_info-item {
		position: relative;
		color: $white_color;
		display: flex;
		flex-direction: column;
		padding-left: 76px;

		.user_info-icon {
			position: absolute;
			left: 0;
			display: flex;
			align-items: center;
			justify-content: center;
			width: 60px;
			height: 60px;
			background: $grey_color_2;
			border-radius: 50%;
			font-size: 24px;
			line-height: 32px;
			font-weight: 700;

			svg {
				fill: $white_color;
			}
		}

		.user_info-title {
			font-weight: 400;
			font-size: 18px;
			line-height: 24px;
		}

		.user_info-value {
			font-weight: 700;
			font-size: 24px;
			line-height: 32px;
		}
	}
}

.logout-button {
	font-size: 18px;
	line-height: 24px;
	font-weight: 700;
	padding: 16px 48px;
	color: $white_color;
	background: $brand_color;
	border: none;
	border-radius: 28px;
}
</style>
