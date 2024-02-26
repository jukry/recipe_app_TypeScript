const fetchRecipes = async ({ queryKey }: { queryKey: string }) => {
    const apiResponse = await fetch(
        process.env.NODE_ENV === "production"
            ? import.meta.env.VITE_RECIPE_ENDPOINT
            : import.meta.env.VITE_RECIPE_ENDPOINT_DEV
    )
    if (!apiResponse.ok) {
        throw new Error(`fetch not ok`)
    }
    return apiResponse.json()
}

export default fetchRecipes
