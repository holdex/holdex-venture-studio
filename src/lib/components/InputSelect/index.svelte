<script lang="ts">
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import { cubicInOut, cubicOut } from 'svelte/easing';
  import Icon from '$components/Icons/index.svelte';
  import { ChevronDown } from '$components/Icons';

  type Option = { value: string; label: string };

  export let value: string | undefined;
  export let options: Option[] = [];
  export let placeholder = 'Select an option';
  export let disabled = false;

  let open = false;
  let rootEl: HTMLDivElement | null = null;

  const toggle = () => {
    if (disabled) return;
    open = !open;
  };

  const selectOption = (v: string) => {
    value = v;
    open = false;
  };

  const handleDocumentClick = (e: MouseEvent) => {
    if (!rootEl) return;
    if (!rootEl.contains(e.target as Node)) open = false;
  };

  const handleKeydown = (e: KeyboardEvent) => {
    if (disabled) return;
    if (e.key === 'Escape') open = false;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggle();
    }
  };

  onMount(() => {
    document.addEventListener('click', handleDocumentClick);
    return () => document.removeEventListener('click', handleDocumentClick);
  });

  $: selected = options.find((o) => o.value === value);
</script>

<div bind:this={rootEl} class="relative w-full">
  <button
    type="button"
    class="
      w-full relative rounded-xl border border-solid
      bg-l1 dark:bg-l2 border-l4 shadow-input
      h-14.5 px-3.625 text-left text-footnote leading-14.5 text-t1
      transition-all hover:border-accent1-default cursor-pointer
      disabled:opacity-50 disabled:cursor-not-allowed
    "
    aria-haspopup="listbox"
    aria-expanded={open}
    on:click={toggle}
    on:keydown={handleKeydown}
    {disabled}
  >
    <span class="text-t3" class:text-t1={!!selected}>
      {selected ? selected.label : placeholder}
    </span>
    <span
      class="absolute right-3.625 top-1/2 -translate-y-1/2 opacity-80 transition-transform duration-300 ease-in"
      style="transition-timing-function: cubic-bezier(0.22, 1, 0.36, 1);"
      class:rotate-180={open}
    >
      <Icon
        icon={{ solid: ChevronDown.solid, default: ChevronDown.default }}
        width={24}
        height={24}
        class="text-t3"
      />
    </span>
  </button>

  {#if open}
    <div
      class="
        absolute z-50 mt-1 w-full rounded-xl border border-solid border-l4 bg-l2
        shadow-md overflow-hidden
      "
      role="listbox"
      aria-activedescendant={selected ? `opt-${selected.value}` : undefined}
      tabindex="0"
      transition:fade={{ duration: 200, easing: cubicInOut }}
    >
      {#each options as opt}
        <div
          id={`opt-${opt.value}`}
          role="option"
          aria-selected={opt.value === value}
          class="
            px-3.625 py-3 text-footnote cursor-pointer
            {opt.value === value ? 'bg-l1 text-t1' : 'text-t3 hover:bg-l1'}
          "
          tabindex="0"
          on:click={() => selectOption(opt.value)}
          on:keydown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              selectOption(opt.value);
            }
          }}
        >
          {opt.label}
        </div>
      {/each}
    </div>
  {/if}
</div>
