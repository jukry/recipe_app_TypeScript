const fetchRecipeById = async ({
    queryKey,
}: {
    queryKey: [string, string]
}) => {
    const id = queryKey[1]
    const apiResponse = await fetch(
        process.env.NODE_ENV === "production"
            ? `${import.meta.env.VITE_RECIPE_ENDPOINT}/${id}`
            : `${import.meta.env.VITE_RECIPE_ENDPOINT_DEV}/${id}`
    )
    if (!apiResponse.ok) {
        throw new Error(`fetch not ok`)
    }
    return apiResponse.json()
}

export default fetchRecipeById
