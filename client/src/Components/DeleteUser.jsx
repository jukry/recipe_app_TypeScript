import React, { useState } from "react"
import { deleteUser } from "../utils/utils"
import "./Styles/deleteUser.css"
import { useNavigation } from "react-router-dom"
import { createPortal } from "react-dom"
import DeleteModal from "./DeleteModal"

export default function DeleteUser() {
    const navigation = useNavigation()
    const [showModal, setShowModal] = useState(false)

    return (
        <>
            <section id="delete-user-container">
                <h3>Poista käyttäjätilisi</h3>
                <button
                    id="delete-user-button"
                    name="deleteUserButton"
                    onClick={() => {
                        setShowModal((prev) => !prev)
                    }}
                    disabled={navigation.state === "submitting"}
                >
                    Poista käyttäjätili
                </button>
            </section>
            {showModal &&
                createPortal(
                    <DeleteModal
                        props={{
                            text: "Oletko varma että haluat poistaa käyttäjätietosi?",
                        }}
                        onDelete={(event) => {
                            if (event.target.id === "delete-yes") {
                                deleteUser()
                            }
                        }}
                        onClose={(event) => {
                            if (event.target.className !== "delete-modal") {
                                event.preventDefault()
                                setShowModal(false)
                            }
                        }}
                    />,
                    document.getElementById("container")
                )}
        </>
    )
}
