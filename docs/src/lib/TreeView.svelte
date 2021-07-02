<script>
    import { page } from "$app/stores";
    import { slide } from 'svelte/transition';
    import { cubicInOut } from 'svelte/easing';

    export let tree = [];

    let expanded = false;
</script>

{#each tree as {name, path, children}}
    {#if children}
        <div class="subtree">
            <a class:selected={`/docs${path}` === $page.path} href="/docs{path}" on:click={() => expanded = !expanded}>
                <span>{name}</span>
                <button class:expanded on:click|stopPropagation|preventDefault={() => expanded = !expanded}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16">
                        <path fill="currentColor" fill-rule="evenodd" d="M9.78 12.78a.75.75 0 01-1.06 0L4.47 8.53a.75.75 0 010-1.06l4.25-4.25a.75.75 0 011.06 1.06L6.06 8l3.72 3.72a.75.75 0 010 1.06z"></path>
                    </svg>
                </button>
            </a>
            {#if expanded}
                <div class="subtree-items" transition:slide="{{duration: 250, easing: cubicInOut}}">
                    <svelte:self tree={children} />
                </div>
            {/if}
        </div>
    {:else}
        <a class:selected={`/docs${path}` === $page.path} href="/docs{path}">{name}</a>
    {/if}
{/each}

<style lang="scss">
    .subtree-items {
        position: relative;
        padding-left: 10px;
        margin-left: 10px;
        &::before {
            content: "";
            position: absolute;
            left: 0;
            top: 4px;
            height: calc(100% - 8px);
            padding: 4px 0;
            border-left: 1px solid var(--base-border);
        }
    }
    a {
        cursor: default;
        text-decoration: none;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 8px;
        font-size: 12px;
        color: var(--text-normal);
        height: 32px;
        &:hover {
            background-color: var(--background-modifier-hover);
        }
        &:active {
            background-color: var(--background-modifier-active);
        }
        &.selected {
            background-color: #0366d6;
            color: #fff;
            button {
                color: inherit;
            }
        }
        button {
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 0;
            border: none;
            background-color: transparent;
            width: 16px;
            height: 16px;
            color: var(--text-muted);
            border-radius: 2px;
            &:hover {
                border: 1px solid var(--base-border);
                background-color: var(--background);
            }
            &:active {
                color: var(--text-normal);
                background-color: var(--background-alt);
            }
            svg {
                transition: 250ms ease transform;
                width: 12px;
                height: auto;
            }
            &.expanded svg {
                transform: rotate(-90deg);
            }
        }
    }
</style>