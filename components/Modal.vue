<template>
	<div class="modal-overlay" @click.self="close">
		<div class="modal-content">
			<button class="close-button" @click="close">X</button>
			<slot name="header"></slot>
			<slot name="body"></slot>
		</div>
	</div>
</template>

<script lang="ts" setup>
const props = defineProps()
const emit = defineEmits(['close'])

const close = () => {
	emit('close')
}
</script>

<style scoped>
.modal-overlay {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: rgba(0, 0, 0, 0.5);
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 999;
}

.modal-content {
	background: white;
	padding: 20px;
	border-radius: 4px;
	width: 300px;
}

.close-button {
	background: none;
	border: none;
	color: red;
	cursor: pointer;
}
</style>
