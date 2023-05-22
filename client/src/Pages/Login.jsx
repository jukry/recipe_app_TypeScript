import React from "react"
import "./styles/Login.css"
import {
    Form,
    redirect,
    useNavigation,
    useLoaderData,
    useActionData,
} from "react-router-dom"

export function loader({ request }) {
    return new URL(request.url).searchParams.get("message")
}

export async function action({ request }) {
    event.preventDefault()
    const formData = await request.formData()
    async function loginUser() {
        return await fetch(import.meta.env.VITE_AUTH_ENDPOINT, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
                email: await formData.get("email"),
                password: await formData.get("password"),
            }),
        })
    }

    const pathname =
        new URL(request.url).searchParams.get("redirectTo") || "/account"
    const res = await loginUser()
    if (!res.ok) {
        return res.status
    } else {
        location.replace(pathname)
        return redirect(pathname)
    }
}

export default function Login() {
    const navigation = useNavigation()
    const message = useLoaderData()
    const action = useActionData()

    return (
        <div className="login-container">
            <h2>{message ? "Kirjaudu ensin sisään" : "Kirjaudu sisään"}</h2>
            {action && (
                <h3 className="check-login-input">
                    {action === 400
                        ? "Tarkista syöttämäsi tiedot"
                        : action === 401
                        ? "Sähköposti tai salasana väärin"
                        : ""}
                </h3>
            )}
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
