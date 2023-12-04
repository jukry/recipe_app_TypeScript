import { useState } from "react"
import { deleteUser } from "../utils/utils"
import "./Styles/deleteUser.css"
import { useNavigation } from "react-router-dom"
import { createPortal } from "react-dom"
import DeleteModal from "./DeleteModal"

export default function DeleteUser() {
    const navigation = useNavigation()
    const [showModal, setShowModal] = useState(false)
    const container: HTMLElement | null = document.getElementById("container")
    if (!container) {
        throw new Error("No container")
    }
    return (
        <>
            <section id="delete-user-container">
                <h3 tabIndex={0}>Poista käyttäjätilisi</h3>
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
                        data={{
                            text: "Oletko varma että haluat poistaa käyttäjätietosi?",
                        }}
                        onDelete={(event) => {
                            const target = event.target as HTMLButtonElement
                            if (target?.id === "delete-yes") {
                                deleteUser()
                            }
                        }}
                        onClose={(event) => {
                            const target = event.target as HTMLButtonElement
                            if (target?.className !== "delete-modal") {
                                event.preventDefault()
                                setShowModal(false)
                            }
                        }}
                    />,
                    container
                )}
        </>
    )
}
