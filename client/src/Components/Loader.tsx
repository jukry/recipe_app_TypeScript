import React, { useEffect, useState } from "react"
import "./Styles/loader.css"

export default function ({ text }: { text: string }) {
    const [message, setMessage] = useState(text)
    //this is just used to show user a message if server is in idle. used only with a free deployed server that that goes to idle mode if there are no connections in 15 minutes
    useEffect(() => {
        setTimeout(() => {
            setMessage("Odota hetki, palvelin taitaa olla idle-tilassa")
        }, 5000)
    }, [])

    return (
        <section id="loader">
            <h3 id="loader-text">{message}</h3>
            <div id="loading-bars">
                <div id="bar1" className="loading-bar"></div>
                <div id="bar2" className="loading-bar"></div>
                <div id="bar3" className="loading-bar"></div>
            </div>
        </section>
    )
}
