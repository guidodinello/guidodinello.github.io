export async function getRepos({element: spinnerWrapper, toggleClass: tcList}) {
    if (spinnerWrapper) {
        spinnerWrapper.classList.remove(tcList);
        setTimeout(() => {
            spinnerWrapper.classList.add(tcList);
        }, 400);        
    }

    return await fetch('https://api.github.com/users/guidodinello/repos')
    .then(response => response.json())
    .then(data => { 
        return data.map( async (repo) => {
            const url = getGithubPagesUrl(repo["name"])
            //.then(url => { return url })
            console.log("URL ", url, "type ", typeof(url))
            return {
                "title" : repo["name"],
                "description" : repo["description"],
                "url" : repo["html_url"],
                "tags" : repo["topics"],
                "language" : repo["language"],
                "deploy" : repo["homepage"] || url,
            }
        })
    })
    .catch(error => {
        console.log("ERROR while fetching user repos: ", error);
    })
}

async function getGithubPagesUrl(repo_name) {
    /* workaround, github api doesnt return gh pages url with the repo info */
    fetch(`https://guidodinello.github.io/${repo_name}`, { method: 'HEAD' })
    .then(response => {
        console.log("repo ", repo_name, "response ", response)
        if (response.status == '404') { console.log("Repo not found"); return; }
        console.log("return url ")
        return `https://guidodinello.github.io/${repo_name}`
    })
    .catch(error => {
        console.log(error);
    })
}
