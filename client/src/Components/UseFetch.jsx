export default async function UseFetch(url) {
    const response = await fetch(url)
    if (!response.ok) {
        throw {
            message: "Failed to fetch recipe",
            statusText: response.statusText,
            status: response.status,
        }
    }
    const responseBody = await response.json()
    const message = responseBody.message
    return message
}
