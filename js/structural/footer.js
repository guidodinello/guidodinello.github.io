const instagram = "";
const twitter = "";
const github = "https://github.com/guidodinello";
const facebook = "";
const linkedin = "https://www.linkedin.com/in/guido-dinello-48875b217/";

const footer = `
<div class="container">
<footer class="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top row bg-light">

    <div class="col-sm-4 order-2 order-sm-0 d-flex justify-content-center  align-items-center">
        <small class="mb-3 mb-md-0 text-muted">© 2022 All rights reserved</small>
    </div>

    <a href="/"
        class="col-sm-4 order-1 order-sm-1 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none fw-bold">
        Guido
    </a>

    <ul
        class="nav col-sm-4 order-0 order-sm-2 justify-content-center list-unstyled mb-3 mb-sm-0 d-flex grow-icons">
        <li class="ms-3"><a class="text-muted" target="_blank" href="${instagram}"><i class="fab fa fa-instagram fa-xl"></i></a></li>
        <li class="ms-3"><a class="text-muted" target="_blank" href="${twitter}"><i class="fab fa fa-twitter fa-xl"></i></a></li>
        <li class="ms-3"><a class="text-muted" target="_blank" href="${github}"><i class="fab fa fa-github fa-xl"></i></a></li>
        <li class="ms-3"><a class="text-muted" target="_blank" href="${facebook}"><i class="fab fa fa-facebook fa-xl"></i></a></li>
        <li class="ms-3"><a class="text-muted" target="_blank" href="${linkedin}"><i class="fab fa fa-linkedin fa-xl"></i></a></li>
    </ul>

</footer>
</div>
`
document.body.insertAdjacentHTML("beforeend", footer);