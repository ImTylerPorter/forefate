<script lang="ts">
	import { SCENARIO_TYPES } from '$lib/data/scenarioData';
	import BasicInfo from './BasicInfo.svelte';
	import type { ScenarioFormData, ScenarioVariable } from '$lib/types';
	import { RECOMMENDED_FIELDS } from '$lib/data/scenarioData';

	let {
		scenario,
		variables: existingVariables,
		onSubmit
	} = $props<{
		scenario?: ScenarioFormData;
		variables?: ScenarioVariable[];
		onSubmit: (formData: ScenarioFormData, variables: ScenarioVariable[]) => void;
	}>();

	// Initialize formData with scenario data if it exists, otherwise use defaults
	let formData: ScenarioFormData = scenario ?? {
		name: '',
		type: '',
		description: ''
	};

	// Initialize variables with existing ones if they exist
	let variables = $state<ScenarioVariable[]>(existingVariables ?? []);

	// Initialize advancedSettingsVisible based on variables
	let advancedSettingsVisible = $state<boolean[]>(
		(existingVariables ?? []).map(
			(variable: ScenarioVariable) =>
				variable.type === 'boundary' ||
				!!(variable.value.condition || variable.value.threshold || variable.value.explanation)
		)
	);

	function addVariable() {
		variables = [
			...variables,
			{
				id: '',
				scenario_id: '',
				name: '',
				type: 'factor',
				value: {
					measure: '',
					reason: '',
					unit: '',
					condition: '',
					threshold: '',
					explanation: ''
				},
				created_at: new Date(),
				updated_at: new Date()
			}
		];
		advancedSettingsVisible = [...advancedSettingsVisible, false];
	}

	function removeVariable(index: number) {
		variables = variables.filter((_, i) => i !== index);
		advancedSettingsVisible = advancedSettingsVisible.filter((_, i) => i !== index);
	}

	function toggleAdvancedSettings(index: number) {
		advancedSettingsVisible[index] = !advancedSettingsVisible[index];
	}

	function handleSubmit() {
		onSubmit(formData, variables);
	}

	function prefillVariables(type: string) {
		if (!type) {
			variables = [];
			advancedSettingsVisible = [];
			return;
		}

		// Only prefill if we don't have existing variables
		if (!existingVariables) {
			const recommendedFields: ScenarioVariable[] =
				RECOMMENDED_FIELDS[type as keyof typeof RECOMMENDED_FIELDS] || [];
			variables = [...recommendedFields];
			advancedSettingsVisible = variables.map((variable) => {
				// Show advanced settings if it's a boundary type or has any advanced fields filled
				return (
					variable.type === 'boundary' ||
					!!(variable.value.condition || variable.value.threshold || variable.value.explanation)
				);
			});
		}
	}
</script>

<div class="space-y-6 max-w-3xl mx-auto mt-8 px-4">
	<!-- Header -->
	<div class="border-b border-neutral-200 pb-4">
		<h1 class="text-2xl font-semibold text-neutral-900">
			{scenario ? 'Edit Scenario' : 'Create a New Scenario'}
		</h1>
	</div>

	<!-- Basic Info Section -->
	<BasicInfo {formData} {SCENARIO_TYPES} onPrefill={prefillVariables} />

	<!-- Variables Section -->
	<section>
		<h2 class="text-lg font-medium text-neutral-900">Scenario Variables</h2>

		<div class="mt-4 space-y-4">
			{#each variables as variable, i}
				<div class="bg-neutral-50 rounded-lg p-4 shadow-sm space-y-3">
					<!-- Basic Inputs -->
					<div class="grid grid-cols-2 gap-4">
						<div>
							<label class="block text-sm font-medium text-neutral-900" for="measure">Measure</label
							>
							<input
								type="text"
								bind:value={variable.value.measure}
								class="input-field"
								placeholder="e.g. Budget"
								name="measure"
							/>
						</div>
						<div>
							<label class="block text-sm font-medium text-neutral-900" for="unit">Unit</label>
							<input
								type="text"
								bind:value={variable.value.unit}
								class="input-field"
								placeholder="e.g. $"
								name="unit"
							/>
						</div>
					</div>

					<div class="grid grid-cols-2 gap-4">
						<div>
							<label class="block text-sm font-medium text-neutral-900" for="value">Value</label>
							<input
								type="text"
								bind:value={variable.value.value}
								class="input-field"
								placeholder="e.g. 10000"
								name="value"
							/>
						</div>
						<div>
							<label class="block text-sm font-medium text-neutral-900" for="reason">Reason</label>
							<input
								type="text"
								bind:value={variable.value.reason}
								class="input-field"
								placeholder="e.g. Limited funds"
								name="reason"
							/>
						</div>
					</div>

					<!-- Toggleable Advanced Settings -->
					<div>
						<button
							type="button"
							class="text-sm text-blue-600 underline"
							onclick={() => toggleAdvancedSettings(i)}
						>
							{advancedSettingsVisible[i] ? 'Hide Advanced Settings' : 'Show Advanced Settings'}
						</button>

						{#if advancedSettingsVisible[i]}
							<div class="mt-4 space-y-3">
								<div class="grid grid-cols-2 gap-4">
									<div>
										<label class="block text-sm font-medium text-neutral-900" for="condition"
											>Condition</label
										>
										<select
											bind:value={variable.value.condition}
											class="input-field"
											name="condition"
										>
											<option value="">--</option>
											<option value="≥">≥</option>
											<option value="≤">≤</option>
											<option value="=">=</option>
										</select>
									</div>
									<div>
										<label class="block text-sm font-medium text-neutral-900" for="threshold"
											>Threshold</label
										>
										<input
											type="text"
											bind:value={variable.value.threshold}
											class="input-field"
											placeholder="e.g. 10000"
											name="threshold"
										/>
									</div>
								</div>

								<div>
									<label class="block text-sm font-medium text-neutral-900" for="explanation"
										>Explanation</label
									>
									<input
										type="text"
										bind:value={variable.value.explanation}
										class="input-field"
										placeholder="e.g. Investor's limit"
										name="explanation"
									/>
								</div>
							</div>
						{/if}
					</div>

					<!-- Remove Variable -->
					<div>
						<button type="button" class="text-red-500 text-sm" onclick={() => removeVariable(i)}>
							Remove
						</button>
					</div>
				</div>
			{/each}

			<button type="button" onclick={addVariable} class="btn-secondary w-full">
				+ Add Variable
			</button>
		</div>
	</section>

	<!-- Submit Button -->
	<div class="bg-white shadow-md ring-1 ring-neutral-900/5 rounded-lg p-6">
		<button type="button" class="btn-primary w-full" onclick={handleSubmit}>
			{scenario ? 'Save Changes' : 'Create Scenario'}
		</button>
	</div>
</div>

<style lang="postcss">
	.input-field {
		@apply w-full border border-neutral-300 rounded-md px-3 py-2;
	}
	.btn-secondary {
		@apply px-4 py-2 border border-neutral-300 rounded-md bg-neutral-100 hover:bg-neutral-200;
	}
	.btn-primary {
		@apply px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600;
	}
</style>
