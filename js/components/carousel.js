export class Carousel {
    constructor(id, parentNode) {
        this.id = id;
        this.carousel = this.#element();
        if (parentNode) 
            parentNode.appendChild(this.carousel)
        this.itemsList = this.carousel.querySelector('.carousel-inner');
    }

    addItems(items, slideFunc) {
        items.forEach(item => {
            this.itemsList.appendChild(slideFunc(item))
        });
    }

    slideCreator(active = false, creatorFunc) {
        const item = document.createElement('div');
        item.classList.add('carousel-item', active? "active" : "");
        item.innerHTML = creatorFunc(); 
        return item;
    }

    imageDefault(src = "../../resources/imgs/null.webp", alt = "default image") {
        return `<img src="${src}" class="d-block w-100" alt="${alt}">`;
    }

    #element() {
        const carousel = document.createElement('div');
        carousel.classList.add('carousel', 'slide');
        carousel.setAttribute('id', `carouselControls${this.id}`);
        carousel.setAttribute('data-bs-ride', 'carousel');
        carousel.innerHTML = `
        <div class="carousel-inner">
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

    reference() {
        return this.carousel;
    }
}