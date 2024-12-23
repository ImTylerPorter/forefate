<script lang="ts">
	let {
		boundaries, // ScenarioVariable[]
		showBoundaries, // boolean
		addBoundary, // () => void
		removeBoundary // (index: number) => void
	} = $props();
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

		<button type="button" class="btn-secondary" on:click={addBoundary}> + Add Boundary </button>

		{#each boundaries as boundary, i (boundary)}
			<div class="p-4 bg-neutral-50 rounded-lg shadow-sm mt-4">
				<div class="mb-3">
					<label class="block text-xs font-medium text-neutral-600"> Which Factor? </label>
					<input
						type="text"
						class="input-field mt-1"
						bind:value={boundary.data.factorMeasure}
						placeholder="e.g. Budget"
					/>
				</div>

				<div class="grid grid-cols-2 gap-4">
					<div>
						<label class="block text-xs font-medium text-neutral-600">Condition</label>
						<select class="input-field mt-1" bind:value={boundary.data.condition}>
							<option value="≥">At least (≥)</option>
							<option value="≤">At most (≤)</option>
							<option value="=">Exactly (=)</option>
						</select>
					</div>
					<div>
						<label class="block text-xs font-medium text-neutral-600">Threshold</label>
						<input
							type="text"
							class="input-field mt-1"
							bind:value={boundary.data.threshold}
							placeholder="e.g. 10000"
						/>
					</div>
				</div>

				<div class="mt-3">
					<label class="block text-xs font-medium text-neutral-600"> Why this boundary? </label>
					<input
						type="text"
						class="input-field mt-1"
						bind:value={boundary.data.explanation}
						placeholder="e.g. Cannot exceed investor’s limit"
					/>
				</div>

				<div class="mt-4 text-right">
					<button type="button" class="text-red-500 text-sm" on:click={() => removeBoundary(i)}>
						Remove Boundary
					</button>
				</div>
			</div>
		{/each}
	{/if}
</div>
