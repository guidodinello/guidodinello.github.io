import { titledCard } from "../components/titled-card.js";

const mainContainer = document.querySelector("#mainContainer");
mainContainer.appendChild(
    titledCard("About Me", "I am a software developer with a passion for learning and creating new things. Currently, I'm studying Computer Science at the University of the Eastern Republic of Uruguay.", "", { href: "projects.html", text: "See my projects" })
);
mainContainer.appendChild(
    titledCard("About this page", "This page is a collection of my projects. It is built using HTML, CSS, JavaScript and Bootstrap and hosted on GitHub Pages.", "")
);

const searchBtn = searchForm.querySelector("button");
searchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    document.location.href = "projects.html";
});
