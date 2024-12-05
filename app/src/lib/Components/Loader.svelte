<div class="loader"></div>

<style>
	.loader {
		width: 40px;
        margin: 10vh auto 40vh auto;
		aspect-ratio: 1;
		display: grid;
		animation: l8-0 1.5s infinite linear;
	}
	.loader:before,
	.loader:after {
		content: '';
		grid-area: 1/1;
		background: var(--alternative-color);
		clip-path: polygon(0 0%, 100% 0, 100% 100%);
		animation: inherit;
		animation-name: l8-1;
	}
	.loader:after {
		--s: -1;
	}
	@keyframes l8-0 {
		66% {
			transform: skewX(0deg);
		}
		80%,
		100% {
			transform: skewX(-45deg);
		}
	}
	@keyframes l8-1 {
		0% {
			transform: scale(var(--s, 1)) translate(-0.5px, 0);
		}
		33% {
			transform: scale(var(--s, 1)) translate(calc(1px - 50%), calc(1px - 50%));
		}
		66% {
			transform: scale(var(--s, 1)) translate(calc(1px - 50%), 0%);
		}
		100% {
			transform: scale(var(--s, 1)) translate(calc(0.5px - 50%), 0%);
		}
	}
</style>
