<script lang="ts">
  import { setContext, onMount } from 'svelte';
  import type { LayoutData } from './$types';
  import { page } from '$app/stores';

  import '../lib/components/Tracking/scripts';

  export let data: LayoutData;

  // detect version from url query parameter
  $: isV2 = $page.url.searchParams.has('v2');
  setContext<string>('deploymentUrl', data.deploymentUrl);

  onMount(() => {
    if (isV2 && !$page.url.pathname.includes('/v2/')) {
      const newPath = $page.url.pathname.replace('/', '/v2/');
      window.location.href = newPath;
    }
  });
</script>

<slot />

<style lang="scss" src="./layout.scss" global></style>
