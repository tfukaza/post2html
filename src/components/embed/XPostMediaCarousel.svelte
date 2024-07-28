<script lang="ts">
	import type { ProcessedXData } from '$lib/x_types';

	export let postJson: ProcessedXData | null = null;

	import XPostMediaStyles from '$components/embed/x_post_media_carousel.scss?inline';

	let postStyle: string = XPostMediaStyles;
</script>

{#if postJson}
	<script>
		let b = 0;
		let a = (e, c, d) => {
			b += c;
			b = b > d ? d : b < 0 ? 0 : b;
			let f = e.target.parentElement;

			f.children[0].scrollLeft =
				f.children[0].children[b + 1].offsetLeft - f.children[0].children[1].offsetLeft;
			let l = f.children[1],
				r = f.children[2];
			if (b === 0) {
				l.disabled = true;
				r.disabled = false;
			} else if (b === d) {
				l.disabled = false;
				r.disabled = true;
			} else {
				l.disabled = false;
				r.disabled = false;
			}
			e.preventDefault();
		};
	</script>

	{@html `<style>${postStyle}</style>`}
	<div class={`media num-media-${postJson.media.length} media-0`}>
		<div>
			<p />
			{#each postJson.media as media, i}
				<img src={media.media_url} alt={media.display_url} id={`media-${i}`} />
			{/each}
			<p />
		</div>
		{#if postJson.media.length > 1}
			<button id="left" onclick="a(event, -1, {postJson.media.length - 1})" disabled>🡐</button>
			<button id="right" onclick="a(event, 1, {postJson.media.length - 1})">🡒</button>
		{/if}
	</div>
{/if}
