<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { LayoutData } from './$types';
	let { children }: { children: Snippet } = $props();
</script>

<div>
	{@render children()}
	<footer></footer>
</div>

<style>
	div {
		display: block;
		height: auto;;
		padding-bottom: 40px;
	}

	footer {
		display: block;
		position: absolute;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 40px;
		border-top: solid 1px black;
	}
</style>
