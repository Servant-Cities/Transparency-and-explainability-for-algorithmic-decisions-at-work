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
		padding: 32px;
		padding-top: 64px;
	}
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
