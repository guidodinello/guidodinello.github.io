function factory(tag, id, classList, innerHTML) {
    id = id || "";
    classList = classList || [];
    innerHTML = innerHTML || "";

    const element = document.createElement(tag);
    element.id = id;
    element.classList.add(...classList);
    element.innerHTML = innerHTML;
    return element;
}

export function img(tag, id, classList, innerHTML, src, alt) {
    const img = factory(tag, id, classList, innerHTML);
    img.alt = alt || "";
    img.src = src || "";
}

export function header(nro = "1", id, classList, innerHTML, text) {
    const h = factory(`h${nro}`, id, classList, innerHTML);
    h.textContent = text || "";
    return h;
}

export function div(id, classList, innerHTML) {
    const div = factory("div", id, classList, innerHTML);
    return div;
}

export function button(id, classList, innerHTML, text) {
    const btn = factory("button", id, classList, innerHTML);
    btn.textContent = text || "";
    return btn;
}
