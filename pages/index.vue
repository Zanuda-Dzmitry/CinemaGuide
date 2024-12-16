<script setup lang="ts">
import Cover from '~/components/cover.vue'
import Top10Movie from '~/components/top10Movie.vue'

definePageMeta({
	title: 'Главная',
})
</script>

<template>
	<Cover />
	<Top10Movie />
</template>

<style lang="scss" scoped>
@use '../assets/scss/main';
@use '../assets/scss/variables';
</style>
