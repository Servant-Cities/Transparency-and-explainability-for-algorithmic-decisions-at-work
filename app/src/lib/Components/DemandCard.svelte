<script lang="ts">
	import formatTitleURL from '$lib/utils/formatTitleURL';

	let {
		demand,
		number
	}: { demand: { title: string; id: string; imageURL: string; imageAlt: string }; number: number } =
		$props();
</script>

<li>
	<div>
		<h3>Demand {number}</h3>
		<p>{demand.title}</p>
	</div>
	<div class="li_footer">
		<img alt={demand.imageAlt} src={demand.imageURL} />
		<a href="/{formatTitleURL(demand.title)}/{demand.id}">check it out ↗</a>
	</div>
</li>

<style>
	li {
		display: inline-block;
		width: 30%;
		border-radius: var(--spacing-3);
		padding: var(--spacing-4) var(--spacing-4) 18% var(--spacing-4);
		background: var(--alternative-color);
		background: linear-gradient(270deg, var(--alternative-color) 20%, var(--secondary-color) 100%);
	}
	.li_footer {
		position: absolute;
		left: 0;
		bottom: 0;
		padding: 0 var(--spacing-4) var(--spacing-4);
	}
	img {
		width: 75%;
		aspect-ratio: 16 / 9;
		object-fit: cover;
		border-radius: var(--spacing-2);
		margin: var(--spacing-1) 0;
	}
	a {
		display: block;
		font-family: var(--font-family);
		font-size: var(--font-size-1);
		font-weight: 500;
	}

	@media only screen and (max-width: 1140px) and (min-width: 640px) {
		li {
			display: flex;
			width: 100%;
			margin: var(--spacing-3) 0;
			padding: var(--spacing-4);
			> div {
				display: inline-block;
				width: 65%;
			}
		}
		.li_footer {
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
			padding: var(--spacing-4);
		}

		.li_footer {
			position: relative;
			padding: 0;
		}

		img {
			max-width: 100%;
			width: 280px;
		}
	}
</style>
