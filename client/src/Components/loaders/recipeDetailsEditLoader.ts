import { redirect } from "react-router-dom"
import { getUserData } from "../../utils/utils"

export async function loader({ request }: { request: Request }) {
    const res = await getUserData({ request })
    if (!res.id) {
        return redirect("/forbidden")
    }
    return null
}
