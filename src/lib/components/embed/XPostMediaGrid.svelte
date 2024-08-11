<script lang="ts">
	import type { ProcessedXData } from '$lib/x_types';

	import XPostMediaStyles from '$components/embed/x_post_media_grid.scss?inline';
	import XPostMediaFullImg from '$components/embed/x_post_media_full_img.scss?inline';
	import XPostMediaFull from './XPostMediaFull.svelte';

	import { postConfig } from '$components/store';

	export let postJsonData: ProcessedXData | null = null;

	let postConfigData = {
		imageStyle: 'grid',
		imageFull: false
	};
	postConfig.subscribe((value) => {
		postConfigData = value;
	});

	let postStyle: string = XPostMediaStyles + (postConfigData.imageFull ? XPostMediaFullImg : '');
</script>

{#if postJsonData}
	{@html `<style>${postStyle}</style>`}
	{#if postConfigData.imageFull}
		<XPostMediaFull {postJsonData} />
	{/if}
	<div class={`media num-media-${postJsonData.media.length} media-0`}>
		{#each postJsonData.media as media, i}
			<img src={media.media_url} alt={media.display_url} id={`media-${i}`} />
		{/each}
	</div>
{/if}
