import React, { useEffect, useRef } from "react"
import "./Styles/deleteModal.css"

export default function DeleteModal(props) {
    const deleteRef = useRef(null)

    useEffect(() => {
        //for accessibility
        deleteRef.current.focus()
    }, [])
    return (
        <div id="backdrop-blur" onClick={props.onClose}>
            <div className="delete-modal">
                <section className="modal-wrapper">
                    <h4 tabIndex={0} ref={deleteRef}>
                        {props.props.text} {props.props.name}
                    </h4>
                    <div id="delete-buttons-container">
                        <button id="delete-yes" onClick={props.onDelete}>
                            Kyllä
                        </button>
                        <button id="delete-no">En</button>
                    </div>
                    <button
                        id="modal-close-button"
                        onClick={props.onClose}
                        aria-label="Sulje"
                    >
                        X
                    </button>
                </section>
            </div>
        </div>
    )
}
