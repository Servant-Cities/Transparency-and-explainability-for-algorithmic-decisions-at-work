<script lang="ts">
	let { html, imageURL, imageAlt }: { html: string; imageURL: string; imageAlt: string } = $props();
</script>

<section>
	{@html html}
	{#if imageURL}
		<img alt={imageAlt} src={imageURL} />
	{/if}
</section>

<style>
	section {
		display: flex;
		width: 100%;
		vertical-align: top;
		margin-top: var(--spacing-4);

		& > :global(div:first-child) {
			display: inline-block;
			width: calc(100% - var(--spacing-2) - 300px);
			margin-right: var(--spacing-2);
		}

		& > img,
		> :global(div:nth-child(2)) {
			display: inline-block;
			width: 290px;
			height: 290px;
			max-width: 100%;
			object-fit: cover;
			padding: 0 0 var(--spacing-2) var(--spacing-2);
		}

		& > :global(div:nth-child(2)) {
			margin-top: var(--spacing-4);
		}
	}

	@media only screen and (max-width: 900px) {
		section {
			flex-direction: column;
			& :global(div:first-child) {
				width: 100%;
				margin-right: 0;
			}

			& > img {
				padding: var(--spacing-2);
			}
		}
	}
</style>
