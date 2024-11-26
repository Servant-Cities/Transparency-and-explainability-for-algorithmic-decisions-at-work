<script lang="ts">
	let {
		html,
		title,
		url,
		imageURL,
		imageAlt
	}: { html: string; title: string; url: string; imageURL: string; imageAlt: string } = $props();
</script>

<div class="partner">
	<a href={url} target="_blank"><img src={imageURL} alt={imageAlt} /></a>
	<div>
		<h4><a href={url} target="_blank">{title}</a></h4>
		{@html html}
	</div>
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

		& > a > img {
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

			& > a > img {
				margin-bottom: var(--spacing-3);
			}
		}
	}
</style>
