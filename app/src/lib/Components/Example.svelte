<script lang="ts">
	let { html }: { html: string } = $props();
	const [, title, content] = html.split(/(<h4>.*?<\/h4>)/);
</script>

<section>
	{#if title}
		{@html title}
		<div>
			<div class="content">{@html content}</div>
			<img alt="A placeholder" src="/placeholder.gif" />
		</div>
	{:else}
		<div class="content">{@html html}</div>
		<img alt="A placeholder" src="/placeholder.gif" />
	{/if}
</section>

<style>
	section {
		vertical-align: baseline;
		margin-top: var(--spacing-4);
	}

	.content {
		display: inline-block;
		width: calc(100% - var(--spacing-2) - 330px);
		margin-right: var(--spacing-2);
	}

	img {
		display: inline-block;
		width: 320px;
        max-width: 100%;
        margin-top: var(--spacing-3);
	}

	@media only screen and (max-width: 900px) {
		section {
			display: flex;
            flex-direction: column;
		}

        .content {
            width: 100%;
            margin-right: 0;
        }
	}
</style>
