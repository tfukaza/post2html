<script lang="ts">
	import '../../app.css';
	import { Button } from 'flowbite-svelte';
	import { Select } from 'flowbite-svelte';

	import IconDragHandle from '~icons/material-symbols/drag-handle';

	let samplePlatforms = [{ value: 'x', name: 'X' }];
	let selectedPlatform = 'x';

	let benchSamplePosts = [
		{ value: '1', name: 'Sample Post 1' },
		{ value: '2', name: 'Sample Post 2' },
		{ value: '3', name: 'Sample Post 3' }
	];

	let benchPostHTML = {
		1: {
			official:
				`<blockquote class="twitter-tweet"><p lang="en" dir="ltr">My mom sent me some papers that belonged to my grandfather, Darwin Randall Crum, which included a collection of “Disfrustrating Puzzles” he created <a href="https://t.co/MG2gLGZ3oU">pic.twitter.com/MG2gLGZ3oU</a></p>&mdash; Randall Munroe (@xkcd) <a href="https://twitter.com/xkcd/status/1617278817151721475?ref_src=twsrc%5Etfw">January 22, 2023</a></blockquote>` +
				`<` +
				`script async src=\"https://platform.twitter.com/widgets.js\" charset=\"utf-8\">` +
				`</` +
				`script>`,
			alternative: `<iframe srcdoc="<style>*{margin: 0;padding: 0;box-sizing: border-box;}.x-post{display: block;border: 1px solid #ccc;background-color: #ffffff;border-radius: 8px;margin: 0px;box-sizing: border-box;margin: 0px auto 0px auto;font-family: sans-serif;max-width: 500px;container-type: inline-size;overflow: hidden;position: relative;cursor: pointer;}.x-post:hover:not(:has(a:hover)){background-color: #f9f9f9;transition: background-color 0.2s;}.x-post .profile{display: grid;grid-template-columns: 50px 1fr;grid-template-rows: 1fr 1fr;-moz-column-gap: 8px;column-gap: 8px;margin: 20px;margin-bottom: 0px;}.x-post .profile img{border-radius: 50%;width: 50px;height: 50px;grid-column: 1/2;grid-row: 1/3;}.x-post .profile .name{grid-column: 2/3;grid-row: 1/2;align-self: center;text-overflow: ellipsis;white-space: nowrap;overflow: hidden;font-weight: bold;font-size: 1em;color: #333;}.x-post .profile .screen-name{grid-column: 2/3;grid-row: 2/3;align-self: center;font-size: 0.9em;color: #666;}.x-post .post{word-wrap: break-word;margin: 20px;}.x-post .post a{color: #099ef5;text-decoration: none;}.x-post .post a:hover{text-decoration: underline;}@media only screen and (min-width: 800px){.has-media.has-text{max-width: 900px;display: grid;grid-template-columns: 1fr 1fr;justify-items: center;gap: 10px;}.has-media.has-text .main{grid-column: 1/2;width: 100%;padding: 20px;}}*{}.x-post .media{border-radius: 8px;display: grid;gap: 2px;justify-items: center;align-items: center;box-sizing: border-box;overflow: hidden;margin: 20px;}.x-post .media img{-o-object-fit: cover;object-fit: cover;}.x-post .media.num-media-1{grid-template-columns: 1fr;}.x-post .media.num-media-1 img{width: 100%;}.x-post .media.num-media-2{grid-template-columns: 1fr 1fr;}.x-post .media.num-media-2 img{height: 200px;width: 100%;}.x-post .media.num-media-3, .x-post .media.num-media-4{height: 300px;container-type: size;grid-template-columns: 1fr 1fr;grid-template-rows: 1fr 1fr;}.x-post .media.num-media-3 img, .x-post .media.num-media-4 img{width: 100%;height: 50cqh;}.x-post .media.num-media-3 img:nth-child(1){grid-column: 1/2;grid-row: 1/3;height: 100cqh;}@media only screen and (max-width: 500px){.x-post{max-width: 500px;}}@media only screen and (min-width: 800px){.has-media.has-text{max-width: 900px;display: grid;grid-template-columns: 1fr 1fr;grid-template-rows: 1fr auto 1fr;gap: 10px;}.has-media.has-text .main{grid-column: 1/2;grid-row: 2/3;}.has-media.has-text .media{margin: 10px 0;height: auto;width: calc(100% - 20px);grid-column: 2/3;grid-row: 1/4;}.has-media.has-text .media.num-media-2 img{height: 300px;}.has-media.has-text .media.num-media-1 img{border-radius: 8px;}.has-media.has-text .media.num-media-3, .has-media.has-text .media.num-media-4{min-height: 300px;}}*{} *{}</style><div class=&quot;x-post has-media has-text&quot; onclick=&quot;(function(e){if(e.target.tagName!==&apos;A&apos;)window.open(&apos;https://twitter.com/xkcd/status/1617278817151721475&apos;, &apos;_blank&apos;).focus();})(arguments[0])&quot;><div class=&quot;main&quot;><div class=&quot;profile&quot;><img src=&quot;https://pbs.twimg.com/profile_images/1488600831377252354/hEpPeSu0_normal.jpg&quot; alt=&quot;Randall Munroe&quot; ><div class=&quot;name&quot;>Randall Munroe</div><div class=&quot;screen-name&quot;>@xkcd</div></div><div class=&quot;post&quot;>My mom sent me some papers that belonged to my grandfather, Darwin Randall Crum, which included a collection of “Disfrustrating Puzzles” he created </div></div><div class=&quot;media num-media-4 media-0&quot;><img src=&quot;https://pbs.twimg.com/media/FnG6gSDWIAAOv_g?format=jpg&amp;name=medium&quot; alt=&quot;pic.x.com/MG2gLGZ3oU&quot; id=&quot;media-0&quot;><img src=&quot;https://pbs.twimg.com/media/FnG6gR_WYAE38kv?format=jpg&amp;name=medium&quot; alt=&quot;pic.x.com/MG2gLGZ3oU&quot; id=&quot;media-1&quot;><img src=&quot;https://pbs.twimg.com/media/FnG6gSAWAAE_-1t?format=jpg&amp;name=medium&quot; alt=&quot;pic.x.com/MG2gLGZ3oU&quot; id=&quot;media-2&quot;><img src=&quot;https://pbs.twimg.com/media/FnG6gR_XoAALsoJ?format=jpg&amp;name=medium&quot; alt=&quot;pic.x.com/MG2gLGZ3oU&quot; id=&quot;media-3&quot;></div></div>" style="border: none; width:100%; overflow:hidden" scrolling="no" onload="let a=()=>{this.style.height=this.contentDocument?this.contentDocument.body.scrollHeight+'px':0}; a(); new ResizeObserver(a).observe(this)"></iframe>`
		},
		2: {
			official:
				`<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Vercel AI SDK 3.3<br><br>• Tracing (OTEL with Datadog, Axiom, Sentry, and more)<br>• Multi-modal file attachments (\`useChat\`)<br>• Stream object generation (\`useObject\`)<br>• JSON for tools, structured object generation, and more<a href="https://t.co/P4NV5pN9hL">https://t.co/P4NV5pN9hL</a></p>&mdash; Vercel (@vercel) <a href="https://twitter.com/vercel/status/1820922005434040370?ref_src=twsrc%5Etfw">August 6, 2024</a></blockquote> <` +
				`script async src="https://platform.twitter.com/widgets.js" charset="utf-8"><` +
				`/script>`,
			alternative:
				`<iframe srcdoc="<scrip` +
				`t defer>window.addEventListener('resize',()=>{const card=document.querySelector('.card');const img=document.querySelector('.card img');if(card&&img){let a=()=>{card.style.height=img.clientHeight+'px';};new ResizeObserver(()=>{a();}).observe(card);a();}});</` +
				`script><style>*{margin: 0;padding: 0;box-sizing: border-box;}.x-post{display: block;border: 1px solid #ccc;background-color: #ffffff;border-radius: 8px;margin: 0px;box-sizing: border-box;margin: 0px auto 0px auto;font-family: sans-serif;max-width: 500px;container-type: inline-size;overflow: hidden;position: relative;cursor: pointer;}.x-post:hover:not(:has(a:hover)){background-color: #f9f9f9;transition: background-color 0.2s;}.x-post .profile{display: grid;grid-template-columns: 50px 1fr;grid-template-rows: 1fr 1fr;-moz-column-gap: 8px;column-gap: 8px;margin: 20px;margin-bottom: 0px;}.x-post .profile img{border-radius: 50%;width: 50px;height: 50px;grid-column: 1/2;grid-row: 1/3;}.x-post .profile .name{grid-column: 2/3;grid-row: 1/2;align-self: center;text-overflow: ellipsis;white-space: nowrap;overflow: hidden;font-weight: bold;font-size: 1em;color: #333;}.x-post .profile .screen-name{grid-column: 2/3;grid-row: 2/3;align-self: center;font-size: 0.9em;color: #666;}.x-post .post{word-wrap: break-word;margin: 20px;}.x-post .post a{color: #099ef5;text-decoration: none;}.x-post .post a:hover{text-decoration: underline;}@media only screen and (min-width: 800px){.has-media.has-text{max-width: 900px;display: grid;grid-template-columns: 1fr 1fr;justify-items: center;gap: 10px;}.has-media.has-text .main{grid-column: 1/2;width: 100%;padding: 20px;}}*{}.x-post .card{position: relative;display: block;width: calc(100% - 40px);margin: 0px 20px 20px 20px;border-radius: 8px;overflow: hidden;border: 1px solid #e0e0e0;display: grid;align-items: stretch;transition: transform 0.2s ease-in-out;}.x-post .card > *{grid-column: 1/2;grid-row: 1/2;}.x-post .card > a{z-index: 1;width: 100%;height: 100%;}.x-post .card > img{border-radius: 8px;width: 100%;height: auto;-o-object-fit: contain;object-fit: contain;}.x-post .card > div{position: absolute;background-color: rgba(0, 0, 0, 0.5);color: white;padding: 6px 10px;bottom: 8px;left: 8px;border-radius: 8px;}.x-post .card:hover{transform: scale(1.02);}@media only screen and (max-width: 500px){.x-post{max-width: 500px;}}@media only screen and (min-width: 800px){.has-media.has-text{max-width: 900px;display: grid;grid-template-columns: 1fr 1fr;grid-template-rows: 1fr auto 1fr;gap: 10px;align-items: center;}.has-media.has-text .main{grid-column: 1/2;grid-row: 2/3;}.has-media.has-text .card{margin: 10px 0;height: auto;width: calc(100% - 20px);grid-column: 2/3;grid-row: 1/4;}}*{} *{}</style><div class=&quot;x-post has-media has-text&quot; onclick=&quot;(function(e){if(e.target.tagName!==&apos;A&apos;)window.open(&apos;https://twitter.com/vercel/status/1820922005434040370&apos;, &apos;_blank&apos;).focus();})(arguments[0])&quot;><div class=&quot;main&quot;><div class=&quot;profile&quot;><img src=&quot;https://pbs.twimg.com/profile_images/1767351110228918272/3Pndc5OT_normal.png&quot; alt=&quot;Vercel&quot; ><div class=&quot;name&quot;>Vercel</div><div class=&quot;screen-name&quot;>@vercel</div></div><div class=&quot;post&quot;>Vercel AI SDK 3.3<br><br>• Tracing (OTEL with Datadog, Axiom, Sentry, and more)<br>• Multi-modal file attachments (\`useChat\`)<br>• Stream object generation (\`useObject\`)<br>• JSON for tools, structured object generation, and more<br><br></div></div><div class=&quot;card&quot;><a href=&quot;https://t.co/P4NV5pN9hL&quot; target=&quot;_blank&quot;></a><img src=&quot;https://pbs.twimg.com/card_img/1841218122046414852/RSydz_k-?format=png&amp;name=600x600&quot; alt=&quot;Vercel AI SDK 3.3 - Vercel&quot;><div><p>Vercel AI SDK 3.3 - Vercel</p></div></div></div>" style="border: none; width:100%; overflow:hidden" scrolling="no" onload="let a=()=>{this.style.height=this.contentDocument?this.contentDocument.body.scrollHeight+'px':0}; a(); new ResizeObserver(a).observe(this)"></iframe>`
		},
		3: {
			official: '',
			alternative: ''
		}
	};

	let officialPostHTML = benchPostHTML[1].official;
	let alternativePostHTML = benchPostHTML[1].alternative;

	let benchStartTime = 0;
	let officialElapsedTime = 0;
	let officialDoneLoading = false;
	let alternativeElapsedTime = 0;
	let alternativeDoneLoading = false;
	let benchWinner: 'official' | 'alternative' | 'tie' = 'tie';

	function selectSamplePost(event: CustomEvent) {
		officialPostHTML = benchPostHTML[event.target.value].official;
		alternativePostHTML = benchPostHTML[event.target.value].alternative;
	}

	let frame = 0;
	function updateTimer() {
		if (officialDoneLoading && alternativeDoneLoading) {
			cancelAnimationFrame(frame);
			if (officialElapsedTime < alternativeElapsedTime) {
				benchWinner = 'official';
			} else if (alternativeElapsedTime < officialElapsedTime) {
				benchWinner = 'alternative';
			} else {
				benchWinner = 'tie';
			}
		}

		if (!officialDoneLoading) {
			officialElapsedTime = performance.now() - benchStartTime;
			officialElapsedTime = Math.round(officialElapsedTime);
		}
		if (!alternativeDoneLoading) {
			alternativeElapsedTime = performance.now() - benchStartTime;
			alternativeElapsedTime = Math.round(alternativeElapsedTime);
		}
		frame = requestAnimationFrame(updateTimer);
	}

	function reloadEmbed() {
		benchStartTime = performance.now();
		officialElapsedTime = 0;
		alternativeElapsedTime = 0;
		officialDoneLoading = false;
		alternativeDoneLoading = false;
		benchWinner = 'tie';
		officialPostHTML = officialPostHTML + ` `;
		alternativePostHTML = alternativePostHTML + ` `;

		frame = requestAnimationFrame(updateTimer);
	}

	function loadedOfficialPost() {
		officialDoneLoading = true;
	}

	function loadedAlternativePost() {
		alternativeDoneLoading = true;
	}

	let dragging = false;
	let responsiveWidth = 400;
	let initialMouseX = 0;
	let initialResponsiveWidth = 0;

	let dragContent: HTMLElement | null = null;

	function startDrag(event: MouseEvent) {
		initialMouseX = event.clientX;
		responsiveWidth = dragContent?.getBoundingClientRect().width ?? 0;
		initialResponsiveWidth = responsiveWidth;
		dragging = true;
	}

	function dragContainerHandler(event: MouseEvent) {
		if (dragging && dragContent) {
			responsiveWidth = Math.min(
				Math.max(initialResponsiveWidth + (event.clientX - initialMouseX), 300),
				740
			);
		}
	}
