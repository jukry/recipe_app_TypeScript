import { useEffect, useRef, MutableRefObject, MouseEventHandler } from "react"
import "./Styles/deleteModal.css"

export default function DeleteModal(props: {
    data: { text: string; name: string | null }
    onClose: MouseEventHandler<HTMLDivElement | HTMLButtonElement>
    onDelete: MouseEventHandler<HTMLButtonElement>
}) {
    console.log(props)
    const deleteRef: MutableRefObject<HTMLDivElement | null> = useRef(null)
    useEffect(() => {
        //for accessibility
        if (!deleteRef.current) {
            return
        }
        deleteRef.current.focus()
    }, [])
    return (
        <div id="backdrop-blur" onClick={props.onClose}>
            <div className="delete-modal">
                <section className="modal-wrapper">
                    <h4 tabIndex={0} ref={deleteRef}>
                        {props.data.text} {props.data.name}
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
