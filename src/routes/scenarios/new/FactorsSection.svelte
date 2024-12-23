<script lang="ts">
	import type { ScenarioVariable } from '$lib/data/scenarioData';

	let { factors, showFactors, addFactor, removeFactor } = $props<{
		factors: ScenarioVariable[];
		showFactors: boolean;
		addFactor: () => void;
		removeFactor: (index: number) => void;
	}>();
</script>

<div class="bg-white shadow-sm ring-1 ring-neutral-900/5 rounded-lg p-6 space-y-6">
	<div class="flex items-center justify-between">
		<label class="inline-flex items-center cursor-pointer">
			<input type="checkbox" bind:checked={showFactors} class="mr-2" />
			<span class="text-sm font-medium text-neutral-900"> Define Key Factors? (Optional) </span>
		</label>
	</div>

	{#if showFactors}
		<p class="text-sm text-neutral-500">
			Key Factors are important inputs that influence your scenario (e.g., Budget, Time Commitment).
		</p>

		<button type="button" class="btn-secondary" onclick={addFactor}> + Add Factor </button>

		{#each factors as factor, i (factor)}
			<div class="p-4 bg-neutral-50 rounded-lg shadow-sm mt-4">
				<div class="mb-3">
					<label class="block text-xs font-medium text-neutral-600" for="measure">
						What do you want to measure?
					</label>
					<input
						type="text"
						class="input-field mt-1"
						bind:value={factor.data.measure}
						placeholder="e.g. Budget"
						name="measure"
					/>
				</div>

				<div class="mb-3">
					<label class="block text-xs font-medium text-neutral-600" for="reason">
						Why is this factor important?
					</label>
					<input
						type="text"
						class="input-field mt-1"
						bind:value={factor.data.reason}
						placeholder="e.g. We have limited funds"
						name="reason"
					/>
				</div>

				<div class="grid grid-cols-2 gap-4">
					<div>
						<label class="block text-xs font-medium text-neutral-600" for="value">Value</label>
						<input
							type="text"
							class="input-field mt-1"
							bind:value={factor.data.value}
							placeholder="e.g. 10000"
							name="value"
						/>
					</div>
					<div>
						<label class="block text-xs font-medium text-neutral-600" for="unit"
							>Unit (Optional)</label
						>
						<input
							type="text"
							class="input-field mt-1"
							bind:value={factor.data.unit}
							placeholder="e.g. $, %, hrs"
							name="unit"
						/>
					</div>
				</div>

				<div class="mt-4 text-right">
					<button type="button" class="text-red-500 text-sm" onclick={() => removeFactor(i)}>
						Remove Factor
					</button>
				</div>
			</div>
		{/each}
	{/if}
</div>

<style lang="postcss">
	.input-field {
		@apply w-full border border-neutral-300 rounded-md px-3 py-2;
	}
</style>
