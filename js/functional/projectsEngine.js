import { cardBody, projectCard, imageElement } from "../components/project-card.js";

const PROJECTS_PATH = "../../json/projects.json";

const modal = document.querySelector("#modal");
const modalBody = modal.querySelector("#modalBody");
const modalTitle = modal.querySelector("#modalLabel");

async function loadProjects(){
    const projects = await fetch(PROJECTS_PATH).then(r => r.json());
    const projectsList = document.querySelector("#projectsList");
    for (const project of projects) {
        const left = cardBody(project.title, project.description, {name: "Go to project", url: project.url});
        const right = imageElement(project.image, `${project.title} image cover`);

        const card = projectCard(left, project.tabs, right);
        projectsList.appendChild(card);
    }
    return projectsList.children;
}

const projectsCards = await loadProjects();

const searchForm = document.querySelector("#searchForm");
const input = searchForm.querySelector("input");
const button = searchForm.querySelector("button");

input.addEventListener("input", (e) => {
    for (const card of projectsCards) {
        const title = card.querySelector(".card-title").textContent;
        const description = card.querySelector(".card-text").textContent;
        if (title.includes(e.target.value) || description.includes(e.target.value)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    }
});