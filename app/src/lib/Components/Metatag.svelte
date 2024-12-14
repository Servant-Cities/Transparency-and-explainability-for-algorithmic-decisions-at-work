<script lang="ts">
	import formatMetatagProperty from '$lib/utils/formatMetatagProperty';

	let {
		metatag,
		title
	}: { metatag: Array<{ tag: string; attributes: Record<string, string> }>; title: string } =
		$props();
</script>

<svelte:head>
	<title>{title}</title>
	{#each metatag as { tag, attributes }}
		{@html `<${tag} ${Object.entries(attributes).map(formatMetatagProperty).join(' ')}/>`}
	{/each}
</svelte:head>
