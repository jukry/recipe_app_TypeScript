import React, { useContext, useState } from "react"
import "./Styles/recipeComments.css"
import { useParams } from "react-router-dom"
import { UserContext } from "../Context/UserContext"
import { useMutation } from "@tanstack/react-query"

function CommentForm(props) {
    const { id } = useParams()
    const { user } = useContext(UserContext)
    const [comment, setComment] = useState({
        content: "",
        username: "",
    })
    const handleSubmit = props.props.mutate
    const mutation = props.props
    const handleCommentChange = (e) => {
        setComment((prev) => ({
            ...prev,
            content: e.target.value,
        }))
    }
    const handleCommentUsername = (e) => {
        setComment((prev) => ({
            ...prev,
            username: e.target.value,
        }))
    }

    const { mutate, isLoading } = useMutation({
        mutationFn: handleSubmit,
    })

    return !user.id ? (
        <p>Kirjaudu sisään jos haluat kommentoida reseptiä</p>
    ) : (
        <section id="comment-form-container">
            {comment?.content?.length > 0 ? (
                <p id="comment-length-field">
                    {comment?.content?.length}/1000 merkkiä
                </p>
            ) : (
                ""
            )}
            <form
                method="post"
                action=""
                id="comment-form"
                onSubmit={(event) => {
                    event.preventDefault()
                    mutate([event, comment, id, user.id, setComment])
                }}
                disabled={isLoading}
            >
                <label htmlFor="comment-box"></label>
                <textarea
                    name="commentbox"
                    id="comment-box"
                    cols="30"
                    rows="5"
                    form="comment-form"
                    placeholder="Kirjoita kommenttisi"
                    maxLength={1000}
                    value={comment.content}
                    onChange={handleCommentChange}
                    required
                ></textarea>
                <label htmlFor="comment-username"></label>
                <input
                    id="comment-username"
                    type="text"
                    className="text"
                    placeholder="Anna nimi"
                    value={comment.username}
                    onChange={handleCommentUsername}
                    required
                    maxLength={64}
                />
                <button type="submit" id="comment-submit-button">
                    Lisää kommentti
                </button>
                {mutation.isError ? (
                    <p id="comment-post-error">
                        Voit lähettää maksimissaan 2 kommenttia 10 minuutin
                        sisällä
                    </p>
                ) : (
                    ""
                )}
            </form>
        </section>
    )
}

export default CommentForm
