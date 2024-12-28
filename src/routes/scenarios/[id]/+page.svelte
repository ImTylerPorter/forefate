<script lang="ts">
	import { FileText, Info, Tag, RefreshCw } from 'lucide-svelte';
	import { marked } from 'marked';
	import SimulationDetailsModal from '$lib/components/scenarios/SimulationDetailsModal.svelte';
	import type { VariableValue, Simulation, SimulationParameters } from '$lib/types';
	let { data } = $props(); // Supplied by page.server.ts
	const { scenario, variables, simulations: initialSimulations } = data;

	let simulations = $state(initialSimulations as Simulation[]);
	let isRunning = $state(false);
	let selectedSimulation = $state<Simulation | null>(null);
	let isModalOpen = $state(false);

	async function runSimulation() {
		try {
			isRunning = true;

			// Call the API route
			const response = await fetch('/api/simulations', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ scenario, variables })
			});

			if (response.ok) {
				const newSimulation = await response.json();
				simulations = [newSimulation, ...simulations];
			} else {
				console.error('Simulation failed');
			}
		} catch (error) {
			console.error('Error running simulation:', error);
		} finally {
			isRunning = false;
		}
	}

	function showSimulationDetails(simulation: Simulation) {
		selectedSimulation = simulation;
		isModalOpen = true;
	}

	function closeModal() {
		isModalOpen = false;
		selectedSimulation = null;
	}
</script>

