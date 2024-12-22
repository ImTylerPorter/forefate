<script lang="ts">
	import ScenarioCard from './ScenarioCard.svelte';
	import type { Scenario } from '$lib/types';

	const { scenarios } = $props<{ scenarios: Scenario[] }>();
</script>

<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
	{#each scenarios as scenario (scenario.id)}
		<ScenarioCard {scenario} />
	{/each}
</div>
