export interface FeedSource {
	name: string;
	url: string;
	category: string;
}

export const feedSources: FeedSource[] = [
	// ニュース系
	{
		name: 'NHKニュース',
		url: 'https://www.nhk.or.jp/rss/news/cat0.xml',
		category: 'ニュース'
	},
	{
		name: 'Yahoo!ニュース',
		url: 'https://news.yahoo.co.jp/rss/topics/top-picks.xml',
		category: 'ニュース'
	},
	{
		name: '日経新聞',
		url: 'https://www.nikkei.com/rss/main.xml',
		category: 'ニュース'
	},
	// テック系
	{
		name: 'Gigazine',
		url: 'https://gigazine.net/news/rss_2.0/',
		category: 'テック'
	},
	{
		name: 'ITmedia',
		url: 'https://rss.itmedia.co.jp/rss/2.0/itmedia_all.xml',
		category: 'テック'
	},
	{
		name: 'はてなテクノロジー',
		url: 'https://b.hatena.ne.jp/hotentry/it.rss',
		category: 'テック'
	},
	// 開発系
	{
		name: 'Zenn',
		url: 'https://zenn.dev/feed',
		category: '開発'
	},
	{
		name: 'Qiita',
		url: 'https://qiita.com/popular-items/feed',
		category: '開発'
	},
	// まとめ系
	{
		name: 'キニ速',
		url: 'http://blog.livedoor.jp/kinisoku/index.rdf',
		category: 'まとめ'
	},
	{
		name: 'IT速報',
		url: 'http://blog.livedoor.jp/itsoku/index.rdf',
		category: 'まとめ'
	}
];

export const categories = ['すべて', 'ニュース', 'テック', '開発', 'まとめ'] as const;
export type Category = (typeof categories)[number];
