<script lang="ts">
	import { Plus, X, Info } from 'lucide-svelte';

	interface Props {
		formData: {
			constraints: Array<{
				parameter: string;
				operator: string;
				value: string;
			}>;
		};
	}

	let { formData = $bindable() }: Props = $props();

	const operators = [
		{ value: '>=', label: 'At least (>=)' },
		{ value: '<=', label: 'At most (<=)' },
		{ value: '=', label: 'Exactly (=)' },
		{ value: '>', label: 'Greater than (>)' },
		{ value: '<', label: 'Less than (<)' }
	];

	let isExpanded = $state(true);
	// Validation state
	let errors: { [key: number]: { parameter?: string; value?: string } } = {};

	function addConstraint() {
		formData.constraints = [...formData.constraints, { parameter: '', operator: '>=', value: '' }];
	}

	function removeConstraint(index: number) {
		formData.constraints = formData.constraints.filter((_, i) => i !== index);
	}

	function validateConstraint(index: number) {
		const constraint = formData.constraints[index];
		errors[index] = {
			parameter: constraint.parameter.trim() === '' ? 'Parameter is required.' : '',
			value: constraint.value.trim() === '' ? 'Value is required.' : ''
		};
	}

	const parameterExamples = ['Budget', 'Time Available', 'Resource Limit'];
</script>

<div>
	<button type="button" class="btn-secondary" onclick={() => (isExpanded = !isExpanded)}>
		{isExpanded ? 'Hide Constraints' : 'Show Constraints'}
	</button>

	{#if isExpanded}
		<div class="space-y-6 mt-4">
			<div class="flex items-center justify-between">
				<h3 class="text-lg font-medium text-neutral-900">Scenario Constraints</h3>
				<button type="button" class="btn-secondary" onclick={addConstraint}>
					<Plus class="h-4 w-4 mr-2" />
					Add Constraint
				</button>
			</div>

			<div>
				<p class="text-sm text-neutral-500">
					Constraints define the boundaries of your scenario. For example, you can set
					<strong>"Budget must not exceed $200,000"</strong>.
				</p>
			</div>

			{#if formData.constraints.length === 0}
				<p class="text-sm text-neutral-500">
					No constraints added yet. Add constraints to define the boundaries of your scenario.
				</p>
			{:else}
				<div class="space-y-4">
					{#each formData.constraints as constraint, index}
						<div class="p-4 bg-neutral-50 rounded-lg shadow-sm">
							<div class="grid grid-cols-3 gap-4 items-start">
								<div>
									<label
										class="block text-sm font-medium text-neutral-900"
										for={`parameter-${index}`}
									>
										Parameter
										<span
											class="inline-block ml-1 text-neutral-400 cursor-pointer"
											title="Example: 'Budget', 'Time Available', etc."
										>
											<Info class="h-4 w-4" />
										</span>
									</label>
									<input
										id={`parameter-${index}`}
										type="text"
										bind:value={constraint.parameter}
										class="input-field mt-1"
										placeholder="e.g., Budget"
										onblur={() => validateConstraint(index)}
									/>
									{#if errors[index]?.parameter}
										<p class="text-sm text-red-600 mt-1">{errors[index].parameter}</p>
									{/if}
									<p class="text-xs text-neutral-500 mt-1">
										Examples: {parameterExamples.join(', ')}
									</p>
								</div>

								<div>
									<label
										class="block text-sm font-medium text-neutral-900"
										for={`operator-${index}`}
									>
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
									<label class="block text-sm font-medium text-neutral-900" for={`value-${index}`}>
										Value
									</label>
									<input
										id={`value-${index}`}
										type="text"
										bind:value={constraint.value}
										class="input-field mt-1"
										placeholder="e.g., 1000"
										onblur={() => validateConstraint(index)}
									/>
									{#if errors[index]?.value}
										<p class="text-sm text-red-600 mt-1">{errors[index].value}</p>
									{/if}
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
			{/if}
		</div>
	{/if}
</div>
