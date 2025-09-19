<script lang="ts">
  import { onMount, tick } from 'svelte';

  export let className: string = '';
  export let id: string = '';

  let headingElement: HTMLElement | undefined;
  let isMultiLine = false;
  let isChecked = false;

  onMount(async () => {
    await tick();
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

      tempElement.className = className.replace(/!?pt-[\d.]+/g, '').trim();

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
    ? `${className} ${isMultiLine ? '' : '!pt-0'}`.trim()
    : `${className} !pt-0`.trim();
</script>

<h1 class={finalClassName} {id} bind:this={headingElement}>
  <slot />
</h1>
