<script lang="ts">
	let { html, imageURL, imageAlt }: { html: string;  imageURL: string; imageAlt: string } = $props();
</script>

<div class="partner">
    <img src={imageURL} alt={imageAlt}/>
    <div>{@html html}</div>
</div>

<style>
	.partner {
		display: flex;
		flex-direction: row-reverse;
		align-items: center;
		margin-top: var(--spacing-4);
		max-width: 900px;

		& > div {
			display: inline-block;
			width: calc(100% - var(--spacing-2) - 190px);
			margin-right: var(--spacing-2);
		}

		& > img {
			display: inline-block;
			width: 180px;
			max-width: 100%;
			margin-top: var(--spacing-3);
		}
	}

	@media only screen and (max-width: 740px) {
		.partner {
			display: flex;
			flex-direction: column;
			align-items: unset;

			& > div {
				width: 100%;
				margin-right: 0;
			}

			& > img {
				margin-bottom: var(--spacing-3);
			}
		}
	}
</style>