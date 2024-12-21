<script lang="ts">
	import type { Stat } from '$lib/types';

	let { stats } = $props<{ stats: Stat[] }>();
</script>

<dl class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
	{#each stats as stat}
		<div class="card p-6">
			<dt>
				<div class="absolute rounded-lg bg-primary-500 p-3">
					<stat.icon class="h-6 w-6 text-white" aria-hidden="true" />
				</div>
				<p class="ml-16 truncate text-sm font-medium text-neutral-600">{stat.name}</p>
			</dt>
			<dd class="ml-16 flex items-baseline pb-6 sm:pb-7">
				<p class="text-2xl font-semibold text-neutral-900">{stat.value}</p>
			</dd>
		</div>
	{/each}
</dl>
