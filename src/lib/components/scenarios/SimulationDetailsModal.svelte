<script lang="ts">
	import { X, FileText, Tag, Info, ArrowRight, Calendar, Clock, Gauge } from 'lucide-svelte';

	let { isOpen, onClose, parameters } = $props<{
		isOpen: boolean;
		onClose: () => void;
		parameters: {
			scenario: {
				name: string;
				type: string;
				description: string;
			};
			variables: Array<{
				name: string;
				value: {
					measure?: string;
					unit?: string;
					value?: string;
					reason?: string;
					condition?: string;
					threshold?: string;
					explanation?: string;
				};
			}>;
		};
	}>();
</script>

{#if isOpen}
	<div class="fixed inset-0 z-50 flex items-center justify-center">
		<!-- Backdrop -->
		<div
			class="absolute inset-0 bg-black/60 backdrop-blur-sm z-40 pointer-events-auto"
			aria-hidden="true"
			onclick={onClose}
		></div>

		<!-- Modal Content -->
		<div
			class="relative bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl max-w-3xl w-full mx-4 max-h-[90vh] overflow-hidden border border-white/20 animate-in slide-in-from-bottom-4 duration-300 z-50 pointer-events-auto"
		>
			<!-- Header -->
			<div class="bg-gradient-to-br from-primary-500 to-primary-600 p-6">
				<div class="flex items-center justify-between">
					<div class="flex items-center space-x-3">
						<FileText class="w-8 h-8 text-white" />
						<h2 id="modal-title" class="text-2xl font-semibold text-white">
							Simulation Parameters
						</h2>
					</div>
					<button
						onclick={onClose}
						aria-label="Close modal"
						class="p-2 hover:bg-white/20 rounded-full transition-colors"
					>
						<X class="w-5 h-5 text-white" />
					</button>
				</div>
			</div>

			<!-- Content -->
			<div class="p-6 overflow-y-auto max-h-[calc(90vh-8rem)] flex flex-col gap-8">
				<!-- Scenario Details -->
				<div class="flex flex-col gap-6">
					<div class="flex items-center space-x-3 pb-2 border-b border-neutral-200">
						<Info class="w-6 h-6 text-primary-500" />
						<h3 class="text-xl font-medium text-neutral-900">Scenario Details</h3>
					</div>
					<div
						class="bg-neutral-50/80 backdrop-blur-sm rounded-xl p-6 border border-neutral-200/80"
					>
						<div class="grid grid-cols-2 gap-6">
							<div class="flex flex-col gap-2">
								<div class="flex items-center space-x-2 text-sm font-medium text-neutral-500">
									<FileText class="w-4 h-4" />
									<span>Name</span>
								</div>
								<p class="text-lg text-neutral-900">{parameters.scenario.name}</p>
							</div>
							<div class="flex flex-col gap-2">
								<div class="flex items-center space-x-2 text-sm font-medium text-neutral-500">
									<Tag class="w-4 h-4" />
									<span>Type</span>
								</div>
								<p class="text-lg text-neutral-900">{parameters.scenario.type}</p>
							</div>
							{#if parameters.scenario.description}
								<div class="col-span-2 flex flex-col gap-2">
									<div class="flex items-center space-x-2 text-sm font-medium text-neutral-500">
										<Info class="w-4 h-4" />
										<span>Description</span>
									</div>
									<p class="text-lg text-neutral-900">{parameters.scenario.description}</p>
								</div>
							{/if}
						</div>
					</div>
				</div>

				<!-- Variables -->
				<div class="flex flex-col gap-6">
					<div class="flex items-center space-x-3 pb-2 border-b border-neutral-200">
						<Gauge class="w-6 h-6 text-primary-500" />
						<h3 class="text-xl font-medium text-neutral-900">Variables</h3>
					</div>
					<div class="flex flex-col gap-6">
						{#each parameters.variables as variable}
							<div
								class="bg-white rounded-xl p-6 shadow-sm border border-neutral-200/80 hover:border-primary-200 hover:shadow-md transition-all duration-200"
							>
								<div class="flex items-center space-x-3 mb-4">
									<div class="p-2 rounded-lg bg-primary-50">
										<Gauge class="w-5 h-5 text-primary-600" />
									</div>
									<h4 class="text-lg font-medium text-primary-900">{variable.name}</h4>
								</div>
								<div class="grid grid-cols-2 gap-x-6 gap-y-4">
									{#if variable.value.measure}
										<div class="flex flex-col gap-1.5">
											<span class="text-sm font-medium text-neutral-500">Measure</span>
											<p class="text-neutral-900">{variable.value.measure}</p>
										</div>
									{/if}
									{#if variable.value.unit}
										<div class="flex flex-col gap-1.5">
											<span class="text-sm font-medium text-neutral-500">Unit</span>
											<p class="text-neutral-900">{variable.value.unit}</p>
										</div>
									{/if}
									{#if variable.value.value}
										<div class="flex flex-col gap-1.5">
											<span class="text-sm font-medium text-neutral-500">Value</span>
											<p class="text-neutral-900">{variable.value.value}</p>
										</div>
									{/if}
									{#if variable.value.reason}
										<div class="flex flex-col gap-1.5">
											<span class="text-sm font-medium text-neutral-500">Reason</span>
											<p class="text-neutral-900">{variable.value.reason}</p>
										</div>
									{/if}
									{#if variable.value.condition}
										<div class="flex flex-col gap-1.5">
											<span class="text-sm font-medium text-neutral-500">Condition</span>
											<p class="flex items-center space-x-2">
												<span class="text-neutral-900">{variable.value.condition}</span>
												{#if variable.value.threshold}
													<ArrowRight class="w-4 h-4 text-neutral-400" />
													<span class="text-neutral-900">{variable.value.threshold}</span>
												{/if}
											</p>
										</div>
									{/if}
									{#if variable.value.explanation}
										<div class="col-span-2 flex flex-col gap-1.5">
											<span class="text-sm font-medium text-neutral-500">Explanation</span>
											<p class="text-neutral-900">{variable.value.explanation}</p>
										</div>
									{/if}
								</div>
							</div>
						{/each}
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}

<style>
	.animate-in {
		animation-duration: 150ms;
		--tw-enter-opacity: initial;
		--tw-enter-scale: initial;
		--tw-enter-rotate: initial;
		--tw-enter-translate-x: initial;
		--tw-enter-translate-y: initial;
	}

	.slide-in-from-bottom-4 {
		animation-name: slide-in-from-bottom;
	}

	@keyframes fade-in {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	@keyframes slide-in-from-bottom {
		from {
			transform: translateY(1rem);
			opacity: 0;
		}
		to {
			transform: translateY(0);
			opacity: 1;
		}
	}
</style>
