<script lang="ts">
    import TextParagraph from '$components/TextParagraph/index.svelte';
  
    export let name: string;
    export let role: string;
    export let description: string;
    export let image: string;
    export let link: string;

    $: if (!name || !role || !description || !image || !link) {
        throw new Error('Team member card is missing required props');
    }
  </script>
  
  <template lang="pug" src="./template.pug"></template>