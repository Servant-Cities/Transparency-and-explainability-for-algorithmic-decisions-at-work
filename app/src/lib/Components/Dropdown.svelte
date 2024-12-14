<script lang="ts">
	import { fade } from 'svelte/transition';
	let { html }: { html: string } = $props();
	const [, title, content] = html.split(/(<h4>.*?<\/h4>)/);
	let isOpen = $state(false);
</script>

<section class:open={isOpen}  in:fade={{ duration: 300, delay: 400 }}>
	<button aria-label="Displays a detailed explaination" onclick={(e) => (isOpen = !isOpen)}>{@html title}</button>
	<div>
		{@html content}
	</div>
</section>

<style>
	section {
		border-radius: var(--spacing-3);
		margin: var(--spacing-4) 0;
		transition: all 0.3s ease-in;

		& > div {
			display: none;
		}

		& > button {
			width: 100%;
			padding-left: calc(var(--headers-size-2) + var(--spacing-2));

			&::before {
			content: '>';
			display: inline-block;
			position: absolute;
			left: 0;
			top: calc(var(--headers-size-2) - var(--headers-size-1));
			width: var(--headers-size-2);
			height: var(--headers-size-2);
			text-align: center;
			font-size: var(--headers-size-1);
			color: var(--main-color);
			margin-right: var(--headers-size-2);
		}
		}
	}

	.open {
		padding: var(--spacing-4);
		box-shadow: 0 -2px 3px 4px var(--secondary-color);

		& > div {
			display: block;
		}

		& > :global(button > h4) {
			display: inline-block;
			margin-bottom: var(--spacing-4);
			padding-right: calc(var(--headers-size-2) + var(--spacing-2));
		}

		&::before {
			content: '⛌';
			display: inline-block;
			position: absolute;
			top: var(--spacing-4);
			right: var(--spacing-4);
			color: var(--main-color);
			font-size: var(--headers-size-2);
		}
	}

	@media only screen and (max-width: 500px) {
		.open {
			padding: var(--spacing-2);
		}
	}
</style>
