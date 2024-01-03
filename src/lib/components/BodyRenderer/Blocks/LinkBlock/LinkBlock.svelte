<script lang="ts">
  import { Link } from '$components/Icons';
  import Icon from '$components/Icons/index.svelte';
  // import { onMount } from 'svelte';

  type Item = {
    type: string;
    text: string;
    href: string;
    title?: string;
  };

  type MetaData = {
    title: string;
    description: string;
    images: string[];
  };

  export let item: Item;

  let metaData: MetaData = {
    title: "Holdex",
    description: "We disrupt the status quo by accelerating the adoption of decentralized services that make the world a more inclusive place.",
    images: [''],
  };

  $: site = item.href;
  let loading = false;
 

  // async function fetchMetaTags(url: string) {
  //   const response = await fetch(`/api/og-meta-data?site=${encodeURIComponent(url)}`);
  //   const data = await response.json();
  //   return data;
  // }

  // onMount(async () => {
  //   try {
  //     const { title, description, images } = await fetchMetaTags(site);
  //     metaData = { title, description, images };
  //   } catch (error) {
  //     console.error('Error fetching meta tags:', error);
  //   } finally {
  //     loading = false;
  //   }
  // });

  $: title = metaData.title;
  $: description = metaData.description;
  $: src = metaData.images[0];
</script>

{#if loading}
  <div class="spinner-container ">
    <div class="spinner" role="status"></div>
  </div>
{:else}
  <div class="link-block bg-l1 border border-solid  border-l3 w-full overflow-hidden dark:bg-l2 flex rounded-xl ">
    <div class={"h-full flex items-center justify-center image-link-container"}>
      {#if src}
        <img class="link-image rounded-xl" src={src} alt="Logo">
      {:else}
        <div class="icon-wrapper bg-l3">
          <Icon icon={Link} class="text-t3" width={30} height={30}/>
        </div>
      {/if}
    </div>
    <div class="link-details">
      <div class="w-full">
        <p class="ellipsis text-t1 title">{title}</p>
        <p class="ellipsis text-t3 description">{description}</p>
        <div class="ellipsis"><slot /></div>
      </div>
    </div>
  </div>
{/if}

<style lang="scss" src="./linkblock.scss"></style>
