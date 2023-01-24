export async function getRepos({element: spinner, toggleClass: tcList}) {
    if (spinner) {
        spinnerWrapper.classList.remove(tcList);
        setTimeout(() => {
            spinnerWrapper.classList.add(tcList);
        }, 400);        
    }

    return await fetch('https://api.github.com/users/guidodinello/repos')
        .then(response => response.json())
        .then(data => {
            return data.map(repo => {
                return {
                    "title" : repo["name"],
                    "description" : repo["description"],
                    "url" : repo["html_url"],
                    "tags" : repo["topics"]
                }
            })
        })
        .catch(error => {
            console.log(error);
        })
}