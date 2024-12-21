<script lang="ts">
	import { Brain, Target, ChartLine, Users2 } from 'lucide-svelte';
	import StatsCard from './StatsCard.svelte';
	import ScenarioTable from './ScenarioTable.svelte';
	import type { Stat } from '$lib/types';

	let stats = $state<Stat[]>([
		{ name: 'Active Scenarios', value: '12', icon: Target },
		{ name: 'Simulations Run', value: '48', icon: Brain },
		{ name: 'Success Rate', value: '89%', icon: ChartLine },
		{ name: 'Team Members', value: '4', icon: Users2 }
	]);

	let recentScenarios = $state([
		{
			id: 1,
			name: 'Market Expansion Strategy',
			type: 'Business',
			status: 'In Progress',
			lastRun: '3h ago'
		},
		{
			id: 2,
			name: 'Career Path Analysis',
			type: 'Personal',
			status: 'Completed',
			lastRun: '1d ago'
		},
		{
			id: 3,
			name: 'Investment Portfolio',
			type: 'Financial',
			status: 'Pending',
			lastRun: '2d ago'
		}
	]);
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

	<StatsCard {stats} />
	<ScenarioTable scenarios={recentScenarios} />
</div>
