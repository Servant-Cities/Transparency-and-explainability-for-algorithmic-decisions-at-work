<script lang="ts">
	import { fade } from 'svelte/transition';
	let { html, imageURL, imageAlt }: { html: string; imageURL: string; imageAlt: string } = $props();
</script>

{#if html}
	<section in:fade={{ duration: 300, delay: 400 }}>
		{#if html.startsWith('<div>')}
			{@html html}
		{:else}
			<div>{@html html}</div>
		{/if}
		{#if imageURL}
			<img alt={imageAlt} src={imageURL} />
		{/if}
	</section>
{/if}

<style>
	section {
		display: flex;
		width: 100%;
		vertical-align: top;
		margin-top: var(--spacing-4);
		padding-bottom: calc(var(--spacing-4) * 2);
		&:after {
			content: ' ';
			position: absolute;
			display: block;
			bottom: 0;
			left: 0;
			height: var(--spacing-1);
			width: 100%;
			opacity: 0.21;
			background-color: var(--alternative-color);
			border-radius: var(--spacing-1);
		}
		&:last-child {
			&:after {
				content: unset;
			}
		}

		& > :global(*:first-child) {
			display: inline-block;
			width: calc(100% - var(--spacing-2) - 290px);
			margin-right: calc(var(--spacing-3) * 2);
		}

		& > img,
		> :global(div:nth-child(2)) {
			display: inline-block;
			width: 290px;
			height: auto;
			max-width: 100%;
			align-self: start;
		}

		& > :global(div:nth-child(2)) {
			margin-top: var(--spacing-4);
		}

		& > img {
			border-radius: var(--spacing-3);
			aspect-ratio: 16 / 9;
			object-fit: cover;
		}
	}

	@media only screen and (max-width: 900px) {
		section {
			flex-direction: column;
			& :global(*:first-child) {
				width: 100%;
				margin-right: 0;
			}

			& > :global(div:nth-child(2)) {
				width: auto;
				height: auto;
			}

			& > img {
				padding: var(--spacing-2);
			}
		}
	}
</style>
