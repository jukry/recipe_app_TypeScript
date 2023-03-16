import { useEffect, useState } from "react"

export default function UseFetch(url) {
    const [backendData, setBackendData] = useState(null)

    useEffect(() => {
        async function getData(url) {
            const response = await fetch(url)
            const responseBody = await response.json()
            const message = responseBody.message
            setBackendData(message)
        }
        getData(url)
    }, [])
    return backendData
}
