<script lang="ts">
	import Dropdown from '$lib/Components/Dropdown.svelte';
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
<h1>{data.title}</h1>
<div>
	{@html data.body.processed}
	{#each data.subDemands as { attributes: { field_fieldset_text } }}
		<Dropdown html={field_fieldset_text.processed} />
	{/each}
	{#each data.examples as { attributes: { field_fieldset_text } }}
		{@html field_fieldset_text.processed}
	{/each}
</div>
