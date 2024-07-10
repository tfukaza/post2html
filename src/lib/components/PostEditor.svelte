<script lang="ts">
	import type { ProcessedPost } from '../../routes/postTypes';
	import postStyles from './post.scss?inline';
	import Code from '$lib/components/Code.svelte';
	import PostSmall from './PostSmall.svelte';
	import { removeSvelteClasses } from '$lib/process';

	export let postJson: ProcessedPost | null = null;

	let postDom: Node | null = null;
	let postHTML: string = '';

	function finalizeHTML(): string {
		if (!postDom) return '';
		let html: string = removeSvelteClasses(postDom.cloneNode(true)).innerHTML;

		// Minify the html
		html = html.replace(/\>[\r\n ]+\</g, '><');
		html = html.replace(/<!--.*?-->/g, '');
		html = html.replace(/class=""/g, '');
		console.log(html);
		let css = postStyles.replace(/\n/g, '');

		html = `<iframe><style>${css}</style>${html}</iframe>`;

		postHTML = html;
	}
</script>

<div bind:this={postDom}>
	<PostSmall {postJson} actionCallback={finalizeHTML} />
</div>
<section>
	<div class="post-result">
		{#if postJson}
			<div id="left">
				<h2>Step 2: Set configuration</h2>
				<p>Coming soon</p>
			</div>
			<div id="right">
				<h2>Step 3: Copy the code into your website</h2>
				<Code copyText={postHTML} />
			</div>
		{:else}
			<h2 id="no-post">Submit a link above</h2>
		{/if}
	</div>
</section>

<style lang="scss">
	@import '../../routes/styles.scss';

	section {
		width: 1000px;
		border: 1px solid rgb(172, 172, 172);
		background-color: rgb(250, 250, 250);
		border-radius: 12px;
	}

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
			margin: 40px 0;
			opacity: 0.3;
		}

		#no-post {
			width: 100%;
			margin: 0;
			text-align: center;
		}

		#left {
			flex-basis: 50%;
			max-width: 50%;
		}
		#right {
			flex-basis: 50%;
			max-width: 50%;
		}
	}
</style>
