<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { LayoutData } from './$types';
	import {PUBLIC_CAMPAIGN_ORGANIZER_URL} from '$env/static/public';
	import formatTitleURL from '$lib/utils/formatTitleURL';
	let { children, data }: { children: Snippet, data: LayoutData } = $props();
	const aboutPage = data.processedNodes[data.aboutPageIndex]
</script>

<div>
	<div class="wrapper">
		{@render children()}
	</div>
	<footer>
		<a href={PUBLIC_CAMPAIGN_ORGANIZER_URL} target="_blank"><img alt="Privacy international's logo" src="/logo.png"></a>
		<a href={`/${formatTitleURL(aboutPage.title)}/${aboutPage.id}`} >{`${aboutPage.title} >`}</a>
	</footer>
</div>

<style>
	.wrapper {
		display: block;
		width: 100%;
		max-width: 1440px;
		margin: 0 auto;
		padding: var(--spacing-3);
		padding-top: calc(var(--spacing-4) + var(--spacing-3));
	}
	div {
		display: block;
		height: auto;;
		padding-bottom: var(--spacing-4);
	}

	footer {
		display: flex;
		justify-content: space-between;
		position: absolute;
		left: 0;
		bottom: 0;
		width: 100%;
		height: calc(var(--spacing-4) + (2 * var(--spacing-1)) );
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
</style>
