<script lang="ts">
  let className = '';

  export let style = '';
  export let pauseOnHover = true;
  export let pauseOnClick = true;
  export let direction: 'left' | 'right' = 'left';
  export let speed = 100;
  export let play = true;
  export let gap = '24px';
  export { className as class };

  let containerWidth: number;
  let marqueeWidth: number;

  $: duration = marqueeWidth < containerWidth ? containerWidth / speed : marqueeWidth / speed;
</script>

<div
  {style}
  class="flex w-full overflow-hidden flex-row relative [mask-image:_linear-gradient(to_right,transparent_0,_black_40px,_black_calc(100%-40px),transparent_100%)] {className}"
  bind:clientWidth={containerWidth}
  style:--gap={gap}
  style:--play={play ? 'running' : 'paused'}
  style:--direction={direction === 'left' ? 'normal' : 'reverse'}
  style:--duration={duration + 's'}
>
  <div
    class="flex-none min-w-full z-[1] flex flex-row items-center marquee-animation"
    style:gap="var(--gap, 0)"
    style:margin-right="var(--gap, 0)"
    bind:clientWidth={marqueeWidth}
    data-testid="marquee-slot"
    on:mouseenter={() => (play = !pauseOnHover)}
    on:mouseleave={() => (play = true)}
    on:mousedown={() => (play = !pauseOnClick)}
    on:mouseup={() => (play = true)}
  >
    <slot />
  </div>
  <div
    class="flex-none min-w-full z-[1] flex flex-row items-center marquee-animation"
    style:gap="var(--gap, 0)"
  >
    <slot />
  </div>
</div>

<style>
  .marquee-animation {
    animation: scroll var(--duration) linear infinite;
    animation-play-state: var(--play);
    animation-direction: var(--direction);
  }
  @keyframes scroll {
    0% {
      transform: translateX(0%);
    }
    100% {
      transform: translateX(calc(-100% - var(--gap)));
    }
  }
</style>
