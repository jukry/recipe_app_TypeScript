import React from "react"
import "./styles/account.css"
import { requireAuth } from "../../utils/utils"

export async function loader({ request }) {
    await requireAuth(request)
    return null
}

export default function AccountDashboard() {
    return (
        <section className="account-details">
            <h3>Omat tiedot</h3>
        </section>
    )
}
