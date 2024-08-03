<script lang="ts">
	import type { ProcessedXData } from '$lib/x_types';
	import { afterUpdate } from 'svelte';
	import XPostMediaCarousel from './XPostMediaCarousel.svelte';
	import XPostStyles from '$components/embed/x_post.scss?inline';
	import XPostMediaGrid from './XPostMediaGrid.svelte';

	let postStyle: string = XPostStyles;

	export let postJson: ProcessedXData | null = null;
	export let postConfig;
	export let actionCallback: () => void;

	afterUpdate(() => {
		actionCallback();
	});

	/**
	 * Process the text of the tweet to replace URLs, hashtags, and media links with anchor tags
	 * @param postJson The tweet data
	 * @returns The processed text
	 */
	function processText(postJson: ProcessedXData): string {
		// Replace each display_url with an anchor tag
		let text = postJson.text;
		postJson.urls.forEach((url) => {
			text = text.replace(url.url, `<a href="${url.expanded_url}">${url.display_url}</a>`);
		});
		// Replace each hashtag with an anchor tag
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
		'x-post' +
		(postJson && postJson.media.length > 0 ? ' has-media' : '') +
		(postText && postText.length > 0 ? ' has-text' : '');
</script>

{#if postJson}
	{@html `<style>${postStyle}</style>`}
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
		{#if postJson.media.length > 0}
			{#if postConfig && postConfig.imageStyle === 'carousel'}
				<XPostMediaCarousel {postJson} />
			{:else if postConfig && postConfig.imageStyle === 'grid'}
				<XPostMediaGrid {postJson} />
			{:else}
				<XPostMediaCarousel {postJson} />
			{/if}
		{/if}
	</div>
{/if}

<style lang="scss" global>
	@import './x_post.scss';
</style>
