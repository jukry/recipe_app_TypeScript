import React from "react"
import "./Styles/loader.css"

export default function ({ text }) {
    return (
        <section id="loader">
            <h3 id={"loader-text"}>{text}</h3>
            <div id="loading-bars">
                <div id="bar1" className="loading-bar"></div>
                <div id="bar2" className="loading-bar"></div>
                <div id="bar3" className="loading-bar"></div>
            </div>
        </section>
    )
}
