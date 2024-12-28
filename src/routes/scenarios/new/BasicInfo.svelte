<script lang="ts">
	let { formData, SCENARIO_TYPES, onPrefill } = $props();

	let formDataState = $state({
		...formData
	});

	function handleTypeChange(event: Event) {
		formDataState.type = (event.target as HTMLSelectElement).value;
		onPrefill(formDataState.type);
	}
</script>

<!-- Basic Info Card -->
<div class="bg-white shadow-md ring-1 ring-neutral-900/5 rounded-lg p-6 space-y-4">
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
