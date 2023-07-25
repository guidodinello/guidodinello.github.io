export class Carousel {
    constructor(id, parentNode) {
        this.id = this.#sanitize(id);
        this.carousel = this.#element();
        if (parentNode) {parentNode.appendChild(this.carousel);}
        this.itemsList = this.carousel.querySelector(".carousel-inner");
    }

    clone() {
        const copy = new Carousel(`${this.id}Copy`);
        copy.carousel = this.carousel.cloneNode(true);
        copy.carousel.setAttribute("id", `carouselControls${copy.id}`);
        copy.carousel
            .querySelector(".carousel-control-prev")
            .setAttribute("data-bs-target", `#carouselControls${copy.id}`);
        copy.carousel
            .querySelector(".carousel-control-next")
            .setAttribute("data-bs-target", `#carouselControls${copy.id}`);
        return copy;
    }

    addItems(items, slideFunc) {
        items.forEach((item) => {
            this.itemsList.appendChild(slideFunc(item));
        });
        // add one default slide if there are no slides
        if (!this.itemsList.firstElementChild)
        {this.itemsList.appendChild(this.slideCreator(this.imageDefault));}
        // add active class to the first slide
        this.itemsList.firstElementChild.classList.add("active");
    }

    slideCreator(creatorFunc, onclickevent = void 0) {
        const item = document.createElement("div");
        item.classList.add("carousel-item", "h-100");
        item.addEventListener("click", onclickevent);
        item.innerHTML = creatorFunc();
        return item;
    }

    imageDefault(src = "../../resources/imgs/null.webp", alt = "default image") {
        return `<img src="${src}" class="d-block w-100 h-100" style="object-fit:contain;" alt="${alt}">`;
    }

    DOMreference() {
        return this.carousel;
    }

    id() {
        return this.id;
    }

    #element() {
        const carousel = document.createElement("div");
        carousel.classList.add("carousel", "slide");
        carousel.setAttribute("id", `carouselControls${this.id}`);
        carousel.setAttribute("data-bs-ride", "carousel");
        carousel.innerHTML = `
        <div class="carousel-inner h-100">
            <!-- Aca van los items -->
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselControls${this.id}"
            data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselControls${this.id}"
            data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
        </button>`;
        return carousel;
    }

    #sanitize(id) {
        return id.replace(/[^a-zA-Z0-9]/g, "");
    }
}
