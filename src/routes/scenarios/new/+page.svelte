<script lang="ts">
	import ScenarioForm from './ScenarioForm.svelte';
	import type { ScenarioFormData, ScenarioVariable } from '$lib/data/scenarioData';
	import type { AnyARecord } from 'dns';

	function deepUnproxy(obj: ScenarioVariable[] | ScenarioFormData): AnyARecord {
		return JSON.parse(JSON.stringify(obj));
	}
	function handleSubmit(
		formData: ScenarioFormData,
		factors: ScenarioVariable[],
		boundaries: ScenarioVariable[]
	) {
		// Convert Proxy arrays to regular arrays
		const realFactors = Array.isArray(factors) ? deepUnproxy(factors) : [];
		const realBoundaries = Array.isArray(boundaries) ? deepUnproxy(boundaries) : [];

		console.log('Form data:', formData);
		console.log('Factors:', realFactors);
		console.log('Boundaries:', realBoundaries);

		// Here you would have access to the actual data within the Proxy objects
		// Proceed with any operations like database insertion or API calls
		alert(`Scenario "${formData.name}" created successfully!`);
	}
</script>

<ScenarioForm onSubmit={handleSubmit} />
