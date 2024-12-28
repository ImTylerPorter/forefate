<script lang="ts">
	import type { Scenario } from '$lib/types';
	import { formatDistanceToNow } from 'date-fns';
	import { ArrowRight } from 'lucide-svelte';

	export let scenario: Scenario;

	const statusColors = {
		Completed: 'bg-green-50 text-green-700 ring-green-600/20',
		'In Progress': 'bg-yellow-50 text-yellow-800 ring-yellow-600/20',
		Draft: 'bg-gray-50 text-gray-600 ring-gray-500/10',
		Archived: 'bg-red-50 text-red-700 ring-red-600/10'
	};
</script>

<div class="relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white">
	<div class="flex flex-1 flex-col p-6">
		<div class="flex items-center gap-x-4">
			<span class="text-sm font-medium text-neutral-500">{scenario.type}</span>
			<span
				class={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${
					statusColors[scenario.status]
				}`}
			>
				{scenario.status}
			</span>
		</div>
		<div class="mt-4 flex items-center gap-x-2">
			<h3 class="text-lg font-semibold leading-6 text-neutral-900">
				<a href="/scenarios/{scenario.id}" class="hover:underline">
					{scenario.name}
				</a>
			</h3>
		</div>
		<p class="mt-2 text-sm text-neutral-600 line-clamp-2">
			{scenario.description || 'No description provided'}
		</p>
		<div class="mt-4 flex items-center gap-x-2 text-sm text-neutral-500">
			<span
				>Last run {scenario.lastRun
					? formatDistanceToNow(scenario.lastRun, { addSuffix: true })
					: 'never'}</span
			>
			{#if scenario.confidence}
				<span>•</span>
				<span>{scenario.confidence}% confidence</span>
			{/if}
		</div>
	</div>
	<div class="mt-4 bg-neutral-50 p-4">
		<a
			href="/scenarios/{scenario.id}"
			class="text-sm font-medium text-indigo-600 hover:text-indigo-500 inline-flex items-center gap-x-1"
		>
			View details
			<ArrowRight class="h-4 w-4" />
		</a>
	</div>
</div>
