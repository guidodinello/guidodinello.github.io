export class SpinnerWrapper {
    constructor(id, parentNode) {
        this.id = this.#sanitize(id);
        this.spinnerWrapper = this.#element();
        if (parentNode) {
            parentNode.appendChild(this.spinnerWrapper);
        }
    }

    show() {
        this.spinnerWrapper.classList.remove("d-none");
    }
    hide() {
        this.spinnerWrapper.classList.add("d-none");
    }

    DOMreference() {
        return this.spinnerWrapper;
    }

    id() {
        return this.id;
    }

    #element() {
        const wrapper = document.createElement("div");
        wrapper.setAttribute("id", this.id);
        wrapper.classList.add("d-none");
        wrapper.innerHTML = `
        <div id="spinner" class="spinner-border text-success" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>`;
        return wrapper;
    }

    #sanitize(id) {
        return id.replace(/[^a-zA-Z0-9]/g, "");
    }
}
