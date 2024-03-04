const fetchAllRecipeData = async ({ queryKey }: { queryKey: string }) => {
    const apiResponse = await fetch(
        process.env.NODE_ENV === "production"
            ? `${import.meta.env.VITE_RECIPE_ENDPOINT}/all`
            : `${import.meta.env.VITE_RECIPE_ENDPOINT_DEV}/all`,
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

export default fetchAllRecipeData
