<script lang="ts">
	import ScenarioForm from './ScenarioForm.svelte';
	import type { ScenarioFormData, ScenarioVariable } from '$lib/data/scenarioData';

	function handleSubmit(
		formData: ScenarioFormData,
		factors: ScenarioVariable[],
		boundaries: ScenarioVariable[]
	) {
		console.log('Form data:', formData);
		console.log('Factors:', factors);
		console.log('Boundaries:', boundaries);

		// Put your DB insert + OpenAI calls here, or pass them on to a SvelteKit action.
		alert(`Scenario "${formData.name}" created successfully!`);
	}
</script>

<ScenarioForm onSubmit={handleSubmit} />
