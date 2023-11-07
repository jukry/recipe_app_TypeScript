import React from "react"
import "./Styles/notfound.css"
import BackButton from "./BackButton"

export default function NotFound() {
    return (
        <div id="notfound-container">
            <section id="notfound-wrapper">
                <h2>Etsimääsi reseptiä ei löytynyt</h2>
                <BackButton text="etusivulle" />
            </section>
        </div>
    )
}
