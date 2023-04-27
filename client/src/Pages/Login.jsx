import React, { useContext } from "react"
import "./styles/Login.css"
import {
    Form,
    redirect,
    useActionData,
    useNavigation,
    useLoaderData,
} from "react-router-dom"
import { loginUser } from "../utils/utils"
import AuthContext from "../Components/AuthContext"

export function loader({ request }) {
    return new URL(request.url).searchParams.get("message")
}

export async function action({ request }) {
    const formData = await request.formData()
    const email = formData.get("email")
    const pathname = new URL(request.url).pathname || "/"
    try {
        const loggedIn = await loginUser(null)
        if (loggedIn) localStorage.setItem("loggedIn", true)
        console.log(pathname)
        if (pathname === "/login") {
            return redirect("/")
        } else {
            return redirect(pathname)
        }
    } catch (error) {
        return error.message
    }
}

export default function Login() {
    const navigation = useNavigation()
    const error = useActionData()
    const message = useLoaderData()
    const [loggedIn, setLoggedIn] = useContext(AuthContext)

    async function handleSubmit() {
        event.preventDefault()
        try {
            console.log("Submit")
            const login = await loginUser(null).then((login) =>
                setLoggedIn(login)
            )
            console.log("handlesubmit", loggedIn)
            if (loggedIn) localStorage.setItem("loggedIn", true)
            console.log(pathname)
            if (pathname === "/login") {
                return redirect("/")
            } else {
                return redirect(pathname)
            }
        } catch (error) {
            return error.message
        }
    }

    return (
        <div className="login-container">
            <h2>{message ? "Kirjaudu ensin sisään" : "Kirjaudu sisään"}</h2>
            <form onSubmit={handleSubmit} className="login-form">
                <input
                    type="email"
                    name="email"
                    placeholder="Sähköpostiosoite"
                />
                <input type="password" name="password" placeholder="Salasana" />

                <button
                    type="submit"
                    disabled={navigation.state === "submitting"}
                >
                    {navigation.state === "idle"
                        ? "Kirjaudu sisään"
                        : "Kirjaudutaan..."}
                </button>
            </form>
        </div>
    )
}
