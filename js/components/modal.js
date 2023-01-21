export class Modal {
    constructor(parentNode) {
        this.modal = this.#element();
        parentNode.appendChild(this.modal);
        this.title = this.modal.querySelector("#modalLabel");
        this.body = this.modal.querySelector("#modalBody");
    }

    #element() {
        const modal = document.createElement("div");
        modal.classList.add("modal", "fade");
        modal.setAttribute("id", "modal");
        modal.setAttribute("tabindex", "-1");
        modal.setAttribute("aria-labelledby", "ModalLabel");
        modal.setAttribute("aria-hidden", "true");
        modal.innerHTML = `
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="modalLabel">Modal title</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body" id="modalBody">
                <!-- Aca va la imagen del modal -->
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
        </div>
    </div>`;

        return modal;
    }

    update(title, body) {
        this.title.textContent = title;
        this.body.innerHTML = body;
    }
    
}