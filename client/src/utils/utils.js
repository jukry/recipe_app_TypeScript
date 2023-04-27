import { redirect } from "react-router-dom"
import UseFetch from "../Components/UseFetch"

export async function getRecipes(url) {
    const data = UseFetch(url)
    return data
}
export async function getRecipeById(url) {
    const data = UseFetch(url)
    return data
}
export async function loginUser(creds) {
    /* const res = await fetch("/api/login", {
        method: "post",
        body: JSON.stringify(creds),
    })
    const data = await res.json()

    if (!res.ok) {
        throw {
            message: data.message,
            statusText: res.statusText,
            status: res.status,
        }
    }

    return data */
    return true
}
export async function requireAuth({ request }) {
    const pathname = new URL(request.url).pathname
    const loggedIn = JSON.parse(localStorage.getItem("loggedIn"))
    console.log("requireauth")
    if (!loggedIn) {
        throw redirect(
            `/login?message=Kirjaudu ensin sisään&redirectTo=${pathname}`
        )
    }
}
