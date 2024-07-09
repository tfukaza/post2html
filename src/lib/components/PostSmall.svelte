<script lang="ts">
	import type { ProcessedPost } from '../../routes/postTypes';

	export let postJson: ProcessedPost | null = null;
</script>

{#if postJson}
	<div class="post-small">
		<div class="profile">
			<img src={postJson.user.profile_image_url_https} alt={postJson.user.name} />
			<div class="name">{postJson.user.name}</div>
			<div class="screen-name">@{postJson.user.screen_name}</div>
		</div>
		<div class="post">
			<p>{postJson.text}</p>
			{#if postJson.media}
				{#each postJson.media as media}
					<img src={media.media_url} alt={media.display_url} />
				{/each}
			{/if}
		</div>
	</div>
{/if}

<style lang="scss">
	@import './post.scss';

	.post-result {
		display: flex;
		width: 100%;

		.post-container {
			flex-basis: 50%;
			max-width: 50%;
		}
		.code-container {
			flex-basis: 50%;
			max-width: 50%;
		}
	}
</style>
