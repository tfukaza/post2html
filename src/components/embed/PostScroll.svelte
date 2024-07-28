<script lang="ts">
	import type { ProcessedXData } from '$lib/x_types';
	import { afterUpdate } from 'svelte';

	export let postJson: ProcessedXData | null = null;
	export let actionCallback: () => void;

	afterUpdate(() => {
		actionCallback();
	});

	function processText(postJson: ProcessedXData): string {
		// Replace each display_url with an anchor tag
		let text = postJson.text;
		postJson.urls.forEach((url) => {
			text = text.replace(url.url, `<a href="${url.expanded_url}">${url.display_url}</a>`);
		});
		postJson.hashTags.forEach((hashTag) => {
			text = text.replace(
				'#' + hashTag.text,
				`<a href="https://twitter.com/hashtag/${hashTag.text}">#${hashTag.text}</a>`
			);
		});
		// Remove any media links from text
		postJson.media.forEach((media) => {
			text = text.replace(media.url, '');
		});
		return text.replace(/\n/g, '<br />');
	}

	$: postText = postJson ? processText(postJson) : '';

	$: className =
		'post-small' +
		(postJson && postJson.media.length > 0 ? ' has-media' : '') +
		(postText && postText.length > 0 ? ' has-text' : '');
</script>

{#if postJson}
	{#if postJson.media.length > 1}
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
	{/if}
	<div class={className}>
		<div class="main">
			<div class="profile">
				<img src={postJson.user.profile_image_url_https} alt={postJson.user.name} />
				<div class="name">{postJson.user.name}</div>
				<div class="screen-name">@{postJson.user.screen_name}</div>
			</div>

			<p class="post">
				{@html postText}
			</p>
		</div>
		{#if postJson.media}
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
	</div>
	<!-- href={`https://twitter.com/${postJson.user.screen_name}/status/${postJson.id_str}`} -->
{/if}

<style lang="scss" global>
	@import './post.scss';
</style>
