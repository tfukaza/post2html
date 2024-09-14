<script lang="ts">
	import type { ProcessedXData } from '$lib/x_types';
	import XPostCardStyles from '$components/embed/x_post_card.scss?inline';

	export let postJsonData: ProcessedXData | null = null;
	$: postStyle = XPostCardStyles;
</script>

{#if postJsonData && postJsonData.card}
	{@html `<style>${postStyle}</style>`}
	<script>
		window.addEventListener('resize', () => {
			const card = document.querySelector('.card');
			const img = document.querySelector('.card img');
			if (card && img) {
				let a = () => {
					card.style.height = img.clientHeight + 'px';
				};
				new ResizeObserver(() => {
					a();
				}).observe(card);
				a();
			}
		});
	</script>
	<div class="card">
		<a href={postJsonData.card.url} target="_blank"></a>
		<img src={postJsonData.card.image_url} alt={postJsonData.card.title} />
		<div>
			<p>{postJsonData.card.title}</p>
		</div>
	</div>
{/if}
