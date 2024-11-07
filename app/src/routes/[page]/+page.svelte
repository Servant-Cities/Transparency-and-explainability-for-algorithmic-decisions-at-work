<script lang="ts">
	import Dropdown from '$lib/Components/Dropdown.svelte';
	import Example from '$lib/Components/Example.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	{#each data.metatag as { tag, attributes }}
		{@html `<${tag} ${Object.entries(attributes)
			.map(([key, value]) => `${key}="${value}"`)
			.join(' ')}/>`}
	{/each}
</svelte:head>
<a href="/">Transparency and explainability for algorithmic decisions at work ></a>
<h1>{data.title}</h1>
<div>
	{@html data.body.processed}
	{#each data.subDemands as { attributes: { field_fieldset_text } }}
		<Dropdown html={field_fieldset_text.processed} />
	{/each}
	<h3>Examples</h3>
	{#each data.examples as { attributes: { field_fieldset_text } }}
		<Example html={field_fieldset_text.processed} />
	{/each}
</div>

<style>
	a {
		display: block;
		margin-bottom: var(--spacing-4);
	}
</style>
