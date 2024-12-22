<script lang="ts">
	interface Props {
		formData: {
		name: string;
		description: string;
		type: string;
	};
	}

	let { formData = $bindable() }: Props = $props();

	const scenarioTypes = [
		'Business Strategy',
		'Financial Planning',
		'Resource Allocation',
		'Market Analysis',
		'Risk Assessment',
		'Personal Decision'
	];
</script>

<div class="space-y-6">
	<div>
		<label for="name" class="block text-sm font-medium text-neutral-900"> Scenario Name </label>
		<input
			type="text"
			id="name"
			bind:value={formData.name}
			class="input-field mt-1"
			placeholder="Enter a descriptive name"
		/>
	</div>

	<div>
		<label for="type" class="block text-sm font-medium text-neutral-900"> Type </label>
		<select id="type" bind:value={formData.type} class="input-field mt-1">
			<option value="">Select a type</option>
			{#each scenarioTypes as type}
				<option value={type}>{type}</option>
			{/each}
		</select>
	</div>

	<div>
		<label for="description" class="block text-sm font-medium text-neutral-900">
			Description
		</label>
		<textarea
			id="description"
			bind:value={formData.description}
			rows="4"
			class="input-field mt-1"
			placeholder="Describe your scenario and its objectives"
		></textarea>
	</div>
</div>
