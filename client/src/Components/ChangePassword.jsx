import React, { useState } from "react"
import NotificationElement from "./NotificationElement"
import { changePassword } from "../utils/utils"

export default function ChangePassword() {
    const [showNotification, setShowNotification] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [progress, setProgress] = useState(0)
    const [passwordData, setPasswordData] = useState({
        oldPassword: "",
        newPassword: "",
        newRePassword: "",
    })
    const [notificationText, setNotificationText] = useState("")
    document.title = "Käyttäjäasetukset"
    async function handleSubmit(e) {
        e.preventDefault()
        setIsLoading(true)
        const res = await changePassword(passwordData)
        if (!res.ok) {
            setNotificationText(
                res.status === 401
                    ? "Annoit väärän salasanan"
                    : res.status === 400
                    ? "Uusi salasana virheellinen"
                    : "Jotain meni pieleen, yritä uudelleen"
            )
            setShowNotification(true)
            setIsLoading(false)
            return res.status
        } else {
            setNotificationText("Salasana vaihdettu")
            setShowNotification(true)
            setIsLoading(false)
            return res.status
        }
    }

    return (
        <section id="change-password-container">
            <h3 tabIndex={0}>Vaihda salasana</h3>
            <form
                name="change-password"
                id="password-form"
                method="post"
                onSubmit={handleSubmit}
            >
                <label htmlFor="oldpassword">Kirjoita nykyinen salasana</label>
                <input
                    type="password"
                    name="oldPassword"
                    id="oldpassword"
                    value={passwordData.oldPassword}
                    onChange={(e) => {
                        setPasswordData((prev) => ({
                            ...prev,
                            [e.target.name]: e.target.value,
                        }))
                    }}
                    required
                />
                <label htmlFor="newpassword">Kirjoita uusi salasana</label>
                <input
                    type="password"
                    name="newPassword"
                    id="newpassword"
                    value={passwordData.newPassword}
                    onChange={(e) => {
                        setPasswordData((prev) => ({
                            ...prev,
                            [e.target.name]: e.target.value,
                        }))
                    }}
                    required
                />
                <label htmlFor="newrepassword">
                    Kirjoita uusi salasana uudestaan
                </label>
                <input
                    type="password"
                    name="newRePassword"
                    id="newrepassword"
                    value={passwordData.newRePassword}
                    onChange={(e) => {
                        setPasswordData((prev) => ({
                            ...prev,
                            [e.target.name]: e.target.value,
                        }))
                    }}
                    required
                />
                <button disabled={isLoading} type="submit">
                    {isLoading ? "Päivitetään..." : "Päivitä salasana"}
                </button>
            </form>
            {
                <NotificationElement
                    showNotification={showNotification}
                    setProgress={setProgress}
                    setShowNotification={setShowNotification}
                    progress={progress}
                    text={notificationText}
                    onClickClose={true}
                />
            }
        </section>
    )
}
