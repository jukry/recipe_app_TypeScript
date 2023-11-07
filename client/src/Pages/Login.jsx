import React, { useContext, useState } from "react"
import "./styles/Login.css"
import { Navigate, useNavigate } from "react-router-dom"
import { UserContext } from "../Context/UserContext"
import { useLogin } from "../Hooks/useLogin"

export default function Login() {
    const { user, isLoading, setIsLoading } = useContext(UserContext)
    const { login } = useLogin()
    const navigate = useNavigate()
    const [userData, setUserData] = useState({
        email: "",
        password: "",
    })
    const [loginStatus, setLoginStatus] = useState()
    const handleSubmit = async (e) => {
        e.preventDefault()
        const res = await login(userData.email, userData.password)
        if (!res.ok) {
            setLoginStatus(res.status)
            setIsLoading(false)
            return loginStatus
        }
        return navigate("/account")
    }
    if (user.id) {
        return <Navigate to="/account" />
    }
    return (
        <div className="login-container">
            <h2>Kirjaudu sisään</h2>
            {loginStatus && (
                <h3 className="check-login-input">
                    {loginStatus === 400
                        ? "Tarkista syöttämäsi tiedot"
                        : loginStatus === 401
                        ? "Sähköposti tai salasana väärin"
                        : ""}
                </h3>
            )}
            <form
                replace="true"
                method="post"
                className="login-form"
                onSubmit={handleSubmit}
            >
                <label htmlFor="email" className="visuallyhidden">
                    Sähköpostiosoite
                </label>
                <input
                    required
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Sähköpostiosoite"
                    value={userData.email}
                    onChange={(e) =>
                        setUserData((prev) => ({
                            ...prev,
                            email: e.target.value,
                        }))
                    }
                    autoComplete="email"
                />
                <label htmlFor="password" className="visuallyhidden">
                    Salasana
                </label>
                <input
                    required
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Salasana"
                    value={userData.password}
                    onChange={(e) =>
                        setUserData((prev) => ({
                            ...prev,
                            password: e.target.value,
                        }))
                    }
                />
                <button type="submit" disabled={isLoading}>
                    {!isLoading ? "Kirjaudu sisään" : "Kirjaudutaan..."}
                </button>
            </form>
        </div>
    )
}
