<script lang="ts">
  import type { TestimonialElement } from '$components/BodyParser/blocks';

  let item: TestimonialElement;
</script>

<div class="mt-8 xs:mt-4 flex flex-col items-center w-full p-4">
  <div class="w-full max-w-[604px] rounded-xl border border-l4 divide-y divide-l4 bg-l1 dark:bg-l2">
    <div class="flex items-center gap-4 p-4">
      {#if item && item.picture?.url !== undefined}
        <div>{item.picture?.url}</div>
      {/if}
      <div>
        {#if item && item.name !== undefined}
          <div class="text-t1 font-bold text-lg">{item?.name}</div>
        {/if}
        {#if item && item.title !== undefined}
          <div class="text-t3 font-normal">{item?.title}</div>
        {/if}
      </div>
    </div>
    {#if item && item.content !== undefined}
      <div class="flex items-center p-4 font-normal text-lg text-t1">
        <!-- Convallis est pretium fermentum porta vitae etiam consequat donec. Et eu diam nibh dolor
        quam. Varius eu mattis elit ante mattis eu commodo amet ullamcorper. -->
        {item.content}
      </div>
    {/if}
  </div>
</div>
