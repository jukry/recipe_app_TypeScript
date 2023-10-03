import React from "react"
import { Form, useNavigation } from "react-router-dom"

export default function ChangePassword() {
    const navigation = useNavigation()
    return (
        <section id="change-password-container">
            <Form
                name="change-password"
                replace="true"
                id="password-form"
                method="post"
            >
                <label htmlFor="oldpassword">Kirjoita nykyinen salasana</label>
                <input
                    type="password"
                    name="oldPassword"
                    id="oldpassword"
                    required
                />
                <label htmlFor="newpassword">Kirjoita uusi salasana</label>
                <input
                    type="password"
                    name="newPassword"
                    id="newpassword"
                    required
                />
                <label htmlFor="newrepassword">
                    Kirjoita uusi salasana uudestaan
                </label>
                <input
                    type="password"
                    name="newRePassword"
                    id="newrepassword"
                    required
                />
                <button
                    disabled={navigation.state === "submitting"}
                    type="submit"
                >
                    {navigation.state === "idle"
                        ? "Päivitä salasana"
                        : "Päivitetään..."}
                </button>
            </Form>
        </section>
    )
}
