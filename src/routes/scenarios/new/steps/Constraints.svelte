<script lang="ts">
	import { Plus, X } from 'lucide-svelte';

	interface Props {
		formData: {
			constraints: Array<{ parameter: string; operator: string; value: string }>;
		};
	}

	let { formData = $bindable() }: Props = $props();

	const operators = [
		{ value: '>=', label: 'At least (>=)' },
		{ value: '<=', label: 'At most (<=)' },
		{ value: '=', label: 'Exactly (=)' }
	];

	function addConstraint() {
		formData.constraints = [...formData.constraints, { parameter: '', operator: '>=', value: '' }];
	}

	function removeConstraint(index: number) {
		formData.constraints = formData.constraints.filter((_, i) => i !== index);
	}
</script>

<div>
	<div class="flex items-center justify-between">
		<h3 class="text-lg font-medium text-neutral-900">Scenario Constraints</h3>
		<button type="button" class="btn-secondary" onclick={addConstraint}>
			<Plus class="h-4 w-4 mr-2" /> Add Constraint
		</button>
	</div>

	<div class="space-y-4 mt-4">
		{#each formData.constraints as constraint, index}
			<div class="p-4 bg-neutral-50 rounded-lg shadow-sm">
				<div class="grid grid-cols-3 gap-4">
					<div>
						<label for={`parameter-${index}`} class="block text-sm font-medium text-neutral-900">
							Parameter
						</label>
						<input
							id={`parameter-${index}`}
							type="text"
							bind:value={constraint.parameter}
							class="input-field mt-1"
							placeholder="e.g., Budget"
						/>
					</div>
					<div>
						<label for={`operator-${index}`} class="block text-sm font-medium text-neutral-900">
							Comparison Rule
						</label>
						<select
							id={`operator-${index}`}
							bind:value={constraint.operator}
							class="input-field mt-1"
						>
							{#each operators as operator}
								<option value={operator.value}>{operator.label}</option>
							{/each}
						</select>
					</div>
					<div>
						<label for={`value-${index}`} class="block text-sm font-medium text-neutral-900"
							>Value</label
						>
						<input
							id={`value-${index}`}
							type="text"
							bind:value={constraint.value}
							class="input-field mt-1"
							placeholder="Enter value"
						/>
					</div>
				</div>
				<div class="mt-4 flex justify-end">
					<button
						type="button"
						class="text-neutral-400 hover:text-red-600"
						onclick={() => removeConstraint(index)}
						aria-label="Remove constraint"
					>
						<X class="h-5 w-5" />
					</button>
				</div>
			</div>
		{/each}
	</div>
</div>
