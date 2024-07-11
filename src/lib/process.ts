import { PostData, ProcessedPost } from '../routes/postTypes';

// getMediaUrl is taken from react-tweet library by Vercel.
// Link: https://github.com/vercel/react-tweet/blob/main/packages/react-tweet/src/utils.ts
export const getMediaUrl = (media: any, size: 'small' | 'medium' | 'large'): string => {
	const url = new URL(media.media_url_https);
	const extension = url.pathname.split('.').pop();

	if (!extension) return media.media_url_https;

	url.pathname = url.pathname.replace(`.${extension}`, '');
	url.searchParams.set('format', extension);
	url.searchParams.set('name', size);

	return url.toString();
};

function processPostJson(json: PostData): ProcessedPost {
	const {
		entities,
		user,
		text,
		id_str,
		mediaDetails,
		created_at,
		favorite_count,
		conversation_count
	} = json;
	const { name, screen_name, profile_image_url_https, is_blue_verified, verified } = user;
	const { urls, hashtags } = entities;

	console.log(json);

	return {
		user: {
			name,
			screen_name,
			profile_image_url_https,
			is_blue_verified,
			verified
		},
		text,
		media:
			(mediaDetails &&
				mediaDetails.map((media: any) => ({
					display_url: media.display_url,
					expanded_url: media.expanded_url,
					media_url: getMediaUrl(media, 'medium'),
					url: media.url
				}))) ||
			[],
		urls:
			(urls &&
				urls.map((url) => {
					return {
						display_url: url.display_url,
						expanded_url: url.expanded_url,
						url: url.url
					};
				})) ||
			[],
		hashTags:
			(hashtags &&
				hashtags.map((hashtag) => {
					return {
						text: hashtag.text
					};
				})) ||
			[],

		id_str,
		created_at,
		favorite_count,
		conversation_count
	};
}

// function makeAllStylesInline(element: Node) {
// 	// Get the css styles applied to this element
// 	const styles: CssStyleDeclaration = window.getComputedStyle(element);
// 	let cssText = element.style.cssText;
// 	console.log(styles);
// 	// Get the css properties
// 	for (let i = 0; i < styles.length; i++) {
// 		const property = styles[i];
// 		const value = styles.getPropertyValue(property);
// 		cssText += `${property}: ${value};`;
// 	}
// 	// Set the cssText to the element
// 	element.style.cssText = cssText;
// 	// Recurse through the children
// 	for (let i = 0; i < element.children.length; i++) {
// 		makeAllStylesInline(element.children[i]);
// 	}

// 	return element;
// }

function removeSvelteClasses(element: Node) {
	if (element instanceof HTMLElement) {
		element.classList.forEach((className) => {
			if (className.startsWith('s-') || className.startsWith('svelte-')) {
				element.classList.remove(className);
			}
		});
	}

	for (let i = 0; i < element.childNodes.length; i++) {
		removeSvelteClasses(element.childNodes[i]);
	}

	return element;
}

export { processPostJson, removeSvelteClasses };
