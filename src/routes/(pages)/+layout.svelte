<script lang="ts">
  /* eslint-disable @typescript-eslint/no-unused-vars */
  /** external deps */
  import { page } from '$app/stores';
  import { isBrowser, routes } from '$lib/config';
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';
  import { setContext } from 'svelte';
  import { browser } from '$app/environment';

  /** internal deps */
  import {
    socialIcons,
    Bars3,
    XMark,
    ExclamationTriangle,
    CheckCircle,
    ChatBubbleBottomCenter,
  } from '$components/Icons';
  import Icon from '$components/Icons/index.svelte';
  import SVGIcon from '$components/Icons/SVGIcon.svelte';
  import { regExp } from '$components/BodyParser/utils';
  import { deserialize, applyAction } from '$app/forms';
  import { scrollToElement } from '$lib/utils';
  import Button from '$components/Button/index.svelte';
  import type { SVGIconName } from '$components/Icons/types';
  import Link from '$components/BodyRenderer/Blocks/link.svelte';

  let email = '';
  let message = '';
  let name = '';
  let isError = false;
  let success = false;
  let isBurgerDropdownShown = false;
  let theme = globalThis.localStorage?.getItem('theme') as 'dark' | 'light' | undefined | null;
  let themeIconName: SVGIconName = theme ? (theme === 'dark' ? 'sun' : 'moon') : 'sun';

  let themeContext = writable(themeIconName === 'sun' ? 'dark' : 'light');
  setContext('theme', themeContext);

  let headerVisible = true;
  let lastScrollY = 0;

  const onThemeToggle = () => {
    themeIconName = themeIconName === 'moon' ? 'sun' : 'moon';
    localStorage.setItem('theme', themeIconName === 'moon' ? 'light' : 'dark');
    $themeContext = themeIconName === 'sun' ? 'dark' : 'light';
  };

  let lastScrollTop = 0;
  let secondaryNavScrollLeft = 0;

  const isActive = (currentUrl: string, path: string, deepEqual = false) => {
    if (deepEqual) {
      return currentUrl === path;
    }
    return currentUrl.startsWith(path);
  };

  const isFilterActive = (currentUrl: URL, path: string, filter: string) => {
    const f = currentUrl.searchParams.get('filter');
    return currentUrl.pathname === path && filter === f;
  };

  const handleClick = (clbk?: any) => {
    clbk && clbk();
    return scrollToElement('contact-form', 64);
  };

  const displaySuccess = () => {
    success = true;
    setInterval(() => {
      success = false;
    }, 5000);
  };

  const handleScroll = () => {
    if (!browser) return;

    const currentScrollY = window.scrollY;
    const scrollThreshold = 5;

    if (currentScrollY > lastScrollY + scrollThreshold) {
      headerVisible = false;
    } else if (currentScrollY < lastScrollY - scrollThreshold) {
      headerVisible = true;
    }

    if (currentScrollY < 60) {
      headerVisible = true;
    }

    lastScrollY = currentScrollY;
  };

  onMount(() => {
    if (browser) {
      window.addEventListener('scroll', handleScroll, { passive: true });

      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  });

  const onContactFormSumbit = async (event: Event) => {
    const form = event.currentTarget as HTMLFormElement;
    const data = new FormData(form);

    const currentPage = window.location.pathname;
    data.append('pageUrl', currentPage);

    const response = await fetch(form.action, {
      method: 'POST',
      body: data,
      headers: {
        'x-sveltekit-action': 'true',
      },
    });

    const result = deserialize(await response.text());
    form.reset();
    name = '';
    email = '';
    message = '';
    applyAction(result);
    displaySuccess();
  };

  const setBodyClass = (state: boolean) => {
    if (state) {
      document?.body?.classList.add('menu-opened');
    } else {
      document?.body?.classList.remove('menu-opened');
    }
  };

  const toggleBurger = (newStatus = false) => {
    isBurgerDropdownShown = newStatus;
    setBodyClass(newStatus);
  };

  const validateEmail = (email: string) => {
    return regExp.email.test(email);
  };

  const displayError = (email: string) => {
    return !validateEmail(email) && email.length > 0 ? (isError = true) : (isError = false);
  };

  $: path = $page.url.pathname;
  $: form = $page.form;
  $: if (globalThis.document) {
    document.documentElement.dataset.theme = themeIconName === 'moon' ? 'light' : 'dark';
  }
</script>

<template lang="pug" src="./layout.pug">
</template>

<svelte:head>
  <style lang="scss" src="./layout.scss"></style>
  {@html `<script>document.documentElement.dataset.theme=localStorage.getItem('theme');</script>`}
</svelte:head>

<style lang="sass">
  .scrollbar-hide::-webkit-scrollbar
    display: none

  /* For IE, Edge and Firefox */
  .scrollbar-hide 
    -ms-overflow-style: none  /* IE and Edge */
    scrollbar-width: none  /* Firefox */

  @media (min-height: 768px) and (min-width: 1248px)
    :global(header)
      display: none !important
    
    :global(.sidebar)
      display: flex !important

  @media (max-height: 767px) 
    :global(.sidebar)
      display: none !important
    
    :global(header)
      display: block !important
</style>
