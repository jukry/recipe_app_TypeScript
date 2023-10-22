import React, { useEffect } from "react"
import { Form, useActionData, useNavigate } from "react-router-dom"
import { useUpdateUser } from "../Hooks/useUpdateUser"

export default function ChangeEmail() {
    const { updateUser } = useUpdateUser()
    const action = useActionData()
    const navigate = useNavigate()
    useEffect(() => {
        if (action?.Message) {
            updateUser(action.Message)
            navigate("/account")
        }
    })

    return (
        <section id="change-email-container">
            <h3>Vaihda sähköpostiosoite</h3>
            <Form
                name="change-email"
                id="change-email-form"
                method="post"
                replace="true"
            >
                <label htmlFor="change-email">
                    Kirjoita uusi sähköpostiosoite
                </label>
                <input
                    type="email"
                    required
                    name="changeemail"
                    id="change-email"
                />
                <label htmlFor="confirm-email-password">
                    Kirjoita nykyinen salasana
                </label>
                <input
                    type="password"
                    name="confirmemailpassword"
                    id="confirm-email-password"
                    required
                />
                <button id="change-email-button">
                    Vaihda sähköpostiosoite
                </button>
            </Form>
        </section>
    )
}
