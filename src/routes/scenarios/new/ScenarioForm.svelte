<script lang="ts">
	import {
		SCENARIO_TYPES,
		RECOMMENDED_FACTORS,
		RECOMMENDED_BOUNDARIES,
		type ScenarioFormData,
		type ScenarioVariable
	} from '$lib/data/scenarioData';
	import BasicInfo from './BasicInfo.svelte';
	import FactorsSection from './FactorsSection.svelte';
	import BoundariesSection from './BoundariesSection.svelte';

	// 1. Define an interface for your props (no generics needed here).
	interface ScenarioFormProps {
		// If you allow partial initial data, use Partial<ScenarioFormData>
		initialFormData?: Partial<ScenarioFormData>;

		// Callback triggered on submit
		onSubmit?: (
			formData: ScenarioFormData,
			factors: ScenarioVariable[],
			boundaries: ScenarioVariable[]
		) => void;
	}

	// 2. Grab raw props and manually cast them.
	const rawProps = $props();
	const { initialFormData, onSubmit } = rawProps as ScenarioFormProps;

	// 3. Provide fallback if undefined
	const safeInitialData = initialFormData ?? {};
	const safeOnSubmit = onSubmit ?? (() => {});

	// 4. Merge partial fields into a full ScenarioFormData
	let formData: ScenarioFormData = {
		name: safeInitialData.name ?? '',
		type: safeInitialData.type ?? '',
		description: safeInitialData.description ?? ''
	};

	// 5. Local arrays for factors/boundaries
	let factors: ScenarioVariable[] = [];
	let boundaries: ScenarioVariable[] = [];
	let showFactors = false;
	let showBoundaries = false;

	/* ---------- Factor methods ---------- */
	function addFactor() {
		factors = [
			...factors,
			{ type: 'factor', data: { measure: '', reason: '', value: '', unit: '' } }
		];
	}
	function removeFactor(index: number) {
		factors = factors.filter((_, i) => i !== index);
	}
	function addRecommendedFactors() {
		if (RECOMMENDED_FACTORS[formData.type]) {
			const recs = RECOMMENDED_FACTORS[formData.type].map((item) => ({
				type: 'factor' as const,
				data: { ...item }
			}));
			factors = [...factors, ...recs];
			showFactors = true;
		}
	}

	/* ---------- Boundary methods ---------- */
	function addBoundary() {
		boundaries = [
			...boundaries,
			{
				type: 'boundary',
				data: { factorMeasure: '', condition: '≤', threshold: '', explanation: '' }
			}
		];
	}
	function removeBoundary(index: number) {
		boundaries = boundaries.filter((_, i) => i !== index);
	}
	function addRecommendedBoundaries() {
		if (RECOMMENDED_BOUNDARIES[formData.type]) {
			const recs = RECOMMENDED_BOUNDARIES[formData.type].map((item) => ({
				type: 'boundary' as const,
				data: { ...item }
			}));
			boundaries = [...boundaries, ...recs];
			showBoundaries = true;
		}
	}

	/* ---------- Submission ---------- */
	function handleSubmit() {
		safeOnSubmit(formData, factors, boundaries);
	}
</script>

<div class="space-y-6 max-w-3xl mx-auto mt-8 px-4">
	<div class="border-b border-neutral-200 pb-4">
		<h1 class="text-2xl font-semibold text-neutral-900">Create a New Scenario</h1>
		<p class="mt-2 text-sm text-neutral-500">
			Provide the basics below. You can auto-add <strong>recommended factors</strong> or
			<strong>boundaries</strong> for your chosen scenario type, or define your own.
		</p>
	</div>

	<BasicInfo
		{formData}
		{SCENARIO_TYPES}
		{RECOMMENDED_FACTORS}
		{RECOMMENDED_BOUNDARIES}
		{addRecommendedFactors}
		{addRecommendedBoundaries}
	/>

	<FactorsSection {factors} {showFactors} {addFactor} {removeFactor} />

	<BoundariesSection {boundaries} {showBoundaries} {addBoundary} {removeBoundary} />

	<div class="bg-white shadow-sm ring-1 ring-neutral-900/5 rounded-lg p-6">
		<button type="button" class="btn-primary w-full" on:click={handleSubmit}>
			Create Scenario
		</button>
	</div>
</div>

<style lang="postcss">
	.input-field {
		@apply w-full border border-neutral-300 rounded-md px-3 py-2;
	}
</style>
