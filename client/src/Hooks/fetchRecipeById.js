const fetchRecipeById = async ({ queryKey }) => {
    const id = queryKey[1]
    const apiResponse = await fetch(
        `${import.meta.env.VITE_RECIPE_ENDPOINT}/${id}`
    )
    if (!apiResponse.ok) {
        throw new Error(`fetch not ok`)
    }
    return apiResponse.json()
}

export default fetchRecipeById
