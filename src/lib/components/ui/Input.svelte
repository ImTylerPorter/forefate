<script lang="ts">
	let {
		id,
		type = 'text',
		name = '',
		value = $bindable(''),
		placeholder = '',
		oninput,
		class: className = '',
		required = $bindable(true)
	} = $props<{
		id: string;
		type?: string;
		name?: string;
		value?: string;
		placeholder?: string;
		oninput?: (event: Event) => void;
		class?: string;
		required?: boolean;
	}>();

	const defaultClasses =
		'w-full p-2 border border-neutral-300 rounded-md dark:border-neutral-600 dark:bg-neutral-700 dark:text-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary-500';

	// Combine classes directly
	const combinedClasses = `${defaultClasses} ${className}`.trim();
</script>

<input {id} {type} {name} bind:value {placeholder} {oninput} class={combinedClasses} {required} />
