<script lang="ts">
	import type { ProcessedXData } from '$lib/x_types';
	import { postConfig } from '$components/store';
	import Code from '$components/Code.svelte';

	import * as Select from '$lib/components/ui/select';
	import * as Tooltip from '$lib/components/ui/tooltip';

	import IconHelp from '~icons/material-symbols/help';

	export let postJson: ProcessedXData | null = null;

	let postFinalHTML = '';
	import { postHTML } from '$components/store';
	postHTML.subscribe((value) => {
		postFinalHTML = value;
	});
</script>

{#if postJson}
	<div id="config-section">
		<div class="mb-2 flex items-center gap-1">
			<h3>Image Style</h3>
			<Tooltip.Root>
				<Tooltip.Trigger class="inline"><IconHelp /></Tooltip.Trigger>
				<Tooltip.Content>
					<div class="information">
						<p class="mb-2">Choose the style of the images in the post</p>
						<div class="flex flex-col items-center gap-1">
							<div class="flex items-center gap-1">
								<div class="grid grid-cols-2 grid-rows-2 gap-1">
									<div class="h-[32px] w-[32px] rounded-md bg-gray-300"></div>
									<div class="h-[32px] w-[32px] rounded-md bg-gray-300"></div>
									<div class="h-[32px] w-[32px] rounded-md bg-gray-300"></div>
									<div class="h-[32px] w-[32px] rounded-md bg-gray-300"></div>
								</div>
							</div>
							<p>Grid</p>
						</div>
					</div>
				</Tooltip.Content>
			</Tooltip.Root>
		</div>

		<Select.Root
			selected={{
				value: postConfig.imageStyle,
				label: postConfig.imageStyle === 'grid' ? 'Grid' : 'Carousel'
			}}
			onSelectedChange={(e) => postConfig.update((config) => ({ ...config, imageStyle: e.value }))}
		>
			<Select.Trigger class="w-[180px]">
				<Select.Value placeholder="Select..." />
			</Select.Trigger>
			<Select.Content>
				<Select.Item value="grid">Grid (default)</Select.Item>
				<Select.Item value="carousel">Carousel</Select.Item>
			</Select.Content>
		</Select.Root>
	</div>

	<div>
		<Code copyText={postFinalHTML} />
	</div>
{/if}

<style lang="scss">
	#config-section {
		h3 {
			display: inline;
			font-size: 0.9rem;
		}
	}

	.information {
		ul {
			padding-left: 20px;
			list-style-type: disc;
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
