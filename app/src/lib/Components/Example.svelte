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
		padding-bottom: calc(var(--spacing-4) * 2);

		& > :global(*:first-child) {
			display: inline-block;
			width: calc(100% - var(--spacing-2) - 290px);
			margin-right: calc(var(--spacing-3) * 2);
		}

		& > img,
		> :global(div:nth-child(2)) {
			display: inline-block;
			width: 290px;
			height: 290px;
			max-width: 100%;
			object-fit: cover;
		}

		& > :global(div:nth-child(2)) {
			margin-top: var(--spacing-4);
		}

		& > img {
			border-radius: var(--spacing-3);
		}
	}

	@media only screen and (max-width: 900px) {
		section {
			flex-direction: column;
			& :global(div:first-child) {
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
