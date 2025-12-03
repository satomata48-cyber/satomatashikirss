<script lang="ts">
	import { categories, type Category } from '$lib/config/feeds';
	import type { FeedItem } from '$lib/server/rss';

	let { data } = $props();

	let selectedCategory = $state<Category>('すべて');
	let searchQuery = $state('');
	let darkMode = $state(false);

	// ブラウザでダークモード初期化
	$effect(() => {
		if (typeof window !== 'undefined') {
			const saved = localStorage.getItem('darkMode');
			if (saved !== null) {
				darkMode = saved === 'true';
			} else {
				darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
			}
		}
	});

	// ダークモード変更時に保存
	$effect(() => {
		if (typeof window !== 'undefined') {
			localStorage.setItem('darkMode', String(darkMode));
			if (darkMode) {
				document.documentElement.classList.add('dark');
			} else {
				document.documentElement.classList.remove('dark');
			}
		}
	});

	const filteredItems = $derived(() => {
		let items = data.items as FeedItem[];

		// カテゴリフィルタ
		if (selectedCategory !== 'すべて') {
			items = items.filter((item) => item.category === selectedCategory);
		}

		// 検索フィルタ
		if (searchQuery.trim()) {
			const query = searchQuery.toLowerCase();
			items = items.filter((item) => item.title.toLowerCase().includes(query));
		}

		return items;
	});

	function formatDate(dateStr: string): string {
		const date = new Date(dateStr);
		return date.toLocaleDateString('ja-JP', {
			month: 'short',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		});
	}

	function toggleDarkMode() {
		darkMode = !darkMode;
	}
</script>

<div class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
	<!-- ヘッダー -->
	<header class="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-10">
		<div class="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
			<h1 class="text-xl font-bold text-gray-900 dark:text-white">📰 RSSリーダー</h1>
			<button
				onclick={toggleDarkMode}
				class="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
				aria-label="テーマ切り替え"
			>
				{#if darkMode}
					<span class="text-yellow-500">☀️</span>
				{:else}
					<span class="text-gray-600">🌙</span>
				{/if}
			</button>
		</div>
	</header>

	<main class="max-w-4xl mx-auto px-4 py-6">
		<!-- 検索バー -->
		<div class="mb-4">
			<input
				type="text"
				bind:value={searchQuery}
				placeholder="記事を検索..."
				class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
			/>
		</div>

		<!-- カテゴリタブ -->
		<div class="flex gap-2 mb-6 overflow-x-auto pb-2">
			{#each categories as category}
				<button
					onclick={() => (selectedCategory = category)}
					class="px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors {selectedCategory ===
					category
						? 'bg-blue-500 text-white'
						: 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'}"
				>
					{category}
				</button>
			{/each}
		</div>

		<!-- 記事一覧 -->
		<div class="space-y-3">
			{#each filteredItems() as item}
				<a
					href={item.link}
					target="_blank"
					rel="noopener noreferrer"
					class="block p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700"
				>
					<h2 class="text-gray-900 dark:text-white font-medium mb-2 line-clamp-2">
						{item.title}
					</h2>
					<div class="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
						<span
							class="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded text-xs"
						>
							{item.source}
						</span>
						<span>{formatDate(item.pubDate)}</span>
					</div>
				</a>
			{:else}
				<div class="text-center py-12 text-gray-500 dark:text-gray-400">
					{#if searchQuery}
						「{searchQuery}」に一致する記事が見つかりません
					{:else}
						記事がありません
					{/if}
				</div>
			{/each}
		</div>

		<!-- 記事数 -->
		<div class="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
			{filteredItems().length} 件の記事
		</div>
	</main>
</div>
