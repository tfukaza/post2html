<script lang="ts">
	import type { ProcessedXData } from '$lib/x_types';

	import Code from '$components/Code.svelte';
	import { removeSvelteClasses } from '$lib/helper';
	import XPost from './embed/XPost.svelte';

	export let postJson: ProcessedXData | null = null;

	let postDom: Node | null = null;
	let postHTML: string = 'https://x.com/xkcd/status/1617278817151721475';

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

		postHTML = finalHtml;
	}

	let previewMode: string = 'mobile';
	$: mobileActive = previewMode === 'mobile';
	$: tabletActive = previewMode === 'tablet';
	$: desktopActive = previewMode === 'desktop';
</script>

{#if postJson}
	<div id="preview">
		<div id="preview-options">
			<button on:click={() => (previewMode = 'mobile')} class={mobileActive ? 'active' : ''}>
				Mobile
			</button>
			<button on:click={() => (previewMode = 'tablet')} class={tabletActive ? 'active' : ''}>
				Tablet
			</button>
			<button on:click={() => (previewMode = 'desktop')} class={desktopActive ? 'active' : ''}>
				Desktop
			</button>
		</div>
		<div class={`preview-container ${previewMode}`}>
			<div id="preview-scroll">
				<div bind:this={postDom} style="display:none">
					<XPost {postJson} actionCallback={finalizeHTML} />
				</div>

				{@html postHTML}

				<div />
			</div>
		</div>
	</div>

	<div class="post-result">
		<div id="left">
			<h2>Step 2: Set configuration</h2>
			<p>Coming soon</p>
		</div>
		<div id="right">
			<h2>Step 3: Copy the code into your website</h2>
			<Code copyText={postHTML} />
		</div>
	</div>
{:else}
	<h2 id="no-post">Submit a link above</h2>
{/if}

<style lang="scss">
	@import '../routes/styles.scss';

	#preview {
		z-index: 1;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}

	#preview-options {
		display: flex;
		gap: 1px;
		background-color: rgb(239, 239, 239);
		border-radius: 8px;
		border: 1px solid rgb(239, 239, 239);
		overflow: hidden;

		button {
			padding: 10px 20px;
			border: none;
			background-color: rgb(255, 255, 255);
			cursor: pointer;
			transition: background-color 0.2s;
			&:hover {
				background-color: rgb(220, 220, 220);
			}
		}

		.active {
			background-color: rgb(220, 220, 220);
		}
	}

	.preview-container {
		height: 600px;
		padding: 16px;
		overflow: hidden;

		transform: translate(0, 50px);

		box-sizing: border-box;
		// Inset line

		box-shadow: 3px -3px 4px -2px rgba(33, 73, 104, 0.564) inset,
			0px 0px 6px 0px rgba(63, 78, 96, 0.55) inset, 0px 0px 0px 5px rgb(239, 239, 239) inset,
			0px 0px 0px 16px rgb(43, 45, 47) inset, 0px 40px 50px 12px rgb(63 81 100 / 30%);
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
		border: 1px solid rgb(172, 172, 172);
		background-color: rgb(250, 250, 250);
		border-radius: 16px;

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
