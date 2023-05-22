const fetchUserRecipes = async ({ queryKey }) => {
    const apiResponse = await fetch(
        import.meta.env.VITE_USER_RECIPES_ENDPOINT,
        {
            method: "GET",
            credentials: "include",
        }
    )
    if (!apiResponse.ok) {
        throw new Error(`fetch not ok`)
    }
    return apiResponse.json()
}

export default fetchUserRecipes
