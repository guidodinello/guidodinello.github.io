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
    // 3.longer description length, 4.has iamge associated, 5.more tags quantity
    const stars = b.stars - a.stars;
    const updated = new Date(b.updated_at) - new Date(a.updated_at);
    const desc = b.description.length - a.description.length;
    const images = b.images.length - a.images.length;
    const tags = b.tags.length - a.tags.length;
    return stars || updated || desc || images || tags;
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
        imgCarr.addItems(project.images, (src) => {
            const ext = src.split(".").pop().toLowerCase();
            const type = ext === "mp4" ? "video" : "image";

            const title = `${project.title} illustrative ${type}`;
            const creator =
                type === "image"
                    ? () => imgCarr.imageDefault(src, title)
                    : () => imgCarr.videoDefault(src, title);

            return imgCarr.slideCreator(creator);
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
const lookUpBar = searchForm.querySelector("input");
const lubSpinner = searchForm.querySelector("#form-spinner");

const pageSpinnerWrapper = new SpinnerWrapper("spinnerWrapper", document.body);
pageSpinnerWrapper.show();
const projectsCards = await projectsLoaded;
pageSpinnerWrapper.hide();

let debounceUnhighlightTimer = null;
const highlightedElems = new Set();
const highlightsHandlers = new Set();
lookUpBar.addEventListener("input", (e) => {
    lubSpinner.classList.remove("d-none");
    setTimeout(() => {
        lubSpinner.classList.add("d-none");
    }, 1000);

    highlightsHandlers.clear();
    const target = e.target.value.toLowerCase();
    for (const [card, { title, description, tags }] of projectsCards) {
        const tit = title.toLowerCase().includes(target);
        const desc = description.toLowerCase().includes(target);
        const intags = tags.some((tag) => tag.toLowerCase().includes(target));

        if (!(tit || desc || intags)) {
            card.style.display = "none";
        } else {
            card.style.display = "flex";
            // Function to execute the highlights logic
            const highlightCardPipeline = () => {
                // Highlight matching text in title
                if (tit) {
                    const titleElem = card.querySelector(".card-title");
                    highlightedElems.add(titleElem);
                    highlightText(titleElem, target);
                }
                // Highlight matching text in description
                if (desc) {
                    const descElem = card.querySelector(".card-text");
                    highlightedElems.add(descElem);
                    highlightText(descElem, target);
                }
                // Highlight matching text in tags
                if (intags) {
                    const tagElements = card.querySelectorAll(".tag-text");
                    for (const tagElement of tagElements) {
                        const tag = tagElement.textContent.toLowerCase();
                        if (tag.includes(target)) {
                            highlightedElems.add(tagElement);
                            highlightText(tagElement, target);
                        }
                    }
                }
            };
            highlightsHandlers.add(highlightCardPipeline);
        }
    }
    // reset highlights after 500ms of no input
    clearTimeout(debounceUnhighlightTimer);
    debounceUnhighlightTimer = setTimeout(() => {
        resetHighlights();
        highlightsHandlers.forEach((handler) => handler());
        highlightsHandlers.clear();
    }, 500);
});

function resetHighlights() {
    // should be at the start of the debouncer
    highlightedElems.forEach((el) => {
        unhighlightText(el);
    });
    highlightedElems.clear();
}

// Hhighlight text within an element
function highlightText(element, searchQuery) {
    if (!element.getAttribute("data-original-content")) {
        element.setAttribute("data-original-content", element.innerText);
    }
    const regex = new RegExp(searchQuery, "i");
    element.innerHTML = element.innerText.replace(
        regex,
        (match) => `<span class='highlight'>${match}</span>`,
    );
}

function unhighlightText(element) {
    element.innerHTML = element.getAttribute("data-original-content");
    element.removeAttribute("data-original-content");
}
