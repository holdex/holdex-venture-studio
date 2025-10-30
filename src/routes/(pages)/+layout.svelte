<script lang="ts">
  /* eslint-disable @typescript-eslint/no-unused-vars */
  /** external deps */
  import { page } from '$app/stores';
  import { isBrowser, routes } from '$lib/config';
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';
  import { setContext } from 'svelte';
  import { browser } from '$app/environment';
  import { slide, fade } from 'svelte/transition';

  /** internal deps */
  import {
    socialIcons,
    Bars3,
    XMark,
    ExclamationTriangle,
    CheckCircle,
    ChatBubbleBottomCenter,
    XCircle,
  } from '$components/Icons';
  import Icon from '$components/Icons/index.svelte';
  import SVGIcon from '$components/Icons/SVGIcon.svelte';
  import { regExp } from '$components/BodyParser/utils';
  import { deserialize, applyAction } from '$app/forms';
  import { scrollToElement } from '$lib/utils';
  import Button from '$components/Button/index.svelte';
  import type { SVGIconName } from '$components/Icons/types';
  import Link from '$components/BodyRenderer/Blocks/link.svelte';
  import InputSelect from '$components/InputSelect/index.svelte';

  export let data;

  let email = '';
  let message = '';
  let name = '';
  let isError = false;
  let success = false;
  let failed = false;
  let isBurgerDropdownShown = false;
  let theme = globalThis.localStorage?.getItem('theme') as 'dark' | 'light' | undefined | null;
  let themeIconName: SVGIconName = theme ? (theme === 'dark' ? 'sun' : 'moon') : 'sun';
  let inquiryType: 'job' | 'partnership' | 'product' | 'tge' | 'other' | undefined = undefined;

  const inquiryOptions = [
    { value: 'job', label: 'Apply for a job' },
    { value: 'partnership', label: 'Propose partnership' },
    { value: 'product', label: 'Need help with my product' },
    { value: 'tge', label: 'Need help with TGE' },
    { value: 'other', label: 'Other' },
  ];

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
    setTimeout(() => {
      success = false;
    }, 5000);
  };

  const displayFailed = () => {
    failed = true;
    setTimeout(() => {
      failed = false;
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

  const onContactFormSubmit = async (event: Event) => {
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

    if (result.type === 'success') {
      displaySuccess();
    } else {
      displayFailed();
    }
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

  const isExternalLink = (href: string) => {
    return !(regExp.holdexLink.test(href) || regExp.internalLink.test(href));
  };

  $: banner = data?.announcement?.banner
    ? {
        ...data.announcement.banner,
        target:
          data.announcement.banner?.href && isExternalLink(data.announcement.banner.href)
            ? '_blank'
            : '_self',
        rel:
          data.announcement.banner?.href && isExternalLink(data.announcement.banner.href)
            ? 'noopener noreferrer'
            : undefined,
      }
    : undefined;

  $: postIt = data?.announcement?.post_it
    ? {
        ...data.announcement.post_it,
        target:
          data.announcement.post_it?.href && isExternalLink(data.announcement.post_it.href)
            ? '_blank'
            : '_self',
        rel:
          data.announcement.post_it?.href && isExternalLink(data.announcement.post_it.href)
            ? 'noopener noreferrer'
            : undefined,
      }
    : undefined;
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

  .border-decoration
    &:before
      content: ""
      position: absolute
      top: -1px
      left: 10%
      width: 200px
      height: 1px
      background-repeat: no-repeat
      @media screen and (max-width: 450px)
        left: 5%
    &:after
      content: ""
      position: absolute
      bottom: -1px
      right: 10%
      width: 200px
      height: 1px
      background-repeat: no-repeat
      @media screen and (max-width: 450px)
        right: 5%
        
  .border-decoration-dark
    &:before
      background: linear-gradient(90deg, rgba(47, 50, 61, 0.00) 0.5%, rgba(0, 204, 255, 0.25) 25.56%, #0CF 50.63%, rgba(0, 204, 255, 0.25) 75.69%, rgba(47, 50, 61, 0.00) 100.75%) 
    &:after
      background: linear-gradient(90deg, rgba(47, 50, 61, 0.00) 0.5%, rgba(0, 204, 255, 0.25) 25.56%, #0CF 50.63%, rgba(0, 204, 255, 0.25) 75.69%, rgba(47, 50, 61, 0.00) 100.75%) 
  .border-decoration-light
    &:before
      background: linear-gradient(90deg, rgba(47, 50, 61, 0) 0.5%, rgba(46, 131, 229, 0.25) 25.56%, #2E83E5 50.63%, rgba(46, 131, 229, 0.25) 75.69%, rgba(47, 50, 61, 0) 100.75%)      
    &:after
      background: linear-gradient(90deg, rgba(47, 50, 61, 0) 0.5%, rgba(46, 131, 229, 0.25) 25.56%, #2E83E5 50.63%, rgba(46, 131, 229, 0.25) 75.69%, rgba(47, 50, 61, 0) 100.75%)
</style>
