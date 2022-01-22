module.exports = `class StyleLoader {
    static styles = "";
    static element = null;
    static append(module, css) {
        this.styles += \`/* \${module} */\\n\${css}\`;
    }
    static inject(name) {
        if (!name) name = config.name ?? config.info.name;

        if(this.element) this.element.remove();
        this.element = document.head.appendChild(Object.assign(document.createElement("style"), {id: name, textContent: this.styles}));
    }
    static remove() {
        if (this.element) {
            this.element.remove();
            this.element = null;
        }
    }
}`;