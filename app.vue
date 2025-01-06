<template>
	<NuxtLoadingIndicator :throttle="0" />
	<NuxtLayout>
		<NuxtPage />
	</NuxtLayout>
</template>

<script setup lang="ts">
const route = useRoute()
const title = computed(() => `${route.meta.title}`)
useHead({
	title: title,
})
</script>
