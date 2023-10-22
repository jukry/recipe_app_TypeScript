import React from "react"
import "./styles/usersettings.css"
import ChangePassword from "../../Components/ChangePassword"
import DeleteUser from "../../Components/DeleteUser"
import ChangeEmail from "../../Components/ChangeEmail"

function UserSettings() {
    return (
        <section id="user-settings-container">
            <ChangePassword />
            <ChangeEmail />
            <DeleteUser />
        </section>
    )
}
export default UserSettings
