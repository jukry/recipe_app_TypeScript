import React, { FormEvent, useState } from "react"
import { useUpdateUser } from "../Hooks/useUpdateUser"
import { changeEmail } from "../utils/utils"
import NotificationElement from "./NotificationElement"

export default function ChangeEmail() {
    const { updateUser } = useUpdateUser()
    const [isLoading, setIsLoading] = useState(false)
    const [emailData, setEmailData] = useState({
        email: "",
        password: "",
    })
    const [showNotification, setShowNotification] = useState(false)
    const [progress, setProgress] = useState(0)
    const [notificationText, setNotificationText] = useState("")

    async function handleSubmit(e: FormEvent) {
        e.preventDefault()
        setIsLoading(true)
        const res = await changeEmail(emailData)
        if (!res.ok) {
            setNotificationText(
                res.status === 403
                    ? "Sähköpostisoite on jo olemassa"
                    : res.status === 401
                    ? "Salasana virheellinen"
                    : "Jotain meni pieleen, yritä uudelleen"
            )
            setShowNotification(true)
            setIsLoading(false)
            return res.status
        } else {
            const body = await res.json()
            updateUser(body.Message)
            setNotificationText("Sähköpostiosoite vaihdettu")
            setIsLoading(false)
            setShowNotification(true)
            return res
        }
    }

    return (
        <section id="change-email-container">
            <h3 tabIndex={0}>Vaihda sähköpostiosoite</h3>
            <form
                name="change-email"
                id="change-email-form"
                method="post"
                onSubmit={handleSubmit}
            >
                <label htmlFor="change-email">
                    Kirjoita uusi sähköpostiosoite
                </label>
                <input
                    type="email"
                    required
                    name="email"
                    id="change-email"
                    value={emailData.email}
                    onChange={(e) => {
                        setEmailData((prev) => ({
                            ...prev,
                            [e.target.name]: e.target.value,
                        }))
                    }}
                />
                <label htmlFor="confirm-email-password">
                    Kirjoita nykyinen salasana
                </label>
                <input
                    type="password"
                    name="password"
                    id="confirm-email-password"
                    required
                    value={emailData.password}
                    onChange={(e) => {
                        setEmailData((prev) => ({
                            ...prev,
                            [e.target.name]: e.target.value,
                        }))
                    }}
                />
                <button disabled={isLoading} type="submit">
                    {isLoading ? "Päivitetään..." : "Päivitä sähköpostiosoite"}
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
