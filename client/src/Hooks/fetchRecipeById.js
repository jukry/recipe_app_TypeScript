const fetchRecipeById = async ({ queryKey }) => {
    const id = queryKey[1]
    const apiResponse = await fetch(`http://localhost:5000/api/recipes/${id}`)
    if (!apiResponse.ok) {
        throw new Error(`fetch not ok`)
    }
    return apiResponse.json()
}

export default fetchRecipeById
