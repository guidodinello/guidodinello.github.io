export function imageElement(src = "../../resources/imgs/null.webp", alt = "default image") {
    return `<img src="${src}" alt="${alt}" style="max-height:280px; object-fit:contain;">`;
}

export function cardBody(title, description, btnsArr) {
    return `
<h5 class="card-title mb-4">${title}</h5>
<p class="card-text mb-3" ${description ? `>${description}`: "style='height:30px;'>"}</p>
<div class="d-flex justify-content-evenly"> 
    ${btnsArr.map(btn => `<a href="${btn.url}" class="btn btn-primary me-2" target="_blank">${btn.text}</a>`).join("")}
</div>`;
}

export function tagFactory(tags) {
    function tagHTML(name) {
        const GOOGLE_SEARCH = "https://www.google.com/search?q=";
        const classList = "nav-link increase-on-hover link-success rounded-pill bg-success px-2 py-1 mt-2 mb-1 text-success bg-opacity-10 text-opacity-75 fw-light";
        const style = "min-width: 40px; font-size: small;";
        return `
        <li class="nav-item me-2">
            <a class="${classList}" style="${style}" target="_blank" href="${GOOGLE_SEARCH}${name}">${name}</a>
        </li>`;
    }
    let html = ""
    for (const tagName of tags) {
        html += tagHTML(tagName);
    }
    return html;
}


export function projectCard(leftSideHTML, tagsHTML, rightSide) { 
    const card = document.createElement('div');
    card.classList.add("project-item", "card", "text-center", "mb-4");
    card.innerHTML = `
<div class="card-body">
    <div class="row d-flex">
        <div class="order-md-last col-md-4 d-flex alig-items-center justify-content-center p-3 py-md-0 ps-md-0">
            
        </div>  
        <div class="order-md-first col-md-8 pe-3">
            ${leftSideHTML}
        </div>
    </div>
</div>
<div class="card-header">
    <ul class="nav nav-tabs border-0 d-flex float-end">
        ${tagsHTML}
    </ul>
</div>`;

    card.querySelector(".order-md-last").appendChild(rightSide);
    
    return card;
}