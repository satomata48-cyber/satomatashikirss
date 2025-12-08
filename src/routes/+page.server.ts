import { feedSources } from '$lib/config/feeds';

export interface FeedItem {
	title: string;
	link: string;
	pubDate: string;
	source: string;
	category: string;
}

async function fetchFeed(source: { name: string; url: string; category: string }): Promise<FeedItem[]> {
	try {
		const controller = new AbortController();
		const timeoutId = setTimeout(() => controller.abort(), 10000);

		const response = await fetch(source.url, {
			headers: {
				'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
				'Accept': 'application/rss+xml, application/xml, text/xml, application/atom+xml, */*',
				'Accept-Language': 'ja,en;q=0.9',
				'Accept-Charset': 'utf-8, iso-8859-1;q=0.5'
			},
			signal: controller.signal
		});

		clearTimeout(timeoutId);

		if (!response.ok) {
			console.error(`Failed to fetch ${source.name}: ${response.status}`);
			return [];
		}

		// Get response as ArrayBuffer to handle encoding
		const buffer = await response.arrayBuffer();
		let text: string;

		// Try to detect encoding from content-type header or XML declaration
		const contentType = response.headers.get('content-type') || '';

		if (contentType.includes('euc-jp') || contentType.includes('EUC-JP')) {
			text = new TextDecoder('euc-jp').decode(buffer);
		} else if (contentType.includes('shift_jis') || contentType.includes('Shift_JIS')) {
			text = new TextDecoder('shift_jis').decode(buffer);
		} else {
			// Check XML declaration for encoding
			const preview = new TextDecoder('utf-8').decode(buffer.slice(0, 200));
			const encodingMatch = preview.match(/encoding=["']([^"']+)["']/i);

			if (encodingMatch) {
				const encoding = encodingMatch[1].toLowerCase();
				if (encoding === 'euc-jp') {
					text = new TextDecoder('euc-jp').decode(buffer);
				} else if (encoding === 'shift_jis' || encoding === 'shift-jis') {
					text = new TextDecoder('shift_jis').decode(buffer);
				} else {
					text = new TextDecoder('utf-8').decode(buffer);
				}
			} else {
				text = new TextDecoder('utf-8').decode(buffer);
			}
		}

		const items: FeedItem[] = [];

		// RSS 2.0 / RDF items
		const itemRegex = /<item[^>]*>([\s\S]*?)<\/item>/gi;
		let match;

		while ((match = itemRegex.exec(text)) !== null && items.length < 10) {
			const itemXml = match[1];

			const title = extractTag(itemXml, 'title') || 'タイトルなし';
			let link = extractTag(itemXml, 'link') || extractAttr(itemXml, 'link', 'href') || '#';

			// RDF形式の場合、rdf:aboutからリンクを取得
			if (link === '#' || link === '') {
				const rdfAbout = match[0].match(/rdf:about=["']([^"']+)["']/i);
				if (rdfAbout) link = rdfAbout[1];
			}

			const pubDate = extractTag(itemXml, 'pubDate') ||
				extractTag(itemXml, 'dc:date') ||
				extractTag(itemXml, 'published') ||
				new Date().toISOString();

			items.push({
				title: cleanText(title),
				link: decodeHtmlEntities(link).trim(),
				pubDate,
				source: source.name,
				category: source.category
			});
		}

		// Atom entries if no RSS items found
		if (items.length === 0) {
			const entryRegex = /<entry[^>]*>([\s\S]*?)<\/entry>/gi;
			while ((match = entryRegex.exec(text)) !== null && items.length < 10) {
				const entryXml = match[1];

				const title = extractTag(entryXml, 'title') || 'タイトルなし';
				const link = extractAttr(entryXml, 'link', 'href') || extractTag(entryXml, 'link') || '#';
				const pubDate = extractTag(entryXml, 'published') ||
					extractTag(entryXml, 'updated') ||
					new Date().toISOString();

				items.push({
					title: cleanText(title),
					link: decodeHtmlEntities(link).trim(),
					pubDate,
					source: source.name,
					category: source.category
				});
			}
		}

		console.log(`${source.name}: ${items.length} items fetched`);
		return items;
	} catch (error) {
		console.error(`Failed to fetch ${source.name}:`, error);
		return [];
	}
}

function extractTag(xml: string, tagName: string): string | null {
	// Handle CDATA
	const cdataRegex = new RegExp(`<${tagName}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]></${tagName}>`, 'i');
	const cdataMatch = xml.match(cdataRegex);
	if (cdataMatch) return cdataMatch[1].trim();

	// Handle regular content
	const regex = new RegExp(`<${tagName}[^>]*>([\\s\\S]*?)</${tagName}>`, 'i');
	const match = xml.match(regex);
	return match ? match[1].trim() : null;
}

function extractAttr(xml: string, tagName: string, attrName: string): string | null {
	const regex = new RegExp(`<${tagName}[^>]*${attrName}=["']([^"']*)["'][^>]*/?>`, 'i');
	const match = xml.match(regex);
	return match ? match[1] : null;
}

function decodeHtmlEntities(text: string): string {
	return text
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>')
		.replace(/&amp;/g, '&')
		.replace(/&quot;/g, '"')
		.replace(/&#39;/g, "'")
		.replace(/&apos;/g, "'")
		.replace(/&#(\d+);/g, (_, dec) => String.fromCharCode(parseInt(dec, 10)))
		.replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)));
}

function cleanText(text: string): string {
	return decodeHtmlEntities(text)
		.replace(/<[^>]*>/g, '') // Remove any HTML tags
		.trim();
}

// タイトルの類似性をチェック（簡易版）
function isSimilarTitle(title1: string, title2: string): boolean {
	const normalize = (str: string) => str.toLowerCase().replace(/\s+/g, '').replace(/[「」『』【】]/g, '');
	const t1 = normalize(title1);
	const t2 = normalize(title2);

	// 完全一致または一方が他方を含む場合は重複とみなす
	if (t1 === t2) return true;
	if (t1.length > 20 && t2.length > 20) {
		if (t1.includes(t2) || t2.includes(t1)) return true;
	}

	return false;
}

export async function load() {
	const results = await Promise.allSettled(
		feedSources.map(source => fetchFeed(source))
	);

	const items: FeedItem[] = [];
	for (const result of results) {
		if (result.status === 'fulfilled') {
			items.push(...result.value);
		}
	}

	// Sort by date descending
	items.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());

	// 重複を除去（新しい記事を優先）
	const uniqueItems: FeedItem[] = [];
	for (const item of items) {
		const isDuplicate = uniqueItems.some(existingItem =>
			isSimilarTitle(item.title, existingItem.title)
		);
		if (!isDuplicate) {
			uniqueItems.push(item);
		}
	}

	return { items: uniqueItems };
}
