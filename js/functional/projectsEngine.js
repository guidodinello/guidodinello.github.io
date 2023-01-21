import { cardBody, projectCard, imageElement, tagFactory } from "../components/project-card.js";
import { Modal } from "../components/modal.js";
import { getRepos } from "./github.js";
import { readJSON } from "./jsonReader.js";

const modal = new Modal(document.body);

const searchForm = document.querySelector("#searchForm");
const input = searchForm.querySelector("input");

async function loadProjects(){
    const memory = []

    const repos = await getRepos();
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
        const left = cardBody(project.title, project.description, {name: "Go to project", url: project.url});

        // currently only supports 1 image per project
        const right = imageElement(img, `${project.title} image cover`);

        const card = projectCard(
            left, 
            tagFactory(project.tags), 
            right
        );
        projectsList.appendChild(card);

        memory.push([card, project])
    }
    return memory;
}

const projectsCards = await loadProjects();

input.addEventListener("input", (e) => {
    for (const [card, {title, description}] of projectsCards) {
        if (title.includes(e.target.value) || description.includes(e.target.value)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    }
});
