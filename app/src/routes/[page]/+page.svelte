<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>{data.title}</title>
	{#each data.metatag as { tag, attributes }}
		{@html `<${tag} ${Object.entries(attributes)
			.map(([key, value]) => `${key}="${value}"`)
			.join(' ')}/>`}
	{/each}
</svelte:head>
<h1>{data.title}</h1>
<div class="dynamic">
	{@html data.body.processed}
</div>

<style global>
	.dynamic :global(*) {
		display: block;
		margin: 0;
		border: solid black 1px;
		padding: 16px;
		margin: 16px;
	}
</style>
