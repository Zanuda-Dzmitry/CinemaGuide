<script setup lang="ts">
import Cover from '~/components/Cover.vue'
import Top10Movie from '~/components/Top10Movie.vue'

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
