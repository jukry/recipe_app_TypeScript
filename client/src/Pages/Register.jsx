import React from "react"
import { Form, redirect, useActionData, useNavigation } from "react-router-dom"
import "./styles/Register.css"

export async function action({ request }) {
    const formData = await request.formData()
    async function registerUser() {
        return await fetch(import.meta.env.VITE_REGISTER_ENDPOINT, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: await formData.get("email"),
                password: await formData.get("password"),
                repassword: await formData.get("re-password"),
            }),
        })
    }
    const res = await registerUser()

    if (!res.ok) {
        return res.status
    } else {
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
        const res = await loginUser()
        console.log(res)
        if (!res.ok) {
            return res.status
        } else {
            location.replace("/account")
            return redirect("/account")
        }
    }
}

export default function Register() {
    const navigation = useNavigation()
    const action = useActionData()
    console.log(action)
    return (
        <section id="register-container">
            <h2>Rekisteröidy</h2>
            {action && (
                <h3 id="check-register-input">
                    {action === 200
                        ? "Salasanat eivät täsmää"
                        : action === 401
                        ? "Täytä kaikki kentät"
                        : action === 403
                        ? "Sähköposti on jo käytössä"
                        : action === 400
                        ? "Jotain meni pieleen, yritä uudelleen"
                        : ""}
                </h3>
            )}
            <Form replace="true" method="post" id="register-form">
                <input
                    type="email"
                    name="email"
                    placeholder="Sähköpostiosoite"
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Salasana"
                    required
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                    title="Salasanassa pitää olla ainakin yksi numero, yksi pieni kirjain, yksi iso kirjain sekä vähintään 8 merkkiä"
                />
                <input
                    type="password"
                    name="re-password"
                    placeholder="Kirjoita salasana uudelleen"
                    required
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                    title="Salasanassa pitää olla ainakin yksi numero, yksi pieni kirjain, yksi iso kirjain sekä vähintään 8 merkkiä"
                />

                <button disabled={navigation.state === "submitting"}>
                    {navigation.state === "idle"
                        ? "Rekisteröidy"
                        : "Rekisteröidään käyttäjä..."}
                </button>
            </Form>
        </section>
    )
}
