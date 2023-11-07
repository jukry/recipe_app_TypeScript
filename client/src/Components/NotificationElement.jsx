import { useEffect } from "react"
import "./Styles/notificationElement.css"

export default function NotificationElement({
    showNotification,
    setShowNotification,
    progress,
    text,
    onClickClose = true,
    setProgress,
}) {
    useEffect(() => {
        if (showNotification && progress < 100) {
            setTimeout(() => {
                setProgress((prev) => prev + 1)
            }, 50)
        }
        if (progress === 100) {
            setShowNotification(false)
            setTimeout(() => {
                setProgress(0)
            }, 500)
        }
        return () => {
            clearTimeout()
        }
    }, [progress, showNotification])
    return (
        <div
            className={`notification-modal ${
                showNotification ? "show-notification" : "hide-notification"
            }`}
            onClick={() => {
                if (onClickClose) {
                    setShowNotification(!onClickClose)
                    setTimeout(() => {
                        setProgress(0)
                    }, 500)
                }
            }}
        >
            <p>{text}</p>
            <div className="progress" style={{ width: `${progress}%` }}></div>
        </div>
    )
}
