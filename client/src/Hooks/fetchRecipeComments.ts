const fetchRecipeComments = async ({
    queryParams,
}: {
    queryParams: [string, string]
}) => {
    const id = queryParams[1]
    const apiResponse = await fetch(
        process.env.NODE_ENV === "production"
            ? `${import.meta.env.VITE_COMMENTS_ENDPOINT}/${id}`
            : `${import.meta.env.VITE_COMMENTS_ENDPOINT_DEV}/${id}`
    )
    if (!apiResponse.ok) {
        throw new Error(`fetch not ok`)
    }
    return apiResponse.json()
}

export default fetchRecipeComments
