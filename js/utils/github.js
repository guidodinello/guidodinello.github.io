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
        return data.map( repo => {
            return {
                "title" : repo["name"],
                "description" : repo["description"],
                "url" : repo["html_url"],
                "tags" : repo["topics"],
                "language" : repo["language"],
                "deploy" : repo["homepage"] || getGithubPagesUrl(repo["name"]),
            }
        })
    })
    .catch(error => {
        console.log("ERROR while fetchhing user repos: ", error);
    })
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
