<template>
	<div class="footer">
		<div class="footer_grid container">
			<div class="footer_grid-left">
				<span>LLC «Мультимедиа Визион»</span>
				<span>
					<VectorFooter />
					Все права защищены
				</span>
			</div>
			<div class="footer_grid-right">
				<div class="social">
					<NuxtLink class="social_link">
						<SocialVk />
					</NuxtLink>
					<NuxtLink class="social_link">
						<SocialYoutube />
					</NuxtLink>
					<NuxtLink class="social_link">
						<SocialOk />
					</NuxtLink>
					<NuxtLink class="social_link">
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
@import '../assets/scss/main.scss';
.footer {
	.footer_grid {
		display: grid;
		height: 120px;
		align-items: center;
		grid-template-columns: repeat(2, 1fr);
		.footer_grid-left {
			display: flex;
			column-gap: 48px;

			span {
				position: relative;
				color: $white_color;
				svg {
					position: absolute;
					left: -30px;
				}
			}
		}

		.footer_grid-right {
			.social {
				display: flex;
				justify-content: end;
				column-gap: 24px;

				.social_link {
				}
			}
		}
	}
}
</style>
