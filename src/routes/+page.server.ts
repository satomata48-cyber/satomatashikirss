import type { PageServerLoad } from './$types';
import { fetchAllFeeds } from '$lib/server/rss';

export const load: PageServerLoad = async () => {
	const items = await fetchAllFeeds();
	return { items };
};
