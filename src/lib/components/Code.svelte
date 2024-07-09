<script lang="ts">
	export let copyText: string = '';

	import Prism from '@magidoc/plugin-svelte-prismjs';

	// Remove all newlines from the code
	copyText = copyText.replace(/\n/g, '');
	// Remove leading and trailing whitespaces
	copyText = copyText.trim();

	let copied: boolean = false;
	let timerID: NodeJS.Timeout | null = null;

	function copyToClipboard(e: MouseEvent) {
		const text = copyText;
		navigator.clipboard.writeText(text);
		if (timerID) {
			clearTimeout(timerID);
		}
		copied = true;
		timerID = setTimeout(() => {
			copied = false;
		}, 1000);
	}
</script>

<div class="code-container">
	<button on:click={copyToClipboard} class:animated={copied}>
		<span id="copy">📋</span>
		<span id="ok">✅</span>
	</button>
	<div>
		<Prism language="css" source={copyText} />
	</div>
</div>

<style lang="scss">
	@import './code-theme.scss';
	.code-container {
		overflow: hidden;
		position: relative;
		margin: 16px 0;
		border-radius: 4px;

		> div {
			background-color: #f0f0f0;
			overflow-x: scroll;

			&::-webkit-scrollbar {
				height: 4px;
			}
			&::-webkit-scrollbar-thumb {
				background: #888894;
			}
			&::-webkit-scrollbar-thumb:hover {
				background: #555;
			}
			&::-webkit-scrollbar-track {
				background: transparent;
				height: 8px;
			}
		}
	}
	button {
		position: absolute;
		top: 5px;
		right: 5px;
		z-index: 1000;

		background-color: transparent;
		border: 1.5px solid rgba(0, 0, 0, 0.139);
		border-radius: 4px;
		padding: 4px;
		cursor: pointer;

		transition: background-color 0.2s;

		&:hover {
			background-color: rgba(92, 92, 92, 0.121);
		}

		span {
			opacity: 0.8;
		}

		#copy {
			display: inline;
		}
		#ok {
			display: none;
		}
	}

	.animated {
		animation: copied 1s;
		#copy {
			display: none;
		}
		#ok {
			display: inline;
		}
	}

	@keyframes copied {
		0% {
			border-color: rgb(58, 174, 38);
		}
		100% {
			border-color: rgb(104, 107, 138);
		}
	}
</style>
