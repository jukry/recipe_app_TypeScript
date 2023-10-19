import React, { useContext } from "react"
import "./styles/Login.css"
import { Form, useNavigation, useActionData, Navigate } from "react-router-dom"
import { UserContext } from "../Context/UserContext"

export default function Login() {
    const navigation = useNavigation()
    const action = useActionData()
    const { user } = useContext(UserContext)
    if (user.id) {
        return <Navigate to="/account" />
    }
    return (
        <div className="login-container">
            <h2>Kirjaudu sisään</h2>
            {action && (
                <h3 className="check-login-input">
                    {action === 400
                        ? "Tarkista syöttämäsi tiedot"
                        : action === 401
                        ? "Sähköposti tai salasana väärin"
                        : ""}
                </h3>
            )}
            <Form replace="true" method="post" className="login-form">
                <input
                    type="email"
                    name="email"
                    placeholder="Sähköpostiosoite"
                />
                <input type="password" name="password" placeholder="Salasana" />
                <button disabled={navigation.state === "submitting"}>
                    {navigation.state === "idle"
                        ? "Kirjaudu sisään"
                        : "Kirjaudutaan..."}
                </button>
            </Form>
        </div>
    )
}
