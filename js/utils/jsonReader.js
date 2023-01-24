export async function readJSON(path) {
    return await fetch(path)
    .then(response => response.json())
    .then(data => { return data})
    .catch(error => {
        console.log("ERROR while reading file in path: ", path, error);
    });
}