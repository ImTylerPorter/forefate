<script lang="ts">
	import type { Scenario } from '$lib/types';

	let { scenarios } = $props<{ scenarios: Scenario[] }>();

	const getStatusClass = (status: string) => {
		switch (status) {
			case 'Completed':
				return 'status-badge-completed';
			case 'In Progress':
				return 'status-badge-progress';
			default:
				return 'status-badge-pending';
		}
	};
</script>

<div class="card">
	<div class="p-6">
		<h3 class="text-lg font-medium leading-6 text-neutral-900">Recent Scenarios</h3>
		<div class="mt-6 flow-root">
			<div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
				<div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
					<table class="min-w-full divide-y divide-neutral-200">
						<thead>
							<tr>
								<th
									scope="col"
									class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-neutral-900 sm:pl-0"
								>
									Name
								</th>
								<th
									scope="col"
									class="px-3 py-3.5 text-left text-sm font-semibold text-neutral-900"
								>
									Type
								</th>
								<th
									scope="col"
									class="px-3 py-3.5 text-left text-sm font-semibold text-neutral-900"
								>
									Status
								</th>
								<th
									scope="col"
									class="px-3 py-3.5 text-left text-sm font-semibold text-neutral-900"
								>
									Last Run
								</th>
							</tr>
						</thead>
						<tbody class="divide-y divide-neutral-200">
							{#each scenarios as scenario}
								<tr class="hover:bg-neutral-50">
									<td
										class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-neutral-900 sm:pl-0"
									>
										{scenario.name}
									</td>
									<td class="whitespace-nowrap px-3 py-4 text-sm text-neutral-500"
										>{scenario.type}</td
									>
									<td class="whitespace-nowrap px-3 py-4 text-sm">
										<span class={`status-badge ${getStatusClass(scenario.status)}`}>
											{scenario.status}
										</span>
									</td>
									<td class="whitespace-nowrap px-3 py-4 text-sm text-neutral-500"
										>{scenario.lastRun}</td
									>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</div>
