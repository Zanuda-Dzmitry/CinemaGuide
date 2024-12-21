<template>
	<div v-if="videoId" class="modal-player">
		<div class="video-player">
			<h3>{{ title }}</h3>
			<iframe
				:src="`https://www.youtube.com/embed/${videoId}?controls=0&autoplay=1&mute=1`"
				:videoId="videoId"
			></iframe>
			<button @click="close">
				<closeSvg />
			</button>
		</div>
	</div>
</template>

<script setup lang="ts">
import closeSvg from '../assets/icons/close.svg?component'

const props = defineProps<{
	videoId: string // ID видео на YouTube
	title: string // Заголовок видео на YouTube
	close: () => void
}>()

console.log(props.title)
</script>

<style lang="scss" scoped>
@use '../assets/scss/main';
@use '../assets/scss/variables';

.modal-player {
	overflow-y: auto;
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: variables.$black_color_2;
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
	width: 100%;
	z-index: 1000;

	.video-player {
		position: relative;
		width: clamp(23.438rem, 10.563rem + 54.93vw, 60rem);
		height: clamp(13.25rem, 6.032rem + 30.798vw, 33.75rem);

		h3 {
			opacity: 0;
			position: absolute;
			bottom: 24px;
			left: 20px;
			width: clamp(20.938rem, 8.063rem + 54.93vw, 57.5rem);
			background-color: #0a0b0b80;
			color: variables.$white_color;
			padding: 24px 40px;
			transition: opacity 0.3s ease-in-out;
		}

		&:hover {
			h3 {
				opacity: 1;
			}
		}

		iframe {
			width: 100%;
			height: 100%;
		}
		button {
			position: absolute;
			right: clamp(-4.625rem, -2.597rem + -2.254vw, -3.125rem);
			top: 0;
			width: clamp(1.75rem, 1.31rem + 1.878vw, 3rem);
			height: clamp(1.75rem, 1.31rem + 1.878vw, 3rem);
			background: variables.$white_color;
			border: none;
			border-radius: 24px;

			svg {
				width: clamp(0.75rem, 0.53rem + 0.939vw, 1.375rem);
				height: clamp(0.75rem, 0.53rem + 0.939vw, 1.375rem);
			}
		}
	}
}
.tablet,
.mobile,
.mobile_small {
	.modal-player {
		.video-player {
			button {
				right: 8px;
				top: 8px;
			}
			iframe {
				border: none;
			}
		}
	}
}

.tablet,
.mobile,
.mobile_small {
	.modal-player {
		.video-player {
			h3 {
				bottom: 0;
				left: 0;
				width: 100%;
			}
		}
	}
}

.mobile_small {
	.modal-player {
		.video-player {
			h3 {
				bottom: -69.5px;
			}
		}
	}
}
</style>
