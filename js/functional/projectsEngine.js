import {
    cardBody,
    projectCard,
    tagFactory,
    cardStarsTitle,
} from "../components/project-card.js";
import { SpinnerWrapper } from "../components/spinner.js";
import { Carousel } from "../components/carousel.js";
import { Modal } from "../components/modal.js";
import { header } from "../components/utils.js";

import { getRepos } from "../utils/github.js";
import { readJSON } from "../utils/jsonReader.js";

const sortPolicy = (a, b) => {
    // priority 1.more stars, 2.most recently updated, 
    // 3.longer description length, 4.more tags quantity
    const stars = b.stars - a.stars;
    const updated = new Date(a.updated_at) - new Date(b.updated_at);
    const desc = b.description.length - a.description.length;
    const tags = b.tags.length - a.tags.length;
    return stars || desc || tags;
};

async function loadProjects() {
    const memory = [];

    const repos = await getRepos();
    const images = await readJSON("../../config/images.json");
    const ignoreProjects = await readJSON("../../config/ignore_projects.json");

    // filter out projects that are in the ignore list
    const projects = repos.reduce((result, repo) => {
        if (!ignoreProjects.includes(repo.title)) {
            result.push(repo);
        }
        return result;
    }, []);

    // merge projects with images
    const projsImgs = projects.map((project) => {
        project["images"] = images[project.title] || [];
        return project;
    });

    // sort projects
    projsImgs.sort(sortPolicy);

    const projectsList = document.querySelector("#projectsList");
    for (const project of projsImgs) {
        const buttons = [{ text: "Go to source code", url: project.url }];
        // add another button if theres github pages associated to the repo
        if (project.deploy) {
            buttons.push({ text: "Go to deploy", url: project.deploy });
        }

        const left = cardBody(
            project.title,
            project.description,
            buttons,
            (title) => {
                return cardStarsTitle(title, project.stars);
            },
        );

        const imgCarr = new Carousel(project.title);
        imgCarr.DOMreference().style.cursor = "zoom-in";
        imgCarr.addItems(project.images, (img) => {
            const imageCreator = () => {
                return imgCarr.imageDefault(
                    img,
                    `${project.title} illustrative image`,
                );
            };
            return imgCarr.slideCreator(imageCreator);
        });

        const card = projectCard(
            left,
            tagFactory(project.tags),
            imgCarr.DOMreference(),
        );
        projectsList.appendChild(card);

        const showInModal = () => {
            pageModal.update(
                header("1", null, null, null, project.title),
                imgCarr.clone().DOMreference(),
            );
            pageModal.show();
        };
        imgCarr.itemsList.addEventListener("click", showInModal);

        memory.push([card, project]);
    }
    return memory;
}

const projectsLoaded = loadProjects();

const pageModal = new Modal("pageModal", document.body);
const searchForm = document.querySelector("#searchForm");
const formInput = searchForm.querySelector("input");
const formSpinner = searchForm.querySelector("#form-spinner");

const pageSpinnerWrapper = new SpinnerWrapper("spinnerWrapper", document.body);
pageSpinnerWrapper.show();

const projectsCards = await projectsLoaded;
pageSpinnerWrapper.hide();
formInput.addEventListener("input", (e) => {
    formSpinner.classList.remove("d-none");
    setTimeout(() => {
        formSpinner.classList.add("d-none");
    }, 1000);

    for (const [card, { title, description, tags }] of projectsCards) {
        const target = e.target.value.toLowerCase();

        const tit = title.toLowerCase().includes(target);
        const desc = (description || "").toLowerCase().includes(target);
        const intags = tags.some((tag) => tag.toLowerCase().includes(target));

        card.style.display = tit || desc || intags ? "flex" : "none";
    }
});
