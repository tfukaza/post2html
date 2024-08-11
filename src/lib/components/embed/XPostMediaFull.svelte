<script lang="ts">
	import XPostMediaStyles from '$components/embed/x_post_media_carousel.scss?inline';
	import type { ProcessedXData } from '$lib/x_types';

	export let postJsonData: ProcessedXData | null = null;

	let postStyle: string = XPostMediaStyles;
</script>

{#if postJsonData}
	<script>
		window.addEventListener('load', () => {
			let g = document.querySelectorAll('.media img');
			let f = document.querySelectorAll('.full-img');

			g.forEach((p, i) => {
				p.addEventListener('click', (e) => {
					e.stopPropagation();
					f[i].classList.add('full');
				});
			});

			f.forEach((p) => {
				p.addEventListener('click', (e) => {
					e.stopPropagation();
					p.classList.remove('full');
				});
			});
		});
	</script>
	{#each postJsonData.media as media, i}
		<img src={media.media_url} alt={media.display_url} class="full-img" id={`media-${i}`} />
	{/each}
{/if}
