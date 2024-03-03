import "./styles/usersettings.css"
import ChangePassword from "../../Components/ChangePassword"
import DeleteUser from "../../Components/DeleteUser"
import ChangeEmail from "../../Components/ChangeEmail"

function UserSettings() {
    return (
        <div id="user-settings-container">
            <ChangePassword />
            <ChangeEmail />
            <DeleteUser />
        </div>
    )
}
export default UserSettings
