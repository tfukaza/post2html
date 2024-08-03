<script lang="ts">
	import type { ProcessedXData } from '$lib/x_types';

	import Code from '$components/Code.svelte';
	import { removeSvelteClasses } from '$lib/helper';
	import XPost from './embed/XPost.svelte';

	import * as Select from '$lib/components/ui/select';
	import * as Tabs from '$lib/components/ui/tabs';
	import * as Tooltip from '$lib/components/ui/tooltip';

	import IconHelp from '~icons/material-symbols/help';

	export let postJson: ProcessedXData | null = null;

	let postDom: Node | null = null;

	let postPreviewHTML: string = '';

	let postConfigData = {
		imageStyle: 'grid'
	};

	import { postConfig, postHTML } from '$components/store';

	postConfig.subscribe((value) => {
		console.log(value);
		postConfigData = value;
	});

	function finalizeHTML(): void {
		if (!postDom) return;

		let dom: HTMLElement = postDom.cloneNode(true) as HTMLElement;
		let post = dom.querySelector('div');
		if (!post) return;

		// Minify the html
		let tmpDom = document.createElement('div');
		tmpDom.appendChild(post);
		removeSvelteClasses(tmpDom);

		// Minify Css
		let cssDom = Array.prototype.slice
			.call(dom.querySelectorAll('style'))
			.concat(Array.prototype.slice.call(post.querySelectorAll('style')));
		let css = '';
		cssDom.forEach((style) => {
			console.log(style.innerHTML);
			css += style.innerHTML;
			style.innerHTML = '';
		});
		css = css.replace(/\/\*.*?\*\//g, '');
		// ; don't need any spaces after them
		css = css.replace(/;\s*/g, ';');
		// { and } don't need any spaces before and after them
		css = css.replace(/\s*\{\s*/g, '{');
		css = css.replace(/\s*\}\s*/g, '}');

		// Minify Js
		let scriptDom = post.querySelector('script');
		let script = '';
		if (scriptDom) {
			script = scriptDom.innerHTML;
			script = script.replace(/\n/g, ''); // Remove new lines
			script = script.replace(/\/\/.*?\n/g, ''); // Remove single line comments
			script = script.replace(/\/\*.*?\*\//g, ''); // Remove multi line comments
			script = script.replace(/\s+/g, ' '); // Remove extra spaces
			// Consecutive let and const declarations can be combined using commas
			script = script.replace(/let (.*?); let (.*?);/g, 'let $1, $2;');
			//unary operators (like +) don't need spaces between them and their operands
			script = script.replace(/\s*([\+\-\*\/\=\%\&\|\!\?\:\,<>])\s*/g, '$1');
			// ; Don't need any spaces after them
			script = script.replace(/;\s*/g, ';');
			// Remove spaces before and after brackets
			script = script.replace(/\s*\(\s*/g, '(');
			script = script.replace(/\s*\)\s*/g, ')');
			script = script.replace(/\s*\{\s*/g, '{');
			script = script.replace(/\s*\}\s*/g, '}');
			scriptDom.innerHTML = '';
		}

		let html: string = tmpDom.innerHTML;
		html = html.replace(/\>[\r\n ]+\</g, '><');
		html = html.replace(/<!--.*?-->/g, '');
		html = html.replace(/class=""/g, '');

		let finalHtml = `<div id="embedded-post">`;
		if (script) {
			finalHtml += `<script>${script}<\/script>`;
		}
		finalHtml += `<style>${css}<\/style>`;
		finalHtml += `${html}<\/div>`;

		postPreviewHTML = finalHtml;
		postHTML.set(finalHtml);
	}

	let imageStyle: string = 'grid';
	let previewMode: string = 'mobile';

	$: mobileActive = previewMode === 'mobile';
	$: tabletActive = previewMode === 'tablet';
	$: desktopActive = previewMode === 'desktop';
</script>

{#if postJson}
	<div id="preview">
		<div id="preview-options">
			<Tabs.Root value="mobile">
				<Tabs.List>
					<Tabs.Trigger value="mobile" on:click={() => (previewMode = 'mobile')}
						>Mobile</Tabs.Trigger
					>
					<Tabs.Trigger value="tablet" on:click={() => (previewMode = 'tablet')}
						>Tablet</Tabs.Trigger
					>
					<Tabs.Trigger value="desktop" on:click={() => (previewMode = 'desktop')}
						>Desktop</Tabs.Trigger
					>
				</Tabs.List>
			</Tabs.Root>
		</div>

		<div class={`preview-container ${previewMode}`}>
			<div id="preview-scroll">
				<div bind:this={postDom} style="display:none">
					<XPost {postJson} postConfig={postConfigData} actionCallback={finalizeHTML} />
				</div>

				{@html postPreviewHTML}

				{#if postPreviewHTML === ''}
					<p id="no-post">No post to display</p>
				{/if}

				<div />
			</div>
		</div>
	</div>
{/if}

<style lang="scss">
	@import '../../routes/styles.scss';

	#preview {
		z-index: 1;
		position: relative;

		display: flex;
		flex-direction: column;
		align-items: center;

		#preview-options {
			// position: absolute;
			// top: 530px;
			// left: 50%;
			// transform: translate(-50%, 0);
			z-index: 2;
		}
	}

	.list-disc {
		padding-left: 20px;

		list-style-type: disc;
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
