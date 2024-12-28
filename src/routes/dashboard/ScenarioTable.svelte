<script lang="ts">
	import { formatDistanceToNow } from 'date-fns';
	import type { Scenario } from '$lib/types';

	let { scenarios } = $props<{
		scenarios: (Scenario & {
			lastRun: Date;
			confidence: string | null;
		})[];
	}>();

	function getStatus(scenario: Scenario & { confidence: string | null }): string {
		if (!scenario.confidence) return 'Pending';
		const confidenceNum = parseFloat(scenario.confidence);
		if (confidenceNum >= 80) return 'Completed';
		if (confidenceNum >= 50) return 'In Progress';
		return 'Needs Review';
	}
</script>

<div class="mt-4 bg-white shadow-sm ring-1 ring-neutral-900/5 rounded-lg">
	<table class="min-w-full divide-y divide-neutral-200">
		<thead>
			<tr>
				<th class="px-6 py-3 text-left text-sm font-semibold text-neutral-900">Name</th>
				<th class="px-6 py-3 text-left text-sm font-semibold text-neutral-900">Type</th>
				<th class="px-6 py-3 text-left text-sm font-semibold text-neutral-900">Status</th>
				<th class="px-6 py-3 text-left text-sm font-semibold text-neutral-900">Last Run</th>
			</tr>
		</thead>
		<tbody class="divide-y divide-neutral-200">
			{#each scenarios as scenario}
				<tr class="hover:bg-neutral-50">
					<td class="px-6 py-4 text-sm text-neutral-900">
						<a href={`/scenarios/${scenario.id}`} class="hover:text-primary-600">{scenario.name}</a>
					</td>
					<td class="px-6 py-4 text-sm text-neutral-600">{scenario.type}</td>
					<td class="px-6 py-4 text-sm">
						<span
							class={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
							${
								getStatus(scenario) === 'Completed'
									? 'bg-green-100 text-green-800'
									: getStatus(scenario) === 'In Progress'
										? 'bg-yellow-100 text-yellow-800'
										: 'bg-neutral-100 text-neutral-800'
							}`}
						>
							{getStatus(scenario)}
						</span>
					</td>
					<td class="px-6 py-4 text-sm text-neutral-600">
						{formatDistanceToNow(scenario.lastRun, { addSuffix: true })}
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
