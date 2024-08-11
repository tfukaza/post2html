<script lang="ts">
	import type { ProcessedXData } from '$lib/x_types';

	import Code from '$components/Code.svelte';
	import { removeSvelteClasses } from '$lib/helper';
	import XPost from './embed/XPost.svelte';

	import * as Select from '$lib/components/ui/select';
	import * as Tabs from '$lib/components/ui/tabs';
	import * as Tooltip from '$lib/components/ui/tooltip';

	import IconHelp from '~icons/material-symbols/help';
	import { postConfig, postHTML, postJson } from '$components/store';
	import { onMount } from 'svelte';

	let postDom: Node | null = null;

	let postPreviewHTML: string = '';

	let postConfigData = {};

	postConfig.subscribe((value) => {
		postConfigData = value;
	});
	let postJsonData: ProcessedXData | null = null;
	postJson.subscribe((value) => {
		postJsonData = value;
	});

	function finalizeHTML(): void {
		if (!postDom) return;

		let dom: HTMLElement = postDom.cloneNode(true) as HTMLElement;
		let post = dom.querySelector('div');
		if (!post) return;

		let tmpDom = document.createElement('div');
		tmpDom.appendChild(post);
		removeSvelteClasses(tmpDom);

		// Minify Css
		let cssDom = Array.prototype.slice
			.call(dom.querySelectorAll('style'))
			.concat(Array.prototype.slice.call(post.querySelectorAll('style')));
		let css = '';
		cssDom.forEach((style) => {
			css += style.innerHTML;
			style.innerHTML = '';
		});
		// Remove comments
		css = css.replace(/\/\/.*?\n/g, '');
		css = css.replace(/\/\*.*?\*\//g, '');
		// ; don't need any spaces after them
		css = css.replace(/;\s*/g, ';');
		// { and } don't need any spaces before and after them
		css = css.replace(/\s*\{\s*/g, '{');
		css = css.replace(/\s*\}\s*/g, '}');

		let scriptDom = Array.prototype.slice
			.call(dom.querySelectorAll('script'))
			.concat(Array.prototype.slice.call(post.querySelectorAll('script')));
		let script = '';
		scriptDom.forEach((code) => {
			script += code.innerHTML;
			code.innerHTML = '';
		});
		// Minify Js

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

		let html: string = tmpDom.innerHTML;
		html = html.replace(/\>[\r\n ]+\</g, '><');
		html = html.replace(/<!--.*?-->/g, '');
		html = html.replace(/class=""/g, '');
		//Remove any empty style or script tags
		html = html.replace(/<style><\/style>/g, '');
		html = html.replace(/<script><\/script>/g, '');
		// Replace quote with escaped quote
		html = html.replace(/"/g, '&quot;');
		html = html.replace(/'/g, '&apos;');

		let finalHtml = `<iframe srcdoc="`;
		if (script) {
			finalHtml += `<script defer>${script}<\/script>`;
		}
		finalHtml += `<style>${css}<\/style>`;
		finalHtml += `${html}" style="border: none; width:100%; overflow:hidden" scrolling="no" onload="let a=()=>{this.style.height=this.contentDocument?this.contentDocument.body.scrollHeight+'px':0}; a(); new ResizeObserver(a).observe(this)"></iframe>`;

		postPreviewHTML = finalHtml;
		postHTML.set(finalHtml);
	}

	// let imageStyle: string = 'grid';
	let previewMode: string = 'mobile';

	$: mobileActive = previewMode === 'mobile';
	$: tabletActive = previewMode === 'tablet';
	$: desktopActive = previewMode === 'desktop';

	let previewContainer: HTMLElement;

	onMount(() => {
		// if (!previewContainer) return;
		const resizeObserver = new ResizeObserver((entries) => {
			for (let entry of entries) {
				resizePreview(entry.target as HTMLElement);
			}
		});
		resizeObserver.observe(previewContainer);
		resizePreview(previewContainer);
	});

	function resizePreview(node: HTMLElement): void {
		if (!node) return;

		let width = node.clientWidth;
		let height = node.clientHeight;

		document.documentElement.style.setProperty(
			'--device-mobile-scale',
			Math.min((height / 844) * 0.8, 1)
		);
		document.documentElement.style.setProperty('--device-tablet-scale', (height / 1180) * 0.8);
		document.documentElement.style.setProperty('--device-desktop-scale', (width / 1920) * 0.8);
	}
</script>

<div id="preview-window" bind:this={previewContainer} class={previewMode}>
	{#if postJsonData}
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
			<div id="phone-island"></div>
			<div id="preview-scroll">
				<div bind:this={postDom} style="display:none">
					<XPost actionCallback={finalizeHTML} />
				</div>

				{@html postPreviewHTML}

				{#if postPreviewHTML === ''}
					<p id="no-post">No post to display</p>
				{/if}

				<div />
			</div>
		</div>
	{/if}
</div>

<style lang="scss">
	@import '../../routes/styles.scss';

	#preview-window {
		z-index: 1;
		position: relative;
		container: device-screen / inline-size;

		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100vh;

		background-color: rgb(245, 245, 245);
		background-image: radial-gradient(circle at 1px 1px, rgb(209, 210, 215) 1px, transparent 0);

		transition: background-size 0.2s;

		&.mobile {
			background-size: 32px 32px;
		}
		&.tablet {
			background-size: 24px 24px;
		}
		&.desktop {
			background-size: 16px 16px;
		}

		#preview-options {
			position: absolute;
			// top: 530px;
			bottom: 50px;
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
		padding: 16px;
		overflow: hidden;
		background-color: rgb(255, 255, 255);

		// transform: translate(0, 50px);

		box-sizing: border-box;
		backface-visibility: hidden;
		--webkit-font-smoothing: antialiased;

		// Inset line

		box-shadow:
			3px -3px 4px -2px rgba(33, 73, 104, 0.564) inset,
			0px 0px 6px 0px rgba(63, 78, 96, 0.55) inset,
			0px 0px 0px 5px rgb(239, 239, 239) inset,
			0px 0px 0px 16px rgb(43, 45, 47) inset,
			0px 40px 50px 12px rgb(63 81 100 / 30%);
		border-radius: 40px;

		transition: all 0.4s ease;

		#phone-island {
			position: absolute;
			top: 30px;
			left: 50%;
			transform: translate(-50%, 0);
			width: 90px;
			height: 24px;
			border-radius: 12px;
			background-color: rgb(53, 53, 58);
			z-index: 5;
			opacity: 1;

			transition: all 0.4s ease;
		}

		&.mobile {
			width: 390px;
			height: 844px;
			transform: scale(var(--device-mobile-scale));

			#phone-island {
				opacity: 1;
			}
		}
		&.tablet {
			box-shadow:
				3px -3px 4px -2px rgba(33, 73, 104, 0.564) inset,
				0px 0px 6px 0px rgba(63, 78, 96, 0.55) inset,
				0px 0px 0px 5px rgb(239, 239, 239) inset,
				0px 0px 0px 24px rgb(43, 45, 47) inset,
				0px 40px 50px 12px rgb(63 81 100 / 30%);
			padding: 24px;
			width: 820px;
			height: 1180px;
			transform: scale(var(--device-tablet-scale));

			#phone-island {
				top: 0px;
				height: 0px;
				opacity: 0;
			}
		}
		&.desktop {
			border-radius: 14px;
			box-shadow:
				3px -3px 4px -2px rgba(33, 73, 104, 0.564) inset,
				0px 0px 6px 0px rgba(63, 78, 96, 0.55) inset,
				0px 0px 0px 5px rgb(239, 239, 239) inset,
				0px 0 0px 32px rgb(72, 75, 79) inset,
				0px 40px 50px 12px rgb(63 81 100 / 30%);
			padding: 32px;
			width: 1920px;
			height: 1080px;
			transform: scale(var(--device-desktop-scale));

			#phone-island {
				opacity: 0;
			}
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
