import { t } from 'vitest/dist/index-5aad25c1';
import { OriginalXData, ProcessedXData } from './x_types';

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

/**
 * Process the JSON data from the X API
 * @param json
 * @returns
 */
function processXJson(json: OriginalXData): ProcessedXData {
	console.debug('Processing X JSON:', json);
	const {
		entities,
		user,
		text,
		id_str,
		mediaDetails,
		created_at,
		favorite_count,
		conversation_count,
		card
	} = json;
	const { name, screen_name, profile_image_url_https, is_blue_verified, verified } = user;
	const { urls, hashtags } = entities;

	return {
		config: {
			imageStyle: 'grid',
			imageFull: false
		},
		postUrl: `https://twitter.com/${screen_name}/status/${id_str}`,
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
						indices: hashtag.indices,
						text: hashtag.text
					};
				})) ||
			[],
		card:
			(card && {
				url: card.url,
				title: card.binding_values.title.string_value,
				image_url: card.binding_values.thumbnail_image_large.image_value.url
			}) ||
			null,

		id_str,
		created_at,
		favorite_count,
		conversation_count
	};
}
export { processXJson };
