const CV_PATH = "../../resources/Guido Dinello.pdf"

const brandHTML = `<a class="navbar-brand mx-auto" href="index.html">Guido Dinello</a>`;
const dropdownName = "More";
const dropdownItem = (name, url = "", onclick = "") => {
    return `<li><a class="dropdown-item" 
        ${url==""? "" : `href="${url}"`} 
        ${onclick==""? "" : `onclick="${onclick}();"`}
        >${name}</a></li>`;
}
const downloadableDropdownItem = (name, url) => {
    return `<li><a class="dropdown-item" href="${url}" download>${name}</a></li>`;
}
const searchBar = `
<div class="col col-md-10 mx-auto">
    <form id="searchForm" class="d-flex input-group" role="search">
        <input class="form-control" type="search" placeholder="Project name" aria-label="Search">
        <button class="btn btn-outline-success">
            <div id="spinner" class="spinner-border spinner-border-sm text-success d-none" role="status">
                <span class="visually-hidden"></span>
            </div>    
            Search
        </button>
    </form>
</div>`

const contactItemWaveAction = () => {
    const contactList = document.querySelector("#contactList");
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
    
    const interval = 350; // how much time should the delay between two iterations be
    contactList.querySelectorAll("li").forEach((li, index) => {
        // delay between each iteration
        setTimeout( () => {
            li.style.transition = "all .45s ease-in-out";
            li.style.transform = "scale(2.0)";

            const icon = li.querySelector("i");
            const oldColor = icon.style.color;
            icon.style.color = "orange";

            // restore old values
            setTimeout(() => {
                li.style.transform = "scale(1.0)";
                icon.style.color = oldColor;
            }, interval*1.5);
        }, index * interval);
    });
}

const togglerBtn =`
<button class="navbar-toggler" style="min-width:56px; max-width:58px;" type="button" data-bs-toggle="collapse" data-bs-target="#navbarListItems" aria-controls="navbarListItems" aria-expanded="false" aria-label="Toggle navigation">
<span class="navbar-toggler-icon"></span>
</button>
`

const header = `
<nav class="navbar navbar-expand-lg bg-light">
  <div class="container-fluid justify-content-center">
    <div class="row w-100">
        <div class="col-12 col-md-2 col-lg-2 d-flex justify-content-center mb-2">
            ${brandHTML}
        </div>
        <div class="col-10 col-md-9 col-lg-7 d-flex justify-content-center align-items-center">
            ${searchBar}
        </div>
        <div class="col-2 col-md-1 d-flex justify-content-center mx-auto d-lg-none">
            ${togglerBtn}
        </div>

        <div class="col-lg-3 collapse navbar-collapse justify-content-center" id="navbarListItems">
        <ul class="navbar-nav mb-2 mb-lg-0">
            <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="index.html">Home</a>
            </li>
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    ${dropdownName}
                </a>
                <ul class="dropdown-menu dropdown-menu-end text-center">
                    ${dropdownItem("Contact", "","contactItemWaveAction")}
                    ${downloadableDropdownItem("my_cv.pdf", CV_PATH, "")}
                </ul>
            </li>
        </ul>
        </div>
    </div>
  </div>
</nav>
`

document.body.insertAdjacentHTML("afterbegin", header);

