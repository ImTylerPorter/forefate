<script lang="ts">
	import type { ComponentType } from 'svelte';

	export let name: string;
	export let description: string;
	export let icon: ComponentType;
</script>

<div
	class="group relative overflow-hidden rounded-2xl bg-white/80 backdrop-blur-sm p-8 shadow-md transition-all duration-300 hover:shadow-lg hover:bg-white"
>
	<!-- Gradient overlay -->
	<div
		class="absolute inset-0 bg-gradient-to-b from-primary-50/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
	></div>

	<!-- Content -->
	<div class="relative">
		<div
			class="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 shadow-md"
		>
			<svelte:component this={icon} class="h-6 w-6 text-white" aria-hidden="true" />
		</div>
		<h3 class="mt-6 text-lg font-semibold leading-7 text-neutral-900">
			{name}
		</h3>
		<p class="mt-2 text-base leading-7 text-neutral-600">
			{description}
		</p>
	</div>
</div>
