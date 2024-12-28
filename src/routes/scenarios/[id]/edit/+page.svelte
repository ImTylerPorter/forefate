<script lang="ts">
	import ScenarioForm from '$lib/components/scenarios/ScenarioForm.svelte';
	import { goto } from '$app/navigation';
	import type { ScenarioFormData, ScenarioVariable } from '$lib/types';

	let { data } = $props();
	let formError = $state('');

	async function handleSubmit(formData: ScenarioFormData, variables: ScenarioVariable[]) {
		const dataToSend = {
			formData,
			variables
		};

		try {
			const response = await fetch(`/api/scenarios/${data.scenario.id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(dataToSend)
			});

			if (response.ok) {
				goto(`/scenarios/${data.scenario.id}`);
			} else {
				formError = 'Failed to update scenario.';
			}
		} catch (err) {
			formError = 'Failed to update scenario.';
			console.error('Error submitting form:', err);
		}
	}
</script>

<div class="space-y-6 max-w-4xl mx-auto mt-8 px-4">
	{#if formError}
		<div class="text-red-500 text-sm">{formError}</div>
	{/if}

	<ScenarioForm scenario={data.scenario} variables={data.variables} onSubmit={handleSubmit} />
</div>
