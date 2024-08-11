<script lang="ts">
	import type { ProcessedXData, XPostConfig } from '$lib/x_types';
	import { afterUpdate } from 'svelte';
	import XPostMediaCarousel from './XPostMediaCarousel.svelte';
	import XPostStyles from '$components/embed/x_post.scss?inline';
	import XPostMediaGrid from './XPostMediaGrid.svelte';
	import { postConfig, postJson } from '$components/store';

	let postStyle: string = XPostStyles;

	export let actionCallback: () => void;

	let postJsonData: ProcessedXData | null = null;
	postJson.subscribe((value) => {
		postJsonData = value;
	});
	let postConfigData: XPostConfig = {
		imageStyle: 'grid',
		imageFull: false
	};
	postConfig.subscribe((value) => {
		postConfigData = value;
	});

	afterUpdate(() => {
		actionCallback();
	});

	/**
	 * Process the text of the tweet to replace URLs, hashtags, and media links with anchor tags
	 * @param postJsonData The tweet data
	 * @returns The processed text
	 */
	function processText(postJsonData: ProcessedXData): string {
		// Replace each display_url with an anchor tag

		if (postJsonData.text === undefined) {
			return '';
		}
		let text = postJsonData.text;
		if (postJsonData.urls !== undefined) {
			postJsonData.urls.forEach((url) => {
				text = text.replace(
					url.url,
					`<a href="${url.expanded_url}" target="_blank">${url.display_url}</a>`
				);
			});
		}
		// Replace each hashtag with an anchor tag
		if (postJsonData.hashTags !== undefined) {
			postJsonData.hashTags.forEach((hashTag) => {
				text = text.replace(
					'#' + hashTag.text,
					`<a href="https://twitter.com/hashtag/${hashTag.text}" target="_blank">#${hashTag.text}</a>`
				);
			});
		}
		// Remove any media links from text
		if (postJsonData.media !== undefined) {
			postJsonData.media.forEach((media) => {
				text = text.replace(media.url, '');
			});
		}

		return text.replace(/\n/g, '<br />');
	}

	$: postText = postJsonData ? processText(postJsonData) : '';

	$: className =
		'x-post' +
		(postJsonData && postJsonData.media && postJsonData.media.length > 0 ? ' has-media' : '') +
		(postText && postText.length > 0 ? ' has-text' : '');
</script>

{#if postJsonData}
	{@html `<style>${postStyle}</style>`}
	<div
		class={className}
		onclick="(function(e)&lbrace;if(e.target.tagName!=='A')window.open('{postJsonData.postUrl}', '_blank').focus();&rbrace;)(arguments[0])"
	>
		<div class="main">
			<div class="profile">
				<img src={postJsonData.user.profile_image_url_https} alt={postJsonData.user.name} />
				<div class="name">{postJsonData.user.name}</div>
				<div class="screen-name">@{postJsonData.user.screen_name}</div>
			</div>

			<div class="post">
				{@html postText}
			</div>
		</div>
		{#if postJsonData.media.length > 0}
			{#if postConfigData && postConfigData.imageStyle === 'carousel'}
				<XPostMediaCarousel {postJsonData} />
			{:else if postConfigData && postConfigData.imageStyle === 'grid'}
				<XPostMediaGrid {postJsonData} />
			{:else}
				<p>Invalid image style</p>
			{/if}
		{/if}
	</div>
{/if}

<style lang="scss" global>
	@import './x_post.scss';
</style>
