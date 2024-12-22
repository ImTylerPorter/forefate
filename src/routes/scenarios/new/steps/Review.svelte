<script lang="ts">
	interface Props {
		formData: {
			name: string;
			description: string;
			type: string;
			parameters: Array<{ name: string; type: string; value: string; unit?: string }>;
			constraints: Array<{ parameter: string; operator: string; value: string }>;
		};
	}

	let { formData }: Props = $props();
</script>

<div class="space-y-6">
	<h3 class="text-lg font-medium text-neutral-900">Review Your Scenario</h3>

	<section>
		<h4 class="font-medium text-neutral-900">Basic Information</h4>
		<dl class="mt-4 space-y-2">
			<div>
				<dt class="text-sm font-medium text-neutral-500">Name</dt>
				<dd class="text-sm text-neutral-900">{formData.name}</dd>
			</div>
			<div>
				<dt class="text-sm font-medium text-neutral-500">Type</dt>
				<dd class="text-sm text-neutral-900">{formData.type}</dd>
			</div>
			<div>
				<dt class="text-sm font-medium text-neutral-500">Description</dt>
				<dd class="text-sm text-neutral-900">{formData.description}</dd>
			</div>
		</dl>
	</section>

	<section>
		<h4 class="font-medium text-neutral-900">Parameters</h4>
		{#each formData.parameters as parameter}
			<div class="mt-2 p-4 bg-neutral-50 rounded-lg shadow-sm">
				<p class="text-sm font-medium text-neutral-900">{parameter.name}</p>
				<p class="text-sm text-neutral-500">{parameter.value} {parameter.unit}</p>
			</div>
		{/each}
	</section>

	<section>
		<h4 class="font-medium text-neutral-900">Constraints</h4>
		{#each formData.constraints as constraint}
			<div class="mt-2 p-4 bg-neutral-50 rounded-lg shadow-sm">
				<p class="text-sm font-medium text-neutral-900">
					{constraint.parameter}
					{constraint.operator}
					{constraint.value}
				</p>
			</div>
		{/each}
	</section>
</div>
