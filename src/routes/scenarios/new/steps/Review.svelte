<script lang="ts">
	interface Props {
		formData: {
		name: string;
		description: string;
		type: string;
		parameters: Array<{
			name: string;
			type: string;
			value: string;
			unit?: string;
		}>;
		constraints: Array<{
			parameter: string;
			operator: string;
			value: string;
		}>;
	};
	}

	let { formData }: Props = $props();
</script>

<div class="space-y-8">
	<div>
		<h3 class="font-medium text-neutral-900">Basic Information</h3>
		<dl class="mt-4 space-y-4">
			<div>
				<dt class="text-sm font-medium text-neutral-500">Name</dt>
				<dd class="mt-1 text-sm text-neutral-900">{formData.name}</dd>
			</div>
			<div>
				<dt class="text-sm font-medium text-neutral-500">Type</dt>
				<dd class="mt-1 text-sm text-neutral-900">{formData.type}</dd>
			</div>
			<div>
				<dt class="text-sm font-medium text-neutral-500">Description</dt>
				<dd class="mt-1 text-sm text-neutral-900">{formData.description}</dd>
			</div>
		</dl>
	</div>

	<div>
		<h3 class="font-medium text-neutral-900">Parameters</h3>
		<div class="mt-4 space-y-4">
			{#each formData.parameters as parameter}
				<div class="rounded-lg bg-neutral-50 p-4">
					<div class="grid grid-cols-2 gap-4">
						<div>
							<dt class="text-sm font-medium text-neutral-500">Name</dt>
							<dd class="mt-1 text-sm text-neutral-900">{parameter.name}</dd>
						</div>
						<div>
							<dt class="text-sm font-medium text-neutral-500">Type</dt>
							<dd class="mt-1 text-sm text-neutral-900">{parameter.type}</dd>
						</div>
						<div>
							<dt class="text-sm font-medium text-neutral-500">Value</dt>
							<dd class="mt-1 text-sm text-neutral-900">{parameter.value}</dd>
						</div>
						{#if parameter.unit}
							<div>
								<dt class="text-sm font-medium text-neutral-500">Unit</dt>
								<dd class="mt-1 text-sm text-neutral-900">{parameter.unit}</dd>
							</div>
						{/if}
					</div>
				</div>
			{/each}
		</div>
	</div>

	<div>
		<h3 class="font-medium text-neutral-900">Constraints</h3>
		<div class="mt-4 space-y-4">
			{#each formData.constraints as constraint}
				<div class="rounded-lg bg-neutral-50 p-4">
					<div class="grid grid-cols-3 gap-4">
						<div>
							<dt class="text-sm font-medium text-neutral-500">Parameter</dt>
							<dd class="mt-1 text-sm text-neutral-900">{constraint.parameter}</dd>
						</div>
						<div>
							<dt class="text-sm font-medium text-neutral-500">Operator</dt>
							<dd class="mt-1 text-sm text-neutral-900">{constraint.operator}</dd>
						</div>
						<div>
							<dt class="text-sm font-medium text-neutral-500">Value</dt>
							<dd class="mt-1 text-sm text-neutral-900">{constraint.value}</dd>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>
