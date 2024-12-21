<script lang="ts">
	import { X } from 'lucide-svelte';
	import Navigation from './Navigation.svelte';

	let { isOpen, onClose } = $props<{
		isOpen: boolean;
		onClose: () => void;
	}>();
</script>

<div class="flex grow flex-col gap-y-5 overflow-y-auto bg-primary-900 px-6 pb-4">
	<div class="flex h-16 shrink-0 items-center">
		<h1 class="text-2xl font-bold text-white">Forefate</h1>
	</div>
	<nav class="flex flex-1 flex-col">
		<ul role="list" class="flex flex-1 flex-col gap-y-7">
			<li>
				<Navigation />
			</li>
		</ul>
	</nav>
</div>

{#if isOpen}
	<div class="absolute left-full top-0 flex w-16 justify-center pt-5">
		<button type="button" class="-m-2.5 p-2.5" onclick={onClose}>
			<span class="sr-only">Close sidebar</span>
			<X class="h-6 w-6 text-white" />
		</button>
	</div>
{/if}
