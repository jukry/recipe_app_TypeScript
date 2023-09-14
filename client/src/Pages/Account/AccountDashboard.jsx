import React, { useContext } from "react"
import "./styles/account.css"
import { redirect, useLoaderData } from "react-router-dom"
import { UserContext } from "../../Context/UserContext"
import { getUserData } from "../../utils/utils"

export async function loader({ request }) {
    const res = await getUserData({ request })
    if (!res.id) {
        return redirect("/login")
    }
    return null
}

export default function AccountDashboard() {
    const loaderData = useLoaderData()
    const { user } = useContext(UserContext)
    return (
        <section className="account-details">
            <h3>{user.email}</h3>
        </section>
    )
}
