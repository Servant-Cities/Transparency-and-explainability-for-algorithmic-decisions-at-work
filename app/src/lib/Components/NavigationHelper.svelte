<script lang="ts">
	import { page as pageStore } from '$app/stores';
	import type { LayoutData } from '../../routes/$types';
	import formatTitleURL from '$lib/utils/formatTitleURL';

	let { data }: { data: LayoutData } = $props();
	const nodeId = $derived($pageStore.params.nodeId);

	const { processedNodes, aboutPageIndex, homepageIndex } = data;
	const aboutPage = processedNodes[aboutPageIndex];
	const demands = processedNodes.filter(
		(_, index) => index !== homepageIndex && index !== aboutPageIndex
	);

	let y: number = $state(0);
</script>

<svelte:window bind:scrollY={y} />
<nav class:scrolled={y > 60}>
	<ul>
		<li><a class:active={!nodeId} href="/">Homepage</a></li>
		{#each demands as { title, id }, index}
			<li>
				<a class:active={nodeId === id} href={`/${formatTitleURL(title)}/${id}`}
					>Demand {index + 1}</a
				>
			</li>
		{/each}
		<li>
			<a
				class:active={nodeId === aboutPage.id}
				href={`/${formatTitleURL(aboutPage.title)}/${aboutPage.id}`}>{aboutPage.title}</a
			>
		</li>
	</ul>
</nav>

<style>
	nav {
		position: fixed;
		overflow: hidden;
		z-index: 1000;
		top: var(--spacing-3);
		right: var(--spacing-3);
		padding: var(--spacing-2);
		border: var(--main-color) solid 1px;
		border-radius: var(--spacing-2);
		background-color: rgba(255, 255, 255, 0.86);
	}

	.scrolled {
		max-width: var(--spacing-4);
		max-height: var(--spacing-4);
        box-sizing:border-box;
		cursor: zoom-in;

		&:hover {
			max-width: fit-content;
			max-height: fit-content;
		}
	}

	ul {
		padding: 0;
		list-style: none;
	}

	li {
		display: block;
		font-family: var(--font-family);
		font-size: var(--font-size-1);
		font-weight: 500;

		&:last-child {
			padding: 0;
		}
	}

	a {
		text-decoration: none;

		&:hover {
			text-decoration: underline;
		}
	}

	.active {
		font-weight: 700;
		text-decoration: underline;
	}

	@media only screen and (max-width: 900px) {
		nav {
			max-width: var(--spacing-4);
			max-height: var(--spacing-4);
		}
	}
</style>
