<script></script>

<nav>
    <a href="/">Home</a>
    <a href="/docs">Docs</a>
</nav>
<main class="page-content">
    <slot />
</main>

<style lang="scss" global>
    :root {
        color-scheme: dark;
        --base-border: #141414;
        --text-normal: #d1d5da;
        --text-muted: #959da5;
        --text-focus: #ffffff;
        --text-opacity: 255, 255, 255;
        --background-light: #2f363d;
        --background-gradient-light: #3a424b;
        --background: #24292e;
        --background-alt: #2a3036;
        --background-dark: #1d2125;
        --background-modifier-hover: var(--background-light);
        --background-modifier-active: #444d56;
    }

    *, *::before, *::after {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", Arial, sans-serif;
        box-sizing: border-box;
    }

    body, html {
        background-color: var(--background);
        height: 100%;
        width: 100%;
        margin: 0;
        padding: 0;
    }
    
    article {
        padding: 40px;
        padding-bottom: 60px;
    }

    .page-content {
        height: 100%;
        display: flex;
        color: var(--text-normal);
    }

    nav {
        display: flex;
        align-items: center;
        padding: 0 16px;
        height: 40px;
        background-color: var(--background-alt);
        border-bottom: 1px solid var(--base-border);
        a {
            text-decoration: none;
            font-size: 12px;
            color: var(--text-normal);
            margin-right: 16px;
            &:hover {
                text-decoration: underline;
            }
        }
    }
</style>