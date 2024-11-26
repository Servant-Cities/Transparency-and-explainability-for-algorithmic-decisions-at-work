<script lang="ts">
	import { page as pageStore } from '$app/stores';
	import type { PageData } from './$types';
	import type { LayoutData } from '../../$types';
	import Dropdown from '$lib/Components/Dropdown.svelte';
	import Example from '$lib/Components/Example.svelte';
	import Partner from '$lib/Components/Partner.svelte';

	let { data }: { data: PageData & LayoutData } = $props();
	const nodeId = $pageStore.params.nodeId;
	const page = $derived(data.processedNodes[data.indexesMap[nodeId]]);
	const homepage = data.processedNodes[data.homepageIndex];
</script>

<svelte:head>
	{#each page.metatag as { tag, attributes }}
		{@html `<${tag} ${Object.entries(attributes)
			.map(([key, value]) => `${key}="${value}"`)
			.join(' ')}/>`}
	{/each}
</svelte:head>
<a class="homepage_link" href="/">{`${homepage.title} >`}</a>
<h1>{page.title}</h1>
<div>
	<section class="intro">
		{@html page.body.processed}
	</section>
	{#await data.subDemands then subDemands}
		{#if subDemands?.length > 0}
			{#each subDemands as { html }}
				<Dropdown {html} />
			{/each}
		{/if}
	{/await}
	{#await data.examples then examples}
		{#if examples?.length > 0 && page.examplesTitle}
			<h2>{page.examplesTitle}</h2>
			{#each examples as { html, imageURL, imageAlt }}
				<Example {...{ html, imageURL, imageAlt }} />
			{/each}
		{/if}
	{/await}
	{#await data.partners then partners}
		{#if page.pageType === 'About' && partners?.length > 0}
			{#each partners as { html, title, url, imageURL, imageAlt }}
				<Partner {...{ html, title, url, imageURL, imageAlt }} />
			{/each}
		{/if}
	{/await}
</div>
