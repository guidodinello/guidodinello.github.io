export function imageElement(src = "../../resources/imgs/null.webp", alt = "default image") {
    return `<img src="${src}" alt="${alt}" style="max-height:280px; object-fit:contain;">`;
}

export function cardBody(title, description, button) {
    return `
<h5 class="card-title mb-4">${title}</h5>
<p class="card-text mb-3" ${description ? `>${description}`: "style='height:30px;'>"}</p>
${button ? `<a href="${button.url}" class="btn btn-primary" target="_blank">${button.name}</a>` : ""}`;
}

export function tagFactory(tags) {
    const GOOGLE_SEARCH = "https://www.google.com/search?q=";
    function tagHTML(name) {
        return `
        <li class="nav-item">
            <a class="nav-link" target="_blank" href="${GOOGLE_SEARCH}${name}">${name}</a>
        </li>`;
    }
    let html = ""
    for (const tagName of tags) {
        html+=tagHTML(tagName);
    }
    return html;
}


export function projectCard(leftSideHTML, tagsHTML, rightSideHTML) { 
    const card = document.createElement('div');
    card.classList.add("project-item", "card", "text-center", "mb-4");
    card.innerHTML = `
<div class="card-body">
    <div class="row-cols-2 d-flex">
        <div class="col-8 pe-3">
            ${leftSideHTML}
        </div>
        <div class="col-4 d-flex alig-items-center justify-content-center">
            ${rightSideHTML}
        </div>  
    </div>
</div>
<div class="card-header">
    <ul class="nav nav-tabs card-header-tabs d-flex float-end">
        ${tagsHTML}
    </ul>
</div>`;
    return card;
}