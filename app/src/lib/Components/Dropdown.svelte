<script lang="ts">
	let { html }: { html: string } = $props();
	const [, title, content] = html.split(/(<h4>.*?<\/h4>)/);
	let isOpen = $state(false);
</script>

<section class:open={isOpen}>
	<button onclick={(e) => (isOpen = !isOpen)}>{@html title}</button>
	{#if isOpen}
		{@html content}
	{/if}
</section>

<style>
	section {
		border-radius: 24px;
		margin: 40px 0;
		transition: all 0.3s ease-in;
	}

	.open {
		padding: 40px;
		box-shadow: 0 -2px 3px 4px var(--secondary-color);

		& > :global(button > h4) {
			display: inline-block;
			margin-bottom: 40px;
		}

		&::before {
			content: 'x';
			display: inline-block;
			position: absolute;
			top: 32px;
			right: 40px;
			color: var(--main-color);
			font-size: 24px;
		}
	}

	button {
		width: 100%;
		background-color: transparent;
		cursor: pointer;
		border: none;
		text-align: left;
	}
</style>
