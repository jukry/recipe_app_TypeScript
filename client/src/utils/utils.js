import UseFetch from "../Components/UseFetch"

export async function getRecipes(url) {
    const data = UseFetch(url)
    return data
}
export async function getRecipeById(url) {
    const data = UseFetch(url)
    console.log(url)
    return data
}
