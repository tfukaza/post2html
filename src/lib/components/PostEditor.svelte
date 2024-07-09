<script lang="ts">
	import type { ProcessedPost } from '../../routes/postTypes';
	import postStyles from './post.scss?inline';
	import Code from '$lib/components/Code.svelte';
	import PostSmall from './PostSmall.svelte';

	export let postJson: ProcessedPost | null = null;

	let postDom: Element | null = null;

	$: postCSS = postStyles;
	$: postHTML = postDom ? postDom.innerHTML : '';
</script>

<div class="post-result">
	{#if postJson}
		<div class="code-container">
			<h2>Step 2: Make adjustments</h2>
			<p>Coming soon</p>
			<hr />
			<h2>Step 3: Copy the code into your website</h2>
			<p>Paste the CSS into your stylesheet:</p>
			<Code copyText={postCSS} />
			<p>Paste the HTML where you want to embed the post:</p>
			<Code copyText={postHTML} />
		</div>
		<div class="post-container" bind:this={postDom}>
			<h3>Preview</h3>
			<PostSmall {postJson} />
		</div>
	{:else}
		<h2 id="no-post">Submit a link above</h2>
	{/if}
</div>

<style lang="scss">
	@import '../../routes/styles.scss';

	.post-result {
		display: flex;
		gap: 60px;
		padding: 30px;
		box-sizing: border-box;
		width: 100%;

		h1 {
			margin: 0;
			text-align: left;
		}

		h2 {
			margin: 0;
			text-align: left;
		}

		hr {
			margin: 20px 0;
			opacity: 0.3;
		}

		#no-post {
			width: 100%;
			margin: 0;
			text-align: center;
		}

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
