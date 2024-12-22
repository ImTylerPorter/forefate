<script lang="ts">
	import { Plus, X, Info } from 'lucide-svelte';

	// Define the keys for scenario types
	type ScenarioType = 'businessStrategy' | 'personalDecision' | 'resourceAllocation';

	// Data for scenario types and their parameters
	const scenarioTypeData: Record<
		ScenarioType,
		{
			label: string;
			parameters: Array<{ name: string; type: string; value: string; unit?: string }>;
		}
	> = {
		businessStrategy: {
			label: 'Business Strategy',
			parameters: [
				{ name: 'Budget', type: 'number', value: '', unit: 'USD' },
				{ name: 'Market Size', type: 'number', value: '', unit: 'People' },
				{ name: 'Expected ROI', type: 'percentage', value: '', unit: '%' }
			]
		},
		personalDecision: {
			label: 'Personal Decision',
			parameters: [
				{ name: 'Risk Level', type: 'text', value: 'Low' },
				{ name: 'Time Available', type: 'number', value: '', unit: 'Hours' }
			]
		},
		resourceAllocation: {
			label: 'Resource Allocation',
			parameters: [
				{ name: 'Resources', type: 'number', value: '', unit: 'Items' },
				{ name: 'Deadline', type: 'text', value: '2024-12-31' },
				{ name: 'Costs', type: 'number', value: '', unit: 'USD' }
			]
		}
	};

	// Define the structure for formData
	interface Props {
		formData: {
			type: ScenarioType | '';
			parameters: Array<{
				name: string;
				type: string;
				value: string;
				unit?: string;
			}>;
		};
	}

	let { formData = $bindable() }: Props = $props();

	// Extract types and labels for scenario types
	const scenarioTypes = Object.entries(scenarioTypeData).map(([key, value]) => ({
		key: key as ScenarioType,
		label: value.label
	}));

	// Dynamically update parameters when the scenario type changes
	function updateParametersForType(type: ScenarioType | '') {
		if (type && scenarioTypeData[type]) {
			formData.parameters = scenarioTypeData[type].parameters;
		} else {
			formData.parameters = [];
		}
	}

	// Validation state for parameters
	let errors: { [key: number]: { value?: string } } = {};

	function validateParameter(index: number) {
		const parameter = formData.parameters[index];
		errors[index] = {
			value: parameter.value.trim() === '' ? 'Value is required.' : ''
		};
	}
</script>

<div>
	<!-- Scenario Type Selection -->
	<div>
		<label class="block text-sm font-medium text-neutral-900" for="type"> Scenario Type </label>
		<select
			id="type"
			bind:value={formData.type}
			class="input-field mt-1"
			onchange={() => updateParametersForType(formData.type)}
		>
			<option value="">Select a Scenario Type</option>
			{#each scenarioTypes as { key, label }}
				<option value={key}>{label}</option>
			{/each}
		</select>
	</div>

	<!-- Parameters Section -->
	<div class="space-y-6 mt-4">
		<h3 class="text-lg font-medium text-neutral-900">Scenario Parameters</h3>

		{#if formData.parameters.length === 0}
			<p class="text-sm text-neutral-500">
				No parameters available for this scenario type. Please select a type above.
			</p>
		{:else}
			<div class="space-y-4">
				{#each formData.parameters as parameter, index}
					<div class="p-4 bg-neutral-50 rounded-lg shadow-sm">
						<div class="grid grid-cols-2 gap-4">
							<div>
								<label class="block text-sm font-medium text-neutral-900" for={`name-${index}`}>
									Name
									<span
										class="inline-block ml-1 text-neutral-400 cursor-pointer"
										title="Parameter name for this scenario."
									>
										<Info class="h-4 w-4" />
									</span>
								</label>
								<input
									id={`name-${index}`}
									type="text"
									bind:value={parameter.name}
									class="input-field mt-1"
									disabled
								/>
							</div>
							<div>
								<label class="block text-sm font-medium text-neutral-900" for={`type-${index}`}>
									Type
								</label>
								<select
									id={`type-${index}`}
									bind:value={parameter.type}
									class="input-field mt-1"
									disabled
								>
									<option value={parameter.type}>{parameter.type}</option>
								</select>
							</div>
						</div>

						<div class="grid grid-cols-2 gap-4 mt-4">
							<div>
								<label class="block text-sm font-medium text-neutral-900" for={`value-${index}`}>
									Value
								</label>
								<input
									id={`value-${index}`}
									type="text"
									bind:value={parameter.value}
									class="input-field mt-1"
									placeholder="Enter value"
									onblur={() => validateParameter(index)}
								/>
								{#if errors[index]?.value}
									<p class="text-sm text-red-600 mt-1">{errors[index].value}</p>
								{/if}
							</div>
							<div>
								<label class="block text-sm font-medium text-neutral-900" for={`unit-${index}`}>
									Unit (optional)
								</label>
								<input
									id={`unit-${index}`}
									type="text"
									bind:value={parameter.unit}
									class="input-field mt-1"
									placeholder="e.g., %, $, hrs"
								/>
							</div>
						</div>

						<div class="mt-4 flex justify-end">
							<button
								type="button"
								class="text-neutral-400 hover:text-red-600"
								onclick={() => formData.parameters.splice(index, 1)}
								aria-label="Remove parameter"
							>
								<X class="h-5 w-5" />
							</button>
						</div>
					</div>
				{/each}
			</div>
		{/if}
	</div>
</div>
