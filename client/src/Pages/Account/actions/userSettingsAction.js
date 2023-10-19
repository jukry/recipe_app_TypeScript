import { redirect } from "react-router-dom"
import { changePassword } from "../../../utils/utils"

export async function action({ request }) {
    const formData = Object.fromEntries(await request.formData())

    const res = await changePassword(formData)
    if (!res.ok) {
        return res.status
    } else {
        return redirect("/account")
    }
}
