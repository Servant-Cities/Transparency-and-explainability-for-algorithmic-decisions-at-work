<script lang="ts">
	import formatMetatagProperty from "$lib/utils/formatMetatagProperty";

	let { metatag }: { metatag: Array<{tag: string; attributes: Record<string, string>}> } = $props();
</script>

<svelte:head>
	{#each metatag as { tag, attributes }}
		{@html `<${tag} ${Object.entries(attributes)
			.map(formatMetatagProperty)
			.join(' ')}/>`}
	{/each}
</svelte:head>
