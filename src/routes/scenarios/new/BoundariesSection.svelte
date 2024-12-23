<script lang="ts">
	import type { ScenarioVariable } from '$lib/data/scenarioData';

	let { boundaries, showBoundaries, addBoundary, removeBoundary } = $props<{
		boundaries: ScenarioVariable[];
		showBoundaries: boolean;
		addBoundary: () => void;
		removeBoundary: (index: number) => void;
	}>();
</script>

<div class="bg-white shadow-sm ring-1 ring-neutral-900/5 rounded-lg p-6 space-y-6">
	<div class="flex items-center justify-between">
		<label class="inline-flex items-center cursor-pointer">
			<input type="checkbox" bind:checked={showBoundaries} class="mr-2" />
			<span class="text-sm font-medium text-neutral-900"> Define Boundaries? (Optional) </span>
		</label>
	</div>

	{#if showBoundaries}
		<p class="text-sm text-neutral-500">
			Boundaries are constraints that limit your options (e.g., “Budget ≤ $10,000”).
		</p>

		<button type="button" class="btn-secondary" onclick={addBoundary}> + Add Boundary </button>

		{#each boundaries as boundary, i (boundary)}
			<div class="p-4 bg-neutral-50 rounded-lg shadow-sm mt-4">
				<div class="mb-3">
					<label class="block text-xs font-medium text-neutral-600" for="factor_measure">
						Which Factor?
					</label>
					<input
						type="text"
						class="input-field mt-1"
						bind:value={boundary.data.factorMeasure}
						placeholder="e.g. Budget"
						name="factor_measure"
					/>
				</div>

				<div class="grid grid-cols-2 gap-4">
					<div>
						<label class="block text-xs font-medium text-neutral-600" for="condition"
							>Condition</label
						>
						<select class="input-field mt-1" bind:value={boundary.data.condition} name="condition">
							<option value="≥">At least (≥)</option>
							<option value="≤">At most (≤)</option>
							<option value="=">Exactly (=)</option>
						</select>
					</div>
					<div>
						<label class="block text-xs font-medium text-neutral-600" for="threshold"
							>Threshold</label
						>
						<input
							type="text"
							class="input-field mt-1"
							bind:value={boundary.data.threshold}
							placeholder="e.g. 10000"
							name="threshold"
						/>
					</div>
				</div>

				<div class="mt-3">
					<label class="block text-xs font-medium text-neutral-600" for="explanation">
						Why this boundary?
					</label>
					<input
						type="text"
						class="input-field mt-1"
						bind:value={boundary.data.explanation}
						placeholder="e.g. Cannot exceed investor’s limit"
						name="explanation"
					/>
				</div>

				<div class="mt-4 text-right">
					<button type="button" class="text-red-500 text-sm" onclick={() => removeBoundary(i)}>
						Remove Boundary
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
