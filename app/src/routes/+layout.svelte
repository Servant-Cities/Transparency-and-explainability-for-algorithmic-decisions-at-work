<script lang="ts">
	import type { Snippet } from 'svelte';
	import { page } from '$app/stores';
	import type { LayoutData } from './$types';
	let { data, children }: { data: LayoutData; children: Snippet } = $props();
</script>

<nav>
	<ul>
		{#each data.nodes as node}
			<li><a href="/{node.id}" class:active={$page.url.pathname === `/${node.id}`}>{node.title}</a></li>
		{/each}
	</ul>
</nav>
{@render children()}

<style>
	a {
		color: blue;
	}

	.active {
		color: green;
	}
</style>
