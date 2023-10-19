import React from "react"
import "./styles/usersettings.css"
import ChangePassword from "../../Components/ChangePassword"
import DeleteUser from "../../Components/DeleteUser"

function UserSettings() {
    return (
        <section id="user-settings-container">
            <ChangePassword />
            <DeleteUser />
        </section>
    )
}
export default UserSettings
