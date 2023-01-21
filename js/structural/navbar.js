const CV_PATH = "../../resources/Guido Dinello.pdf"

const brandHTML = `<a class="navbar-brand" href="#">Guido Dinello</a>`;
const dropdownName = "More";
const dropdownItem = (name, url) => {
    return `<li><a class="dropdown-item" href="${url}">${name}</a></li>`;
}
const downloadableDropdownItem = (name, url) => {
    return `<li><a class="dropdown-item" href="${url}" download>${name}</a></li>`;
}
const searchBar = `
<form id="searchForm" class="d-flex input-group" role="search">
    <input class="form-control" type="search" placeholder="Project name" aria-label="Search">
    <button class="btn btn-outline-success" type="submit">
        <div class="spinner-border spinner-border-sm text-success" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>    
        Search
    </button>
</form>`

const header = `
<nav class="navbar navbar-expand-lg bg-light">
<div class="container-fluid">
    <div class="row w-100">
        <div class="col-2 d-flex justify-content-center">
            ${brandHTML}
        </div>
        <div class="col-6">
            ${searchBar}
        </div>
        <div class="col-4">
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDarkDropdown" aria-controls="navbarNavDarkDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavDarkDropdown">
                <ul class="navbar-nav">
                    <li class="nav-item dropstart">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            ${dropdownName}
                        </a>
                        <ul class="dropdown-menu dropdown-menu-dark">
                            ${dropdownItem("About Me", "#")}
                            ${dropdownItem("Projects", "#")}
                            ${dropdownItem("Contact", "javascript: document.body.scrollIntoView(false);")}
                            ${downloadableDropdownItem("my_cv.pdf", CV_PATH)}
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</div>
</nav>
`
document.body.insertAdjacentHTML("afterbegin", header);

