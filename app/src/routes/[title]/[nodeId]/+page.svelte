<script lang="ts">
	import { fade } from 'svelte/transition';
	import { page as pageStore } from '$app/stores';
	import type { PageData } from './$types';
	import type { LayoutData } from '../../$types';
	import Dropdown from '$lib/Components/Dropdown.svelte';
	import Example from '$lib/Components/Example.svelte';
	import Partner from '$lib/Components/Partner.svelte';
	import NavigationHelper from '$lib/Components/NavigationHelper.svelte';
	import Loader from '$lib/Components/Loader.svelte';
	import Metatag from '$lib/Components/Metatag.svelte';

	let { data }: { data: PageData & LayoutData } = $props();
	const { subDemands, examples, partners } = $derived(data);
	const nodeId = $derived($pageStore.params.nodeId);
	const page = $derived(data.processedNodes[data.indexesMap[nodeId]]);
</script>

<Metatag metatag={page.metatag} title={page.title}/>
<h1>{page.title}</h1>
<NavigationHelper {data} />
<div>
	<section class="intro">
		{@html page.body.processed}
	</section>
	{#await subDemands}
		<Loader />
	{:then subDemands}
		{#if subDemands?.length > 0}
			{#each subDemands as { html }}
				<Dropdown {html} />
			{/each}
		{/if}
	{/await}
	{#await examples}
		<Loader />
	{:then examples}
		{#if examples?.length > 0 && page.examplesTitle}
			<div class="examples">
				<h2 in:fade>{page.examplesTitle}</h2>
				{#each examples as { html, imageURL, imageAlt }}
					<Example {...{ html, imageURL, imageAlt }} />
				{/each}
			</div>
		{/if}
	{/await}
	{#await partners}
		<Loader />
	{:then partners}
		{#if page.pageType === 'About' && partners?.length > 0}
			{#each partners as { html, title, url, imageURL, imageAlt }}
				<Partner {...{ html, title, url, imageURL, imageAlt }} />
			{/each}
		{/if}
	{/await}
</div>
