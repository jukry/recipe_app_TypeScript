import { redirect } from "react-router-dom"
import UseFetch from "../Hooks/UseFetch"

export async function getRecipes(url) {
    const data = UseFetch(url)
    return data
}
export async function getRecipeById(url) {
    const data = UseFetch(url)
    return data
}

export async function getUserData({ request }) {
    const pathname = new URL(request.url).pathname
    try {
        const data = await fetch("http://localhost:5000/users/user", {
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
