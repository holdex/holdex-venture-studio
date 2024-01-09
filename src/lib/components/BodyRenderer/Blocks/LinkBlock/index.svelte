<script lang="ts">
  import { Link as LinkIcon } from '$components/Icons';
  import Icon from '$components/Icons/index.svelte';
  import { onMount } from 'svelte';
  import Link from '../link.svelte'
  import TextWrapper from '../textWrapper.svelte';

  type Item = {
    type: string;
    text: string;
    href: string;
    title?: string;
  };

  interface OgImage {
    url: string;
    type: string;
  }

  interface OgResult {
    success: number;
    link: string;
    meta: {
      title?: string;
      site_name?: string;
      description?: string;
      image?: OgImage;
    };
  }

  export let item: Item;
  let metaInfo: OgResult;

  $: site = item.href;

  

  async function fetchMetaTags(url: string) {
    try {
      const response = await fetch(`/api/og-meta-data?site=${encodeURIComponent(url)}`);
      const data: OgResult = await response.json();
      metaInfo = data;
    } catch (error) {
      console.log(error);
    }
  }

  onMount(async () => {
      fetchMetaTags(site);
  });

  $: title = metaInfo?.meta?.title ?? '';
  $: description = metaInfo?.meta?.description ?? '';
  $: src = metaInfo?.meta?.image?.url ?? '';
</script>


<div class={`link-block bg-l1  border border-solid border-l3 w-full overflow-hidden dark:bg-l2 flex rounded-xl`}>
    {#if (metaInfo?.success === 1)}
      <div class={"h-full flex items-center justify-center image-link-container"}>
        {#if src}
          <img class="link-image rounded-xl" src={src} alt="Logo">
        {:else}
          <div class="icon-wrapper bg-l3">
            <Icon icon={LinkIcon} class="text-t3" width={30} height={30}/>
          </div>
        {/if}
      </div>
      <div class={`link-details ${src?"padding-with-image":"padding-no-image"}`}>
        <div class="w-full">
          <p class="ellipsis text-t1 title">{title}</p>
          <p class="ellipsis text-t3 description">{description}</p>
          <div class="link-wrapper">
            <Link item={item} let:text>
              <TextWrapper text={text}>
              <slot/>
              </TextWrapper>
            </Link>
          </div>
        </div>
      </div>
    {/if}
</div>


<style lang="scss" src="./linkblock.scss"></style>
