<script lang="ts">
	import { Plus, X } from 'lucide-svelte';

	interface Props {
		formData: {
		parameters: Array<{
			name: string;
			type: string;
			value: string;
			unit?: string;
		}>;
	};
	}

	let { formData = $bindable() }: Props = $props();

	const parameterTypes = ['number', 'percentage', 'text', 'boolean'];

	function addParameter() {
		formData.parameters = [
			...formData.parameters,
			{ name: '', type: 'number', value: '', unit: '' }
		];
	}

	function removeParameter(index: number) {
		formData.parameters = formData.parameters.filter((_, i) => i !== index);
	}
</script>

<div class="space-y-6">
	<div class="flex items-center justify-between">
		<h3 class="text-lg font-medium text-neutral-900">Scenario Parameters</h3>
		<button type="button" class="btn-secondary" onclick={addParameter}>
			<Plus class="h-4 w-4 mr-2" />
			Add Parameter
		</button>
	</div>

	{#if formData.parameters.length === 0}
		<p class="text-sm text-neutral-500">
			No parameters added yet. Add parameters to define your scenario variables.
		</p>
	{:else}
		<div class="space-y-4">
			{#each formData.parameters as parameter, index}
				<div class="flex items-start gap-4 p-4 bg-neutral-50 rounded-lg">
					<div class="flex-1 space-y-4">
						<div class="grid grid-cols-2 gap-4">
							<div>
								<label class="block text-sm font-medium text-neutral-900" for="name"> Name </label>
								<input
									type="text"
									bind:value={parameter.name}
									class="input-field mt-1"
									placeholder="Parameter name"
									name="name"
								/>
							</div>
							<div>
								<label class="block text-sm font-medium text-neutral-900" for="type"> Type </label>
								<select bind:value={parameter.type} class="input-field mt-1" name="type">
									{#each parameterTypes as type}
										<option value={type}>{type}</option>
									{/each}
								</select>
							</div>
						</div>
						<div class="grid grid-cols-2 gap-4">
							<div>
								<label class="block text-sm font-medium text-neutral-900" for="value">
									Value
								</label>
								<input
									type="text"
									bind:value={parameter.value}
									class="input-field mt-1"
									placeholder="Initial value"
									name="value"
								/>
							</div>
							<div>
								<label class="block text-sm font-medium text-neutral-900" for="unit">
									Unit (optional)
								</label>
								<input
									type="text"
									bind:value={parameter.unit}
									class="input-field mt-1"
									placeholder="e.g., %, $, hrs"
									name="unit"
								/>
							</div>
						</div>
					</div>
					<button
						type="button"
						class="text-neutral-400 hover:text-neutral-500"
						onclick={() => removeParameter(index)}
					>
						<X class="h-5 w-5" />
					</button>
				</div>
			{/each}
		</div>
	{/if}
</div>
