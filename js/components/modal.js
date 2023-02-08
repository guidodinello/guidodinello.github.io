export class Modal {
    constructor(id, parentNode) {
        this.id = this.#sanitize(id);
        this.modal = this.#element();
        parentNode.appendChild(this.modal);
        this.caption = this.modal.querySelector(".modal-caption");
        this.body = this.modal.querySelector(".modal-body");
    }

    DOMreference() {
        return this.modal;
    }

    #element() {
        const modal = document.createElement("div");
        modal.classList.add("modal");
        modal.setAttribute("id", this.id);
        modal.style.display = "none";

        modal.innerHTML = `
        <div class="modal-body"></div>
        <span class="modal-caption d-flex justify-content-center" style="color:white">
        </span>`;

        const span = document.createElement("span");
        span.classList.add("modal-close");
        span.innerHTML = "&times;";
        span.onclick = () => {
            modal.style.display = "none";
        }

        modal.prepend(span);

        return modal;
    }

    update(caption, body) {
        this.caption.innerHTML = '';
        this.body.innerHTML = '';
        let copy;
        if (caption) {
            copy = caption.cloneNode(true);
            this.caption.appendChild(copy);
        }
        if (body) {
            copy = body.cloneNode(true);
            this.body.appendChild(copy);
        }
    }

    show() {
        this.modal.style.display = "block";
    }

    hide() {
        this.modal.style.display = "none";
    }
    
    #sanitize(id) {
        return id.replace(/[^a-zA-Z0-9]/g, '');
    }
}