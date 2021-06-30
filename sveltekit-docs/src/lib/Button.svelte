<script>
</script>

<button class="button" {...$$restProps} on:click on:mousedown on:moouseup on:mouseenter on:mouseleave on:focus on:blur>
    <slot />
</button>

<style lang="scss">
    .button {
        cursor: default;
        text-decoration: none;
        user-select: none;
        line-height: normal;
        font-size: 14px;
        font-weight: 400;
        padding: 5px 20px;
        border-radius: 2px;
        background: var(--background-light);
        border: 1px solid var(--base-border);
        color: var(--text-normal);
        display: flex;
        align-items: center;
        text-align: center;
        position: relative;
        &:hover {
            border-color: currentColor;
        }
        &:focus {
            border-color: currentColor;
            box-shadow: 0 0 0 1px currentColor;
        }
    }
</style>