import React, { useContext } from "react"
import "./styles/account.css"
import AuthContext from "../../Components/AuthContext"

export async function loader() {
    /* const data = await fetch("http://localhost:5000/users/user", {
        method: "GET",
        credentials: "include",
    }) */
    //console.log(data.json())
    return null
}

export default function AccountDashboard() {
    const { username, email } = useContext(AuthContext)
    return (
        <section className="account-details">
            <h3>{username}</h3>
        </section>
    )
}
