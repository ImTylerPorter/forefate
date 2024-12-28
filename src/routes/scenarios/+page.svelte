<script lang="ts">
	import type { Scenario } from '$lib/types';
	import { Plus } from 'lucide-svelte';
	import ScenarioCard from '$lib/components/scenarios/ScenarioCard.svelte';

	let { data } = $props();
	const { scenarios } = data;
</script>

<div class="space-y-8">
	<div class="flex items-center justify-between">
		<div>
			<h2
				class="text-2xl font-bold leading-7 text-neutral-900 sm:truncate sm:text-3xl sm:tracking-tight"
			>
				Scenarios
			</h2>
			<p class="mt-2 text-lg text-neutral-600">Create and manage your decision scenarios</p>
		</div>
		<a
			href="/scenarios/new"
			class="inline-flex items-center gap-x-2 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
		>
			<Plus class="h-5 w-5" />
			New Scenario
		</a>
	</div>

	<!-- Scenarios Grid -->
	<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
		{#each scenarios as scenario (scenario.id)}
			<ScenarioCard {scenario} />
		{/each}
	</div>
</div>
