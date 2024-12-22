<script lang="ts">
	let { message = '' } = $props<{
		message?: string;
	}>();
</script>

{#if message}
	<div
		class="p-3 mb-4 text-sm text-red-700 bg-red-100 border border-red-400 rounded-md dark:bg-red-900 dark:text-red-300"
	>
		{message}
	</div>
{/if}
