<template>
	<div v-if="videoId" class="modal-player">
		<div class="video-player">
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

defineProps<{
	videoId: string // ID видео на YouTube
	close: () => void
}>()
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
		width: 960px;
		height: 540px;
		border: 1px solid variables.$grey_color_2;

		iframe {
			width: 100%;
			height: 100%;
		}
		button {
			position: absolute;
			right: -74px;
			top: 0;
			width: 48px;
			height: 48px;
			background: variables.$white_color;
			border: none;
			border-radius: 24px;
		}
	}
}
</style>
