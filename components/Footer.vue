<template>
	<div>
		<div class="footer_grid">
			<div class="footer_grid-left">
				<span>LLC «Мультимедиа Визион»</span>
				<span class="copyright">
					<VectorFooter />
					Все права защищены
				</span>
			</div>
			<div class="footer_grid-right">
				<div class="social">
					<NuxtLink class="social_link" to="https://vk.com/">
						<SocialVk />
					</NuxtLink>
					<NuxtLink class="social_link" to="https://www.youtube.com/">
						<SocialYoutube />
					</NuxtLink>
					<NuxtLink class="social_link" to="https://ok.ru/">
						<SocialOk />
					</NuxtLink>
					<NuxtLink class="social_link" to="https://telegram.org/">
						<SocialTelegram />
					</NuxtLink>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import VectorFooter from '../assets/icons/vector_footer.svg?component'
import SocialOk from '../assets/icons/social_ok.svg?component'
import SocialVk from '../assets/icons/social_vk.svg?component'
import SocialYoutube from '../assets/icons/social_youtube.svg?component'
import SocialTelegram from '../assets/icons/social_telegram.svg?component'
</script>

<style lang="scss" scoped>
@use '../assets/scss/main';
@use '../assets/scss/variables';
@use '../assets/scss/mixin';

.footer_grid {
	display: grid;
	align-items: center;
	grid-template-columns: repeat(2, 1fr);
	padding-top: clamp(1.5rem, 1.148rem + 1.502vw, 2.5rem);
	padding-bottom: clamp(1.5rem, 1.148rem + 1.502vw, 2.5rem);

	.footer_grid-left {
		display: flex;
		column-gap: 48px;

		span {
			color: variables.$white_color;
		}

		.copyright {
			position: relative;
			color: variables.$grey_color;
			@include mixin.span_text;

			svg {
				position: absolute;
				left: -30px;
				fill: variables.$grey_color;
			}
		}
	}

	.footer_grid-right {
		.social {
			display: flex;
			justify-content: end;
			column-gap: 24px;

			.social_link {
				width: clamp(1.5rem, 1.236rem + 1.127vw, 2.25rem);
				height: clamp(1.5rem, 1.236rem + 1.127vw, 2.25rem);
			}
		}
	}
}

.tablet,
.mobile,
.mobile_small {
	.footer_grid {
		.footer_grid-left {
			flex-direction: column;
			row-gap: 8px;

			.copyright {
				padding-left: 30px;

				svg {
					left: 0;
				}
			}
		}
	}
}

.mobile_small {
	.footer_grid {
		display: flex;
		flex-direction: column;
		row-gap: 32px;
		align-items: start;
	}
}
</style>
