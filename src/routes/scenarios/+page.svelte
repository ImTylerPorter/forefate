<script lang="ts">
	import ScenarioList from './ScenarioList.svelte';
	import NewScenarioButton from './NewScenarioButton.svelte';
	import type { Scenario } from '$lib/types';

	let scenarios: Scenario[] = [
		{
			id: 1,
			name: 'Market Expansion Strategy',
			description: 'Analysis of potential market expansion into APAC region',
			type: 'Business',
			status: 'In Progress',
			lastRun: '2024-01-10T14:30:00Z',
			confidence: 78
		},
		{
			id: 2,
			name: 'Q2 Resource Planning',
			description: 'Resource allocation simulation for Q2 2024',
			type: 'Operations',
			status: 'Draft',
			lastRun: null,
			confidence: null
		}
	];
</script>

<div class="space-y-6">
	<div class="flex items-center justify-between">
		<div>
			<h1 class="text-2xl font-semibold text-neutral-900">Scenarios</h1>
			<p class="mt-1 text-sm text-neutral-500">Create and manage your decision scenarios</p>
		</div>
		<NewScenarioButton />
	</div>

	<ScenarioList {scenarios} />
</div>
