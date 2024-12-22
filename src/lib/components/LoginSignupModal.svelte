<script lang="ts">
	import { Mail, Lock, UserPlus } from 'lucide-svelte';
	import Input from './ui/Input.svelte';
	import Button from './ui/Button.svelte';
	import ErrorDisplay from './ErrorDisplay.svelte';

	let { isLogin, onToggleModal, onToggleLoginSignup, onHandleLogin } = $props<{
		isLogin: boolean;
		onToggleModal: () => void;
		onToggleLoginSignup: () => void;
		onHandleLogin: (formData: FormData) => void;
	}>();

	let email = $state('');
	let password = $state('');
	let confirmPassword = $state('');
	let error = $state('');

	function clearError(): void {
		error = '';
	}

	function handleSubmit(event: Event) {
		event.preventDefault();
		const formData = new FormData(event.target as HTMLFormElement);
		formData.append('isLogin', String(isLogin));
		onHandleLogin(formData);
	}
</script>

<div class="fixed inset-0 z-50 flex items-center justify-center">
	<!-- Backdrop -->
	<div
		class="absolute inset-0 bg-neutral-900/60 backdrop-blur-sm z-40 pointer-events-auto"
		aria-hidden="true"
		onclick={onToggleModal}
	></div>

	<!-- Modal Content -->
	<div
		class="relative bg-white dark:bg-neutral-800 rounded-xl shadow-2xl max-w-md w-full p-8 z-50 pointer-events-auto transition-all duration-300 ease-out transform"
	>
		<header class="flex justify-between items-center mb-6">
			<h2 id="modal-title" class="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
				{isLogin ? 'Welcome Back' : 'Create Account'}
			</h2>
			<button
				onclick={onToggleModal}
				aria-label="Close modal"
				class="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 transition-colors"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M6 18L18 6M6 6l12 12"
					/>
				</svg>
			</button>
		</header>

		<ErrorDisplay message={error} />

		<form class="space-y-6" onsubmit={handleSubmit}>
			<div>
				<label
					for="email"
					class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1"
				>
					Email
				</label>
				<div class="relative">
					<Input
						id="email"
						type="email"
						name="email"
						bind:value={email}
						oninput={clearError}
						placeholder="you@example.com"
						class="pl-10 w-full text-indent-[2.5rem]"
						required
					/>
					<Mail
						class="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-400"
					/>
				</div>
			</div>
			<div>
				<label
					for="password"
					class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1"
				>
					Password
				</label>
				<div class="relative">
					<Input
						id="password"
						type="password"
						name="password"
						bind:value={password}
						oninput={clearError}
						placeholder="••••••••"
						class="pl-10 w-full text-indent-[2.5rem]"
						required
					/>
					<Lock
						class="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-400"
					/>
				</div>
			</div>
			{#if !isLogin}
				<div>
					<label
						for="confirmPassword"
						class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1"
					>
						Confirm Password
					</label>
					<div class="relative">
						<Input
							id="confirmPassword"
							type="password"
							bind:value={confirmPassword}
							oninput={clearError}
							placeholder="••••••••"
							class="pl-10 w-full text-indent-[2.5rem]"
							required
						/>
						<UserPlus
							class="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-400"
						/>
					</div>
				</div>
			{/if}
			<Button type="submit">
				{isLogin ? 'Sign In' : 'Create Account'}
			</Button>
		</form>

		<div class="mt-6 text-center">
			<button
				onclick={onToggleLoginSignup}
				class="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 transition-colors"
			>
				{isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
			</button>
		</div>
	</div>
</div>
