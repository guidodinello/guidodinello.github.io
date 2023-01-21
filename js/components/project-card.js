export function imageElement(src, alt) {
    return `<img ${src ? `src="${src}" alt="${alt}"` : "src='../../json/null.webp' alt='default image'"}>`;
}

export function cardBody(title, description, button) {
    return `
<h5 class="card-title">${title}</h5>
<p class="card-text" ${description ? `>${description}`: "style='height:20px;'>"}</p>
${button ? `<a href="${button.url}" class="btn btn-primary" target="_blank">${button.name}</a>` : ""}`;
}

export function tagFactory(tags) {
    function tagHTML(name) {
        return `
        <li class="nav-item">
            <div class="nav-link">${name}</div>
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
        <div class="col-4">
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