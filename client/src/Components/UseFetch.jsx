import { useEffect, useState } from "react"

export default function UseFetch(url) {
    const [backendData, setBackendData] = useState(undefined)
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
    }
}
