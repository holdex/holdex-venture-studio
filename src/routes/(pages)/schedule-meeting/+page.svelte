<script lang="ts">
  import MetaTags from '$components/MetaTags/index.svelte';
  import PageTitle from '$components/PageTitle/index.svelte';
  import { routes } from '$lib/config';
  import { onMount } from 'svelte';

  onMount(() => {
    (function (C, A, L) {
      let p = function (a, ar) {
        a.q.push(ar);
      };
      let d = C.document;
      C.Cal =
        C.Cal ||
        function () {
          let cal = C.Cal;
          let ar = arguments;
          if (!cal.loaded) {
            cal.ns = {};
            cal.q = cal.q || [];
            d.head.appendChild(d.createElement('script')).src = A;
            cal.loaded = true;
          }
          if (ar[0] === L) {
            const api = function () {
              p(api, arguments);
            };
            const namespace = ar[1];
            api.q = api.q || [];
            if (typeof namespace === 'string') {
              cal.ns[namespace] = cal.ns[namespace] || api;
              p(cal.ns[namespace], ar);
              p(cal, ['initNamespace', namespace]);
            } else p(cal, ar);
            return;
          }
          p(cal, ar);
        };
    })(window, 'https://app.cal.com/embed/embed.js', 'init');
    Cal('init', '30min', { origin: 'https://app.cal.com' });

    Cal.ns['30min']('inline', {
      elementOrSelector: '#my-cal-inline-30min',
      config: { layout: 'month_view' },
      calLink: 'zolotokrylin/30min',
    });

    Cal.ns['30min']('ui', {
      theme: 'dark',
      cssVarsPerTheme: {
        light: { 'cal-brand': '#11141E' },
        dark: { 'cal-brand': '#ffffff' },
      },
      hideEventTypeDetails: false,
      layout: 'month_view',
    });
  });
</script>

<MetaTags
  title="Schedule Meeting"
  description="Schedule a meeting with us to discuss your startup's needs"
  path={routes.scheduleMeeting}
/>

<template lang="pug" src="./template.pug"></template>
