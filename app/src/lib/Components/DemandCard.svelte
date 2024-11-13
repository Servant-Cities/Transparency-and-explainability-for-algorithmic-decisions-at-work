<script lang="ts">
	let { demand, number }: { demand: {title: string; id: string}, number: number } = $props();

</script>

<li>
	<div>
		<h3>Demand {number}</h3>
		<p>{demand.title}</p>
	</div>
	<div class="li_footer">
		<img alt="A placeholder" src="/placeholder.gif" />
		<a href="/{demand.id}">check it out ↗</a>
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
		width: 65%;
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
			padding: var(--spacing-4) var(--spacing-4) 54% var(--spacing-4);
		}
	}
</style>
