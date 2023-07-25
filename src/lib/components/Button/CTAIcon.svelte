<script lang="ts">
	import { scrollToElement } from '$lib/utils';

	export let theme: string;
	
	const handleClick = (clbk?: any) => {
		clbk && clbk();
		return scrollToElement('contact-form', 64);
	};

</script>

<button class="fixed bottom-3 right-[14px] z-50 sm-up:hidden  rounded-xl shadow-button" on:click={() => handleClick(undefined)}>
	{#if theme === "sun"}
		<svg width="56" height="56" viewBox="8 4 56 56" fill="#00CCFF">
			<g>
				<rect x="8" y="4" width="56" height="56" rx="12" fill="#00CCFF"/>
				<path d="M23 33.0133C23 35.1467 24.4973 37.0053 26.6093 37.316C28.0333 37.5253 29.4733 37.688 30.9267 37.8013C31.548 37.8507 32.1173 38.176 32.464 38.696L36 44L39.536 38.696C39.8827 38.176 40.452 37.8507 41.0733 37.8027C42.5267 37.688 43.9667 37.5253 45.3907 37.316C47.5027 37.0053 49 35.148 49 33.012V24.988C49 22.852 47.5027 20.9947 45.3907 20.684C42.2813 20.2276 39.1427 19.999 36 20C32.8107 20 29.6747 20.2333 26.6093 20.684C24.4973 20.9947 23 22.8533 23 24.988V33.012V33.0133Z" stroke="#10141F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
			</g>
		</svg>
	{:else if theme === "moon"}
		<svg width="56" height="56" viewBox="8 4 56 56" fill="#2E83E5">
			<g>
				<rect x="8" y="4" width="56" height="56" rx="12" fill="#2E83E5"/>
				<path d="M23 33.0133C23 35.1467 24.4973 37.0053 26.6093 37.316C28.0333 37.5253 29.4733 37.688 30.9267 37.8013C31.548 37.8507 32.1173 38.176 32.464 38.696L36 44L39.536 38.696C39.8827 38.176 40.452 37.8507 41.0733 37.8027C42.5267 37.688 43.9667 37.5253 45.3907 37.316C47.5027 37.0053 49 35.148 49 33.012V24.988C49 22.852 47.5027 20.9947 45.3907 20.684C42.2813 20.2276 39.1427 19.999 36 20C32.8107 20 29.6747 20.2333 26.6093 20.684C24.4973 20.9947 23 22.8533 23 24.988V33.012V33.0133Z" stroke="#FFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
			</g>
		</svg>
	{/if}
</button>
  