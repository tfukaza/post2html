/* JSON returned by X's embedding API */
export interface OriginalXData {
	conversation_count: number; // Number of replies
	created_at: string; // Post creation date in ISO format
	display_text_range: [number, number]; // Range of text to display in the embedded version
	entities: {
		hashtags: {
			indices: [number, number]; // Range of text indices for the hashtag
			text: string; // Hashtag text
		}[]; // Hashtags in the post

		media: any[]; // Media in the post
		symbols: any[]; // Symbols in the post
		urls: {
			display_url: string; // URL display URL
			expanded_url: string; // URL expanded URL
			indices: [number, number]; // Range of text indices for the URL
			url: string; // URL
		}[]; // URLs in the post
		user_mentions: any[]; // User mentions in the post
	};
	mediaDetails: {
		display_url: string; // Media display URL
		expanded_url: string; // Media expanded URL
		indices: [number, number]; // Range of text indices for the media
		media_url_https: string; // Media URL
		type: 'photo' | 'video' | 'animated_gif'; // Media type
		url: string; // Media URL
		original_info: {
			height: number; // Media height
			width: number; // Media width
			focus_rects: any[]; // Focus rectangles
		};
		sizes: any; // Media sizes
	}[]; // Media details
	favorite_count: number; // Number of likes
	id_str: string; // Post ID as a string
	isEdited: boolean; // Whether the post was edited
	isStaleEdit: boolean; // ???
	lang: string; // Post language
	news_action_type: string; // ???
	note_tweet: { [key: string]: string }; // A dictionary of note IDs
	text: string; // Post text
	user: {
		id_str: string; // User ID as a string
		is_blue_verified: boolean; // Whether the user is verified
		name: string; // User name
		profile_image_shape: string; // User profile image shape
		profile_image_url_https: string; // User profile image URL
		screen_name: string; // User screen name
		verified: boolean; // Whether the user is verified
	};
	__typename: string; // Post type
}

export interface ProcessedXData {
	postUrl: string; // Post URL
	user: {
		name: string; // User name
		screen_name: string; // User screen name
		profile_image_url_https: string; // User profile image URL
		is_blue_verified: boolean; // Whether the user is verified
		verified: boolean; // Whether the user is verified
	};
	text: string; // Post text
	media: {
		display_url: string; // Media display URL
		expanded_url: string; // Media expanded URL
		media_url: string; // Media URL
		url: string; // Media URL
	}[];
	urls: {
		display_url: string; // URL display URL
		expanded_url: string; // URL expanded URL
		url: string; // URL
	}[];
	hashTags: {
		indices: [number, number]; // Range of text indices for the hashtag
		text: string; // Hashtag text
	}[]; // Hashtags in the post

	id_str: string; // Post ID as a string
	created_at: string; // Post creation date in ISO format
	favorite_count: number; // Number of likes
	conversation_count: number; // Number of replies
}

export interface XPostConfig {
	imageStyle: 'grid' | 'carousel'; // Style to display images
	imageFull: boolean; // Whether to display images in full size if it is clicked
}
