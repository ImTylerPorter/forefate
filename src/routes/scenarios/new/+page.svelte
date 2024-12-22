<script lang="ts">
	import { ArrowLeft } from 'lucide-svelte';
	import ScenarioForm from './ScenarioForm.svelte';
</script>

<div class="space-y-6">
	<div class="border-b border-neutral-200 pb-4">
		<div class="flex items-center gap-4">
			<a href="/scenarios" class="text-neutral-500 hover:text-neutral-700">
				<ArrowLeft class="h-5 w-5" />
			</a>
			<h1 class="text-2xl font-semibold text-neutral-900">Create New Scenario</h1>
		</div>
		<p class="mt-2 text-sm text-neutral-500">
			Set up your scenario parameters and initial conditions
		</p>
	</div>

	<ScenarioForm />
</div>
