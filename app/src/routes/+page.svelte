<script lang="ts">
	import Dropdown from '$lib/Components/Dropdown.svelte';
	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();
</script>
	<h1>Transparency and explainability for algorithmic decisions at work</h1>
	<p>
		Any employer or platform that uses AI or other algorithmic tools to manage their workers must be
		clear and open about how those tools work. Workers need to be able to understand decisions that
		affect them, especially when it’s about important things like their working hours and pay.
	</p>
	<Dropdown html={`<h4>Why is it important?</h4>
		<p>
			Otherwise, companies can unfairly leverage control over workers by withholding important
			information from them. 
			That’s why workers must be given the right level and amount of information at the right time, including clear reasons for why decisions are made. 
			This information should enable workers to understand which parameters are the most important in an automated decision-making process and what changes they can make to get the outcomes they prefer. 
			They must also know how they can ask a human to review algorithmic decisions.
			Ultimately, this is about respect for workers who are subject to algorithmic management. 
			To provide the foundation for that respect, we’re calling on all employers and platforms to do
			the following when using AI and algorithms in the workplace.
		</p>`}/>

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

<style>
	ul {
		display: flex;
		padding: 0;
		list-style: none;
		justify-content: space-between;
	}
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
		ul {
			display: block;
		}
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
		ul {
			flex-direction: column;
		}
		li {
			width: 100%;
			margin: var(--spacing-3) 0;
			padding: var(--spacing-4) var(--spacing-4) 54% var(--spacing-4);
		}
	}
</style>
