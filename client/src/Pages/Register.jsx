import React, { useContext, useEffect, useRef } from "react"
import { Form, Navigate, useActionData, useNavigation } from "react-router-dom"
import "./styles/Register.css"
import { UserContext } from "../Context/UserContext"

export default function Register() {
    const navigation = useNavigation()
    const action = useActionData()
    const { user } = useContext(UserContext)
    const inputRef = useRef(null)

    useEffect(() => {
        //for accessibility
        inputRef.current.focus()
    }, [])
    if (user.id) {
        return <Navigate to="/account" />
    }
    return (
        <section id="register-container">
            <h2 tabIndex={0}>Rekisteröidy</h2>
            {action && (
                <h3 id="check-register-input" tabIndex={0}>
                    {action === 406
                        ? "Salasanat eivät täsmää"
                        : action === 401
                        ? "Täytä kaikki kentät"
                        : action === 403
                        ? "Sähköposti on jo käytössä"
                        : action === 400
                        ? "Jotain meni pieleen, yritä uudelleen"
                        : ""}
                </h3>
            )}
            <Form replace="true" method="post" id="register-form">
                <label htmlFor="email" className="visuallyhidden">
                    {action === 406
                        ? "Salasanat eivät täsmää"
                        : action === 401
                        ? "Täytä kaikki kentät"
                        : action === 403
                        ? "Sähköposti on jo käytössä"
                        : action === 400
                        ? "Jotain meni pieleen, yritä uudelleen"
                        : ""}
                </label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Sähköpostiosoite"
                    required
                    autoComplete="email"
                    ref={inputRef}
                />
                <label htmlFor="password" className="visuallyhidden">
                    {action === 406
                        ? "Salasanat eivät täsmää"
                        : action === 401
                        ? "Täytä kaikki kentät"
                        : action === 403
                        ? "Sähköposti on jo käytössä"
                        : action === 400
                        ? "Jotain meni pieleen, yritä uudelleen"
                        : ""}
                </label>
                <input
                    type="password"
                    name="password"
                    placeholder="Salasana"
                    id="password"
                    required
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                    title="Salasanassa pitää olla ainakin yksi numero, yksi pieni kirjain, yksi iso kirjain sekä vähintään 8 merkkiä"
                />
                <label htmlFor="re-password" className="visuallyhidden">
                    {action === 406
                        ? "Salasanat eivät täsmää"
                        : action === 401
                        ? "Täytä kaikki kentät"
                        : action === 403
                        ? "Sähköposti on jo käytössä"
                        : action === 400
                        ? "Jotain meni pieleen, yritä uudelleen"
                        : ""}
                </label>
                <input
                    type="password"
                    name="re-password"
                    id="re-password"
                    placeholder="Kirjoita salasana uudelleen"
                    required
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                    title="Salasanassa pitää olla ainakin yksi numero, yksi pieni kirjain, yksi iso kirjain sekä vähintään 8 merkkiä"
                />

                <button disabled={navigation.state === "submitting"}>
                    {navigation.state === "idle"
                        ? "Rekisteröidy"
                        : "Rekisteröidään käyttäjä..."}
                </button>
            </Form>
        </section>
    )
}
