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
		name: 'NHK社会',
		url: 'https://www.nhk.or.jp/rss/news/cat1.xml',
		category: 'ニュース'
	},
	// 政治
	{
		name: 'NHK政治',
		url: 'https://www.nhk.or.jp/rss/news/cat4.xml',
		category: '政治'
	},
	{
		name: 'はてな政治',
		url: 'https://b.hatena.ne.jp/hotentry/social.rss',
		category: '政治'
	},
	// 経済
	{
		name: 'NHK経済',
		url: 'https://www.nhk.or.jp/rss/news/cat5.xml',
		category: '経済'
	},
	{
		name: 'Yahoo!経済トピックス',
		url: 'https://news.yahoo.co.jp/rss/topics/business.xml',
		category: '経済'
	},
	{
		name: 'Yahoo!経済',
		url: 'https://news.yahoo.co.jp/rss/categories/business.xml',
		category: '経済'
	},
	{
		name: '日経クロステック',
		url: 'https://xtech.nikkei.com/rss/index.rdf',
		category: '経済'
	},
	{
		name: 'はてな経済',
		url: 'https://b.hatena.ne.jp/hotentry/economics.rss',
		category: '経済'
	},
	// 米国株
	{
		name: 'Yahoo!ファイナンス / ニュース: 米国株ニュースを日本語で集約。',
		url: 'https://news.yahoo.co.jp/rss/topics/business.xml',
		category: '米国株'
	},
	{
		name: 'Investing.com 株式ニュース',
		url: 'https://jp.investing.com/rss/news_25.rss',
		category: '米国株'
	},
	{
		name: 'Investing.com 株式分析',
		url: 'https://jp.investing.com/rss/stock_Stocks.rss',
		category: '米国株'
	},
	{
		name: 'Investing.com 指数分析',
		url: 'https://jp.investing.com/rss/stock_Indices.rss',
		category: '米国株'
	},
	// 日本株
	{
		name: '日本取引所RSS',
		url: 'https://www.jpx.co.jp/rss/markets_news.xml',
		category: '日本株'
	},
	{
		name: 'JPXお知らせ',
		url: 'https://www.jpx.co.jp/rss/jpx-news.xml',
		category: '日本株'
	},
	{
		name: 'JPX注意喚起',
		url: 'https://www.jpx.co.jp/rss/alerts.xml',
		category: '日本株'
	},
	// 仮想通貨
	{
		name: 'CoinDesk Japan',
		url: 'https://www.coindeskjapan.com/feed/',
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
	// 2chまとめ系
	{
		name: 'キニ速',
		url: 'http://blog.livedoor.jp/kinisoku/index.rdf',
		category: '2chまとめ'
	},
	{
		name: 'IT速報',
		url: 'http://blog.livedoor.jp/itsoku/index.rdf',
		category: '2chまとめ'
	},
	{
		name: 'ハムスター速報',
		url: 'http://hamusoku.com/index.rdf',
		category: '2chまとめ'
	},
	{
		name: '痛いニュース',
		url: 'http://blog.livedoor.jp/dqnplus/index.rdf',
		category: '2chまとめ'
	},
	{
		name: '暇人速報',
		url: 'http://himasoku.com/index.rdf',
		category: '2chまとめ'
	},
	{
		name: 'VIPPERな俺',
		url: 'http://blog.livedoor.jp/news23vip/index.rdf',
		category: '2chまとめ'
	},
	// スタートアップ系
	{
		name: 'BRIDGE',
		url: 'https://thebridge.jp/feed/',
		category: 'スタートアップ'
	},
	{
		name: 'CNET Japan',
		url: 'https://japan.cnet.com/rss/index.rdf',
		category: 'スタートアップ'
	},
	{
		name: 'ITmedia ビジネス',
		url: 'https://rss.itmedia.co.jp/rss/2.0/business.xml',
		category: 'スタートアップ'
	},
	{
		name: 'ITmedia エグゼクティブ',
		url: 'https://rss.itmedia.co.jp/rss/2.0/executive.xml',
		category: 'スタートアップ'
	}
];

export const categories = [
	'ニュース',
	'政治',
	'経済',
	'米国株',
	'日本株',
	'仮想通貨',
	'テック',
	'開発',
	'スタートアップ',
	'2chまとめ'
] as const;
export type Category = (typeof categories)[number];
