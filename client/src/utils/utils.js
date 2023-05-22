import { redirect } from "react-router-dom"

export async function getUserData({ request }) {
    const pathname = new URL(request.url).pathname
    try {
        const data = await fetch(import.meta.env.VITE_USERDATA_ENDPOINT, {
            method: "get",
            credentials: "include",
        })
        const body = await data.json()
        if (!body.id) {
            return redirect(
                `/login?message=Kirjaudu ensin sisään&redirectTo=${pathname}`
            )
        }
        return body
    } catch (error) {
        throw new Error(error)
    }
}
