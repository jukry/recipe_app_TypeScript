const fetchRecipes = async ({ queryKey }) => {
    const apiResponse = await fetch(`http://localhost:5000/api/recipes`)
    if (!apiResponse.ok) {
        throw new Error(`fetch not ok`)
    }
    return apiResponse.json()
}

export default fetchRecipes
