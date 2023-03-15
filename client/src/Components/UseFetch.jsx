import { useEffect, useState } from "react"

export default async function UseFetch(url) {
    const [backendData, setBackendData] = useState({})
    console.log("Backend data", backendData)

    useEffect(() => {
        async function getData(url) {
            const response = await fetch(url)
            const responseBody = await response.json()
            setBackendData(responseBody)
        }

        getData(url)
    }, [])
}
