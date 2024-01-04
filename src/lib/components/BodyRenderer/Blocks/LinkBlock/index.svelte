 <script lang="ts">
  import { Link } from '$components/Icons';
  import Icon from '$components/Icons/index.svelte';
  import { onMount } from 'svelte';

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

  function isURL(text: string) {
    const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    return urlPattern.test(text);
  }

  async function fetchMetaTags(url: string) {
    const response = await fetch(`/api/og-meta-data?site=${encodeURIComponent(url)}`);
    const data = await response.json();
    return data;
  }

  export let item: Item;

  let metaData: MetaData = {
    title: "",
    description: "",
    images: [],
  };


  $: site = item.href;
  $: text = item.text;
  
  let loading = false;


  onMount(async () => {
    if (isURL(text)) {
      try {
        loading = true;
        const data: MetaData = await fetchMetaTags(site);
        metaData = data
      } catch (error) {
        console.error('Error fetching meta tags:', error);
      } finally {
        loading = false;
      }
    }
  });


  $: title = metaData.title;
  $: description = metaData.description;
  $: src = metaData.images?.[0];
</script>


{#if isURL(text)}
  <div class="link-block bg-l1 border border-solid border-l3 w-full overflow-hidden dark:bg-l2 flex rounded-xl">
    {#if (title && description) || src}
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
          <p class="ellipsis text-t1 title">{title !== undefined ? title : ""}</p>
          <p class="ellipsis text-t3 description">{description !== undefined ? description : ""}</p>
          <div><slot /></div>
        </div>
      </div>
    {/if}
  </div>
{:else}
  <slot/>
{/if}






<style lang="scss" src="./linkblock.scss"></style>
