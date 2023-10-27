const fetchUsersData = async ({ queryKey }) => {
    const apiResponse = await fetch(
        process.env.NODE_ENV === "production"
            ? import.meta.env.VITE_USERS_ENDPOINT
            : import.meta.env.VITE_USERS_ENDPOINT_DEV,
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

export default fetchUsersData
