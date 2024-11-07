<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { LayoutData } from './$types';
	let { children }: { children: Snippet } = $props();
</script>

<div>
	<div class="wrapper">
	{@render children()}</div>
	<footer></footer>
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
		display: block;
		position: absolute;
		left: 0;
		bottom: 0;
		width: 100%;
		height: var(--spacing-4);
		border-top: solid 1px black;
	}
</style>
