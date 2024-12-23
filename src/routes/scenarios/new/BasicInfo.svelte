<script lang="ts">
	let {
		formData,
		SCENARIO_TYPES,
		RECOMMENDED_FACTORS,
		RECOMMENDED_BOUNDARIES,
		onAddRecommendedFactors,
		onAddRecommendedBoundaries
	} = $props();

	function addRecommendedFactors() {
		onAddRecommendedFactors(formDataState.type);
	}

	function addRecommendedBoundaries() {
		onAddRecommendedBoundaries(formDataState.type);
	}

	let formDataState = $state({
		...formData
	});

	function handleTypeChange(event: Event) {
		formDataState.type = (event.target as HTMLSelectElement).value;
	}
</script>

<!-- Basic Info Card -->
<div class="bg-white shadow-sm ring-1 ring-neutral-900/5 rounded-lg p-6 space-y-4">
	<div>
		<label class="block text-sm font-medium text-neutral-900" for="scenario-name">
			Scenario Name
		</label>
		<input
			id="scenario-name"
			class="input-field mt-1"
			type="text"
			bind:value={formData.name}
			placeholder="e.g. Launch New Service"
		/>
	</div>

	<div>
		<label class="block text-sm font-medium text-neutral-900" for="scenario-type">
			Scenario Type
		</label>
		<select
			id="scenario-type"
			class="input-field mt-1"
			bind:value={formData.type}
			onchange={handleTypeChange}
		>
			<option value="">-- Select a Scenario Type --</option>
			{#each SCENARIO_TYPES as scenarioType}
				<option value={scenarioType}>{scenarioType}</option>
			{/each}
		</select>

		{#if formDataState.type && (RECOMMENDED_FACTORS[formDataState.type] || RECOMMENDED_BOUNDARIES[formDataState.type])}
			<div class="flex gap-3 mt-2">
				{#if RECOMMENDED_FACTORS[formDataState.type]}
					<button
						type="button"
						class="text-blue-600 text-sm underline"
						onclick={addRecommendedFactors}
					>
						+ Add recommended factors
					</button>
				{/if}
				{#if RECOMMENDED_BOUNDARIES[formDataState.type]}
					<button
						type="button"
						class="text-blue-600 text-sm underline"
						onclick={addRecommendedBoundaries}
					>
						+ Add recommended boundaries
					</button>
				{/if}
			</div>
		{/if}
	</div>

	<div>
		<label class="block text-sm font-medium text-neutral-900" for="scenario-description">
			Description
		</label>
		<textarea
			id="scenario-description"
			rows="3"
			class="input-field mt-1"
			bind:value={formData.description}
			placeholder="Briefly describe the main goal or question..."
		></textarea>
	</div>
</div>

<style lang="postcss">
	.input-field {
		@apply w-full border border-neutral-300 rounded-md px-3 py-2;
	}
</style>
