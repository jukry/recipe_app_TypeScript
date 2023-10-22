import { redirect } from "react-router-dom"
import { changeEmail, changePassword } from "../../../utils/utils"
import { useLogout } from "../../../Hooks/useLogout"

export async function action({ request }) {
    const formData = Object.fromEntries(await request.formData())

    if (formData.oldPassword) {
        const res = await changePassword(formData)
        if (!res.ok) {
            return res.status
        } else {
            return redirect("/account")
        }
    } else if (formData.changeemail) {
        const res = await changeEmail(formData)
        if (!res.ok) {
            return res.status
        } else {
            return res
        }
    }
}
