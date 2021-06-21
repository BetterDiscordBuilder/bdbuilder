import React from "react";

export const REACT_MEMO = Symbol.for("react.memo");
export const REACT_PORTAL = Symbol.for("react.portal");
export const REACT_ELEMENT = Symbol.for("react.element");
export function resolveReactElement(element) {
    if (typeof element === "undefined") return null;

    const isValid = 
        Array.isArray(element)
        || typeof element === "string"
        || ~[REACT_PORTAL, REACT_ELEMENT].indexOf(element.$$typeof);

    if (isValid) return element;
    if (typeof element === "function") return React.createElement(element, null);

    return null;
}