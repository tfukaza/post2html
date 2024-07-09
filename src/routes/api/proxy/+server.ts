function getToken(id: string) {
	return ((Number(id) / 1e15) * Math.PI).toString(6 ** 2).replace(/(0+|\.)/g, '');
}

const TWEET_ID = /^[0-9]+$/;
const SYNDICATION_URL = 'https://cdn.syndication.twimg.com';

export async function GET({ url }) {
	const postID = url.searchParams.get('post-id');

	// The following code was adapted from react-tweet library by Vercel.
	// Link: https://github.com/vercel/react-tweet
	if (!postID || !TWEET_ID.test(postID)) {
		return new Response('Invalid post ID.', { status: 400 });
	}

	const requestUrl = new URL(`${SYNDICATION_URL}/tweet-result`);

	requestUrl.searchParams.set('id', postID);
	requestUrl.searchParams.set('lang', 'en');
	requestUrl.searchParams.set(
		'features',
		[
			'tfw_timeline_list:',
			'tfw_follower_count_sunset:true',
			'tfw_tweet_edit_backend:on',
			'tfw_refsrc_session:on',
			'tfw_fosnr_soft_interventions_enabled:on',
			'tfw_show_birdwatch_pivots_enabled:on',
			'tfw_show_business_verified_badge:on',
			'tfw_duplicate_scribes_to_settings:on',
			'tfw_use_profile_image_shape_enabled:on',
			'tfw_show_blue_verified_badge:on',
			'tfw_legacy_timeline_sunset:true',
			'tfw_show_gov_verified_badge:on',
			'tfw_show_business_affiliate_badge:on',
			'tfw_tweet_edit_frontend:on'
		].join(';')
	);
	requestUrl.searchParams.set('token', getToken(postID));

	const res = await fetch(requestUrl.toString());

	const isJson = res.headers.get('content-type')?.includes('application/json');
	const data = isJson ? await res.json() : undefined;

	if (res.ok) {
		if (data?.__typename === 'TweetTombstone') {
			return new Response('This post is not available', { status: 400 });
		}
		return new Response(JSON.stringify(data), {
			headers: { 'content-type': 'application/json' },
			status: 200
		});
	}

	if (res.status === 404) {
		return new Response('This post is not available', { status: 400 });
	}

	return new Response('An error occurred while fetching the post', { status: 500 });
}
