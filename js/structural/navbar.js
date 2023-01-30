const CV_PATH = "../../resources/Guido Dinello.pdf"

const brandHTML = `<a class="navbar-brand mx-auto" href="index.html">Guido Dinello</a>`;
const dropdownName = "More";
const dropdownItem = (name, url = "#", onclick = "") => {
    return `<li><a class="dropdown-item" href="${url}" onclick="return ${onclick}();">${name}</a></li>`;
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

/*
would be nicer to iterate over the list of social media logos and make a "wave" effect
along with some coloring
*/
const contactItemAction = () => {
    const contactList = document.getElementById("contactList");
    contactList.scrollIntoView({behaviour:"smooth"})
    contactList.style.transition = "all .2s ease-in-out"; 
    contactList.style.transform = "scale(2.0)";
    const oldColor = contactList.style.color;
    contactList.style.background = "yellow";
    setTimeout(() => {
        contactList.style.transform = "scale(1.0)";
        contactList.style.background = oldColor;
    }, 1500);
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
                    ${dropdownItem("Contact", "#","contactItemAction")}
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

