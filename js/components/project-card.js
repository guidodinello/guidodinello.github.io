// const EMAIL = "guido.dinello";
// const DOMAIN = "gmail.com";

export function emailGroup(email, domain) {
    return `
<div class="input-group email-width">
    <input type="text" class="form-control text-end p-2" placeholder="${email}"
        aria-label="email">
    <span class="input-group-text p-2">@</span>
    <input type="text" class="form-control p-2" placeholder="${domain}" aria-label="domain">
</div>`;
}

export function imageElement(src, alt) {
    return `<img src="${src}" alt="${alt}">`;
}

export function cardBody(title, description, button) {
    return `
<h5 class="card-title">${title}</h5>
<p class="card-text">${description}</p>
${button ? `<a href="${button.url}" class="btn btn-primary" target="_blank">${button.name}</a>` : ""}`;
}

export function projectCard(leftSideHTML, tabs, rightSideHTML) { 
    function tabHandler(title, img) {
        modalTitle.textContent = title;
        modalBody.innerHTML = imageElement(img, `${title} image cover`);
    }
    function tab(name, url) {
        return `
        <li class="nav-item">
            <a data-bs-toggle="modal" data-bs-target="#modal" class="nav-link">${name}</a>
        </li>`;
    }
    let tabsHTML = "";
    for (const [tabName, tabUrl] of Object.entries(tabs)) {
        tabsHTML += tab(tabName, tabUrl);
    }

    const card = document.createElement('div');
    card.classList.add("project-item", "card", "text-center", "mb-4");
    card.innerHTML = `
    <div class="card-header">
        <ul class="nav nav-tabs card-header-tabs">
            ${tabsHTML}
        </ul>
    </div>
    <div class="card-body">
        <div class="row-cols-2 d-flex">
            <div class="col-8 pe-3">
                ${leftSideHTML}
            </div>
            <div class="col-4">
                ${rightSideHTML}
            </div>  
        </div>
    </div>`;
    return card;
}