import { useEffect } from "react"
import "./Styles/notificationElement.css"

export default function NotificationElement({
    showNotification,
    setShowNotification,
    progress,
    text,
    onClickClose = true,
    setProgress,
}: {
    showNotification: boolean
    setShowNotification: React.Dispatch<React.SetStateAction<boolean>>
    progress: number
    text: string
    onClickClose: boolean
    setProgress: React.Dispatch<React.SetStateAction<number>>
}) {
    useEffect(() => {
        let progressTimeout: ReturnType<typeof setTimeout>
        if (showNotification && progress < 100) {
            progressTimeout = setTimeout(() => {
                setProgress((prev) => prev + 1)
            }, 50)
        }
        if (progress === 100) {
            setShowNotification(false)
            progressTimeout = setTimeout(() => {
                setProgress(0)
            }, 500)
        }
        return () => {
            clearTimeout(progressTimeout)
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
