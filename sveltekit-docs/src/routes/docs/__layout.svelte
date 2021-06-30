<script>
    import TreeView from "$lib/TreeView.svelte";

    const docsmap = [
        {
            name: "Getting Started",
            path: ""
        },
        {
            name: "CLI Arguments",
            path: "/cl"
        },
        {
            name: "Subtree",
            path: "/subtree",
            children: [
                {
                    name: "Nested Subpage 1",
                    path: "/subtree/nested/",
                    children: [
                        {
                            name: "Nested Subpage 2",
                            path: "/subtree/nested/nested",
                            children: [
                                {
                                    name: "Nested Subpage 3",
                                    path: "/subtree/nested/nested/nested"
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
</script>

<aside>
    <TreeView tree={docsmap} />
</aside>
<article>
    <slot />
</article>

<style lang="scss">
    aside {
        flex: 0 0 auto;
        display: flex;
        flex-direction: column;
        width: 265px;
        border-right: 1px solid var(--base-border);
        height: 100%;
        a {
            display: flex;
            align-items: center;
            font-size: 12px;
            color: var(--text-normal);
            text-decoration: none;
            padding: 0 16px;
            height: 40px;
            &:hover {
                background-color: var(--background-modifier-hover);
            }
            &:active {
                background-color: var(--background-modifier-active);
            }
        }
    }

    summary {
        display: flex;
    }
</style>
