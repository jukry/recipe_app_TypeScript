import React from "react"
import "./styles/Login.css"
import { Form, redirect, useNavigation, useLoaderData } from "react-router-dom"

export function loader({ request }) {
    return new URL(request.url).searchParams.get("message")
}

export async function action({ request }) {
    event.preventDefault()
    const formData = await request.formData()
    async function loginUser() {
        return await fetch("http://localhost:5000/users/login", {
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
    const body = await res.json()
    console.log(body)
    if (!res.ok) {
        return res.status
    } else {
        location.replace("/account")
        return redirect(pathname)
    }
}

export default function Login() {
    const navigation = useNavigation()
    const message = useLoaderData()

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
