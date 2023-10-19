import React, { useState } from "react"
import "./Styles/loader.css"

export default function ({ text }) {
    const [message, setMessage] = useState(text)
    setTimeout(() => {
        setMessage("Odota hetki, palvelin on idle-tilassa")
    }, 5000)
    return (
        <section id="loader">
            <h3 id={"loader-text"}>{message}</h3>
            <div id="loading-bars">
                <div id="bar1" className="loading-bar"></div>
                <div id="bar2" className="loading-bar"></div>
                <div id="bar3" className="loading-bar"></div>
            </div>
        </section>
    )
}
