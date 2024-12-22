<script lang="ts">
	let {
		children,
		type = 'button',
		onClick,
		disabled = false
	} = $props<{
		children?: () => any;
		type?: 'button' | 'submit' | 'reset';
		onClick?: () => void;
		disabled?: boolean;
	}>();
</script>

<button
	{type}
	class="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
	onclick={onClick}
	{disabled}
>
	{@render children?.()}
</button>
