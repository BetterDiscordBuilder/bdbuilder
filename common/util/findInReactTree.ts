import findInTree from "./findInTree";

export default function findInReactTree(tree = {}, filter = _ => _) {
    return findInTree(tree, filter, {
        walkable: ["props", "children"]
    });
}