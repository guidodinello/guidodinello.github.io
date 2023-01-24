const CV_PATH = "../../resources/Guido Dinello.pdf"

const brandHTML = `<a class="navbar-brand mx-auto" href="index.html">Guido Dinello</a>`;
const dropdownName = "More";
const dropdownItem = (name, url) => {
    return `<li><a class="dropdown-item" href="${url}">${name}</a></li>`;
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

const header = `
<nav class="navbar navbar-expand-lg bg-light">
<div class="container-fluid justify-content-center">
    <div class="row w-100">
        <div class="col-md-3 col-lg-2 d-flex justify-content-center">
            ${brandHTML}
        </div>
        <div class="col-10 col-md-8 justify-content-center d-flex ">
            ${searchBar}
        </div>
        <div class="col-2 col-md-1 col-lg-2 d-sm-flex justify-content-sm-center">
            <button class="navbar-toggler d-md-none d-flex" type="button" data-bs-toggle="collapse" data-bs-target="#More" aria-controls="More" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse d-none d-md-flex" id="navbarNavDarkDropdown">
                <ul class="navbar-nav d-none d-md-flex">
                    <li class="nav-item dropstart">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            ${dropdownName}
                        </a>
                        <ul class="dropdown-menu dropdown-menu-dark" id="More">
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

