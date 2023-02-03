export async function getRepos({element: spinnerWrapper, toggleClass: tcList}) {
    if (spinnerWrapper) {
        spinnerWrapper.classList.remove(tcList);
        setTimeout(() => {
            spinnerWrapper.classList.add(tcList);
        }, 400);        
    }

    const response = await fetch('https://api.github.com/users/guidodinello/repos');
    const json = await response.json();
    const data = json.map(async repo => {
        return {
            "title" : repo["name"],
            "description" : repo["description"],
            "url" : repo["html_url"],
            "tags" : repo["topics"],
            "language" : repo["language"],
            "deploy" : repo["homepage"] || getGithubPagesUrl(repo["name"]),
        }
    })
    return data;
}

async function getGithubPagesUrl(repo_name) {
    /* workaround, github api doesnt return gh pages url with the repo info */
    const response = await fetch(`https://guidodinello.github.io/${repo_name}`, { method: 'HEAD' });

    // 404 page doesnt exist
    if (response.status == '404') {
        return;    
    }

    if (!response.ok) {
        console.log(error);
        return;
    }        

    return `https://guidodinello.github.io/${repo_name}`
}
