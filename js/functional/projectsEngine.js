import { cardBody, projectCard, imageElement, tagFactory } from "../components/project-card.js";
import { wrapper } from "../components/spinner.js";

import { getRepos } from "../utils/github.js";
import { readJSON } from "../utils/jsonReader.js";

async function loadProjects(){
    const memory = []

    const repos = await getRepos({element: wrapper(document.body), toggleClass: "d-none"});
    const images = await readJSON("../../config/images.json");
    const ignoreProjects = await readJSON("../../config/ignore_projects.json");

    // filter out projects that are in the ignore list
    const projects = repos.reduce((result, repo) => {
        if (! ignoreProjects.includes(repo.title))
            result.push(repo);
        return result;
    }, []);

    // pair projects with images
    const projsImgs = []
    projects.forEach((project, index) => projsImgs.push([project, images[index]]));

    const projectsList = document.querySelector("#projectsList");
    for (const [project, img] of projsImgs) {

        const buttons  = [{ text: "Go to source code", url: project.url}]
        if (project.deployed)
            buttons.push({ text: "Go to deploy", url: project.deployed });
        const left = cardBody(project.title, project.description, buttons);

        // currently only supports 1 image per project
        const right = imageElement(img, `${project.title} image cover`);

        const card = projectCard(left, tagFactory(project.tags), right);
        projectsList.appendChild(card);

        memory.push([card, project])
    }
    return memory;
}

const projectsCards = await loadProjects();

const searchForm = document.querySelector("#searchForm");
const input = searchForm.querySelector("input");
const spinner = searchForm.querySelector("#spinner");

input.addEventListener("input", (e) => {
    spinner.classList.remove("d-none");
    setTimeout(() => {
        spinner.classList.add("d-none");
    }, 1000);

    for (const [card, {title, description, tags}] of projectsCards) {
        const target = e.target.value.toLowerCase();
        const tit = title.toLowerCase().includes(target);
        const desc = (description || "").toLowerCase().includes(target);
        const intags = tags.some(tag => tag.toLowerCase().includes(target));

        card.style.display = (tit || desc || intags) ? "flex" : "none";
    }
});