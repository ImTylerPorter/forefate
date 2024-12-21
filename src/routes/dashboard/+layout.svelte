<script lang="ts">
	import '../../app.css';
	import { Menu } from 'lucide-svelte';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import UserMenu from '$lib/components/UserMenu.svelte';

	let sidebarOpen = $state(false);
	let { children } = $props();

	function handleSidebar() {
		sidebarOpen = !sidebarOpen;
	}
</script>

<div>
	<!-- Mobile sidebar -->
	<div class="relative z-50 lg:hidden" role="dialog" aria-modal="true">
		{#if sidebarOpen}
			<div class="fixed inset-0 bg-neutral-900/80"></div>
			<div class="fixed inset-0 flex">
				<div class="relative mr-16 flex w-full max-w-xs flex-1">
					<Sidebar isOpen={sidebarOpen} onClose={handleSidebar} />
				</div>
			</div>
		{/if}
	</div>

	<!-- Static sidebar for desktop -->
	<div class="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
		<Sidebar isOpen={false} onClose={handleSidebar} />
	</div>

	<div class="lg:pl-72">
		<div
			class="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-neutral-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8"
		>
			<button
				type="button"
				class="-m-2.5 p-2.5 text-neutral-700 lg:hidden"
				onclick={() => (sidebarOpen = true)}
			>
				<span class="sr-only">Open sidebar</span>
				<Menu class="h-6 w-6" aria-hidden="true" />
			</button>

			<!-- Separator -->
			<div class="h-6 w-px bg-neutral-200 lg:hidden" aria-hidden="true"></div>

			<div class="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
				<div class="flex flex-1"></div>
				<div class="flex items-center gap-x-4 lg:gap-x-6">
					<UserMenu />
				</div>
			</div>
		</div>

		<main class="py-10">
			<div class="px-4 sm:px-6 lg:px-8">
				{@render children()}
			</div>
		</main>
	</div>
</div>
