<script lang="ts">
	import type { ProcessedXData, OriginalXData } from '$lib/x_types';
	import { processXJson } from '$lib/x_process';
	import { postJson, postHTML } from '$components/store';

	import IconHelp from '~icons/material-symbols/help';
	import IconChevronRight from '~icons/material-symbols/chevron-right';
	import Code from '$components/Code.svelte';
	import { Button } from 'flowbite-svelte';
	import { Popover } from 'flowbite-svelte';
	import { Toggle } from 'flowbite-svelte';
	import { Select, Label } from 'flowbite-svelte';
	import { Textarea } from 'flowbite-svelte';
	import { Hr } from 'flowbite-svelte';
	import { Spinner } from 'flowbite-svelte';

	let postJsonData: ProcessedXData | null = null;
	let postDataPromise: Promise<boolean> | null = null;
	let postURL: string = '';
	let disableSubmit = !checkUrlValidity(postURL);
	let fetchProgress = 0;

	function checkUrlValidity(url: string): [string, string] | null {
		// A valid X post url is in the following format
		// [username]/status/[19 digit number]
		const regex = /([a-zA-Z0-9_]){4,15}\/status\/([0-9]{19})$/;
		const match = url.match(regex);
		if (match) {
			return [match[0], match[1]];
		}
		return null;
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

	function handleUrlChange(url: string) {
		const result = checkUrlValidity(url);
		if (result) {
			const [username, postID] = result;
			disableSubmit = false;
		} else {
			disableSubmit = true;
		}
	}
	function handleSubmit(event: MouseEvent) {
		fetchProgress = 0;
		postDataPromise = fetchPostData(event);
	}

	async function fetchPostData(event: MouseEvent) {
		fetchProgress = 16;
		const postID = getPostID(postURL);
		if (postID === '') {
			throw new Error('Invalid post ID');
		}
		fetchProgress = 32;
		const response = await fetch(`/api/proxy_x?post-id=${postID}`);
		const data: OriginalXData = await response.json();
		fetchProgress = 48;
		const processedData = processXJson(data);
		fetchProgress = 64;
		postJson.update((_: ProcessedXData) => {
			return processedData;
		});
		fetchProgress = 80;
		postJsonData = processedData;
		fetchProgress = 100;
		return true;
	}

	function setConfig(property: string, value: any) {
		console.log(property, value);
		postJson.update((v: ProcessedXData) => {
			v.config[property] = value;
			return { ...v };
		});
	}

	let postFinalHTML = '';
	postHTML.subscribe((value) => {
		postFinalHTML = value;
	});

	let fullPostText = '';

	function setFullPostText() {
		if (!postJson) return;

		postJson.update((v: ProcessedXData) => {
			v.text = fullPostText;
			return v;
		});
	}

	let showAdvancedConfig = false;
</script>

<div class="flex flex-col gap-4">
	<h2>post2html</h2>
</div>

<Hr />

<div id="url-section">
	<form>
		<Textarea
			placeholder="Paste the X (Twitter) link here"
			bind:value={postURL}
			on:input={() => handleUrlChange(postURL)}
			style={postURL.length > 0 && disableSubmit ? 'box-shadow:inset 0 0 3px 3px #ffccc7;' : ''}
		></Textarea>

		<Button on:click={handleSubmit} disabled={disableSubmit} class="flex items-center gap-2">
			{#await postDataPromise}
				<Spinner size="4" />
				Submitting...
			{:then success}
				{#if disableSubmit}
					Invalid X post URL
				{:else}
					Submit
				{/if}
			{:catch error}
				Error
			{/await}
		</Button>
	</form>
</div>
{#await postDataPromise}
	<div class="text-center">
		<Spinner />
	</div>
{:then success}
	{#if postJsonData}
		<Hr />
		<div id="config-section">
			<div class="config-item">
				<div class="flex items-center gap-1">
					<h3>Image Style</h3>
					<IconHelp id="image-style-tooltip" />
					<Popover class="w-64 text-sm " triggeredBy="#image-style-tooltip">
						<div class="information flex flex-col gap-4 p-4">
							<p class="mb-2">Choose the style of the images in the post</p>
							<div class="flex flex-row justify-center gap-8">
								<div class="flex flex-col items-center gap-1" id="image-style-tip-grid">
									<div>
										<div></div>
										<div></div>
										<div></div>
										<div></div>
									</div>
									<p class="text-slate-400">Grid</p>
								</div>
								<div class="flex flex-col items-center gap-1" id="image-style-tip-caraousel">
									<div>
										<div></div>
										<div></div>
										<div></div>
									</div>
									<p class="text-slate-400">Carousel</p>
								</div>
							</div>
							<hr />
							<p>
								<b>Grid</b> layouts closely resemble how images are displayed on X(Twitter). The images
								may become small and hard to see, especially if there are two or more images, although
								it has the advantage of keeping the code size small.
							</p>
							<p>
								<b>Carousel</b> layouts allow images to be displayed in a larger size, but the code size
								of the embedding is larger compared to the grid layout.
							</p>
						</div>
					</Popover>
				</div>
				<Label>
					<Select
						class=""
						items={[
							{ value: 'grid', name: 'Grid' },
							{ value: 'carousel', name: 'Carousel' }
						]}
						size="sm"
						on:change={(e) => setConfig('imageStyle', e && e.target ? e.target.value : 'grid')}
					/>
				</Label>
			</div>
			<div class="config-item">
				<div class="flex items-center gap-1">
					<h3>Show full size image</h3>
					<IconHelp id="show-full-size-tooltip" />
					<Popover class="w-64 text-sm " triggeredBy="#show-full-size-tooltip">
						<div class="information flex flex-col gap-4 p-4">
							<p class="mb-2">
								If enabled, when a user clicks or taps on an image, the image will expand to fill
								the embedded post. This is especially useful if you selected the grid layout, as the
								images tend to get cropped and shrunken.
							</p>

							<p>To close the image, the user can click or tap on the image again.</p>
						</div>
					</Popover>
				</div>

				<Toggle
					on:change={(e) => setConfig('imageFull', e.target.checked)}
					checked={postJsonData.config.imageFull}
				/>
			</div>

			<div id="advanced-config">
				<button
					on:click={() => (showAdvancedConfig = !showAdvancedConfig)}
					class="mb-4 flex items-center gap-1"
				>
					<h3>Advanced Settings</h3>
					<span class={showAdvancedConfig ? 'rotate-90' : ''}>
						<IconChevronRight />
					</span>
				</button>
				{#if showAdvancedConfig}
					<div class="config-item column var-height">
						<div class="flex items-center gap-1">
							<h3>Full Post Text</h3>
							<IconHelp id="full-post-text-tooltip" />
							<Popover class="w-64 text-sm " triggeredBy="#full-post-text-tooltip">
								<div class="information flex flex-col gap-4 p-4">
									<p class="mb-2">
										By default, embedded X posts can only display up to 140 characters of text. If
										you want to display more, you can copy and paste the full text from the original
										post here. post2html will automatically process the text to convert hashtags and
										mentions into clickable links.
									</p>
								</div>
							</Popover>
						</div>
						<Textarea
							placeholder="Paste in the full post text here"
							bind:value={fullPostText}
							on:input={() => setFullPostText()}
						></Textarea>
					</div>
				{/if}
			</div>
		</div>
		<Hr />
		<div id="code-section">
			<Code copyText={postFinalHTML} />
			<p>Size: {postFinalHTML.length} bytes</p>
		</div>
	{/if}
{:catch error}
	<p>Error: {error}</p>
{/await}

<style lang="scss">
	@import '../../routes/styles.scss';

	#url-section,
	#config-section,
	#code-section {
		margin-bottom: 64px;
	}
	#config-section {
		h3 {
			display: inline;
			font-size: 0.9rem;
		}
	}

	.information {
		min-width: 200px;
		max-width: 300px;
		z-index: 20;
		ul {
			padding-left: 20px;
			list-style-type: disc;
		}
	}

	#image-style-tip-caraousel {
		// keyframes to slide the mock images in the carousel horizontally
		@keyframes slide {
			0%,
			30% {
				transform: translateX(0);
			}
			70%,
			100% {
				transform: translateX(-52px);
			}
		}

		> div {
			width: 64px;
			height: 68px;
			overflow: hidden;
			display: flex;
			flex-direction: row;
			gap: 4px;

			> div {
				flex-shrink: 0;
				width: 48px;
				height: 68px;
				border-radius: 4px;
				background-color: #d1d5db;
				animation: slide 1s infinite ease-in-out;
			}
		}
	}

	#image-style-tip-grid {
		> div {
			width: 68px;
			height: 68px;
			display: grid;
			grid-template-columns: repeat(2, 1fr);
			grid-template-rows: repeat(2, 1fr);
			gap: 4px;

			> div {
				border-radius: 4px;
				background-color: #d1d5db;
			}
		}
	}

	.config-item {
		display: flex;
		position: relative;
		// z-index: 0;

		align-items: center;
		margin-bottom: var(--spacing-4);
		width: 100%;
		justify-content: space-between;

		min-height: 40px;

		&.row {
			flex-direction: row;
		}

		&.column {
			align-items: flex-start;
			flex-direction: column;
			gap: var(--spacing-5);
		}
	}

	#url-section {
		padding: 0px;

		h1 {
			margin-top: 0;
			font-size: 2rem;
		}

		form {
			width: 100%;
			display: flex;
			flex-direction: column;
			gap: 16px;

			textarea {
				height: 80px;
				border-radius: 10px;
				padding: 10px;
				border: 1px solid rgb(223, 223, 223);
			}
		}
	}

	#code-section {
		p {
			font-size: 0.8rem;
			font-family: monospace;
			text-align: right;
		}
	}

	#advanced-config {
		border-left: 2px solid rgb(255, 85, 0);
		padding-left: var(--spacing-4);
	}

	.preview-container {
		height: 600px;
		padding: 16px;
		overflow: hidden;

		transform: translate(0, 50px);

		box-sizing: border-box;
		// Inset line

		box-shadow:
			3px -3px 4px -2px rgba(33, 73, 104, 0.564) inset,
			0px 0px 6px 0px rgba(63, 78, 96, 0.55) inset,
			0px 0px 0px 5px rgb(239, 239, 239) inset,
			0px 0px 0px 16px rgb(43, 45, 47) inset,
			0px 40px 50px 12px rgb(63 81 100 / 30%);
		border-radius: 40px;

		transition: width 0.2s;

		&.mobile {
			width: 375px;
		}
		&.tablet {
			width: 768px;
		}
		&.desktop {
			width: 1000px;
		}
	}

	#preview-scroll {
		width: 100%;
		height: 100%;
		padding: 20px;

		box-sizing: border-box;
		border-radius: 30px;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;

		overflow-y: scroll;

		&::-webkit-scrollbar {
			display: none;
		}

		> div {
			height: 200px;
			width: 100%;
		}
	}

	.post-result {
		z-index: 2;
		display: flex;
		gap: 60px;
		padding: 30px;
		box-sizing: border-box;

		width: 1000px;
		border: 1px solid rgb(223, 223, 223);
		background-color: rgb(255, 255, 255);
		border-radius: 16px;

		h1 {
			margin: 0;
			text-align: left;
		}

		h2 {
			margin-bottom: 8px;
			text-align: left;
		}

		h3 {
			margin-bottom: 4px;
			text-align: left;
			font-size: 0.9rem;
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
