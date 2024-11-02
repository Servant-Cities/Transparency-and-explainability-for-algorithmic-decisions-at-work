<script lang="ts">
	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();
</script>

<div class="wrapper">
	<h1>Transparency and explainability for algorithmic decisions at work</h1>
	<p>
		Any employer or platform that uses AI or other algorithmic tools to manage their workers must be
		clear and open about how those tools work. Workers need to be able to understand decisions that
		affect them, especially when it’s about important things like their working hours and pay.
	</p>

	<nav>
		<ul>
			{#each data.nodes as node, index}
				<li>
					<div>
						<h3>Demand {index + 1}</h3>
						<p>{node.title}</p>
					</div>
					<div class="li_footer">
						<img alt="A placeholder" src="/placeholder.gif" />
						<a href="/{node.id}">check it out ↗</a>
					</div>
				</li>
			{/each}
		</ul>
	</nav>
</div>

<style>
	.wrapper {
		display: block;
		width: 100%;
		max-width: 1440px;
		margin: 0 auto;
		padding: 32px;
		padding-top: 64px;
	}
	h1 {
		font-family: var(--font-family);
		font-size: var(--font-size-4);
		font-weight: 900;
		color: var(--main-color);
		margin-bottom: 24px;
	}
	p {
		font-family: var(--font-family);
		font-size: var(--font-size-2);
		font-weight: 300;
		color: var(--main-color);
	}
	ul {
		display: flex;
		padding: 40px 0;
		list-style: none;
		justify-content: space-between;
	}
	li {
		display: inline-block;
		width: 30%;
		border-radius: 24px;
		padding: 40px 40px 18% 40px;
		background: var(--alternative-color);
		background: linear-gradient(270deg, var(--alternative-color) 20%, var(--secondary-color) 100%);
	}
	h3 {
		font-family: var(--font-family);
		font-size: var(--font-size-3);
		font-weight: 700;
		color: var(--main-color);
		margin-bottom: 8px;
	}
	.li_footer {
		position: absolute;
		left: 0;
		bottom: 0;
		padding: 0 40px 40px;
	}
	img {
		width: 65%;
		border-radius: 20px;
		margin: 8px 0;
	}
	a {
		display: block;
		font-family: var(--font-family);
		font-size: var(--font-size-1);
		font-weight: 500;
		color: var(--main-color);
		text-decoration: none;

		&:hover {
			text-decoration: underline;
		}
	}

	@media only screen and (max-width: 1140px) and (min-width: 640px) {
		ul {
			display: block;
		}
		li {
			display: flex;
			width: 100%;
			margin: 24px 0;
			padding: 40px;
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
			left:unset;
			padding: 40px 0 0 0;
		}
		img {
			width: 90%;
			margin: 0;
		}
	}

	@media only screen and (max-width: 640px) {
		ul {
			flex-direction: column;
		}
		li {
			width: 100%;
			margin: 24px 0;
			padding: 40px 40px 54% 40px;
		}
	}
</style>
