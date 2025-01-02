export const useModalStore = defineStore('modal', {
	state: () => ({
		isOpen: false,
	}),
	actions: {
		open() {
			this.isOpen = true
			document.body.style.overflow = 'hidden'
		},

		close() {
			this.isOpen = false
			document.body.style.overflow = ''
		},
	},
})
