<script lang="ts">
	import { Brain, Target, ChartLine, Users2 } from 'lucide-svelte';
	import StatsCard from './StatsCard.svelte';
	import ScenarioTable from './ScenarioTable.svelte';
	import type { Stat } from '$lib/types';

	let { data } = $props();
	const { scenarios, stats } = data;

	const statCards: Stat[] = [
		{ name: 'Active Scenarios', value: stats.activeScenarios.toString(), icon: Target },
		{ name: 'Simulations Run', value: stats.simulationsRun.toString(), icon: Brain },
		{ name: 'Success Rate', value: `${stats.successRate}%`, icon: ChartLine },
		{ name: 'Team Members', value: stats.teamMembers.toString(), icon: Users2 }
	];
</script>

<div class="space-y-8">
	<div>
		<h2
			class="text-2xl font-bold leading-7 text-neutral-900 sm:truncate sm:text-3xl sm:tracking-tight"
		>
			Welcome to Forefate
		</h2>
		<p class="mt-2 text-lg text-neutral-600">Your AI-powered decision simulation platform</p>
	</div>

	<!-- Stats Cards -->
	<StatsCard stats={statCards} />

	<div class="mt-8">
		<h3 class="text-lg font-medium text-neutral-900">Recent Scenarios</h3>
		<ScenarioTable {scenarios} />
	</div>
</div>
