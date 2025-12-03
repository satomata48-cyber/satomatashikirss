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
	// 政治
	{
		name: 'NHK政治',
		url: 'https://www.nhk.or.jp/rss/news/cat4.xml',
		category: '政治'
	},
	{
		name: 'ロイター政治',
		url: 'https://jp.reuters.com/news/politics.rss',
		category: '政治'
	},
	// 経済
	{
		name: '日経経済',
		url: 'https://www.nikkei.com/rss/economy.xml',
		category: '経済'
	},
	{
		name: 'ロイター経済',
		url: 'https://jp.reuters.com/news/economy.rss',
		category: '経済'
	},
	// 米国株
	{
		name: 'Yahoo!ファイナンス米国',
		url: 'https://finance.yahoo.co.jp/rss/news/overseas',
		category: '米国株'
	},
	{
		name: 'ブルームバーグ',
		url: 'https://www.bloomberg.co.jp/feeds/sitemap_news.xml',
		category: '米国株'
	},
	{
		name: 'ロイターマーケット',
		url: 'https://jp.reuters.com/news/markets.rss',
		category: '米国株'
	},
	// 日本株
	{
		name: 'Yahoo!ファイナンス日本',
		url: 'https://finance.yahoo.co.jp/rss/news/domestic',
		category: '日本株'
	},
	{
		name: '日経マーケット',
		url: 'https://www.nikkei.com/rss/markets.xml',
		category: '日本株'
	},
	// 仮想通貨
	{
		name: 'CoinPost',
		url: 'https://coinpost.jp/rss.xml',
		category: '仮想通貨'
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

export const categories = [
	'すべて',
	'ニュース',
	'政治',
	'経済',
	'米国株',
	'日本株',
	'仮想通貨',
	'テック',
	'開発',
	'まとめ'
] as const;
export type Category = (typeof categories)[number];
