<script lang="ts">
	let {
		id,
		type = 'text',
		name = '',
		value = $bindable(''),
		placeholder = '',
		oninput
	} = $props<{
		id: string;
		type?: string;
		name?: string;
		value?: string;
		placeholder?: string;
		oninput?: (event: Event) => void;
	}>();
</script>

<input
	{id}
	{type}
	{name}
	bind:value
	{placeholder}
	class="w-full p-2 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
/>
