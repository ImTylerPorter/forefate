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

	let errors = { name: '', type: '', description: '' };

	function validate() {
		errors.name = formData.name.trim() === '' ? 'Name is required' : '';
		errors.type = formData.type === '' ? 'Type is required' : '';
		errors.description = formData.description.trim() === '' ? 'Description is required' : '';
	}
</script>

<div class="space-y-6">
	<div>
		<label for="name" class="block text-sm font-medium text-neutral-900">
			Scenario Name
			<span
				class="ml-1 text-neutral-400 cursor-pointer"
				title="Provide a unique name to identify your scenario."
			>
				<i class="fas fa-question-circle"></i>
			</span>
		</label>
		<input
			type="text"
			id="name"
			bind:value={formData.name}
			class="input-field mt-1"
			placeholder="Enter a descriptive name"
			onblur={validate}
		/>
		{#if errors.name}
			<p class="text-sm text-red-600 mt-1">{errors.name}</p>
		{/if}
	</div>

	<div>
		<label for="type" class="block text-sm font-medium text-neutral-900"> Type </label>
		<select id="type" bind:value={formData.type} class="input-field mt-1" onblur={validate}>
			<option value="">Select a type</option>
			{#each scenarioTypes as type}
				<option value={type}>{type}</option>
			{/each}
		</select>
		{#if errors.type}
			<p class="text-sm text-red-600 mt-1">{errors.type}</p>
		{/if}
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
			onblur={validate}
		></textarea>
		{#if errors.description}
			<p class="text-sm text-red-600 mt-1">{errors.description}</p>
		{/if}
	</div>
</div>
