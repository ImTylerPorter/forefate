<script lang="ts">
	import ScenarioForm from './ScenarioForm.svelte';
	import type { ScenarioFormData, ScenarioVariable } from '$lib/types';
	import { page } from '$app/state';
	import { goto } from '$app/navigation';

	let formError = $state('');

	// Deep copy to remove proxies from variables
	function deepUnproxy(obj: ScenarioVariable[] | ScenarioFormData): any {
		return JSON.parse(JSON.stringify(obj));
	}

	// Handle form submission
	async function handleSubmit(formData: ScenarioFormData, variables: ScenarioVariable[]) {
		const realVariables = Array.isArray(variables) ? deepUnproxy(variables) : [];

		const dataToSend = {
			formData,
			variables: realVariables
		};

		console.log('Data to send:', dataToSend);

		try {
			const response = await fetch(`${page.url.pathname}/create`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(dataToSend)
			});

			const result = await response.json();
			if (response.ok) {
				// Redirect to the created scenario's page
				goto(`/scenarios/${result.newScenario.id}`);
			} else {
				formError = 'Failed to create scenario.';
			}
		} catch (err) {
			// Handle network or server errors
			formError = 'Failed to create scenario.';
			console.error('Error submitting form:', err);
		}
	}
</script>

<div class="space-y-6 max-w-4xl mx-auto mt-8 px-4">
	<!-- Display form error if any -->
	{#if formError}
		<div class="text-red-500 text-sm">{formError}</div>
	{/if}

	<!-- Scenario Form -->
	<ScenarioForm onSubmit={handleSubmit} />
</div>
