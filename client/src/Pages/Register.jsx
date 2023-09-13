import React from "react"
import { Form, useNavigation } from "react-router-dom"
import "./styles/Register.css"

export default function Register() {
    const navigation = useNavigation()
    return (
        <section id="register-container">
            <h2>Rekisteröidy</h2>
            <Form replace="true" method="post" id="register-form">
                <input
                    type="email"
                    name="email"
                    placeholder="Sähköpostiosoite"
                />
                <input type="password" name="password" placeholder="Salasana" />
                <input
                    type="password"
                    name="re-password"
                    placeholder="Kirjoita salasana uudelleen"
                />

                <button disabled={navigation.state === "submitting"}>
                    {navigation.state === "idle"
                        ? "Rekisteröidy"
                        : "Rekisteröidään tietoja..."}
                </button>
            </Form>
        </section>
    )
}
