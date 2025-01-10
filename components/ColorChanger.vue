<template>
	<span :class="colorClass" :rating="rating">
		<icon_star :class="customClass" />
		{{ formattedRating }}
	</span>
</template>

<script lang="ts" setup>
import icon_star from '../assets/icons/icon_star.svg?component'

const props = defineProps<{
	rating: number | undefined
	customClass: string
}>()

const formattedRating = computed(() => {
	return props.rating !== undefined ? props.rating.toFixed(1) : 'N/A'
})
// Функция для определения цвета в зависимости от значения
const colorClass = computed(() => {
	if (props.rating === undefined) return 'grey'
	if (props.rating <= 4.2) return 'red'
	if (props.rating <= 6.3) return 'grey'
	if (props.rating <= 7.5) return 'green'
	return 'yellow'
})
</script>

<style lang="scss" scoped>
@use '../assets/scss/main';
@use '../assets/scss/variables';
.yellow {
	background-color: variables.$yellow_color;
}

.green {
	background-color: variables.$green_color;
}

.grey {
	background-color: variables.$grey_color_4;
}

.red {
	background-color: variables.$red_color_2;
}
</style>
