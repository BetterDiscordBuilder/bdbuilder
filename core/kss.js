export default `assign {
    resolve: function resolve(selectors, selector = true) {
        const keys = selectors.split(" ");
        const module = window.BdApi.findModule(e => keys.every(s => s.startsWith("-") ? !e[s.slice(1)] : typeof e[s] == "string"));
        if (selector) return keys.reduce((clas, key) => {
            if (key.startsWith("-")) return clas;
            clas += "." + module[key].split(" ").join(".");
            return clas;
        }, "");
    
        return keys.reduce((clas, key) => {
            if (key.startsWith("-")) return clas;
    
            clas += module[key] + " ";
            
            return clas;
        }, "").trimEnd();
    }
}`;