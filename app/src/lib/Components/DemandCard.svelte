<script lang="ts">
	import { fade } from 'svelte/transition';
	import { base } from '$app/paths';
	import formatTitleURL from '$lib/utils/formatTitleURL';

	let {
		demand,
		number
	}: { demand: { title: string; shortTitle: string; id: string; imageURL: string; imageAlt: string }; number: number } =
		$props();
</script>

<li in:fade={{ duration: 300, delay: 400 }}>
	<a
		class="clickable_card"
		href="{base}/{formatTitleURL(demand.shortTitle)}/{demand.id}"
		aria-label="Learn more about this demand"
	>
		<div>
			<h3>Demand {number}</h3>
			<p>{demand.title}</p>
		</div>
		<div class="card_footer">
			<img alt={demand.imageAlt} src={demand.imageURL} />
			<span class="more">Learn more ↗</span>
		</div>
	</a>
</li>

<style>
	li {
		display: inline-block;
		width: 30%;
		border-radius: var(--spacing-3);
		background: var(--alternative-color);
		background: linear-gradient(270deg, var(--alternative-color) 20%, var(--secondary-color) 100%);
	}
	.clickable_card {
		display: flex;
		justify-content: space-between;
		flex-direction: column;
		width: 100%;
		height: 100%;
		padding: var(--spacing-4);
		text-decoration: none;
	}
	img {
		width: 100%;
		aspect-ratio: 16 / 9;
		object-fit: cover;
		border-radius: var(--spacing-2);
		margin: var(--spacing-1) 0;
	}
	.more {
		display: block;
		font-family: var(--font-family);
		font-size: var(--font-size-1);
		font-weight: 500;
	}

	@media only screen and (max-width: 1140px) and (min-width: 640px) {
		li {
			width: 100%;
			margin: var(--spacing-3) 0;
		}
		.clickable_card {
			flex-direction: row;
			> div {
				display: inline-block;
				width: 65%;
			}
		}
		.card_footer {
			position: relative;
			width: 30%;
			text-align: right;
			bottom: unset;
			left: unset;
			padding: var(--spacing-4) 0 0 0;
		}
		img {
			width: 90%;
			margin: 0;
		}
	}

	@media only screen and (max-width: 640px) {
		li {
			width: 100%;
			margin: var(--spacing-3) 0;
		}

		.card_footer {
			position: relative;
			padding: 0;
		}
	}
</style>
