<script lang="ts">
	import type { ProcessedXData } from '$lib/x_types';
	import { processXJson } from '$lib/x_process';
	import { postConfig, postJson, postHTML } from '$components/store';

	import * as Select from '$lib/components/ui/select';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import IconHelp from '~icons/material-symbols/help';
	import Code from '$components/Code.svelte';
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';

	let postJsonData: ProcessedXData | null = null;
	postJson.subscribe((value) => {
		postJsonData = value<ProcessedXData>;
	});

	let postURL: string = '';
	let disableSubmit = !checkUrlValidity(postURL);

	function checkUrlValidity(url: string): boolean {
		// A valid url contains 19 digits of numbers
		const regex = /\d{19}/;
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
				postJson.update((value) => {
					return processXJson(data);
				});
			});
	}

	let postFinalHTML = '';
	postHTML.subscribe((value) => {
		postFinalHTML = value;
	});
</script>

<div class="divided">
	<h3>1. Paste the Link</h3>
	<span></span>
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
{#if postJsonData}
	<div class="divided">
		<h3>2. Configure</h3>
		<span></span>
	</div>
	<div id="config-section">
		<div class="config-item">
			<div class="flex items-center gap-1">
				<h3>Image Style</h3>
				<Tooltip.Root>
					<Tooltip.Trigger class="inline"><IconHelp /></Tooltip.Trigger>
					<Tooltip.Content>
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
					</Tooltip.Content>
				</Tooltip.Root>
			</div>
			<Select.Root
				selected={{
					value: postConfig.imageStyle ? postConfig.imageStyle : 'grid',
					label: postConfig.imageStyle ? postConfig.imageStyle : 'Grid'
				}}
				onSelectedChange={(e) =>
					postConfig.update((config) => ({ ...config, imageStyle: e.value }))}
			>
				<Select.Trigger class="w-[180px]">
					<Select.Value placeholder="Select..." />
				</Select.Trigger>
				<Select.Content>
					<Select.Item value="grid">Grid</Select.Item>
					<Select.Item value="carousel">Carousel</Select.Item>
				</Select.Content>
			</Select.Root>
		</div>
	</div>
	<div class="divided">
		<h3>3. Copy the Code</h3>
		<span></span>
	</div>
	<div id="code-section">
		<Code copyText={postFinalHTML} />
		<p>Size: {postFinalHTML.length} bytes</p>
	</div>
{/if}

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

	.divided {
		width: 100%;
		margin-bottom: 16px;
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 10px;

		h3 {
			font-size: 0.9rem;

			margin: 0;
			width: max-content;
		}
		span {
			margin: 0;
			flex-grow: 1;

			height: 2px;
			background-color: rgb(237, 237, 237);
			border-radius: 1px;
			transform: translateY(2px);
		}
	}

	.config-item {
		display: flex;
		flex-direction: row;
		gap: 20px;
		align-items: center;

		&:first-child {
			width: max-content;
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
			gap: 16px;
		}
	}

	#code-section {
		p {
			font-size: 0.8rem;
			font-family: monospace;
			text-align: right;
		}
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
