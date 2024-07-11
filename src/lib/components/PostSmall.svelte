<script lang="ts">
	import type { ProcessedPost } from '../../routes/postTypes';
	import { afterUpdate } from 'svelte';

	export let postJson: ProcessedPost | null = null;
	export let actionCallback: () => void;

	afterUpdate(() => {
		actionCallback();
	});

	function processText(postJson: ProcessedPost): string {
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

	let className = 'post-small';
	if (postJson && postJson.media.length > 0) {
		className += ' has-media';
	}
</script>

{#if postJson}
	<div class={className}>
		<div class="profile">
			<img src={postJson.user.profile_image_url_https} alt={postJson.user.name} />
			<div class="name">{postJson.user.name}</div>
			<div class="screen-name">@{postJson.user.screen_name}</div>
		</div>
		<div class="post">
			<p>
				{@html postText}
			</p>
			{#if postJson.media}
				<a
					class={`media num-media-${postJson.media.length}`}
					href={`https://twitter.com/${postJson.user.screen_name}/status/${postJson.id_str}`}
				>
					{#each postJson.media as media}
						<img src={media.media_url} alt={media.display_url} />
					{/each}
				</a>
			{/if}
		</div>
	</div>
{/if}

<style lang="scss" global>
	@import './post.scss';
</style>
