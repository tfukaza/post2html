<script lang="ts">
	import type { ProcessedXData } from '$lib/x_types';

	export let postJson: ProcessedXData | null = null;

	import XPostMediaStyles from '$components/embed/x_post_media_carousel.scss?inline';

	let postStyle: string = XPostMediaStyles;
</script>

{#if postJson}
	{@html `<style>${postStyle}</style>`}
	<div class={`media num-media-${postJson.media.length} media-0`} data-index="0">
		<div>
			{#if postJson.media.length > 1}
				<p />
				{#each postJson.media as media, i}
					<img src={media.media_url} alt={media.display_url} id={`media-${i}`} />
				{/each}
				<p />
			{:else}
				<img src={postJson.media[0].media_url} alt={postJson.media[0].display_url} />
			{/if}
		</div>
		{#if postJson.media.length > 1}
			<button
				id="left"
				onclick="(function(e)&lbrace;e.stopPropagation();let b=parseInt(e.target.parentElement.dataset.index);b=b==0?0:b-1;e.target.parentElement.dataset.index=b;let f=e.target.parentElement;f.children[0].scrollLeft=f.children[0].children[b+1].offsetLeft-f.children[0].children[1].offsetLeft;f.children[1].disabled=b==0;f.children[2].disabled=b=={postJson
					.media.length - 1}&rbrace;)(arguments[0])"
				disabled
			>
				🡐
			</button>

			<button
				id="right"
				onclick="(function(e)&lbrace;e.stopPropagation();let b=parseInt(e.target.parentElement.dataset.index);b=b=={postJson
					.media.length - 1}?{postJson.media.length -
					1}:b+1;e.target.parentElement.dataset.index=b;let f=e.target.parentElement;f.children[0].scrollLeft=f.children[0].children[b+1].offsetLeft-f.children[0].children[1].offsetLeft;f.children[1].disabled=b==0;f.children[2].disabled=b=={postJson
					.media.length - 1}&rbrace;)(arguments[0])">🡒</button
			>
		{/if}
	</div>
{/if}
