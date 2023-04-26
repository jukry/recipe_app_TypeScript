import React from "react"
import "./styles/Login.css"
import {
    Form,
    redirect,
    useActionData,
    useNavigation,
    useLoaderData,
} from "react-router-dom"
import { loginUser } from "../utils/utils"

export function loader({ request }) {
    return new URL(request.url).searchParams.get("message")
}

export async function action({ request }) {
    const formData = await request.formData()
    const email = formData.get("email")
    const pathname = "/account"
    try {
        const loggedIn = await loginUser(null)
        if (loggedIn) localStorage.setItem("loggedIn", true)
        return redirect(pathname)
    } catch (error) {
        return error.message
    }
}

export default function Login() {
    const navigation = useNavigation()
    const error = useActionData()
    const message = useLoaderData()

    console.log(navigation.state)
    return (
        <div className="login-container">
            <h2>{message ? "Kirjaudu ensin sisään" : "Kirjaudu sisään"}</h2>
            <Form replace method="post" className="login-form">
                <input
                    type="email"
                    name="email"
                    placeholder="Sähköpostiosoite"
                />
                <input type="password" name="password" placeholder="Salasana" />

                <button disabled={navigation.state === "submitting"}>
                    {navigation.state === "idle"
                        ? "Kirjaudu sisään"
                        : "Kirjaudutaan..."}
                </button>
            </Form>
        </div>
    )
}
