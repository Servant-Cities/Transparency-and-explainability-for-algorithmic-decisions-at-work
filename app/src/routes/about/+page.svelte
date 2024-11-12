<script lang="ts">
	import type { PageData } from './$types';
	import type { LayoutData } from '../$types';

	let { data }: { data: PageData & LayoutData } = $props();
</script>

<main>
	<a class="homepage_link" href="/"
		>{`${data.homepage.title} >`}</a
	>
	<h1>{data.about.title}</h1>
	{@html data.about.body.processed}
	{#each data.partners as partner}
		<div class="partner">
			<a href={partner.url} aria-label="Partner's logo leading to their website"
				><img src={partner.logoURL} /></a
			>
			<div>{@html partner.description}</div>
		</div>
	{/each}
</main>

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

		& > a {
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

			& > a {
				margin-bottom: var(--spacing-3);
			}
		}
	}
</style>
