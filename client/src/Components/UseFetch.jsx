import { useEffect, useState } from "react"

export default async function UseFetch(url) {
    /* const [backendData, setBackendData] = useState(undefined)
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true)
        async function getData(url) {
            const response = await fetch(url)
            const responseBody = await response.json()
            const message = responseBody.message
            setBackendData(message)
            setLoading(false)
        }
        getData(url)
    }, [])
    if (!loading) {
        return backendData
    } */
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
