<script lang="ts">
	import type { ProcessedPost } from '../../routes/postTypes';
	import { afterUpdate } from 'svelte';

	export let postJson: ProcessedPost | null = null;
	export let actionCallback: () => void;

	afterUpdate(() => {
		actionCallback();
	});

	$: postText = postJson ? postJson.text.split('\n') : [];
</script>

{#if postJson}
	<div class="post-small">
		<div class="profile">
			<img src={postJson.user.profile_image_url_https} alt={postJson.user.name} />
			<div class="name">{postJson.user.name}</div>
			<div class="screen-name">@{postJson.user.screen_name}</div>
		</div>
		<div class="post">
			<p>
				{#each postText as line}{line}<br />{/each}
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
