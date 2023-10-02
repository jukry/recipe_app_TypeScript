import React from "react"
import "./styles/usersettings.css"
import { Form, useNavigation } from "react-router-dom"

export async function action({ request }) {
    const formData = Object.fromEntries(await request.formData())
    async function changePassword() {
        return await fetch(
            `${import.meta.env.VITE_USERDATA_ENDPOINT}/newpassword`,
            {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    formData,
                }),
            }
        )
    }
    const res = await changePassword()
    if (!res.ok) {
        return res.status
    } else {
        location.replace("/account")
        return redirect("/account")
    }
    return null
}

export default function UserSettings() {
    const navigation = useNavigation()
    return (
        <section id="user-settings-container">
            <section id="change-password-container">
                <Form replace="true" id="password-form" method="post">
                    <label htmlFor="oldpassword">
                        Kirjoita nykyinen salasana
                    </label>
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
                    <button disabled={!navigation.state} type="submit">
                        Päivitä salasana
                    </button>
                </Form>
            </section>
        </section>
    )
}
