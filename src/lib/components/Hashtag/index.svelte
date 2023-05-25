<script lang="ts">
	export let element: string = 'li';

	export let size: 'medium' | 'small' = 'medium';

	export let type: 'link' | 'tag' = 'tag';

	export let isInline: boolean = false;

	let linkClasses =
		'relative inline-block underline underline-offset-4 bg-accent1-default/15 text-accent1-default  transition-colors hover:bg-accent1-default/25';

	if (!isInline) {
		linkClasses += 'text-paragraph-l';
	}

	export let tag: string;
	export let onClick: () => void;

	export let disabled: boolean = false;

	let className: string = '';

	export { className as class };

	$: sizeClass = `tag--${size}`;
	$: disabledClass = disabled ? 'tag__disabled' : '';

	$: classNames = ['tag', sizeClass, disabledClass, className].join(' ');

	$: type === 'link' ? (classNames = linkClasses) : null;
</script>

<svelte:element this={element} class={classNames} on:click={onClick}>
	{tag}
</svelte:element>

<style lang="sass" src="./style.sass">

</style>