<main class="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 p-8">
	<div class="space-y-8">
		<!-- Header Section -->
		<header
			class="backdrop-blur-sm bg-white/80 rounded-2xl shadow-lg border border-neutral-200/50 p-8 space-y-6 transition-all"
		>
			<div class="flex items-center space-x-4">
				<FileText class="text-primary-500 w-10 h-10" />
				<h1
					class="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-400"
				>
					{scenario.name}
				</h1>
			</div>
			<p class="text-lg text-neutral-600 leading-relaxed">
				{scenario.description || 'No description provided.'}
			</p>
			<div
				class="inline-flex items-center px-4 py-2 rounded-full bg-primary-50 text-primary-700 font-medium"
			>
				<Tag class="w-4 h-4 mr-2" />
				<span>{scenario.type}</span>
			</div>
			<div class="flex items-center space-x-4">
				<button class="btn-primary" onclick={runSimulation} disabled={isRunning}>
					<span class="flex items-center space-x-2">
						{#if isRunning}
							<RefreshCw class="animate-spin w-5 h-5" />
							<span class="text-white">Running Simulation...</span>
						{:else}
							<span class="text-white">Run Simulation</span>
						{/if}
					</span>
				</button>
				<a href={`/scenarios/${scenario.id}/edit`} class="btn-secondary"> Edit Scenario </a>
			</div>
		</header>

		<!-- Scenario Variables Section -->
		<section
			class="backdrop-blur-sm bg-white/80 rounded-2xl shadow-lg border border-neutral-200/50 p-8"
		>
			<h2 class="text-2xl font-bold text-neutral-900 flex items-center space-x-3 mb-6">
				<Info class="w-7 h-7 text-primary-500" />
				<span>Scenario Variables</span>
			</h2>
			{#if variables.length > 0}
				<div class="overflow-x-auto rounded-xl border border-neutral-200">
					<table class="w-full">
						<thead>
							<tr class="bg-gradient-to-r from-primary-50 to-primary-100">
								<th class="px-6 py-4 text-left text-sm font-semibold text-primary-700">Measure</th>
								<th class="px-6 py-4 text-left text-sm font-semibold text-primary-700">Unit</th>
								<th class="px-6 py-4 text-left text-sm font-semibold text-primary-700">Value</th>
								<th class="px-6 py-4 text-left text-sm font-semibold text-primary-700">Reason</th>
								<th class="px-6 py-4 text-left text-sm font-semibold text-primary-700">Condition</th
								>
								<th class="px-6 py-4 text-left text-sm font-semibold text-primary-700">Threshold</th
								>
								<th class="px-6 py-4 text-left text-sm font-semibold text-primary-700"
									>Explanation</th
								>
							</tr>
						</thead>
						<tbody>
							{#each variables as variable}
								<tr class="border-t border-neutral-200 hover:bg-primary-50/50 transition-colors">
									<td class="px-6 py-4 text-neutral-800 font-medium">
										{(variable.value as VariableValue).measure ||
											(variable.value as VariableValue).factorMeasure ||
											'-'}
									</td>
									<td class="px-6 py-4 text-neutral-600"
										>{(variable.value as VariableValue).unit || '-'}</td
									>
									<td class="px-6 py-4 text-neutral-600"
										>{(variable.value as VariableValue).value || '-'}</td
									>
									<td class="px-6 py-4 text-neutral-600"
										>{(variable.value as VariableValue).reason || '-'}</td
									>
									<td class="px-6 py-4 text-neutral-600"
										>{(variable.value as VariableValue).condition || '-'}</td
									>
									<td class="px-6 py-4 text-neutral-600"
										>{(variable.value as VariableValue).threshold || '-'}</td
									>
									<td class="px-6 py-4 text-neutral-600"
										>{(variable.value as VariableValue).explanation || '-'}</td
									>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			{:else}
				<p class="text-neutral-600">No variables available.</p>
			{/if}
		</section>

		<!-- Most Recent Simulation -->
		{#if simulations.length > 0}
			<section
				class="backdrop-blur-sm bg-white/80 rounded-2xl shadow-lg border border-neutral-200/50 p-8"
			>
				<div class="flex justify-between items-center mb-6">
					<h2 class="text-2xl font-bold text-neutral-900">Latest Simulation</h2>
					<div class="flex items-center space-x-4">
						<span class="px-4 py-2 rounded-full bg-primary-50 text-primary-700 font-medium">
							Confidence: {simulations[0].confidence}%
						</span>
						<button
							class="text-sm text-primary-600 hover:text-primary-700 underline"
							onclick={() => showSimulationDetails(simulations[0])}
						>
							View Parameters
						</button>
					</div>
				</div>
				<div class="prose prose-lg max-w-none">
					{@html marked(simulations[0].results.analysis, { gfm: true, breaks: true })}
				</div>
			</section>
		{/if}

		<!-- Additional Simulations Section -->
		<section
			class="backdrop-blur-sm bg-white/80 rounded-2xl shadow-lg border border-neutral-200/50 p-8"
		>
			<h2 class="text-2xl font-bold text-neutral-900 flex items-center space-x-3 mb-6">
				<Info class="w-7 h-7 text-primary-500" />
				<span>Other Simulations</span>
			</h2>
			{#if simulations.length > 1}
				<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{#each simulations.slice(1) as sim}
						<div
							class="p-6 rounded-xl bg-white shadow-md border border-neutral-200 hover:shadow-lg transition-shadow"
						>
							<div class="flex items-center justify-between mb-4">
								<span
									class="px-3 py-1 rounded-full bg-primary-50 text-primary-700 text-sm font-medium"
								>
									Confidence: {sim.confidence}%
								</span>
								<button
									class="text-sm text-primary-600 hover:text-primary-700 underline"
									onclick={() => showSimulationDetails(sim)}
								>
									View Parameters
								</button>
							</div>
							<div class="prose prose-sm max-w-none">
								{@html marked(sim.results.analysis, { gfm: true, breaks: true })}
							</div>
						</div>
					{/each}
				</div>
			{:else}
				<p class="text-neutral-600">No additional simulations available.</p>
			{/if}
		</section>
	</div>

	<!-- Modal -->
	{#if selectedSimulation}
		<SimulationDetailsModal
			isOpen={isModalOpen}
			onClose={closeModal}
			parameters={selectedSimulation.parameters}
		/>
	{/if}
</main>

<style lang="postcss">
	.btn-secondary {
		@apply px-4 py-2 border border-neutral-300 rounded-md bg-neutral-100 hover:bg-neutral-200;
	}
</style>
