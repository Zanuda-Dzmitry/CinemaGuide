const modalState = reactive({
	isModalOpen: false,
	toggleModal() {
		this.isModalOpen = !this.isModalOpen
	},
})

export default modalState