</script>

<svelte:window on:mousemove={dragContainerHandler} on:mouseup={() => (dragging = false)} />

<main>
	<h1 class="mb-32 text-center">
		post2html is tool to embed social media posts into your website by generating a copy &
		paste-able code snippet.
	</h1>
	<p>
		Simply paste the post link into post2html. The tool will use the post's data to generate the
		necessary HTML, CSS, and JavaScript to recreate that post on your website.
	</p>
	<p class="quote center">
		"Wait, can't I just use the embed feature provided by the social media platform?"
	</p>
	<p>
		Good question! Most social media platforms have a way to embed posts on their platform to other
		websites. But post2html has some advantages.
	</p>

	<h2>First and foremost, speed 🚀</h2>

	<p>Lot of times, the embeddings provided by social media platforms work in a two-step process:</p>
	<ol>
		<li>Fetch the data from their servers.</li>
		<li>Use that data to reconstruct the post on your website.</li>
	</ol>

	<p>
		Both of these steps contribute to a noticeable lag. post2html's approach is to instead do the
		majority of the work ahead of time, so that the post is displayed much more quickly.
	</p>

	<p>
		See it for yourself in the benchmark below. Click the button to start the benchmark, and keep a
		close look on the timer measuring how long it takes for the post to load.
	</p>

	<div id="embed-bench" class="mt-32">
		<div class="flex gap-4">
			<Select items={samplePlatforms} bind:value={selectedPlatform} />
			<Select items={benchSamplePosts} value={'1'} on:change={(e) => selectSamplePost(e)} />
			<Button size="lg" on:click={reloadEmbed}>Start</Button>
		</div>
		<div class="grid grid-cols-2 gap-4">
			<div class="contestant">
				<h3>Official Embedding</h3>
				<p>{officialElapsedTime}ms {benchWinner === 'official' ? '👑' : ''}</p>
				<iframe srcdoc={officialPostHTML} on:load={loadedOfficialPost}></iframe>
			</div>
			<div class="contestant">
				<h3>post2html Embedding</h3>
				<p>
					{alternativeElapsedTime}ms {benchWinner === 'alternative' ? '👑' : ''}
				</p>
				<iframe srcdoc={alternativePostHTML} on:load={loadedAlternativePost}></iframe>
			</div>
		</div>
	</div>

	<p class="mt-16">
		Granted, the difference is not enormous. But in many environments, like a slow mobile internet
		or websites with multiple embeddings, the difference can add up and make a big impact on user
		experience.
	</p>

	<p class="quote center">"Hold on, where are the likes and comments?"</p>

	<p>
		Unfortunately, we can't just have the nice things. The tradeoff is that post2html doesn't
		support likes, replies, or any other realtime data. But the idea here is that in most cases,
		you're probably don't need it anyways, since there are seldom the main focus of a post (unless
		you really care about ratios and whatnot).
	</p>

	<p>
		The upside though is that it helps keep the post look clean and minimal. And that's not it -
		post2html has few more tricks up its sleeve.
	</p>

	<h2>Responsive Design</h2>

	<p>
		Posts generated by post2html aren't carbon copies of the original. They are designed to be
		responsive, meaning they can adapt to the size of the screen they are on.
	</p>

	<div id="embed-responsive" class="mt-10">
		<Select items={benchSamplePosts} value={'1'} on:change={(e) => selectSamplePost(e)} />
		<div id="draggable-container">
			<div id="draggable-content" style="width: {responsiveWidth}px;" bind:this={dragContent}>
				<!-- <div>
					<iframe srcdoc={officialPostHTML} on:load={loadedOfficialPost}></iframe>
				</div> -->
				<div style={`width: ${(responsiveWidth * 4) / 3}px;`}>
					{@html alternativePostHTML}
				</div>
			</div>
			<div id="draggable-handle" on:mousedown={startDrag}>
				<IconDragHandle />
			</div>
		</div>
	</div>

	<div class="scrolling">
		<h2>Image Carousel</h2>
		<h2>Image Carousel</h2>
		<h2>Image Carousel</h2>
		<h2>Image Carousel</h2>
		<h2>Image Carousel</h2>
		<h2>Image Carousel</h2>
		<h2>Image Carousel</h2>
		<h2>Image Carousel</h2>
		<h2>Image Carousel</h2>
		<h2>Image Carousel</h2>
	</div>

	<p>
		Optionally, you can display the images as a carousel, so each image is larger and easier to see.
	</p>

	<div class="pt-16">
		{@html `<iframe srcdoc="<script defer>window.addEventListener('load',()=>{let sc=document.getElementById('scroll-container'),left=document.getElementById('left');let right=document.getElementById('right');window.carousel=function(e,d,n){e.stopPropagation(),ci=parseInt(sc.dataset.mediaIndex);ci+=d;ci=ci<0?0:ci>n?n:ci;sc.dataset.mediaIndex=ci;sc.scrollLeft=sc.children[ci+1].offsetLeft-sc.children[1].offsetLeft;left.disabled=ci==0;right.disabled=ci==n;};});window.addEventListener('load',()=>{let g=document.querySelectorAll('.media img'),f=document.querySelectorAll('.full-img');g.forEach((p,i)=>{p.addEventListener('click',(e)=>{e.stopPropagation();f[i].classList.add('full');});});f.forEach((p)=>{p.addEventListener('click',(e)=>{e.stopPropagation();p.classList.remove('full');});});});</script><style>*{margin: 0;padding: 0;box-sizing: border-box;}.x-post{display: block;border: 1px solid #ccc;background-color: #ffffff;border-radius: 8px;margin: 0px;box-sizing: border-box;margin: 0px auto 0px auto;font-family: sans-serif;max-width: 500px;container-type: inline-size;overflow: hidden;position: relative;cursor: pointer;}.x-post:hover:not(:has(a:hover)){background-color: #f9f9f9;transition: background-color 0.2s;}.x-post .profile{display: grid;grid-template-columns: 50px 1fr;grid-template-rows: 1fr 1fr;-moz-column-gap: 8px;column-gap: 8px;margin: 20px;margin-bottom: 0px;}.x-post .profile img{border-radius: 50%;width: 50px;height: 50px;grid-column: 1/2;grid-row: 1/3;}.x-post .profile .name{grid-column: 2/3;grid-row: 1/2;align-self: center;text-overflow: ellipsis;white-space: nowrap;overflow: hidden;font-weight: bold;font-size: 1em;color: #333;}.x-post .profile .screen-name{grid-column: 2/3;grid-row: 2/3;align-self: center;font-size: 0.9em;color: #666;}.x-post .post{word-wrap: break-word;margin: 20px;}.x-post .post a{color: #099ef5;text-decoration: none;}.x-post .post a:hover{text-decoration: underline;}@media only screen and (min-width: 800px){.has-media.has-text{max-width: 900px;display: grid;grid-template-columns: 1fr 1fr;justify-items: center;gap: 10px;}.has-media.has-text .main{grid-column: 1/2;width: 100%;padding: 20px;}}*{}.x-post .media{display: grid;grid-template-columns: 1fr;grid-template-rows: 1fr;align-items: center;}.x-post .media.num-media-1{margin: 0px 20px 20px 20px;}.x-post .media.num-media-1 > div img{width: 100%;max-width: 100%;height: auto;border-radius: 8px;}.x-post .media:not(.num-media-1){margin: 0px 0px 20px 0px;}.x-post .media:not(.num-media-1) > div{z-index: 1;grid-column: 1/2;grid-row: 1/2;position: relative;scroll-behavior: smooth;overflow-x: scroll;overflow-y: hidden;display: flex;align-items: center;gap: 21px;scroll-snap-type: x mandatory;}.x-post .media:not(.num-media-1) > div::-webkit-scrollbar{display: none;}.x-post .media:not(.num-media-1) > div img{width: 80%;height: -moz-fit-content;height: fit-content;border-radius: 8px;scroll-snap-align: start;scroll-margin-left: 20px;transition: transform 0.1s;}.x-post .media > button{z-index: 2;grid-column: 1/2;grid-row: 1/2;cursor: pointer;background-color: rgb(47, 51, 59);border: none;border-radius: 50%;width: 30px;height: 30px;color: white;text-align: center;font-size: 20px;transform: scale(1);transform-origin: center;transition: opacity 0.1s, transform 0.1s;}.x-post .media > button:hover{background-color: rgba(62, 65, 69, 0.137);}.x-post .media > button:disabled{opacity: 0;transform: scale(0);}.x-post .media button#left{margin-left: 20px;}.x-post .media button#right{margin-left: calc(100% - 50px);}@media only screen and (min-width: 800px){.has-media.has-text{max-width: 900px;}.has-media.has-text .main{padding: 20px;box-sizing: border-box;background-image: linear-gradient(90deg, rgb(255, 255, 255) 90%, rgba(255, 255, 255, 0) 100%);z-index: 10;grid-row: 1/5;display: grid;grid-template-columns: 1fr;grid-template-rows: 1fr auto auto 1fr;}.has-media.has-text .main .profile{grid-row: 2/3;}.has-media.has-text .main .post{grid-row: 3/4;}.has-media.has-text .media.num-media-1{margin: 20px;grid-column: 2/3;grid-row: 1/5;}.has-media.has-text .media.num-media-1 > div{grid-column: 2/3;grid-row: 2/4;justify-self: center;align-self: center;}.has-media.has-text .media:not(.num-media-1){margin: 20px 0;grid-column: 1/3;grid-row: 1/5;}.has-media.has-text .media:not(.num-media-1) > div p:first-child{flex-shrink: 0;width: 420px;}.has-media.has-text .media:not(.num-media-1) > div img{width: 300px;scroll-margin-left: 460px;}.has-media.has-text .media:not(.num-media-1) button#left{margin-left: 450px !important;}}.x-post .full-img{position: absolute;top: 0;left: 0;-o-object-fit: contain;object-fit: contain;width: 100cqw;height: 100cqb;z-index: 1000;box-shadow: 0 0 0 1000px rgba(0, 0, 0, 0.64), inset 0 0 0 1000px rgba(0, 0, 0, 0.64);display: none;}.x-post .full-img.full{display: block;}*{} *{}</style><div class=&quot;x-post has-media has-text&quot; onclick=&quot;(function(e){if(e.target.tagName!==&apos;A&apos;)window.open(&apos;https://twitter.com/xkcd/status/1617278817151721475&apos;, &apos;_blank&apos;).focus();})(arguments[0])&quot;><div class=&quot;main&quot;><div class=&quot;profile&quot;><img src=&quot;https://pbs.twimg.com/profile_images/1488600831377252354/hEpPeSu0_normal.jpg&quot; alt=&quot;Randall Munroe&quot; ><div class=&quot;name&quot;>Randall Munroe</div><div class=&quot;screen-name&quot;>@xkcd</div></div><div class=&quot;post&quot;>My mom sent me some papers that belonged to my grandfather, Darwin Randall Crum, which included a collection of “Disfrustrating Puzzles” he created </div></div><img src=&quot;https://pbs.twimg.com/media/FnG6gSDWIAAOv_g?format=jpg&amp;name=medium&quot; alt=&quot;pic.x.com/MG2gLGZ3oU&quot; class=&quot;full-img&quot; id=&quot;media-0&quot;><img src=&quot;https://pbs.twimg.com/media/FnG6gR_WYAE38kv?format=jpg&amp;name=medium&quot; alt=&quot;pic.x.com/MG2gLGZ3oU&quot; class=&quot;full-img&quot; id=&quot;media-1&quot;><img src=&quot;https://pbs.twimg.com/media/FnG6gSAWAAE_-1t?format=jpg&amp;name=medium&quot; alt=&quot;pic.x.com/MG2gLGZ3oU&quot; class=&quot;full-img&quot; id=&quot;media-2&quot;><img src=&quot;https://pbs.twimg.com/media/FnG6gR_XoAALsoJ?format=jpg&amp;name=medium&quot; alt=&quot;pic.x.com/MG2gLGZ3oU&quot; class=&quot;full-img&quot; id=&quot;media-3&quot;><div class=&quot;media num-media-4 media-0&quot;><div id=&quot;scroll-container&quot; data-media-count=&quot;4&quot; data-media-index=&quot;0&quot;><p></p><img src=&quot;https://pbs.twimg.com/media/FnG6gSDWIAAOv_g?format=jpg&amp;name=medium&quot; alt=&quot;pic.x.com/MG2gLGZ3oU&quot; id=&quot;media-0&quot;><img src=&quot;https://pbs.twimg.com/media/FnG6gR_WYAE38kv?format=jpg&amp;name=medium&quot; alt=&quot;pic.x.com/MG2gLGZ3oU&quot; id=&quot;media-1&quot;><img src=&quot;https://pbs.twimg.com/media/FnG6gSAWAAE_-1t?format=jpg&amp;name=medium&quot; alt=&quot;pic.x.com/MG2gLGZ3oU&quot; id=&quot;media-2&quot;><img src=&quot;https://pbs.twimg.com/media/FnG6gR_XoAALsoJ?format=jpg&amp;name=medium&quot; alt=&quot;pic.x.com/MG2gLGZ3oU&quot; id=&quot;media-3&quot;><p></p></div><button id=&quot;left&quot; disabled=&quot;&quot; onclick=&quot;carousel(event, -1, 3)&quot;>🡐</button><button id=&quot;right&quot; onclick=&quot;carousel(event, 1, 3)&quot;>🡒</button></div></div>" style="border: none; width:100%; overflow:hidden" scrolling="no" onload="let a=()=>{this.style.height=this.contentDocument?this.contentDocument.body.scrollHeight+'px':0}; a(); new ResizeObserver(a).observe(this)"></iframe>`}
	</div>

	<h2>You can also z👀m images</h2>
	<p>Click on the image to see it fill the whole post. Click again to close.</p>
	<div class="mt-16">
		{@html `<iframe srcdoc="<script defer>window.addEventListener('load',()=>{let g=document.querySelectorAll('.media img'),f=document.querySelectorAll('.full-img');g.forEach((p,i)=>{p.addEventListener('click',(e)=>{e.stopPropagation();f[i].classList.add('full');});});f.forEach((p)=>{p.addEventListener('click',(e)=>{e.stopPropagation();p.classList.remove('full');});});});</script><style>*{margin: 0;padding: 0;box-sizing: border-box;}.x-post{display: block;border: 1px solid #ccc;background-color: #ffffff;border-radius: 8px;margin: 0px;box-sizing: border-box;margin: 0px auto 0px auto;font-family: sans-serif;max-width: 500px;container-type: inline-size;overflow: hidden;position: relative;cursor: pointer;}.x-post:hover:not(:has(a:hover)){background-color: #f9f9f9;transition: background-color 0.2s;}.x-post .profile{display: grid;grid-template-columns: 50px 1fr;grid-template-rows: 1fr 1fr;-moz-column-gap: 8px;column-gap: 8px;margin: 20px;margin-bottom: 0px;}.x-post .profile img{border-radius: 50%;width: 50px;height: 50px;grid-column: 1/2;grid-row: 1/3;}.x-post .profile .name{grid-column: 2/3;grid-row: 1/2;align-self: center;text-overflow: ellipsis;white-space: nowrap;overflow: hidden;font-weight: bold;font-size: 1em;color: #333;}.x-post .profile .screen-name{grid-column: 2/3;grid-row: 2/3;align-self: center;font-size: 0.9em;color: #666;}.x-post .post{word-wrap: break-word;margin: 20px;}.x-post .post a{color: #099ef5;text-decoration: none;}.x-post .post a:hover{text-decoration: underline;}@media only screen and (min-width: 800px){.has-media.has-text{max-width: 900px;display: grid;grid-template-columns: 1fr 1fr;justify-items: center;gap: 10px;}.has-media.has-text .main{grid-column: 1/2;width: 100%;padding: 20px;}}*{}.x-post .media{border-radius: 8px;display: grid;gap: 2px;justify-items: center;align-items: center;box-sizing: border-box;overflow: hidden;margin: 20px;}.x-post .media img{-o-object-fit: cover;object-fit: cover;}.x-post .media.num-media-1{grid-template-columns: 1fr;}.x-post .media.num-media-1 img{width: 100%;}.x-post .media.num-media-2{grid-template-columns: 1fr 1fr;}.x-post .media.num-media-2 img{height: 200px;width: 100%;}.x-post .media.num-media-3, .x-post .media.num-media-4{height: 300px;container-type: size;grid-template-columns: 1fr 1fr;grid-template-rows: 1fr 1fr;}.x-post .media.num-media-3 img, .x-post .media.num-media-4 img{width: 100%;height: 50cqh;}.x-post .media.num-media-3 img:nth-child(1){grid-column: 1/2;grid-row: 1/3;height: 100cqh;}@media only screen and (max-width: 500px){.x-post{max-width: 500px;}}@media only screen and (min-width: 800px){.has-media.has-text{max-width: 900px;display: grid;grid-template-columns: 1fr 1fr;grid-template-rows: 1fr auto 1fr;gap: 10px;}.has-media.has-text .main{grid-column: 1/2;grid-row: 2/3;}.has-media.has-text .media{margin: 10px 0;height: auto;width: calc(100% - 20px);grid-column: 2/3;grid-row: 1/4;}.has-media.has-text .media.num-media-2 img{height: 300px;}.has-media.has-text .media.num-media-1 img{border-radius: 8px;}.has-media.has-text .media.num-media-3, .has-media.has-text .media.num-media-4{min-height: 300px;}}.x-post .full-img{position: absolute;top: 0;left: 0;-o-object-fit: contain;object-fit: contain;width: 100cqw;height: 100cqb;z-index: 1000;box-shadow: 0 0 0 1000px rgba(0, 0, 0, 0.64), inset 0 0 0 1000px rgba(0, 0, 0, 0.64);display: none;}.x-post .full-img.full{display: block;}*{} *{}</style><div class=&quot;x-post has-media has-text&quot; onclick=&quot;(function(e){if(e.target.tagName!==&apos;A&apos;)window.open(&apos;https://twitter.com/SpaceX/status/1843374114498850975&apos;, &apos;_blank&apos;).focus();})(arguments[0])&quot;><div class=&quot;main&quot;><div class=&quot;profile&quot;><img src=&quot;https://pbs.twimg.com/profile_images/1697749409851985920/HbrI04tM_normal.jpg&quot; alt=&quot;SpaceX&quot; ><div class=&quot;name&quot;>SpaceX</div><div class=&quot;screen-name&quot;>@SpaceX</div></div><div class=&quot;post&quot;>Falcon 9 launches the @ESA Hera mission to interplanetary transfer orbit from Florida </div></div><img src=&quot;https://pbs.twimg.com/media/GZT66t_WIAAHvw4?format=jpg&amp;name=medium&quot; alt=&quot;pic.x.com/gCBrYXPuHr&quot; class=&quot;full-img&quot; id=&quot;media-0&quot;><img src=&quot;https://pbs.twimg.com/media/GZT66tkWkAABoVo?format=jpg&amp;name=medium&quot; alt=&quot;pic.x.com/gCBrYXPuHr&quot; class=&quot;full-img&quot; id=&quot;media-1&quot;><img src=&quot;https://pbs.twimg.com/media/GZT66uRXEAEbKdK?format=jpg&amp;name=medium&quot; alt=&quot;pic.x.com/gCBrYXPuHr&quot; class=&quot;full-img&quot; id=&quot;media-2&quot;><img src=&quot;https://pbs.twimg.com/media/GZT66ugWUAAM1cB?format=jpg&amp;name=medium&quot; alt=&quot;pic.x.com/gCBrYXPuHr&quot; class=&quot;full-img&quot; id=&quot;media-3&quot;><div class=&quot;media num-media-4 media-0&quot;><img src=&quot;https://pbs.twimg.com/media/GZT66t_WIAAHvw4?format=jpg&amp;name=medium&quot; alt=&quot;pic.x.com/gCBrYXPuHr&quot; id=&quot;media-0&quot;><img src=&quot;https://pbs.twimg.com/media/GZT66tkWkAABoVo?format=jpg&amp;name=medium&quot; alt=&quot;pic.x.com/gCBrYXPuHr&quot; id=&quot;media-1&quot;><img src=&quot;https://pbs.twimg.com/media/GZT66uRXEAEbKdK?format=jpg&amp;name=medium&quot; alt=&quot;pic.x.com/gCBrYXPuHr&quot; id=&quot;media-2&quot;><img src=&quot;https://pbs.twimg.com/media/GZT66ugWUAAM1cB?format=jpg&amp;name=medium&quot; alt=&quot;pic.x.com/gCBrYXPuHr&quot; id=&quot;media-3&quot;></div></div>" style="border: none; width:100%; overflow:hidden" scrolling="no" onload="let a=()=>{this.style.height=this.contentDocument?this.contentDocument.body.scrollHeight+'px':0}; a(); new ResizeObserver(a).observe(this)"></iframe>`}
	</div>
	<h2>Long posts work too</h2>

	<p>Embed posts that are longer than 280 characters (Some manual labor required)</p>

	<div class="mt-16">
		{@html `<iframe srcdoc="<style>*{margin: 0;padding: 0;box-sizing: border-box;}.x-post{display: block;border: 1px solid #ccc;background-color: #ffffff;border-radius: 8px;margin: 0px;box-sizing: border-box;margin: 0px auto 0px auto;font-family: sans-serif;max-width: 500px;container-type: inline-size;overflow: hidden;position: relative;cursor: pointer;}.x-post:hover:not(:has(a:hover)){background-color: #f9f9f9;transition: background-color 0.2s;}.x-post .profile{display: grid;grid-template-columns: 50px 1fr;grid-template-rows: 1fr 1fr;-moz-column-gap: 8px;column-gap: 8px;margin: 20px;margin-bottom: 0px;}.x-post .profile img{border-radius: 50%;width: 50px;height: 50px;grid-column: 1/2;grid-row: 1/3;}.x-post .profile .name{grid-column: 2/3;grid-row: 1/2;align-self: center;text-overflow: ellipsis;white-space: nowrap;overflow: hidden;font-weight: bold;font-size: 1em;color: #333;}.x-post .profile .screen-name{grid-column: 2/3;grid-row: 2/3;align-self: center;font-size: 0.9em;color: #666;}.x-post .post{word-wrap: break-word;margin: 20px;}.x-post .post a{color: #099ef5;text-decoration: none;}.x-post .post a:hover{text-decoration: underline;}@media only screen and (min-width: 800px){.has-media.has-text{max-width: 900px;display: grid;grid-template-columns: 1fr 1fr;justify-items: center;gap: 10px;}.has-media.has-text .main{grid-column: 1/2;width: 100%;padding: 20px;}}*{} *{}</style><div class=&quot;x-post has-text&quot; onclick=&quot;(function(e){if(e.target.tagName!==&apos;A&apos;)window.open(&apos;https://twitter.com/premium/status/1623411400545632256&apos;, &apos;_blank&apos;).focus();})(arguments[0])&quot;><div class=&quot;main&quot;><div class=&quot;profile&quot;><img src=&quot;https://pbs.twimg.com/profile_images/1683366300054069248/67v23AEj_normal.jpg&quot; alt=&quot;Premium&quot; ><div class=&quot;name&quot;>Premium</div><div class=&quot;screen-name&quot;>@premium</div></div><div class=&quot;post&quot;>need more than 280 characters to express yourself?<br><br>we know that lots of you do… and while we love a good thread, sometimes you just want to Tweet everything all at once. we get that. <br><br>so we&apos;re introducing longer Tweets! you&apos;re gonna want to check this out. tap this 👉 <br><br>starting today, if you’re subscribed to Twitter Blue in the US you can create longer Tweets.<br><br>most standard functions of Tweeting still apply, whether you want to post a picture, use a hashtag, or create a poll. but now you can type all the way up to 4,000 characters. for now, longer Tweets on web can&apos;t be saved as drafts or scheduled to send later.<br><br>but don’t worry, Twitter is still Twitter. we know longer Tweets could mean a lot of scrolling, so they’ll be capped at 280 characters on your timeline and you’ll see a “Show more” prompt to click and read the whole Tweet.<br><br>while only Blue subscribers can post longer Tweets, anyone and everyone can read them. you can reply to, retweet, and quote Tweet a longer Tweet, no matter if you’re a Twitter Blue subscriber or not. subscribers will be able to reply and QT with up to 4,000 characters.<br><br>let us know what you think. we’re excited to see how you use the extra space!<br><br>if you’ve got more to say, you can subscribe to Twitter Blue by clicking the link in our bio.</div></div></div>" style="border: none; width:100%; overflow:hidden" scrolling="no" onload="let a=()=>{this.style.height=this.contentDocument?this.contentDocument.body.scrollHeight+'px':0}; a(); new ResizeObserver(a).observe(this)"></iframe>`}
	</div>

	<div class="h-[500px] p-16 text-center">
		<h1 class="mb-16 text-3xl">So what are you waiting for?</h1>
		<Button size="lg" href="/">Get started now</Button>
	</div>
