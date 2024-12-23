<script lang="ts">
	// Instead of export let formData, etc., we destructure from $props().

	let {
		formData,
		SCENARIO_TYPES,
		RECOMMENDED_FACTORS,
		RECOMMENDED_BOUNDARIES,
		addRecommendedFactors,
		addRecommendedBoundaries
	} = $props();
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
		<select id="scenario-type" class="input-field mt-1" bind:value={formData.type}>
			<option value="">-- Select a Scenario Type --</option>
			{#each SCENARIO_TYPES as scenarioType}
				<option value={scenarioType}>{scenarioType}</option>
			{/each}
		</select>

		{#if formData.type && (RECOMMENDED_FACTORS[formData.type] || RECOMMENDED_BOUNDARIES[formData.type])}
			<div class="flex gap-3 mt-2">
				{#if RECOMMENDED_FACTORS[formData.type]}
					<button
						type="button"
						class="text-blue-600 text-sm underline"
						onclick={addRecommendedFactors}
					>
						+ Add recommended factors
					</button>
				{/if}
				{#if RECOMMENDED_BOUNDARIES[formData.type]}
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
