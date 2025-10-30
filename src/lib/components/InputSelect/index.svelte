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
  let dropdownEl: HTMLDivElement | null = null;

  let dropUp = false;
  let dropdownMaxHeight = 240;

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
    const recalcOnResize = () => {
      if (!open) return;
      positionDropdown();
    };
    window.addEventListener('resize', recalcOnResize);
    window.addEventListener('scroll', recalcOnResize, true);
    return () => {
      document.removeEventListener('click', handleDocumentClick);
      window.removeEventListener('resize', recalcOnResize);
      window.removeEventListener('scroll', recalcOnResize, true);
    };
  });

  $: selected = options.find((o) => o.value === value);

  import { tick } from 'svelte';

  const positionDropdown = () => {
    if (!rootEl) return;
    const rect = rootEl.getBoundingClientRect();
    const viewportH = window.innerHeight;
    const spaceBelow = viewportH - rect.bottom - 8;
    const spaceAbove = rect.top - 8;
    dropUp = spaceBelow < 180 && spaceAbove > spaceBelow;
    const available = Math.max(120, Math.floor((dropUp ? spaceAbove : spaceBelow) - 8));
    dropdownMaxHeight = Math.min(300, available);
  };

  $: if (open) {
    tick().then(positionDropdown);
  }
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
        absolute z-50 w-full rounded-xl border border-solid border-l4 bg-l2
        shadow-md overflow-auto
      "
      role="listbox"
      aria-activedescendant={selected ? `opt-${selected.value}` : undefined}
      tabindex="0"
      transition:fade={{ duration: 200, easing: cubicInOut }}
      bind:this={dropdownEl}
      style="max-height: {dropdownMaxHeight}px; {dropUp
        ? 'bottom: calc(100% + 4px);'
        : 'top: calc(100% + 4px);'}"
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
