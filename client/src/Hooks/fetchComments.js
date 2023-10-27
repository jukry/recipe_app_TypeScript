const fetchComments = async ({ queryKey }) => {
    const apiResponse = await fetch(
        process.env.NODE_ENV === "production"
            ? `${import.meta.env.VITE_COMMENTS_ENDPOINT}`
            : `${import.meta.env.VITE_COMMENTS_ENDPOINT_DEV}`
    )
    if (!apiResponse.ok) {
        throw new Error(`fetch not ok`)
    }
    return apiResponse.json()
}

export default fetchComments
