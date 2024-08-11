<script lang="ts">
	import type { ProcessedXData, XPostConfig } from '$lib/x_types';

	import XPostMediaStyles from '$components/embed/x_post_media_carousel.scss?inline';
	import XPostMediaFull from './XPostMediaFull.svelte';
	import XPostMediaFullImg from '$components/embed/x_post_media_full_img.scss?inline';

	export let postJsonData: ProcessedXData | null = null;

	$: postStyle =
		XPostMediaStyles +
		' ' +
		(postJsonData && postJsonData.config.imageFull ? XPostMediaFullImg : '');
</script>

{#if postJsonData}
	{@html `<style>${postStyle}</style>`}
	<script>
		window.addEventListener('load', () => {
			let sc = document.getElementById('scroll-container');
			let left = document.getElementById('left');
			let right = document.getElementById('right');

			window.carousel = function (e, d, n) {
				e.stopPropagation();
				let ci = parseInt(sc.dataset.mediaIndex);
				ci += d;
				ci = ci < 0 ? 0 : ci > n ? n : ci;
				sc.dataset.mediaIndex = ci;
				sc.scrollLeft = sc.children[ci + 1].offsetLeft - sc.children[1].offsetLeft;
				left.disabled = ci == 0;
				right.disabled = ci == n;
			};
		});
	</script>
	{#if postJsonData.config.imageFull}
		<XPostMediaFull {postJsonData} />
	{/if}
	<div class={`media num-media-${postJsonData.media.length} media-0`}>
		<div id="scroll-container" data-media-count={postJsonData.media.length} data-media-index="0">
			{#if postJsonData.media.length > 1}
				<p />
				{#each postJsonData.media as media, i}
					<img src={media.media_url} alt={media.display_url} id={`media-${i}`} />
				{/each}
				<p />
			{:else}
				<img src={postJsonData.media[0].media_url} alt={postJsonData.media[0].display_url} />
			{/if}
		</div>
		{#if postJsonData.media.length > 1}
			<button id="left" disabled onclick="carousel(event, -1, {postJsonData.media.length - 1})"
				>🡐</button
			>
			<button id="right" onclick="carousel(event, 1, {postJsonData.media.length - 1})">🡒</button>
		{/if}
	</div>
{/if}
