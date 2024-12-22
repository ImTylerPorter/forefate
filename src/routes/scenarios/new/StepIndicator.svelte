<script lang="ts">
	interface Props {
		steps: { id: string; name: string }[];
		currentStep: number;
	}

	let { steps, currentStep }: Props = $props();
</script>

<nav aria-label="Progress">
	<ol role="list" class="flex items-center">
		{#each steps as step, index}
			<li class="relative flex-1 {index === steps.length - 1 ? 'flex-none' : ''}">
				{#if index < currentStep}
					<!-- Completed step -->
					<div class="group flex items-center">
						<span class="flex items-center">
							<span
								class="relative flex h-8 w-8 items-center justify-center rounded-full bg-primary-600"
							>
								<svg class="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
									<path
										fill-rule="evenodd"
										d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
										clip-rule="evenodd"
									/>
								</svg>
							</span>
							<span class="ml-4 text-sm font-medium text-neutral-900">{step.name}</span>
						</span>
					</div>
					{#if index !== steps.length - 1}
						<div class="absolute left-32 right-4 top-4 hidden h-0.5 bg-primary-600 lg:block"></div>
					{/if}
				{:else if index === currentStep}
					<!-- Current step -->
					<div class="flex items-center" aria-current="step">
						<span
							class="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-primary-600 bg-white"
						>
							<span class="h-2.5 w-2.5 rounded-full bg-primary-600"></span>
						</span>
						<span class="ml-4 text-sm font-medium text-primary-600">{step.name}</span>
					</div>
					{#if index !== steps.length - 1}
						<div class="absolute left-32 right-4 top-4 hidden h-0.5 bg-neutral-200 lg:block"></div>
					{/if}
				{:else}
					<!-- Upcoming step -->
					<div class="group flex items-center">
						<span class="flex items-center">
							<span
								class="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-neutral-300 bg-white"
							>
								<span class="h-2.5 w-2.5 rounded-full bg-transparent"></span>
							</span>
							<span class="ml-4 text-sm font-medium text-neutral-500">{step.name}</span>
						</span>
					</div>
					{#if index !== steps.length - 1}
						<div class="absolute left-32 right-4 top-4 hidden h-0.5 bg-neutral-200 lg:block"></div>
					{/if}
				{/if}
			</li>
		{/each}
	</ol>
</nav>
