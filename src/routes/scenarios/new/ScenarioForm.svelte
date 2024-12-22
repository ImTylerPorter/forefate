<script lang="ts">
	import { page } from '$app/stores';
	import StepIndicator from './StepIndicator.svelte';
	import BasicInfo from './steps/BasicInfo.svelte';
	import Parameters from './steps/Parameters.svelte';
	import Constraints from './steps/Constraints.svelte';
	import Review from './steps/Review.svelte';

	const steps = [
		{ id: 'basic', name: 'Basic Info', component: BasicInfo },
		{ id: 'parameters', name: 'Parameters', component: Parameters },
		{ id: 'constraints', name: 'Constraints', component: Constraints },
		{ id: 'review', name: 'Review', component: Review }
	];

	let currentStep = $state(0);
	let formData = $state({
		name: '',
		description: '',
		type: '',
		parameters: [],
		constraints: []
	});

	function handleNext() {
		if (currentStep < steps.length - 1) {
			currentStep++;
		}
	}

	function handleBack() {
		if (currentStep > 0) {
			currentStep--;
		}
	}

	async function handleSubmit() {
		// TODO: Implement scenario creation
		console.log('Creating scenario:', formData);
	}

	const SvelteComponent = $derived(steps[currentStep].component);
</script>

<div class="space-y-8">
	<StepIndicator {steps} {currentStep} />

	<div class="bg-white shadow-sm ring-1 ring-neutral-900/5 rounded-lg">
		<div class="p-6">
			<SvelteComponent bind:formData />
		</div>

		<div class="flex items-center justify-between gap-4 border-t border-neutral-900/5 px-6 py-4">
			<button type="button" class="btn-secondary" onclick={handleBack} disabled={currentStep === 0}>
				Back
			</button>

			{#if currentStep === steps.length - 1}
				<button type="button" class="btn-primary" onclick={handleSubmit}> Create Scenario </button>
			{:else}
				<button type="button" class="btn-primary" onclick={handleNext}> Continue </button>
			{/if}
		</div>
	</div>
</div>
