<script lang="ts">
	import DemandCard from '$lib/Components/DemandCard.svelte';
	import Metatag from '$lib/Components/Metatag.svelte';
	import NavigationHelper from '$lib/Components/NavigationHelper.svelte';
	import type { LayoutData } from './$types';
	let { data }: { data: LayoutData } = $props();
	const homepage = data.processedNodes[data.homepageIndex];
	const demands = data.processedNodes.filter(
		(_, index) => index !== data.homepageIndex && index !== data.aboutPageIndex
	);
</script>

<Metatag metatag={homepage.metatag} />
<h1>{homepage.title}</h1>
<NavigationHelper data={data} />
<section class="intro">
	{@html homepage.body.processed}
</section>
<nav>
	<ul>
		{#each demands as demand, index}
			<DemandCard {demand} number={index + 1} />
		{/each}
	</ul>
</nav>

<style>
	ul {
		display: flex;
		padding: 0;
		list-style: none;
		justify-content: space-between;
	}

	@media only screen and (max-width: 1140px) and (min-width: 640px) {
		ul {
			display: block;
		}
	}

	@media only screen and (max-width: 640px) {
		ul {
			flex-direction: column;
		}
	}
</style>
