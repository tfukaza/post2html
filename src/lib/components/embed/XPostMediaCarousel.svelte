<script lang="ts">
	import type { ProcessedXData } from '$lib/x_types';
	import { postConfig } from '$components/store';

	import XPostMediaStyles from '$components/embed/x_post_media_carousel.scss?inline';
	import XPostMediaFull from './XPostMediaFull.svelte';
	import XPostMediaFullImg from '$components/embed/x_post_media_full_img.scss?inline';

	let postConfigData = {
		imageStyle: 'grid',
		imageFull: false
	};
	postConfig.subscribe((value) => {
		postConfigData = value;
	});

	export let postJsonData: ProcessedXData | null = null;

	let postStyle: string = XPostMediaStyles + (postConfigData.imageFull ? XPostMediaFullImg : '');
</script>

{#if postJsonData}
	{@html `<style>${postStyle}</style>`}
	{#if postConfigData.imageFull}
		<XPostMediaFull {postJsonData} />
	{/if}
	<div class={`media num-media-${postJsonData.media.length} media-0`} data-index="0">
		<div>
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
			<button
				id="left"
				onclick="(function(e)&lbrace;e.stopPropagation();let b=parseInt(e.target.parentElement.dataset.index);b=b==0?0:b-1;e.target.parentElement.dataset.index=b;let f=e.target.parentElement;f.children[0].scrollLeft=f.children[0].children[b+1].offsetLeft-f.children[0].children[1].offsetLeft;f.children[1].disabled=b==0;f.children[2].disabled=b=={postJsonData
					.media.length - 1}&rbrace;)(arguments[0])"
				disabled
			>
				🡐
			</button>

			<button
				id="right"
				onclick="(function(e)&lbrace;e.stopPropagation();let b=parseInt(e.target.parentElement.dataset.index);b=b=={postJsonData
					.media.length - 1}?{postJsonData.media.length -
					1}:b+1;e.target.parentElement.dataset.index=b;let f=e.target.parentElement;f.children[0].scrollLeft=f.children[0].children[b+1].offsetLeft-f.children[0].children[1].offsetLeft;f.children[1].disabled=b==0;f.children[2].disabled=b=={postJsonData
					.media.length - 1}&rbrace;)(arguments[0])">🡒</button
			>
		{/if}
	</div>
{/if}
