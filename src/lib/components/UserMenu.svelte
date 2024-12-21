<script lang="ts">
	let userName = 'User Name';
</script>

<div class="relative">
	<button
		type="button"
		class="-m-1.5 flex items-center p-1.5"
		id="user-menu-button"
		aria-expanded="false"
		aria-haspopup="true"
	>
		<span class="sr-only">Open user menu</span>
		<img
			class="h-8 w-8 rounded-full bg-neutral-50"
			src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
			alt=""
		/>
		<span class="hidden lg:flex lg:items-center">
			<span class="ml-4 text-sm font-semibold leading-6 text-neutral-900" aria-hidden="true">
				{userName}
			</span>
		</span>
	</button>
</div>
