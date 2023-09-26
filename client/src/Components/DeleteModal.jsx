import React from "react"

export default function DeleteModal(props) {
    return (
        <section id="backdrop-blur" onClick={props.onClose}>
            <section className="delete-modal">
                <h4>Haluatko poistaa reseptin {props.props.name}?</h4>
                <section id="delete-buttons-container">
                    <button id="delete-yes" onClick={props.onDelete}>
                        Kyllä
                    </button>
                    <button id="delete-no">En</button>
                </section>
                <button id="modal-close-button" onClick={props.onClose}>
                    X
                </button>
            </section>
        </section>
    )
}
