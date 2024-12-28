<script lang="ts">
	import { FileText, Info, Tag, RefreshCw } from 'lucide-svelte';
	import { marked } from 'marked';
	let { data } = $props(); // Supplied by page.server.ts
	const { scenario, variables, simulations: initialSimulations } = data;
	import type { VariableValue } from '$lib/types';

	let simulations = $state(initialSimulations);
	let isRunning = $state(false);

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
</script>

<main class="p-8 space-y-8 bg-neutral-50 min-h-screen">
	<!-- Header Section -->
	<header class="p-6 bg-white rounded-lg shadow-md space-y-4">
		<div class="flex items-center space-x-4">
			<FileText class="text-primary-500 w-8 h-8" />
			<h1 class="text-3xl font-semibold text-neutral-900">{scenario.name}</h1>
		</div>
		<p class="text-neutral-600">{scenario.description || 'No description provided.'}</p>
		<div class="text-sm text-neutral-500 flex items-center space-x-2">
			<Tag class="w-4 h-4 text-primary-500" />
			<span>Type: {scenario.type}</span>
		</div>
		<button class="btn-primary mt-4" onclick={runSimulation} disabled={isRunning}>
			{#if isRunning}
				<RefreshCw class="animate-spin w-4 h-4" />
				Running Simulation...
			{:else}
				Run Simulation
			{/if}
		</button>
	</header>

	<!-- Scenario Variables Section -->
	<section>
		<h2 class="text-xl font-semibold text-neutral-900 flex items-center space-x-2">
			<Info class="w-6 h-6 text-primary-500" />
			<span>Scenario Variables</span>
		</h2>
		{#if variables.length > 0}
			<table
				class="w-full mt-4 border-collapse bg-white rounded-lg shadow-md overflow-hidden table-fixed"
			>
				<thead class="bg-primary-50 text-primary-700">
					<tr>
						<th class="px-4 py-2 text-left text-sm font-medium w-1/6">Measure</th>
						<th class="px-4 py-2 text-left text-sm font-medium w-1/6">Unit</th>
						<th class="px-4 py-2 text-left text-sm font-medium w-1/6">Value</th>
						<th class="px-4 py-2 text-left text-sm font-medium w-1/6">Reason</th>
						<th class="px-4 py-2 text-left text-sm font-medium w-1/6">Condition</th>
						<th class="px-4 py-2 text-left text-sm font-medium w-1/6">Threshold</th>
						<th class="px-4 py-2 text-left text-sm font-medium w-1/6">Explanation</th>
					</tr>
				</thead>
				<tbody>
					{#each variables as variable}
						<tr class="odd:bg-neutral-50 even:bg-white hover:bg-primary-100">
							<td class="px-4 py-2 text-neutral-800">
								{(variable.value as VariableValue).measure ||
									(variable.value as VariableValue).factorMeasure ||
									'-'}
							</td>
							<td class="px-4 py-2 text-neutral-600"
								>{(variable.value as VariableValue).unit || '-'}</td
							>
							<td class="px-4 py-2 text-neutral-600"
								>{(variable.value as VariableValue).value || '-'}</td
							>
							<td class="px-4 py-2 text-neutral-600"
								>{(variable.value as VariableValue).reason || '-'}</td
							>
							<td class="px-4 py-2 text-neutral-600"
								>{(variable.value as VariableValue).condition || '-'}</td
							>
							<td class="px-4 py-2 text-neutral-600"
								>{(variable.value as VariableValue).threshold || '-'}</td
							>
							<td class="px-4 py-2 text-neutral-600"
								>{(variable.value as VariableValue).explanation || '-'}</td
							>
						</tr>
					{/each}
				</tbody>
			</table>
		{:else}
			<p class="text-neutral-600 mt-2">No variables available.</p>
		{/if}
	</section>

	<!-- Most Recent Simulation -->
	{#if simulations.length > 0}
		<section class="simulation-card">
			<div class="simulation-header">
				<h2 class="simulation-title">Latest Simulation</h2>
				<span class="simulation-confidence">
					Confidence: {simulations[0].confidence}%
				</span>
			</div>
			<div class="simulation-content">
				<div class="prose prose-sm max-w-none">
					{@html marked(simulations[0].results.analysis, { gfm: true, breaks: true })}
				</div>
			</div>
		</section>
	{/if}

	<!-- Additional Simulations Section -->
	<section>
		<h2 class="text-xl font-semibold text-neutral-900 flex items-center space-x-2">
			<Info class="w-6 h-6 text-primary-500" />
			<span>Other Simulations</span>
		</h2>
		{#if simulations.length > 1}
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
				{#each simulations.slice(1) as sim}
					<div class="p-4 bg-white rounded-lg shadow-md">
						<p class="text-sm text-neutral-500">Confidence: {sim.confidence}</p>
						<p class="text-neutral-800">{@html marked(sim.results.analysis)}</p>
					</div>
				{/each}
			</div>
		{:else}
			<p class="text-neutral-600 mt-2">No additional simulations available.</p>
		{/if}
	</section>
</main>
