<script lang="ts">
  import Link from '$components/BodyRenderer/Blocks/link.svelte';

  type Item = {
    type: string;
    text: string;
    href: string;
    title?: string;
    iconSize?: number;
  };

  const link: Item = {
    type: 'link',
    text: 'Link 1',
    href: 'https://holdex.io',
    title: 'A link component with type "link" and a Holdex URL.',
  };

  const link2: Item = {
    type: 'heading-link',
    text: 'Link 2',
    href: 'https://clearpool.finance/lending-prime-',
    title: 'A heading link with an external URL.',
  };

  const link3: Item = {
    type: 'article-heading-link',
    text: 'Link 3',
    href: '/about',
    title: 'An article heading link with an internal URL.',
  };

  const link4: Item = {
    type: 'article-heading-link',
    text: 'https://example.com/this/is/a/long/path',
    href: 'https://example.com/this/is/a/long/path',
    title: 'An article heading link with an external URL and a URL that should be truncated.',
  };
</script>

<div class="m-auto w-[500px] mt-[50px] flex flex-col gap-4">
  <Link item={link} let:text>{text}</Link>
  <Link item={link2} let:text>{text}</Link>
  <Link item={link3} let:text>{text}</Link>
  <Link item={link4} let:text>{text}</Link>
</div>
