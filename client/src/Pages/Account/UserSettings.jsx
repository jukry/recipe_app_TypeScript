import React from "react"
import "./styles/usersettings.css"
import { redirect, useNavigation } from "react-router-dom"
import ChangePassword from "../../Components/ChangePassword"
import { changePassword } from "../../utils/utils"
import DeleteUser from "../../Components/DeleteUser"

export async function action({ request }) {
    const formData = Object.fromEntries(await request.formData())

    const res = await changePassword(formData)
    if (!res.ok) {
        return res.status
    } else {
        location.replace("/account")
        return redirect("/account")
    }
}

export default function UserSettings() {
    return (
        <section id="user-settings-container">
            <ChangePassword />
            <DeleteUser />
        </section>
    )
}
