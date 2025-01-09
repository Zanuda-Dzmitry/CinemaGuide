<template>
	<div class="loading">
		<div class="loading-text">
			<span class="loading-text-words">L</span>
			<span class="loading-text-words">O</span>
			<span class="loading-text-words">A</span>
			<span class="loading-text-words">D</span>
			<span class="loading-text-words">I</span>
			<span class="loading-text-words">N</span>
			<span class="loading-text-words">G</span>
		</div>
	</div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
@use '../assets/scss/main';
@use '../assets/scss/variables';

@mixin position-center($text-align: center) {
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	margin: auto;
	text-align: $text-align;
}

.loading {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: variables.$black_background;
	z-index: 9999;
}

.loading-text {
	@include position-center;
	width: 100%;
	height: 100px;
	font-size: clamp(1rem, 0.648rem + 1.502vw, 2rem);
	line-height: 100px;
	span {
		display: inline-block;
		margin: 0 5px;
		color: #fff;
		@for $i from 0 through 6 {
			&:nth-child(#{$i + 1}) {
				filter: blur(0px);
				animation: blur-text 1.5s (#{$i/5}) + s infinite linear alternate;
			}
		}
	}
}

@keyframes blur-text {
	0% {
		filter: blur(0px);
	}
	100% {
		filter: blur(4px);
	}
}
</style>
