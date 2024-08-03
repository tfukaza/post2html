<script lang="ts">
	import PostEditor from '$components/PostEditor.svelte';
	import PostPreview from '$components/PostPreview.svelte';
	import { processXJson } from '$lib/x_process';
	import type { ProcessedXData } from '$lib/x_types';

	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';

	let postURL: string = '';
	let postJson: ProcessedXData | null = null;

	let disableSubmit = !checkUrlValidity(postURL);

	function checkUrlValidity(url: string): boolean {
		// A valid url contains 19 digits of numbers
		const regex = /\d{19}/;
		console.log(regex.test(url));
		return regex.test(url);
	}

	function getPostID(url: string): string {
		// Get the part with 19 consecutive digits
		const regex = /\d{19}/;
		const match = url.match(regex);
		if (match) {
			return match[0];
		}
		return '';
	}

	function onSubmit(event: MouseEvent) {
		const postID = getPostID(postURL);
		if (postID === '') {
			console.error('Invalid post ID');
			return;
		}
		fetch(`/api/proxy_x?post-id=${postID}`)
			.then((response) => response.json())
			.then((data) => {
				postJson = processXJson(data);
			});
	}
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
		<div id="url-section">
			<form>
				<Input
					type="text"
					placeholder="Paste the X (Twitter) link here"
					bind:value={postURL}
					on:input={() => (disableSubmit = !checkUrlValidity(postURL))}
				/>
				<Button class={disableSubmit ? 'disable' : ''} on:click={onSubmit}>Submit</Button>
			</form>
		</div>
		<h3>Step 2: Configure</h3>
		<hr />
		<PostEditor {postJson} />
	</section>
	<section id="preview">
		<PostPreview {postJson} />
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
			padding: 10px 0px 20px 0px;
			h1 {
				margin-top: 0;
				font-size: 1.5rem;
			}
		}

		#url-section {
			padding: 20px 0px;
			h1 {
				margin-top: 0;
				font-size: 2rem;
			}

			form {
				width: 100%;
				display: flex;
				gap: 20px;
			}
		}
	}

	#preview {
		grid-column: 2;
		height: 100vh;
		overflow-y: scroll;

		background-color: rgb(245, 245, 245);
		background-image: radial-gradient(circle at 1px 1px, rgb(209, 210, 215) 1px, transparent 0);
		background-size: 32px 32px;
	}
</style>
