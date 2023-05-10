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
/* export async function requireAuth({ request }) {
    const pathname = new URL(request.url).pathname
    //const loggedIn = JSON.parse(localStorage.getItem("loggedIn"))
    if (!token) {
        throw redirect(
            `/login?message=Kirjaudu ensin sisään&redirectTo=${pathname}`
        )
    }
} */

export async function getUserData() {
    console.log("Get user data")
    const userData = await fetch("http://localhost:5000/users/user", {
        method: "GET",
        credentials: "include",
    })
    const body = await userData.json()
    return body
}
