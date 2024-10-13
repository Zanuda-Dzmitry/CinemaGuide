<script setup lang="ts">
import Cover from '~/components/cover.vue'
import Top10Movie from '~/components/top10Movie.vue'

definePageMeta({
	title: 'Главная',
})
</script>

<template>
	<div class="home">
		<Cover />
		<Top10Movie />
	</div>
</template>

<style scoped>
.home {
}
</style>
