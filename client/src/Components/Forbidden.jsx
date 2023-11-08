import React from "react"
import "./Styles/forbidden.css"
import BackButton from "./BackButton"

export default function Forbidden() {
    return (
        <div id="forbidden-container">
            <section id="forbidden-wrapper">
                <h2 tabIndex={0}>Hups, tänne sinulla ei ole oikeutta</h2>
                <BackButton text="etusivulle" />
            </section>
        </div>
    )
}
