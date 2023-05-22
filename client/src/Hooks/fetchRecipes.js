const fetchRecipes = async ({ queryKey }) => {
    const apiResponse = await fetch(import.meta.env.VITE_RECIPE_ENDPOINT)
    if (!apiResponse.ok) {
        throw new Error(`fetch not ok`)
    }
    return apiResponse.json()
}

export default fetchRecipes