</main>

<style lang="scss">
	@import '../styles.scss';

	main {
		margin: 0 auto;
		margin-top: 300px;
		width: min(800px, 95vw);

		.quote {
			margin: 50px 0;
			text-align: center;
			font-size: 1.2rem;
			font-style: italic;
		}

		h1 {
			font-weight: 700;
			font-size: 2.5rem;
			line-height: 1;
			margin-top: 8rem;
		}

		h2 {
			font-weight: 700;
			font-size: 2rem;
			margin-top: 300px;
		}

		h3 {
			font-weight: 700;
			font-size: 1.5rem;
			margin-top: 1.5rem;
		}

		p {
			&.text-large {
				font-size: 2rem;
			}
			font-size: 1.2rem;
			margin-top: 1.5rem;
		}

		ol {
			margin-top: 1.5rem;
			padding-left: 1.5rem;
		}

		li {
			font-size: 1.2rem;
			list-style: decimal;
		}
	}

	.scrolling {
		overflow: hidden;
		white-space: nowrap;
		position: relative;
		h2 {
			padding: 0 var(--spacing-1);
			overflow: hidden;
			display: inline-block;
			animation: slide 4s ease-in-out infinite;
		}

		&:after {
			content: '';
			display: inline-block;
			position: absolute;
			right: 0;
			top: 0;
			width: 100%;
			height: 100%;
			background: rgb(255, 255, 255);
			background: linear-gradient(
				90deg,
				rgba(255, 255, 255, 1) 0%,
				rgba(255, 255, 255, 0) 5%,
				rgba(255, 255, 255, 0) 95%,
				rgba(255, 255, 255, 1) 100%
			);
		}
	}

	@keyframes slide {
		0% {
			transform: translateX(0%);
		}
		10% {
			transform: translateX(0%);
		}

		40% {
			transform: translateX(-100%);
		}
		50% {
			transform: translateX(-100%);
		}
		90% {
			transform: translateX(0%);
		}
		100% {
			transform: translateX(0%);
		}
	}

	#embed-bench {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		iframe {
			height: 680px;
			width: 100%;
			::-webkit-scrollbar {
				display: none;
			}
		}
		div {
			width: 100%;
		}
		.contestant {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;

			h3 {
				font-size: 1.5rem;
				font-weight: 700;
			}
			p {
				margin-top: 1rem;
				font-size: 1.8rem;
				font-family: monospace;
			}
		}
	}

	#embed-responsive {
		display: flex;
		flex-direction: column;

		#draggable-container {
			width: 100%;

			padding: 10px 0px;
			display: flex;
			align-items: center;
			user-select: none;

			#draggable-content {
				pointer-events: none;
				position: relative;
				height: 490px;
				padding: 20px;

				box-sizing: border-box;

				background-color: #fbfbfb;
				border: 1px solid #dbdbdb;

				/* dotted background */
				background-image: radial-gradient(#dbdbdb 1px, transparent 1px);
				background-size: 20px 20px;
				border-radius: 12px;

				> div {
					left: 50%;
					top: 50%;
					position: relative;
					transform: translate(-50%, -50%) scale(0.7);
					transform-origin: center;
				}
			}

			#draggable-handle {
				width: 48px;
				height: 48px;
				background-color: white;
				border-radius: 24px;
				box-shadow: 0 4px 7px 3px #34343522;
				cursor: grab;
				display: flex;
				align-items: center;
				justify-content: center;

				transform: translate(-50%, 0);
			}
		}
	}
</style>
