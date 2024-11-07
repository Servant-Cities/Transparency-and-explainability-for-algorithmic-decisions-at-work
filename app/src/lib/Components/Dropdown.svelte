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
		border-radius: var(--spacing-3);
		margin: var(--spacing-4) 0;
		transition: all 0.3s ease-in;
		& > :global(button > h4::before) {
			content: 'i';
			display: inline-block;
			position: relative;
			border-radius: 50%;
			border: 1px solid var(--main-color);
			width: var(--headers-size-2);
			height: var(--headers-size-2);
			text-align: center;
			font-size: var(--headers-size-1);
			color: var(--main-color);
			margin-right: var(--headers-size-2);
		}
	}

	.open {
		padding: 40px;
		box-shadow: 0 -2px 3px 4px var(--secondary-color);

		& > :global(button > h4) {
			display: inline-block;
			margin-bottom: var(--spacing-4);
		}

		&::before {
			content: '☓';
			display: inline-block;
			position: absolute;
			top: var(--spacing-4);
			right: var(--spacing-4);
			color: var(--main-color);
			font-size: var(--font-size-3);
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
