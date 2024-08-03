<script lang="ts">
	import PostEditor from '$components/PostEditor.svelte';
	import PostPreview from '$components/PostPreview.svelte';

	import type { ProcessedXData } from '$lib/x_types';

	// let postJson: ProcessedXData | null = null;
</script>

<svelte:head>
	<title>post2html</title>
	<meta name="description" content="Better embeds for social media posts" />
</svelte:head>

<main>
	<section id="sidebar">
		<div id="header">
			<h1>post2html</h1>
		</div>

		<PostEditor />
	</section>
	<section id="preview">
		<PostPreview />
	</section>
</main>

<style lang="scss">
	@import './styles.scss';

	main {
		display: grid;
		grid-template-columns: 350px 1fr;
		width: 100vw;
		height: 100vh;
		flex-direction: row;
	}

	#sidebar {
		grid-column: 1;
		height: 100vh;
		overflow-y: scroll;
		padding: 20px;

		#header {
			padding: 10px 0px 64px 0px;
			h1 {
				margin-top: 0;
				font-size: 1.5rem;
			}
		}
	}

	#preview {
		grid-column: 2;
		height: 100vh;
		overflow-y: scroll;
	}
</style>
