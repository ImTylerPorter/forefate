<script lang="ts">
	import { Github, Twitter, Linkedin } from 'lucide-svelte';

	const navigation = {
		product: [
			{ name: 'Features', href: '#' },
			{ name: 'Pricing', href: '#' },
			{ name: 'Documentation', href: '#' },
			{ name: 'Guides', href: '#' }
		],
		company: [
			{ name: 'About', href: '#' },
			{ name: 'Blog', href: '#' },
			{ name: 'Careers', href: '#' },
			{ name: 'Press', href: '#' }
		],
		legal: [
			{ name: 'Privacy', href: '#' },
			{ name: 'Terms', href: '#' },
			{ name: 'Cookie Policy', href: '#' }
		],
		social: [
			{ name: 'Twitter', href: '#', icon: Twitter },
			{ name: 'GitHub', href: '#', icon: Github },
			{ name: 'LinkedIn', href: '#', icon: Linkedin }
		]
	};
</script>

<footer class="relative bg-neutral-50 border-t border-neutral-200">
	<div class="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8">
		<h2 id="footer-heading" class="sr-only">Footer</h2>
		<div class="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8">
			<div class="xl:grid xl:grid-cols-3 xl:gap-8">
				<div class="space-y-8 footer-text">
					<h3 class="text-2xl font-bold text-primary-600">Forefate</h3>
					<p class="text-sm leading-6">
						Making decision-making smarter with AI-powered simulations.
					</p>
					<div class="flex space-x-6">
						{#each navigation.social as item}
							<a href={item.href} class="text-neutral-500 hover:text-neutral-600">
								<span class="sr-only">{item.name}</span>
								<item.icon class="h-6 w-6" />
							</a>
						{/each}
					</div>
				</div>
				<div class="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
					<div class="md:grid md:grid-cols-2 md:gap-8">
						<div>
							<h3 class="text-sm font-semibold leading-6 text-neutral-900">Product</h3>
							<ul role="list" class="mt-6 space-y-4">
								{#each navigation.product as item}
									<li>
										<a
											href={item.href}
											class="text-sm leading-6 text-neutral-600 hover:text-neutral-900"
										>
											{item.name}
										</a>
									</li>
								{/each}
							</ul>
						</div>
						<div class="mt-10 md:mt-0">
							<h3 class="text-sm font-semibold leading-6 text-neutral-900">Company</h3>
							<ul role="list" class="mt-6 space-y-4">
								{#each navigation.company as item}
									<li>
										<a
											href={item.href}
											class="text-sm leading-6 text-neutral-600 hover:text-neutral-900"
										>
											{item.name}
										</a>
									</li>
								{/each}
							</ul>
						</div>
					</div>
					<div class="md:grid md:grid-cols-2 md:gap-8">
						<div>
							<h3 class="text-sm font-semibold leading-6 text-neutral-900">Legal</h3>
							<ul role="list" class="mt-6 space-y-4">
								{#each navigation.legal as item}
									<li>
										<a
											href={item.href}
											class="text-sm leading-6 text-neutral-600 hover:text-neutral-900"
										>
											{item.name}
										</a>
									</li>
								{/each}
							</ul>
						</div>
					</div>
				</div>
			</div>
			<div class="mt-16 border-t border-neutral-900/10 pt-8 sm:mt-20 lg:mt-24 footer-text">
				<p class="text-xs leading-5">
					© {new Date().getFullYear()} Forefate. All rights reserved.
				</p>
			</div>
		</div>
	</div>
</footer>
