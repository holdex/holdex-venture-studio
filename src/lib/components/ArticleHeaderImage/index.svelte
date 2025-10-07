<script lang="ts">
  import { onMount, tick } from 'svelte';

  export let className: string = '';
  export let id: string = '';

  let headingElement: HTMLElement | undefined;
  let isMultiLine = false;
  let isChecked = false;

  const defaultClasses =
    'smDown:relative smDown:top-0 absolute bottom-0 left-1/2 -translate-x-1/2 text-title-l font-satoshi text-center py-3.625 smDown:py-0 xs:text-title-s dark:text-white smDown:text-black text-white w-full smDown:p-2';

  onMount(async () => {
    await tick();
    const result = await tick();
    checkSingleLine();
  });

  function checkSingleLine() {
    if (headingElement) {
      const tempElement = document.createElement('h1');
      tempElement.innerHTML = headingElement.innerHTML;
      tempElement.style.position = 'absolute';
      tempElement.style.visibility = 'hidden';
      tempElement.style.whiteSpace = 'nowrap';
      tempElement.style.width = 'auto';

      tempElement.className = `${defaultClasses} ${className}`.replace(/!?pt-[\d.]+/g, '').trim();

      document.body.appendChild(tempElement);
      const singleLineHeight = tempElement.offsetHeight;

      document.body.removeChild(tempElement);

      const actualHeight = headingElement.offsetHeight;

      const tolerance = 5;
      isMultiLine = actualHeight > singleLineHeight + tolerance;
      isChecked = true;
    }
  }

  $: finalClassName = isChecked
    ? `${defaultClasses} ${className} ${isMultiLine ? '' : '!pb-0'}`.trim()
    : `${defaultClasses} ${className} !pb-0`.trim();
</script>

<h1 class={finalClassName} {id} bind:this={headingElement}>
  <slot />
</h1>

<slot name="subtitle" />
