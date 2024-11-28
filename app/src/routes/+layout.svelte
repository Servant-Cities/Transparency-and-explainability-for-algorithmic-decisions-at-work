<script lang="ts">
	import type { Snippet } from 'svelte';
	import { page } from '$app/stores';
	import type { LayoutData } from './$types';
	import { PUBLIC_CAMPAIGN_ORGANIZER_URL } from '$env/static/public';
	import formatTitleURL from '$lib/utils/formatTitleURL';
	let { children, data }: { children: Snippet; data: LayoutData } = $props();
	const aboutPage = data.processedNodes[data.aboutPageIndex];
	const nodeId = $derived($page.params?.nodeId);
</script>

<div>
	<main class="wrapper">
		{@render children()}
		{#if aboutPage.id !== nodeId}<section class="about">
				<h3>{aboutPage.title}</h3>
				{@html aboutPage.body.processed}
				<a class="about_link" href={`/${formatTitleURL(aboutPage.title)}/${aboutPage.id}`}
					>Learn more ↗</a
				>
			</section>{/if}
	</main>
	<footer>
		<a href={PUBLIC_CAMPAIGN_ORGANIZER_URL} target="_blank">
			<img alt="Privacy international's logo" src="/logo.png" />
		</a>
	</footer>
</div>

<style>
	.wrapper {
		display: block;
		width: 100%;
		max-width: 1440px;
		margin: 0 auto;
		padding: calc(var(--spacing-4) * 2);
		padding-top: calc(var(--spacing-4) + var(--spacing-3));
		padding-bottom: calc(var(--spacing-4) + (2 * var(--spacing-3)));
	}
	.about {
		position: relative;
		width: 100%;
		padding: var(--spacing-4);
		margin-top: var(--spacing-4);
		&::before {
			content: '';
			position: absolute;
			left: 0;
			top: 0;
			display: block;
			width: 100%;
			height: 100%;
			opacity: 0.15;
			background-color: var(--alternative-color);
			border-radius: var(--spacing-3);
		}
	}
	.about_link {
		display: block;
		height: auto;
		text-align: right;
		font-family: var(--font-family);
		font-size: var(--font-size-1);
		font-weight: 500;
	}
	footer {
		display: flex;
		justify-content: space-between;
		position: absolute;
		left: 0;
		bottom: 0;
		width: 100%;
		height: calc(var(--spacing-4) + (2 * var(--spacing-1)));
		padding: var(--spacing-1) var(--spacing-3);
		border-top: solid 1px black;
	}

	a {
		display: inline-block;
		height: var(--spacing-4);
	}

	img {
		width: var(--spacing-4);
		height: 100%;
	}

	@media only screen and (max-width: 940px) {
		.wrapper {
			padding: var(--spacing-4);
			padding-bottom: calc(var(--spacing-4) + (2 * var(--spacing-3)));
		}
	}

	@media only screen and (max-width: 640px) {
		.wrapper {
			padding: var(--spacing-3);
			padding-bottom: calc(var(--spacing-4) + (2 * var(--spacing-3)));
		}
	}
</style>
