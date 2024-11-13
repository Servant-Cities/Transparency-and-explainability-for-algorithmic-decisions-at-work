<script lang="ts">
	let { html, imageURL, imageAlt }: { html: string } = $props();
</script>

<section class="content">
	{@html html}
	{#if imageURL}
		<img alt={imageAlt} src={imageURL} />
	{/if}
</section>

<style>
	section {
		vertical-align: top;
		margin-top: var(--spacing-4);
	}

	.content {

		& :global(div > div:first-child) {
			display: inline-block;
			width: calc(100% - var(--spacing-2) - 330px);
			margin-right: var(--spacing-2);
		}

		& > img,
		:global(div:nth-child(2)) {
			display: inline-block;
			width: 320px;
			max-width: 100%;
			margin-top: var(--spacing-3);
		}
	}

	@media only screen and (max-width: 900px) {
		section {
			display: flex;
			flex-direction: column;
		}

		.content {
			& :global(div:first-child) {
				width: 100%;
				margin-right: 0;
			}
		}
	}
</style>
