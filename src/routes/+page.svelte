<script lang="ts">
	import PostEditor from '$components/PostEditor.svelte';
	import { processXJson } from '$lib/x_process';
	import type { ProcessedXData } from '$lib/x_types';

	import { Input } from "$lib/components/ui/input";
	import { Button } from "$lib/components/ui/button";


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
	<meta name="description" content="Better embeds for Twitter posts" />
</svelte:head>

<main>
	<section id="input">
		<div class="input-link">
			<h1>Step 1: Paste the X (Twitter) link below</h1>
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
	</section>

	<PostEditor {postJson} />
</main>

<style lang="scss">
	@import './styles.scss';

	main {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		width: 1000px;
		margin: 0 auto;
	}

	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		width: 100%;
		margin: 20px 0;

		// border: 1px solid rgb(172, 172, 172);
		// background-color: rgb(250, 250, 250);
		// border-radius: 12px;
	}

	#input {
		height: 300px;
	}

	.input-link {
		padding: 30px;

		border-radius: 0px;

		h1 {
			margin-top: 0;
			font-size: 2rem;
		}
		> div {
			display: flex;
		}

		form {
			display: flex;
			gap: 20px;
			margin: 0px calc(50% - 200px);
		}

		
	}
</style>
