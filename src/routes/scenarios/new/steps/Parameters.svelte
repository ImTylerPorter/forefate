<script lang="ts">
	import { Plus, X } from 'lucide-svelte';

	interface Props {
		formData: {
			type: string;
			parameters: Array<{
				name: string;
				type: string;
				value: string;
				unit?: string;
			}>;
		};
	}

	let { formData = $bindable() }: Props = $props();

	let errors: { [key: number]: { value?: string } } = {};

	function validateParameter(index: number) {
		const parameter = formData.parameters[index];
		errors[index] = {
			value: parameter.value.trim() === '' ? 'Value is required.' : ''
		};
	}

	function addParameter() {
		formData.parameters = [...formData.parameters, { name: '', type: 'text', value: '', unit: '' }];
	}

	function removeParameter(index: number) {
		formData.parameters = formData.parameters.filter((_, i) => i !== index);
	}
</script>

<div class="space-y-6">
	<div class="flex items-center justify-between">
		<h3 class="text-lg font-medium text-neutral-900">Scenario Parameters</h3>
		<button type="button" class="btn-secondary" onclick={addParameter}>
			<Plus class="h-4 w-4 mr-2" /> Add Parameter
		</button>
	</div>

	{#if formData.parameters.length === 0}
		<p class="text-sm text-neutral-500">
			No parameters added yet. Add parameters to define the specifics of your scenario.
		</p>
	{:else}
		<div class="space-y-4">
			{#each formData.parameters as parameter, index}
				<div class="p-4 bg-neutral-50 rounded-lg shadow-sm">
					<div class="grid grid-cols-2 gap-4">
						<div>
							<label for={`name-${index}`} class="block text-sm font-medium text-neutral-900">
								Name
							</label>
							<input
								id={`name-${index}`}
								type="text"
								bind:value={parameter.name}
								class="input-field mt-1"
								placeholder="Parameter name"
							/>
						</div>
						<div>
							<label for={`type-${index}`} class="block text-sm font-medium text-neutral-900"
								>Type</label
							>
							<select id={`type-${index}`} bind:value={parameter.type} class="input-field mt-1">
								<option value="text">Text</option>
								<option value="number">Number</option>
								<option value="percentage">Percentage</option>
							</select>
						</div>
					</div>
					<div class="grid grid-cols-2 gap-4 mt-4">
						<div>
							<label for={`value-${index}`} class="block text-sm font-medium text-neutral-900">
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
							<label for={`unit-${index}`} class="block text-sm font-medium text-neutral-900"
								>Unit</label
							>
							<input
								id={`unit-${index}`}
								type="text"
								bind:value={parameter.unit}
								class="input-field mt-1"
								placeholder="Optional (e.g., %, $, hrs)"
							/>
						</div>
					</div>
					<div class="mt-4 flex justify-end">
						<button
							type="button"
							class="text-neutral-400 hover:text-red-600"
							onclick={() => removeParameter(index)}
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
