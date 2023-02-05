export function getRepos({element: spinnerWrapper, toggleClass: tcList}) {
    if (spinnerWrapper) {
        spinnerWrapper.classList.remove(tcList);
        setTimeout(() => {
            spinnerWrapper.classList.add(tcList);
        }, 400);        
    }

    return fetch('https://api.github.com/users/guidodinello/repos')
    .then(response => response.json())
    .then( data => { 
        return Promise.all(data.map(async (repo) => {
            return {
                "title" : repo["name"],
                "description" : repo["description"],
                "url" : repo["html_url"],
                "tags" : repo["topics"],
                "language" : repo["language"],
                "deploy" : repo["homepage"] || await getGithubPagesUrl(repo["name"]),
            }
        }));
    })
    .catch(error => {
        console.log("ERROR while fetching user repos: ", error);
    })
}

async function getGithubPagesUrl(repo_name) {
    /* workaround, github api doesnt return gh pages url with the repo info */
    try{
        const response = await fetch(`https://guidodinello.github.io/${repo_name}`, { method: 'HEAD' })
        if (response.status === 404) return null;
        else return `https://guidodinello.github.io/${repo_name}`;
    }
    catch(error){
        console.log("ERROR with REPO", repo_name);
    }
}
