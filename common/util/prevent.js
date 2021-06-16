/**
 * Event callback from `document.addEventListener("event", event => {})` wrapped with a `.preventDefault` and `.stopPropagation`
 * @param {Function} func Event Handler
 * @returns {Function}
 */
export default function preventPropagation(func) {
    return function (event) {
        event.preventDefault?.();
        event.stopPropagation?.();

        return func.apply(this, arguments);
    };
};