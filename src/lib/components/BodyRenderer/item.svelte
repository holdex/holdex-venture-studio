<script lang="ts">
  /* eslint-disable @typescript-eslint/no-unused-vars */
  import { Switch, Case } from '$components/Switch';

  import InlineBlock from './inline.svelte';
  import NestedList from './Blocks/nestedList.svelte';
  import Image from './Blocks/image.svelte';
  import Embed from './Blocks/embed.svelte';
  import EmbedGist from './Blocks/gist.svelte';
  import TallyButton from './Blocks/tallyButton.svelte';
  import Chart from './Blocks/chart.svelte';
  import Table from './Blocks/table.svelte';
  import CTA from './Blocks/cta.svelte';
  import Testimonial from './Blocks/testimonial.svelte';
  import LinkBlock from './Blocks/linkBlock.svelte';
  import { parseTableCell } from '../BodyParser/blocks';
  import TeamMemberCard from '$components/TeamMemberCard/index.svelte';

  export let item: any;
  export let isTableCell: boolean;
  export let index: number;

</script>

<template lang="pug" src="./item.pug">
</template>
