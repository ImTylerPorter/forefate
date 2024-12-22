<script lang="ts">
	import { BarChart2, Clock } from 'lucide-svelte';
	import type { Scenario } from '$lib/types';

	const { scenario } = $props<{ scenario: Scenario }>();

	const getStatusColor = (status: Scenario['status']) => {
		const colors = {
			Draft: 'bg-neutral-100 text-neutral-700',
			'In Progress': 'bg-primary-100 text-primary-700',
			Completed: 'bg-success-100 text-success-700',
			Archived: 'bg-neutral-100 text-neutral-600'
		};
		return colors[status];
	};

	const formatDate = (date: string | null) => {
		if (!date) return 'Never run';
		return new Date(date).toLocaleDateString('en-US', {
			month: 'short',
			day: 'numeric',
			year: 'numeric'
		});
	};
</script>

<div
	class="group relative rounded-lg border border-neutral-200 bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md"
>
	<div class="flex items-center justify-between">
		<span
			class={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(scenario.status)}`}
		>
			{scenario.status}
		</span>
		<span class="text-sm text-neutral-500">{scenario.type}</span>
	</div>

	<h3 class="mt-4 text-lg font-medium text-neutral-900">
		{scenario.name}
	</h3>

	<p class="mt-2 text-sm text-neutral-600 line-clamp-2">
		{scenario.description}
	</p>

	<div class="mt-4 flex items-center gap-4 text-sm text-neutral-500">
		{#if scenario.confidence}
			<div class="flex items-center gap-1">
				<BarChart2 class="h-4 w-4" />
				<span>{scenario.confidence}% confidence</span>
			</div>
		{/if}
		<div class="flex items-center gap-1">
			<Clock class="h-4 w-4" />
			<span>Last run: {formatDate(scenario.lastRun)}</span>
		</div>
	</div>

	<a
		href={`/scenarios/${scenario.id}`}
		class="absolute inset-0 rounded-lg ring-primary-500 focus:outline-none focus:ring-2"
	>
		<span class="sr-only">View scenario details</span>
	</a>
</div>
