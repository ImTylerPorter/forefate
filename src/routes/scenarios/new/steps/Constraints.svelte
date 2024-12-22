<script lang="ts">
	import { Plus, X } from 'lucide-svelte';

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

	const operators = ['>=', '<=', '=', '>', '<'];

	function addConstraint() {
		formData.constraints = [...formData.constraints, { parameter: '', operator: '>=', value: '' }];
	}

	function removeConstraint(index: number) {
		formData.constraints = formData.constraints.filter((_, i) => i !== index);
	}
</script>

<div class="space-y-6">
	<div class="flex items-center justify-between">
		<h3 class="text-lg font-medium text-neutral-900">Scenario Constraints</h3>
		<button type="button" class="btn-secondary" onclick={addConstraint}>
			<Plus class="h-4 w-4 mr-2" />
			Add Constraint
		</button>
	</div>

	{#if formData.constraints.length === 0}
		<p class="text-sm text-neutral-500">
			No constraints added yet. Add constraints to define the boundaries of your scenario.
		</p>
	{:else}
		<div class="space-y-4">
			{#each formData.constraints as constraint, index}
				<div class="flex items-start gap-4 p-4 bg-neutral-50 rounded-lg">
					<div class="flex-1 grid grid-cols-3 gap-4">
						<div>
							<label class="block text-sm font-medium text-neutral-900" for="parameter">
								Parameter
							</label>
							<input
								type="text"
								bind:value={constraint.parameter}
								class="input-field mt-1"
								placeholder="Select parameter"
								name="parameter"
							/>
						</div>
						<div>
							<label class="block text-sm font-medium text-neutral-900" for="operator">
								Operator
							</label>
							<select bind:value={constraint.operator} class="input-field mt-1" name="operator">
								{#each operators as op}
									<option value={op}>{op}</option>
								{/each}
							</select>
						</div>
						<div>
							<label class="block text-sm font-medium text-neutral-900" for="value"> Value </label>
							<input
								type="text"
								bind:value={constraint.value}
								class="input-field mt-1"
								placeholder="Constraint value"
								name="value"
							/>
						</div>
					</div>
					<button
						type="button"
						class="text-neutral-400 hover:text-neutral-500"
						onclick={() => removeConstraint(index)}
					>
						<X class="h-5 w-5" />
					</button>
				</div>
			{/each}
		</div>
	{/if}
</div>
