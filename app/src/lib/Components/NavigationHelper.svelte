<script lang="ts">
	import { page as pageStore } from '$app/stores';
	import { PUBLIC_BASE_URL } from '$env/static/public';
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
	let opened: boolean = $state(false);
	const ontouchstart = () => {
		opened = !opened;
	};
</script>

<svelte:window bind:scrollY={y} />
<nav class:scrolled={y > 60} class:opened {ontouchstart}>
	<ul>
		<li><a class:active={!nodeId} href="{PUBLIC_BASE_URL}/">Homepage</a></li>
		{#each demands as { id, shortTitle }, index}
			<li>
				<a class:active={nodeId === id} href={`${PUBLIC_BASE_URL}/${formatTitleURL(shortTitle)}/${id}`}
					>{index + 1}. {shortTitle}</a
				>
			</li>
		{/each}
		<li>
			<a
				class:active={nodeId === aboutPage.id}
				href={`${PUBLIC_BASE_URL}/${formatTitleURL(aboutPage.title)}/${aboutPage.id}`}>{aboutPage.title}</a
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
		padding: unset;
		padding-top: var(--spacing-4);
		&::after {
			content: '☰';
			display: block;
			color: var(--main-color);
			font-size: var(--spacing-3);
			font-weight: 900;
			line-height: var(--spacing-4);
			position: absolute;
			left: calc(50% - 0.5em);
			top: 0;
		}

		&:hover {
			padding: var(--spacing-2);
			max-width: none;
			max-height: none;
			&::after {
				content: ' ';
			}
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
		nav, .scrolled {
			max-width: var(--spacing-4);
			max-height: var(--spacing-4);
			padding: unset;
			padding-top: var(--spacing-4);
			&::after {
				content: '☰';
				display: block;
				color: var(--main-color);
				font-size: var(--spacing-3);
				font-weight: 900;
				line-height: var(--spacing-4);
				position: absolute;
				left: calc(50% - 0.5em);
				top: 0;
			}
		}

		.opened {
			padding: var(--spacing-2);
			max-width: none;
			max-height: none;
			&::after {
				content: '⛌';
                right: var(--spacing-2);
                left: unset;
			}
		}
	}
</style>
