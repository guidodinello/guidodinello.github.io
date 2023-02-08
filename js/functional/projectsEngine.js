import { cardBody, projectCard, imageElement, tagFactory } from "../components/project-card.js";
import { wrapper as spinnerWrapper } from "../components/spinner.js";
import { Carousel } from "../components/carousel.js";
import { Modal } from "../components/modal.js";
import { header } from "../components/utils.js";

import { getRepos } from "../utils/github.js";
import { readJSON } from "../utils/jsonReader.js";

const pageSpinnerWrapper = spinnerWrapper(document.body);
const pageModal = new Modal("pageModal", document.body);

async function loadProjects(){
    const memory = []

    const repos = await getRepos({element: pageSpinnerWrapper, toggleClass: "d-none"});
    const images = await readJSON("../../config/images.json");
    const ignoreProjects = await readJSON("../../config/ignore_projects.json");

    // filter out projects that are in the ignore list
    const projects = repos.reduce((result, repo) => {
        if (! ignoreProjects.includes(repo.title))
            result.push(repo);
        return result;
    }, []);

    // merge projects with images
    const projsImgs = projects.map((project) => {
        project["images"] = images[project.title] || [];
        return project;
    });

    const projectsList = document.querySelector("#projectsList");
    for (const project of projsImgs) {

        const buttons  = [{ text: "Go to source code", url: project.url }]
        // add another button if theres github pages associated to the repo
        if (project.deploy)
            buttons.push({ text: "Go to deploy", url: project.deploy });

        const left = cardBody(project.title, project.description, buttons);

        const imgCarr = new Carousel(project.title)
        imgCarr.addItems(
            project.images, 
            (img) => {
                const imageCreator = () => { return imgCarr.imageDefault(img, `${project.title} illustrative image`) };
                return imgCarr.slideCreator( imageCreator )
            }
        );


        const showInModal = () => {
            pageModal.update(
                header('1', null, null, null, project.title), 
                imgCarr.clone().DOMreference()
            );
            pageModal.show()
        }
        imgCarr.DOMreference().style.cursor = "zoom-in";

        const card = projectCard(left, tagFactory(project.tags), imgCarr.DOMreference());
        projectsList.appendChild(card);
        
        console.log(imgCarr.DOMreference().isConnected)
        imgCarr.DOMreference().addEventListener("click", showInModal);
        
        memory.push([card, project])
    }
    return memory;
}
const projectsCards = await loadProjects();

const searchForm = document.querySelector("#searchForm");
const formInput = searchForm.querySelector("input");
const formSpinner = searchForm.querySelector("#form-spinner");

formInput.addEventListener("input", (e) => {
    formSpinner.classList.remove("d-none");
    setTimeout(() => {
        formSpinner.classList.add("d-none");
    }, 1000);

    for (const [card, {title, description, tags}] of projectsCards) {
        const target = e.target.value.toLowerCase();

        const tit = title.toLowerCase().includes(target);
        const desc = (description || "").toLowerCase().includes(target);
        const intags = tags.some(tag => tag.toLowerCase().includes(target));

        card.style.display = (tit || desc || intags) ? "flex" : "none";
    }
});
