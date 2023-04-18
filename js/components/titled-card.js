export function titledCard(title, quote, author, button) {
    const card = document.createElement("div");
    card.classList.add("card", "mb-5");
    card.innerHTML = `
<div class="card-header">
    ${title}
</div>
<div class="card-body">
    <blockquote class="blockquote mb-0">
        <p>${quote}</p>
        <footer class="blockquote-footer mt-2"><cite title="${author}">${author}</cite>
            ${
    button
        ? `<a class="btn btn-primary float-end me-2" href="${button.href}">${button.text}</a>`
        : ""
}
        </footer>
    </blockquote>
</div>`;
    return card;
}
