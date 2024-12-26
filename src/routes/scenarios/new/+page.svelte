<script lang="ts">
	import ScenarioForm from './ScenarioForm.svelte';
	import type { ScenarioFormData, ScenarioVariable } from '$lib/data/scenarioData';
	import type { AnyARecord } from 'dns';
	import { page } from '$app/state';
	import { goto } from '$app/navigation';

	let formError = $state('');

	function deepUnproxy(obj: ScenarioVariable[] | ScenarioFormData): AnyARecord {
		return JSON.parse(JSON.stringify(obj));
	}
	async function handleSubmit(
		formData: ScenarioFormData,
		factors: ScenarioVariable[],
		boundaries: ScenarioVariable[]
	) {
		const realFactors = Array.isArray(factors) ? deepUnproxy(factors) : [];
		const realBoundaries = Array.isArray(boundaries) ? deepUnproxy(boundaries) : [];

		const dataToSend = {
			formData,
			factors: realFactors,
			boundaries: realBoundaries
		};

		try {
			const response = await fetch(`${page.url.pathname}/create`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(dataToSend)
			});

			const result = await response.json();
			// Handle your response here, e.g., update UI or show feedback
			if (response.ok) {
				goto(`/scenarios/${result.newScenario.id}`);
			} else {
				formError = 'Failed to create scenario';
			}
		} catch (err) {
			// Handle errors, e.g., network issues
			formError = 'Failed to create scenario';
		}
	}
</script>

<ScenarioForm onSubmit={handleSubmit} />
