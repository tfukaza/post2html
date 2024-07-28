<script lang="ts">
	import type { ProcessedXData } from '$lib/x_types';

	export let postJson: ProcessedXData | null = null;

	import XPostMediaStyles from '$components/embed/x_post_media_grid.scss?inline';

	let postStyle: string = XPostMediaStyles;
</script>

{#if postJson}
	{@html `<style>${postStyle}</style>`}
	<div class={`media num-media-${postJson.media.length} media-0`}>
		{#each postJson.media as media, i}
			<img src={media.media_url} alt={media.display_url} id={`media-${i}`} />
		{/each}
	</div>
{/if}
