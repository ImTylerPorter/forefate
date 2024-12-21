<script lang="ts">
	import { Home, Settings, PieChart, Users, History, FileText } from 'lucide-svelte';
	import { page } from '$app/state';

	export const navigation = [
		{ name: 'Dashboard', href: '/', icon: Home },
		{ name: 'Scenarios', href: '/scenarios', icon: PieChart },
		{ name: 'Collaborations', href: '/collaborations', icon: Users },
		// { name: 'Historical Data', href: '/historical-data', icon: History },
		// { name: 'Reports', href: '/reports', icon: FileText },
		{ name: 'Settings', href: '/settings', icon: Settings }
	];
</script>

<ul role="list" class="-mx-2 space-y-1">
	{#each navigation as item}
		<li>
			<a
				href={item.href}
				class={`group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold ${
					page.url.pathname === item.href
						? 'bg-primary-900 text-white'
						: 'text-primary-100 hover:text-white hover:bg-primary-900'
				}`}
			>
				<item.icon class="h-6 w-6 shrink-0" aria-hidden="true" />
				{item.name}
			</a>
		</li>
	{/each}
</ul>
