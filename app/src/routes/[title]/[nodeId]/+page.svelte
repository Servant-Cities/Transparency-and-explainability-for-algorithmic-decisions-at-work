<script lang="ts">
	import type { PageData } from './$types';
	import type { LayoutData } from '../../$types';
	import Dropdown from '$lib/Components/Dropdown.svelte';
	import Example from '$lib/Components/Example.svelte';
	import Partner from '$lib/Components/Partner.svelte';

	let { data }: { data: PageData & LayoutData } = $props();

	const page = $derived(data.processedNodes[data.indexesMap[data.nodeId]]);
	const homepage = data.processedNodes[data.homepageIndex];
</script>

<svelte:head>
	{#each page.metatag as { tag, attributes }}
		{@html `<${tag} ${Object.entries(attributes)
			.map(([key, value]) => `${key}="${value}"`)
			.join(' ')}/>`}
	{/each}
</svelte:head>
<main>
	<a class="homepage_link" href="/">{`${homepage.title} >`}</a>
	<h1>{page.title}</h1>
	<div>
		{@html page.body.processed}
		{#if data.subDemands?.length > 0}
			{#each data.subDemands as { html }}
				<Dropdown {html} />
			{/each}
		{/if}
		{#if data.examples?.length > 0 && page.examplesTitle}
			<h2>{page.examplesTitle}</h2>
			{#each data.examples as { html, imageURL, imageAlt }}
				<Example {...{ html, imageURL, imageAlt }} />
			{/each}
		{/if}
		{#if page.pageType === 'About' && data.partners?.length > 0}
			{#each data.partners as { html, imageURL, imageAlt }}
				<Partner {...{ html, imageURL, imageAlt }} />
			{/each}
		{/if}
	</div>
</main>
