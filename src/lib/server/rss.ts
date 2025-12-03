import Parser from 'rss-parser';
import { feedSources, type FeedSource } from '$lib/config/feeds';

export interface FeedItem {
	title: string;
	link: string;
	pubDate: string;
	source: string;
	category: string;
}

const parser = new Parser({
	timeout: 10000,
	headers: {
		'User-Agent': 'Mozilla/5.0 (compatible; RSSReader/1.0)'
	}
});

async function fetchFeed(source: FeedSource): Promise<FeedItem[]> {
	try {
		const feed = await parser.parseURL(source.url);
		return (feed.items || []).slice(0, 10).map((item) => ({
			title: item.title || 'タイトルなし',
			link: item.link || '#',
			pubDate: item.pubDate || item.isoDate || new Date().toISOString(),
			source: source.name,
			category: source.category
		}));
	} catch (error) {
		console.error(`Failed to fetch ${source.name}:`, error);
		return [];
	}
}

export async function fetchAllFeeds(): Promise<FeedItem[]> {
	const results = await Promise.allSettled(feedSources.map(fetchFeed));

	const items: FeedItem[] = [];
	for (const result of results) {
		if (result.status === 'fulfilled') {
			items.push(...result.value);
		}
	}

	// 日付で降順ソート
	return items.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());
}
