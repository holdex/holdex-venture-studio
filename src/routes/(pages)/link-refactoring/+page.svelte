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
  href: 'https://clearpool.finance',
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
  text: 'https://clearpool.finance',
  href: 'https://clearpool.finance',
  title: 'An article heading link with an external URL and a URL that should be truncated. but not working',
};
</script>

<div class="m-auto w-[500px] mt-[50px] flex flex-col gap-4">
  <Link item={link}>{link.text}</Link>
  <Link item={link2}>{link2.text}</Link>
  <Link item={link3}>{link3.text}</Link>
  <Link item={link4}>{link4.text}</Link>
</div>
