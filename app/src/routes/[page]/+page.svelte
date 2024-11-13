<script lang="ts">
	import Dropdown from '$lib/Components/Dropdown.svelte';
	import Example from '$lib/Components/Example.svelte';
	import type { PageData } from './$types';
	import type { LayoutData } from '../$types';

	let { data }: { data: PageData & LayoutData } = $props();

	const demand = data.demands.find((demand) => demand.id === data.nodeId);
</script>

<svelte:head>
	{#each demand.metatag as { tag, attributes }}
		{@html `<${tag} ${Object.entries(attributes)
			.map(([key, value]) => `${key}="${value}"`)
			.join(' ')}/>`}
	{/each}
</svelte:head>
<main>
	<a class="homepage_link" href="/">{`${data.homepage.title} >`}</a>
	<h1>{demand.title}</h1>
	<div>
		{@html demand.body.processed}
		{#if data.subDemands?.length > 0}
			{#each data.subDemands as { html }}
				<Dropdown html={html} />
			{/each}
		{/if}
		{#if data.examples?.length > 0 && demand.examplesTitle}
			<h2>{demand.examplesTitle}</h2>
			{#each data.examples as { html, imageURL, imageAlt }}
				<Example {...{ html, imageURL, imageAlt }} />
			{/each}
		{/if}
	</div>
</main>
