<script lang="ts">
	import { categories, type Category } from '$lib/config/feeds';
	import type { FeedItem } from './+page.server';

	let { data } = $props();

	let selectedCategory = $state<Category>('ニュース');
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
		items = items.filter((item) => item.category === selectedCategory);

		// 検索フィルタ
		if (searchQuery.trim()) {
			const query = searchQuery.toLowerCase();
			items = items.filter((item) => item.title.toLowerCase().includes(query));
		}

		return items;
	});

	function formatDate(dateStr: string): string {
		const date = new Date(dateStr);
		if (isNaN(date.getTime())) return '';
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
		<div class="mx-auto px-3 sm:px-6 py-2 sm:py-3 flex items-center justify-between">
			<h1 class="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">📰 RSSリーダー</h1>
			<div class="flex gap-1 sm:gap-2">
				<a
					href="/"
					class="p-1.5 sm:p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm"
					aria-label="更新"
				>
					🔄
				</a>
				<button
					onclick={toggleDarkMode}
					class="p-1.5 sm:p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm"
					aria-label="テーマ切り替え"
				>
					{#if darkMode}
						<span class="text-yellow-500">☀️</span>
					{:else}
						<span class="text-gray-600">🌙</span>
					{/if}
				</button>
			</div>
		</div>
	</header>

	<main class="mx-auto px-3 sm:px-6 py-3 sm:py-4">
		<!-- 検索バー -->
		<div class="mb-3">
			<input
				type="text"
				bind:value={searchQuery}
				placeholder="記事を検索..."
				class="w-full px-3 py-1.5 sm:py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
			/>
		</div>

		<!-- カテゴリタブ -->
		<div class="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
			{#each categories as category}
				<button
					onclick={() => (selectedCategory = category)}
					class="px-2 sm:px-3 py-1 sm:py-1.5 rounded-md text-xs sm:text-sm font-medium transition-colors {selectedCategory ===
					category
						? 'bg-blue-500 text-white'
						: 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'}"
				>
					{category}
				</button>
			{/each}
		</div>

		<!-- 記事一覧 -->
		<div class="space-y-1.5 sm:space-y-2">
			{#each filteredItems() as item}
				<a
					href={item.link}
					target="_blank"
					rel="noopener noreferrer"
					class="block p-2 sm:p-3 bg-white dark:bg-gray-800 rounded-md hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors border-l-4 border-blue-500"
				>
					<h2 class="text-sm sm:text-base text-gray-900 dark:text-white font-medium mb-1 line-clamp-2">
						{item.title}
					</h2>
					<div class="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
						<span class="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 rounded">
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
		<div class="mt-4 text-center text-xs sm:text-sm text-gray-500 dark:text-gray-400">
			{filteredItems().length} 件の記事
		</div>
	</main>
</div>
