<script lang="ts">
  import { setContext } from 'svelte';
  import type { LayoutData } from './$types';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';

  import '../lib/components/Tracking/scripts';

  export let data: LayoutData;

  // detect version from url query parameter
  $: isV2 = $page.url.searchParams.has('v2');
  console.log('isV2', isV2);

  setContext<string>('deploymentUrl', data.deploymentUrl);
  setContext<boolean>('isV2', isV2);

  // redirect to v2
  $: if (isV2 && !$page.url.pathname.includes('/v2/')) {
    const newPath = $page.url.pathname.replace('/v2/', '/');
    goto(newPath);
  }
</script>

<slot />

<style lang="scss" src="./layout.scss" global></style>
