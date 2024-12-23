<script lang="ts">
	// Again, destructure from $props() rather than exporting.
	// Make sure to match the names used by the parent.

	let {
		factors, // ScenarioVariable[]
		showFactors, // boolean
		addFactor, // () => void
		removeFactor // (index: number) => void
	} = $props();
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

		<button type="button" class="btn-secondary" on:click={addFactor}> + Add Factor </button>

		{#each factors as factor, i (factor)}
			<div class="p-4 bg-neutral-50 rounded-lg shadow-sm mt-4">
				<div class="mb-3">
					<label class="block text-xs font-medium text-neutral-600">
						What do you want to measure?
					</label>
					<input
						type="text"
						class="input-field mt-1"
						bind:value={factor.data.measure}
						placeholder="e.g. Budget"
					/>
				</div>

				<div class="mb-3">
					<label class="block text-xs font-medium text-neutral-600">
						Why is this factor important?
					</label>
					<input
						type="text"
						class="input-field mt-1"
						bind:value={factor.data.reason}
						placeholder="e.g. We have limited funds"
					/>
				</div>

				<div class="grid grid-cols-2 gap-4">
					<div>
						<label class="block text-xs font-medium text-neutral-600">Value</label>
						<input
							type="text"
							class="input-field mt-1"
							bind:value={factor.data.value}
							placeholder="e.g. 10000"
						/>
					</div>
					<div>
						<label class="block text-xs font-medium text-neutral-600">Unit (Optional)</label>
						<input
							type="text"
							class="input-field mt-1"
							bind:value={factor.data.unit}
							placeholder="e.g. $, %, hrs"
						/>
					</div>
				</div>

				<div class="mt-4 text-right">
					<button type="button" class="text-red-500 text-sm" on:click={() => removeFactor(i)}>
						Remove Factor
					</button>
				</div>
			</div>
		{/each}
	{/if}
</div>
