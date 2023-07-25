export async function getRepos() {
    try {
        const response = await fetch(new URL("https://api.github.com/users/guidodinello/repos"))
        const data = await response.json();

        const repos = await Promise.all(
            data.map(async (repo) => {
                const deploy = repo["homepage"] || (await getGithubPagesUrl(repo["name"]));
                return {
                    title: repo["name"],
                    description: repo["description"],
                    url: repo["html_url"],
                    tags: repo["topics"],
                    language: repo["language"],
                    stars: repo["stargazers_count"],
                    deploy
                };
            })
        );
        return repos;
    } catch (error) {
        console.log("ERROR while fetching user repos: ", error);
        return [];
    }
}

async function getGithubPagesUrl(repo_name) {
    /* workaround, github api doesnt return gh pages url with the repo info */
    try {
        const repoURL = new URL(`https://guidodinello.github.io/${repo_name}`)
        const response = await fetch(repoURL, { method: "HEAD" });
        if (response.status === 404) return null;
        else return repoURL;
    } catch (error) {
        console.log("ERROR with REPO", repo_name);
    }
}
