import React from "react"
import "./styles/Login.css"

function handleChange() {
    //
}
function handleSubmit() {
    //
}

export default function Login() {
    return (
        <div className="login-container">
            <h2>Kirjaudu</h2>
            <form onSubmit={handleSubmit} className="login-form">
                <input
                    type="email"
                    name="email"
                    onChange={handleChange}
                    placeholder="Sähköpostiosoite"
                    value=""
                />
                <input
                    type="password"
                    name="password"
                    onChange={handleChange}
                    placeholder="Salasana"
                    value=""
                />
                <button>Kirjaudu sisään</button>
            </form>
        </div>
    )
}
