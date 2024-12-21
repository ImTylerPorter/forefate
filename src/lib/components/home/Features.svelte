<script lang="ts">
	import { Brain, Target, ChartLine, Users2 } from 'lucide-svelte';
	import FeatureCard from './FeatureCard.svelte';

	const features = [
		{
			name: 'AI-Powered Analysis',
			description:
				'Advanced machine learning algorithms analyze your scenarios and provide actionable insights.',
			icon: Brain
		},
		{
			name: 'Multiple Scenarios',
			description: 'Create and compare multiple scenarios to find the optimal path forward.',
			icon: Target
		},
		{
			name: 'Real-time Updates',
			description: 'Get real-time updates and adjustments as conditions change.',
			icon: ChartLine
		},
		{
			name: 'Collaboration',
			description: 'Work together with your team to make better decisions.',
			icon: Users2
		}
	];
</script>

<div
	class="relative bg-gradient-to-b from-white via-primary-50/30 to-primary-100/20 py-24 sm:py-32"
>
	<!-- Gradient background -->
	<div class="absolute inset-0 -z-10 overflow-hidden">
		<div
			class="absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_10%,theme(colors.primary.100)_0%,transparent_100%)]"
		></div>
	</div>

	<div class="mx-auto max-w-7xl px-6 lg:px-8">
		<!-- Section header -->
		<div class="mx-auto max-w-2xl lg:text-center">
			<h2 class="text-base font-semibold leading-7 text-primary-600">Everything you need</h2>
			<p class="mt-2 text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
				Make confident decisions
			</p>
			<p class="mt-6 text-lg leading-8 text-neutral-600">
				Our platform provides all the tools you need to simulate, analyze, and make informed
				decisions.
			</p>
		</div>

		<!-- Feature grid -->
		<div class="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
			<div class="grid grid-cols-1 gap-8 lg:grid-cols-4">
				{#each features as feature}
					<FeatureCard {...feature} />
				{/each}
			</div>
		</div>
	</div>
</div>
