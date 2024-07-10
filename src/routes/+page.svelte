<script lang="ts">
	import PostEditor from '$lib/components/PostEditor.svelte';
	import { processPostJson } from '../lib/process';
	import type { ProcessedPost } from './postTypes';

	let postURL: string = '';
	let postJson: ProcessedPost | null = null;

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
		fetch(`/api/proxy?post-id=${postID}`)
			.then((response) => response.json())
			.then((data) => {
				postJson = processPostJson(data);
			});
	}
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<main>
	<section id="input">
		<div class="input-link">
			<h1>Step 1: Paste the X (Twitter) link below</h1>
			<form>
				<input
					type="text"
					placeholder="https://x.com/xkcd/status/1600626775150759936"
					bind:value={postURL}
					on:input={() => (disableSubmit = !checkUrlValidity(postURL))}
				/>
				<button class={disableSubmit ? 'disable' : ''} on:click={onSubmit}>Submit</button>
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

		border: 1px solid rgb(172, 172, 172);
		background-color: rgb(250, 250, 250);
		border-radius: 12px;
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
			margin: 0px calc(50% - 200px);
		}

		input {
			font-family: var(--font-mono);
			height: 30px;
			width: 400px;
			margin: 0;
			padding: 0 10px;
			box-sizing: border-box;
			border: 1px solid rgb(172, 172, 172);
			border-radius: 5px 0px 0px 5px;
			font-size: 0.9rem;
		}

		button {
			height: 30px;
			padding: 0 10px;
			box-sizing: border-box;
			font-size: 0.9rem;
			background-color: rgb(59, 60, 61);
			color: rgb(255, 255, 255);
			border: none;
			border-radius: 0px 5px 5px 0px;
			cursor: pointer;

			&.disable {
				background-color: rgb(172, 172, 172);
				cursor: not-allowed;
			}
		}
	}
</style>
