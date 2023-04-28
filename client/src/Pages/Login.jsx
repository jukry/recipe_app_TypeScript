import React from "react"
import "./styles/Login.css"
import {
    Form,
    redirect,
    useActionData,
    useNavigation,
    useLoaderData,
    useNavigate,
} from "react-router-dom"
import { loginUser } from "../utils/utils"

export function loader({ request }) {
    console.log("loader")
    return new URL(request.url).searchParams.get("message")
}

export async function action({ request }) {
    console.log("action")

    const formData = await request.formData()
    const email = formData.get("email")
    const pathname =
        new URL(request.url).searchParams.get("redirectTo") || "/account"
    try {
        const loggedIn = await loginUser(null)
        if (loggedIn) localStorage.setItem("loggedIn", true)
        location.replace("/account")
        return redirect(pathname)
    } catch (error) {
        return error.message
    }
}

export default function Login() {
    const navigation = useNavigation()
    const error = useActionData()
    const message = useLoaderData()
    const navigate = useNavigate()

    function handleSubmit(e) {
        e.preventDefault()
        //navigate("")
        redirect("/account")
    }

    return (
        <div className="login-container">
            <h2>{message ? "Kirjaudu ensin sisään" : "Kirjaudu sisään"}</h2>
            <Form replace="true" method="post" className="login-form">
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
