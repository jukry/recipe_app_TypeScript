import React from "react"
import "./Styles/deleteModal.css"

export default function DeleteModal(props) {
    return (
        <div id="backdrop-blur" onClick={props.onClose}>
            <div className="delete-modal">
                <section className="modal-wrapper">
                    <h4>
                        {props.props.text} {props.props.name}
                    </h4>
                    <div id="delete-buttons-container">
                        <button id="delete-yes" onClick={props.onDelete}>
                            Kyllä
                        </button>
                        <button id="delete-no">En</button>
                    </div>
                    <button id="modal-close-button" onClick={props.onClose}>
                        X
                    </button>
                </section>
            </div>
        </div>
    )
}
