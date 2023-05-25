<script lang="ts">

	type Item = {
		type: string;
		text: string;
		href: string;
		title?: string;
	};

	export let item: Item;

	item.href=`/c?filter=${encodeURIComponent(item.text.toLowerCase().slice(1))}`

	let classes =
		'relative inline-block underline underline-offset-4 bg-accent1-default/15 text-accent1-default  transition-colors hover:bg-accent1-default/25';

	$: text = item.text || item.href;
</script>

{' '}
<a
	title={item.title ? item.title : ''}
	href={item.href}
	class={classes}
	rel="noreferrer"

> {text}
</a>
